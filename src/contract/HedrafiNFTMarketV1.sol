// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IHederaTokenService {
    function transferFrom(address token, address sender, address receiver, int64 amount) external returns (int responseCode);
    function transferNFTs(address token, address[] memory sender, address[] memory receiver, int64[] memory serialNumber) external returns (int responseCode);
    function transferNFT(address token, address sender, address receiver, int64 serialNumber) external returns (int responseCode);
    function mintToken(address token, int64 amount, bytes[] memory metadata) external returns (int64 responseCode, int64 newTotalSupply, int64[] memory serialNumbers);
    function associateToken(address account, address token) external returns (int responseCode);
}

int constant HEDERA_SUCCESS = 22;

contract HedraFiNFTMarketPlace {

    IHederaTokenService constant HTS = IHederaTokenService(address(0x167));

    uint256 public constant ROYALTY_BPS = 1000; // 10% (1000 basis points)
    address public admin;
    address public treasury;
    address public tokenTreasury;
    address public hrtToken;

    uint256 public totalMintingFeesCollected;
    uint256 public totalMarketplaceFeesCollected; // from buyNFT & acceptOffer

    uint256 public feePercent = 200; // 2% fee
    uint256 public mintingFee = 0;   // fixed HRT per mint, admin settable

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    constructor(address _hrtToken) {
        admin = msg.sender;
        treasury = address(this);
        tokenTreasury = msg.sender;
        hrtToken = _hrtToken;
    }

    // ---------------- EVENTS ----------------
    event NFTMinted(address indexed token, int64[] serialNumbers, address indexed to);
    event NFTListed(address indexed token, int64 serialNumber, uint256 price, address indexed owner);
    event OfferPlaced(address indexed token, int64 serialNumber, uint256 amount, address indexed bidder);
    event OfferAccepted(address indexed token, int64 serialNumber, uint256 amount, address indexed bidder, address indexed owner);
    event OfferWithdrawn(address indexed token, int64 serialNumber, uint256 amount, address indexed bidder);
    event NFTSold(address indexed token, int64 serialNumber, uint256 amount, address indexed buyer, address indexed seller);
    event ListingCancelled(address indexed token, int64 serialNumber, address indexed owner);

    // ---------------- STRUCTS ----------------
    struct Listing {
        address owner;
        uint256 price;
        bool active;
    }

    struct Offer {
        address bidder;
        uint256 amount;
        bool active;
    }

    mapping(address => mapping(int64 => Listing)) public listings;
    mapping(address => mapping(int64 => Offer)) public highestOffer; // only track highest offer per NFT
   
    // ---------------- ROYALTIES ----------------
    mapping(address => mapping(int64 => address)) public nftCreator;
    mapping(address => mapping(int64 => uint256)) public nftRoyalty; // basis points (500 = 5%)

    // ---------------- ADMIN ----------------
    function setFeePercent(uint256 newFee) external onlyAdmin {
        require(newFee <= 10000, "Max 100%");
        feePercent = newFee;
    }

    function setMintingFee(uint256 amount) external onlyAdmin {
        mintingFee = amount;
    }

    // ---------------- Minting ----------------
    function mintNFTs(address token, string[] memory uris, uint256 royaltyBP) external {
        require(uris.length > 0, "Must provide at least one metadata URI");
        require(royaltyBP <= ROYALTY_BPS, "Max 10%");

        // Minting fee
        if (mintingFee > 0) {
            uint256 totalFee = mintingFee * uris.length;
            int response = HTS.transferFrom(hrtToken, msg.sender, admin, int64(int256(totalFee)));
            require(response == HEDERA_SUCCESS, "Minting fee payment failed");
            totalMintingFeesCollected += totalFee;
        }

        // Convert URIs to bytes[]
        bytes[] memory metadata = new bytes[](uris.length);
        for (uint i = 0; i < uris.length; i++) {
            metadata[i] = bytes(uris[i]);
        }

        // Mint NFTs to treasury
        (int64 responseCode, , int64[] memory serialNumbers) = HTS.mintToken(token, 0, metadata);
        require(responseCode == HEDERA_SUCCESS, "NFT Mint failed");


        // Transfer NFTs to user
        address[] memory senders = new address[](serialNumbers.length);
        address[] memory receivers = new address[](serialNumbers.length);
        for (uint i = 0; i < serialNumbers.length; i++) {
            senders[i] = tokenTreasury;
            receivers[i] = msg.sender;
        }

        int transferResponse = HTS.transferNFTs(token, senders, receivers, serialNumbers);
        require(transferResponse == HEDERA_SUCCESS, "NFT Transfer failed");

        for (uint i = 0; i < serialNumbers.length; i++) {
            nftCreator[token][serialNumbers[i]] = msg.sender;
            nftRoyalty[token][serialNumbers[i]] = royaltyBP;
        }

        emit NFTMinted(token, serialNumbers, msg.sender);
    }

    // ---------------- Listing ----------------
    function listNFT(address token, int64 serialNumber, uint256 price) external {
        require(price > 0, "Price must be > 0");

        int res = HTS.transferNFT(token, msg.sender, treasury, serialNumber);
        require(res == HEDERA_SUCCESS, "Transfer to contract failed");

        listings[token][serialNumber] = Listing({
            owner: msg.sender,
            price: price,
            active: true
        });

        emit NFTListed(token, serialNumber, price, msg.sender);
    }

    function cancelListing(address token, int64 serialNumber) external {
        Listing storage listing = listings[token][serialNumber];
        require(listing.active, "Listing inactive");
        require(listing.owner == msg.sender, "Not owner");

        // Transfer NFT back to owner
        int res = HTS.transferNFT(token, treasury, listing.owner, serialNumber);
        require(res == HEDERA_SUCCESS, "NFT transfer to user failed");

        delete listings[token][serialNumber];
        emit ListingCancelled(token, serialNumber, listing.owner);
    }

    // ---------------- Place Offer ----------------
    function placeOffer(address token, int64 serialNumber, uint256 amount) external {
        Listing memory listing = listings[token][serialNumber];
        require(listing.active, "NFT not listed");
        require(amount > 0, "Offer must be positive");
        require(amount >= listing.price, "Offer must meet listing price");

        Offer memory current = highestOffer[token][serialNumber];

        // New offer must be higher
        require(amount > current.amount, "Offer too low");


        // Transfer HRT from new bidder to contract
        int response = HTS.transferFrom(hrtToken, msg.sender, address(this), int64(int256(amount)));
        require(response == HEDERA_SUCCESS, "HRT payment failed");

        // Refund previous highest bidder
        if (current.active) {
            int refund = HTS.transferFrom(hrtToken, address(this), current.bidder, int64(int256(current.amount)));
            require(refund == HEDERA_SUCCESS, "Refund failed");
        }

        // Record highest offer
        highestOffer[token][serialNumber] = Offer({
            bidder: msg.sender,
            amount: amount,
            active: true
        });

        emit OfferPlaced(token, serialNumber, amount, msg.sender);
    }

    // ---------------- Accept Offer ----------------
    function acceptOffer(address token, int64 serialNumber) external {
        Listing storage listing = listings[token][serialNumber];
        require(listing.active, "Listing inactive");
        require(listing.owner == msg.sender, "Not owner");

        Offer storage offer = highestOffer[token][serialNumber];
        require(offer.active, "No active offer");

        uint256 royalty = (offer.amount * nftRoyalty[token][serialNumber]) / 10000;
        uint256 fee = (offer.amount * feePercent) / 10000;
        uint256 payout = offer.amount - fee - royalty;

        if (royalty > 0) {
            int r0 = HTS.transferFrom(hrtToken, address(this), nftCreator[token][serialNumber], int64(int256(royalty)));
            require(r0 == HEDERA_SUCCESS, "Royalty payment failed");
        }

        // Send HRT to owner and fee to admin
        int res1 = HTS.transferFrom(hrtToken, address(this), listing.owner, int64(int256(payout)));
        int res2 = HTS.transferFrom(hrtToken, address(this), admin, int64(int256(fee)));
        require(res1 == HEDERA_SUCCESS && res2 == HEDERA_SUCCESS, "HRT transfer failed");

        totalMarketplaceFeesCollected += fee;

        // Transfer NFT to bidder
        int res = HTS.transferNFT(token, treasury, offer.bidder, serialNumber);
        require(res == HEDERA_SUCCESS, "NFT transfer to user failed");

        emit OfferAccepted(token, serialNumber, offer.amount, offer.bidder, listing.owner);
        emit NFTSold(token, serialNumber, offer.amount, offer.bidder, listing.owner);

        delete listings[token][serialNumber]; 
        delete highestOffer[token][serialNumber];
    }

    // ---------------- Buy NFT outright ----------------
    function buyNFT(address token, int64 serialNumber) external {
        Listing storage listing = listings[token][serialNumber];
        require(listing.active, "NFT not listed");

        uint256 price = listing.price;

        uint256 royalty = (price * nftRoyalty[token][serialNumber]) / 10000;
        uint256 fee = (price * feePercent) / 10000;
        uint256 payout = price - fee - royalty;

        if (royalty > 0) {
            int r0 = HTS.transferFrom(hrtToken, msg.sender, nftCreator[token][serialNumber], int64(int256(royalty)));
            require(r0 == HEDERA_SUCCESS, "Royalty payment failed");
        }

        // Transfer HRT
        int res1 = HTS.transferFrom(hrtToken, msg.sender, listing.owner, int64(int256(payout)));
        int res2 = HTS.transferFrom(hrtToken, msg.sender, admin, int64(int256(fee)));
        require(res1 == HEDERA_SUCCESS && res2 == HEDERA_SUCCESS, "HRT payment failed");

        totalMarketplaceFeesCollected += fee;

        // Transfer NFT to buyer | sender is treasury
        int res = HTS.transferNFT(token, treasury, msg.sender, serialNumber);
        require(res == HEDERA_SUCCESS, "NFT transfer to user failed");

        // Refund current highest bidder if exists
        Offer storage offer = highestOffer[token][serialNumber];
        if (offer.active) {
            int refund = HTS.transferFrom(hrtToken, address(this), offer.bidder, int64(int256(offer.amount)));
            require(refund == HEDERA_SUCCESS, "Refund failed");
            delete highestOffer[token][serialNumber];
        }

        emit NFTSold(token, serialNumber, price, msg.sender, listing.owner);

        delete listings[token][serialNumber];
    }

    // ---------------- Withdraw Offer ----------------
    function withdrawOffer(address token, int64 serialNumber) external {
        Offer storage offer = highestOffer[token][serialNumber];
        require(offer.active, "No active offer");
        require(offer.bidder == msg.sender, "You're not the bidder");

        offer.active = false;
        int res = HTS.transferFrom(hrtToken, address(this), msg.sender, int64(int256(offer.amount)));
        require(res == HEDERA_SUCCESS, "Refund failed");

        delete highestOffer[token][serialNumber]; 

        emit OfferWithdrawn(token, serialNumber, offer.amount, msg.sender);
    }

    function setRoyalty(address token, int64 serialNumber, uint256 royaltyBP) external {
        require(nftCreator[token][serialNumber] == msg.sender, "Not creator");
        require(royaltyBP <= ROYALTY_BPS, "Max 10%");
        nftRoyalty[token][serialNumber] = royaltyBP;
    }

    // ---------------- Associate Contract ----------------
    function associateSelf(address token) external onlyAdmin returns (int) {
        int response = HTS.associateToken(address(this), token);
        require(response == HEDERA_SUCCESS, "Association failed");
        return response;
    }
}