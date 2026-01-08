
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IHederaTokenService {
    function transferFrom(address token, address sender, address receiver, int64 amount) external returns (int responseCode);
    function transferNFTs(address token, address[] memory sender, address[] memory receiver, int64[] memory serialNumber) external returns (int responseCode);
    function mintToken(address token, int64 amount, bytes[] memory metadata) external returns (int64 responseCode, int64 newTotalSupply, int64[] memory serialNumbers);
    function associateToken(address account, address token) external returns (int responseCode);
}

int constant HEDERA_SUCCESS = 22;

contract HedraFiNFTMarketPlace {
    IHederaTokenService constant HTS = IHederaTokenService(address(0x167));
    address public admin;
    address public treasury;
    address public hrtToken;

    uint256 public totalHRTCollected;
    uint256 public feePercent = 200; // 2% fee
    uint256 public mintingFee = 0;   // fixed HRT per mint, admin settable

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    constructor(address _hrtToken) {
        admin = msg.sender;
        treasury = address(this);
        hrtToken = _hrtToken;
    }

    // ---------------- EVENTS ----------------
    event NFTMinted(address indexed token, int64[] serialNumbers, address indexed to);
    event NFTListed(address indexed token, int64 serialNumber, uint256 price, address indexed owner);
    event OfferPlaced(address indexed token, int64 serialNumber, uint256 amount, address indexed bidder);
    event OfferAccepted(address indexed token, int64 serialNumber, uint256 amount, address indexed bidder, address indexed owner);
    event OfferWithdrawn(address indexed token, int64 serialNumber, uint256 amount, address indexed bidder);
    event NFTSold(address indexed token, int64 serialNumber, uint256 amount, address indexed buyer, address indexed seller);

    // ---------------- STRUCTS ----------------
    struct Listing {
        address owner;
        address token;
        int64 serialNumber;
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

    // ---------------- ADMIN ----------------
    function setFeePercent(uint256 newFee) external onlyAdmin {
        require(newFee <= 10000, "Max 100%");
        feePercent = newFee;
    }

    function setMintingFee(uint256 amount) external onlyAdmin {
        mintingFee = amount;
    }

    // ---------------- Minting ----------------
    function mintNFTs(address token, string[] memory uris, address to) external {
        require(uris.length > 0, "Must provide at least one metadata URI");

        // Minting fee
        if (mintingFee > 0) {
            int response = HTS.transferFrom(hrtToken, msg.sender, admin, int64(int256(mintingFee)));
            require(response == HEDERA_SUCCESS, "Minting fee payment failed");
            totalHRTCollected += mintingFee;
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
            senders[i] = treasury;
            receivers[i] = to;
        }

        int transferResponse = HTS.transferNFTs(token, senders, receivers, serialNumbers);
        require(transferResponse == HEDERA_SUCCESS, "NFT Transfer failed");

        emit NFTMinted(token, serialNumbers, to);
    }

    // ---------------- Listing ----------------
    function listNFT(address token, int64 serialNumber, uint256 price) external {
                // 1. Declare the arrays with a size of 1
        address[] memory sender = new address[](1);
        address[] memory receiver = new address[](1);
        int64[] memory serials = new int64[](1);

        // 2. Assign the values to the first index [0]
        sender[0] = msg.sender;
        receiver[0] = treasury;
        serials[0] = serialNumber;

        int res = HTS.transferNFTs(token, sender, receiver, serials);
        require(res == HEDERA_SUCCESS, "Transfer to contract failed");

        listings[token][serialNumber] = Listing({
            owner: msg.sender,
            token: token,
            serialNumber: serialNumber,
            price: price,
            active: true
        });

        emit NFTListed(token, serialNumber, price, msg.sender);
    }

    // ---------------- Place Offer ----------------
    function placeOffer(address token, int64 serialNumber, uint256 amount) external {
        Listing memory listing = listings[token][serialNumber];
        require(listing.active, "NFT not listed");
        require(amount > 0, "Offer must be positive");

        Offer memory current = highestOffer[token][serialNumber];

        // New offer must be higher
        require(amount > current.amount, "Offer too low");

        // Refund previous highest bidder
        if (current.active) {
            int refund = HTS.transferFrom(hrtToken, address(this), current.bidder, int64(int256(current.amount)));
            require(refund == HEDERA_SUCCESS, "Refund failed");
        }

        // Transfer HRT from new bidder to contract
        int response = HTS.transferFrom(hrtToken, msg.sender, address(this), int64(int256(amount)));
        require(response == HEDERA_SUCCESS, "HRT payment failed");

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

        Offer memory offer = highestOffer[token][serialNumber];
        require(offer.active, "No active offer");

        uint256 fee = (offer.amount * feePercent) / 10000;
        uint256 payout = offer.amount - fee;

        // Send HRT to owner and fee to admin
        int res1 = HTS.transferFrom(hrtToken, address(this), listing.owner, int64(int256(payout)));
        int res2 = HTS.transferFrom(hrtToken, address(this), admin, int64(int256(fee)));
        require(res1 == HEDERA_SUCCESS && res2 == HEDERA_SUCCESS, "HRT transfer failed");

        totalHRTCollected += fee;

        
        // 1. Declare the arrays with a size of 1
        address[] memory sender = new address[](1);
        address[] memory receiver = new address[](1);
        int64[] memory serials = new int64[](1);

        // 2. Assign the values to the first index [0]
        sender[0] = treasury; 
        receiver[0] = offer.bidder;
        serials[0] = serialNumber;

        // Transfer NFT to bidder
        int res3 = HTS.transferNFTs(token, sender, receiver, serials);
        require(res3 == HEDERA_SUCCESS, "NFT transfer failed");

        listing.active = false;
        highestOffer[token][serialNumber].active = false;

        emit OfferAccepted(token, serialNumber, offer.amount, offer.bidder, listing.owner);
        emit NFTSold(token, serialNumber, offer.amount, offer.bidder, listing.owner);
    }

    // ---------------- Buy NFT outright ----------------
    function buyNFT(address token, int64 serialNumber) external {
        Listing storage listing = listings[token][serialNumber];
        require(listing.active, "NFT not listed");

        uint256 price = listing.price;

        // Refund current highest bidder if exists
        Offer memory offer = highestOffer[token][serialNumber];
        if (offer.active) {
            int refund = HTS.transferFrom(hrtToken, address(this), offer.bidder, int64(int256(offer.amount)));
            require(refund == HEDERA_SUCCESS, "Refund failed");
            highestOffer[token][serialNumber].active = false;
        }

        uint256 fee = (price * feePercent) / 10000;
        uint256 payout = price - fee;

        // Transfer HRT
        int res1 = HTS.transferFrom(hrtToken, msg.sender, listing.owner, int64(int256(payout)));
        int res2 = HTS.transferFrom(hrtToken, msg.sender, admin, int64(int256(fee)));
        require(res1 == HEDERA_SUCCESS && res2 == HEDERA_SUCCESS, "HRT payment failed");

        totalHRTCollected += fee;

        // 1. Declare the arrays with a size of 1
        address[] memory sender = new address[](1);
        address[] memory receiver = new address[](1);
        int64[] memory serials = new int64[](1);

        // 2. Assign the values to the first index [0]
        sender[0] = treasury;
        receiver[0] =  msg.sender;
        serials[0] = serialNumber;

        // Transfer NFT to buyer
        int res3 = HTS.transferNFTs(token, sender, receiver, serials);
        require(res3 == HEDERA_SUCCESS, "NFT transfer failed");

        listing.active = false;

        emit NFTSold(token, serialNumber, price, msg.sender, listing.owner);
    }

    // ---------------- Withdraw Offer ----------------
    function withdrawOffer(address token, int64 serialNumber) external {
        Offer storage offer = highestOffer[token][serialNumber];
        require(offer.active, "No active offer");
        require(offer.bidder == msg.sender, "You're not the bidder");

        offer.active = false;
        int res = HTS.transferFrom(hrtToken, address(this), msg.sender, int64(int256(offer.amount)));
        require(res == HEDERA_SUCCESS, "Refund failed");

        emit OfferWithdrawn(token, serialNumber, offer.amount, msg.sender);
    }

    // ---------------- Associate Contract ----------------
    function associateSelf(address token) external onlyAdmin returns (int) {
        int response = HTS.associateToken(address(this), token);
        require(response == HEDERA_SUCCESS, "Association failed");
        return response;
    }
}