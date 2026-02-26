// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// --- HEDERA SYSTEM STRUCTS ---
struct TokenKey { uint256 keyType; KeyValue key; }
struct KeyValue { bool inheritAccountKey; address contractId; bytes ed25519; bytes ECDSA_secp256k1; address delegatableContractId; }
struct Expiry { uint32 second; address autoRenewAccount; uint32 autoRenewPeriod; }
struct HederaToken { string name; string symbol; address treasury; string memo; bool tokenSupplyType; int64 maxSupply; bool freezeDefault; TokenKey[] tokenKeys; Expiry expiry; }
struct FixedFee { int64 amount; address tokenId; bool useHbarsForPayment; bool useCurrentTokenForPayment; address feeCollector; }
struct RoyaltyFee { int64 numerator; int64 denominator; int64 amount; address tokenId; bool useHbarsForPayment; address feeCollector; }
struct AccountAmount { address accountID; int64 amount; bool isApproval; }
struct NftTransfer { address senderAccountID; address receiverAccountID; int64 serialNumber; bool isApproval; }
struct TokenTransferList { address token; AccountAmount[] transfers; NftTransfer[] nftTransfers; }
struct TransferList { AccountAmount[] transfers; }
 
interface IHederaTokenService {
    function transferFrom(address token, address sender, address receiver, int64 amount) external returns (int responseCode);
    function transferNFT(address token, address sender, address receiver, int64 serialNumber) external returns (int responseCode);
    function transferNFTs(address token, address[] memory sender, address[] memory receiver, int64[] memory serialNumber) external returns (int responseCode);
    function mintToken(address token, int64 amount, bytes[] memory metadata) external returns (int64 responseCode, int64 newTotalSupply, int64[] memory serialNumbers);
    function associateToken(address account, address token) external returns (int responseCode);
    function updateNonFungibleTokenCustomFees(address token, FixedFee[] memory fixedFees, RoyaltyFee[] memory royaltyFees) external returns (int64 responseCode);
    function createNonFungibleToken(HederaToken memory token) external payable returns (int64 responseCode, address tokenAddress);
    function cryptoTransfer(TransferList memory transferList, TokenTransferList[] memory tokenTransfers) external returns (int64 responseCode);
}

interface IERC721 {
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function getApproved(uint256 tokenId) external view returns (address operator);
    function isApprovedForAll(address owner, address operator) external view returns (bool);
}

contract HedraFiNFTMarketPlace {
    IHederaTokenService constant HTS = IHederaTokenService(address(0x167));
    int constant HEDERA_SUCCESS = 22;
    // ---------------- STATE VARIABLES ----------------
    address public admin;
    address public hedrafiCollectionToken; 
    uint256 public feePercent = 200; // 2% 
    uint256 public mintingFee = 0;   //hbar
    uint256 public maxMintPerCall = 10;
    uint256 public totalAdminFees = 0; //hbar
    bool private locked;

    struct Listing { address seller; uint256 price; bool active; }
    struct Offer { address bidder; uint256 amount; bool active; }
    struct CollectionConfig { address creator; uint64 mintPrice; bool publicMintActive;  int64 maxSupply; uint64 mintedCount; string baseUri; }

    mapping(address => mapping(int64 => Listing)) public listings;
    mapping(address => mapping(int64 => Offer)) public highestOffer;
    mapping(address => CollectionConfig) public collections;
    mapping(address => uint256) public pendingWithdrawals;
   

    event NFTMinted(address indexed token, int64[] serialNumbers, address indexed to);
    event NFTListed(address indexed token, int64 serialNumber, uint256 price, address indexed seller);
    event ListingCancelled(address indexed token, int64 serialNumber, address indexed owner);
    event NFTSold(address indexed token, int64 serialNumber, uint256 amount, address buyer, address seller);
    event OfferPlaced(address indexed token, int64 serialNumber, uint256 amount, address indexed bidder);
    event OfferAccepted(address indexed token, int64 serialNumber, uint256 amount, address bidder, address seller);
    event OfferWithdrawn(address indexed token, int64 serialNumber, uint256 amount, address indexed bidder);
    event CollectionCreated(address indexed collectionAddress, address indexed creator, string baseUrl);
    event FeeUpdated(address indexed token, int64 royalty, int64 fallbackAmount);
    event WithdrawalAvailable(address indexed user, uint256 amount);
    event HBARWithdrawn(address indexed user, uint256 amount);
 
    modifier onlyAdmin() { require(msg.sender == admin, "Only admin"); _; }
    modifier nonReentrant() { require(!locked, "No reentrancy"); locked = true; _; locked = false; }

    constructor() { 
        admin = msg.sender; 
    }
    // ---------------- 1. COLLECTION & MINTING ----------------

    function createCollection(
        string memory _name, string memory _symbol, int64 _maxSupply, 
        string calldata _baseUri
    ) external payable  {
        // 1. Setup Identity
        address contractAddress = address(this);
       
        // 2. Setup Keys - Using ONLY delegatableContractId in Slot 5
        // This is the most compatible way for a contract to be its own admin
        TokenKey[] memory keys = new TokenKey[](3);
        
        keys[0] = TokenKey(1, KeyValue(false, address(0), new bytes(0), new bytes(0), contractAddress)); // Admin
        keys[1] = TokenKey(16, KeyValue(false, address(0), new bytes(0), new bytes(0), contractAddress)); // Supply
        keys[2] = TokenKey(32, KeyValue(false, address(0), new bytes(0), new bytes(0), contractAddress)); //Fee Schedule Key
        
        // 3. Build the Token Struct
        HederaToken memory token;
        token.name = _name;
        token.symbol = _symbol;
        token.treasury = contractAddress; 
        token.memo = "HedraFi";
        token.tokenSupplyType = true;
        token.maxSupply = _maxSupply;
        token.tokenKeys = keys;
        
        // 4. Set Expiry with NO auto-renew account (address(0))
        // This forces the network to use the Treasury for auto-renew costs
        token.expiry = Expiry(0, address(0), 7000000);

        // 5. Call the SIMPLER precompile
        // Note: We pass an empty FixedFee array as required by the function signature
        (int response, address tokenAddress) = HTS.createNonFungibleToken{value: msg.value}(token);

        // 6. Check for Success (22)
        if (response != 22) {
             revert(string(abi.encodePacked("HTS_FAIL_CODE: ", uint256(response))));
        }

        // 7. Store config
        collections[tokenAddress] = CollectionConfig(msg.sender, 0, false, _maxSupply, 0, _baseUri);
        emit CollectionCreated(tokenAddress, msg.sender, _baseUri);
    }
 
 
    function publicMint(address token, uint32 qty) external payable nonReentrant  {
        CollectionConfig storage config = collections[token];
        require(config.publicMintActive, "Inactive");
        require(msg.value == config.mintPrice * qty, "Insufficient HBAR");
        require(qty <= maxMintPerCall, "Exceeds max mint per session");


        if (config.maxSupply > 0) require(int64(config.mintedCount + qty) <= config.maxSupply, "Sold out");

        // 1. Prepare Metadata (Scoped to save stack)
        int64[] memory serials;
        {
            bytes[] memory metadata = new bytes[](qty);
            for (uint32 i = 0; i < qty; i++) {
                metadata[i] = bytes(string(abi.encodePacked(config.baseUri, uint2str(config.mintedCount + i + 1), ".json")));
            }

            // 2. Mint the Tokens
            int64 res;
            (res, , serials) = HTS.mintToken(token, 0, metadata);
            require(res == HEDERA_SUCCESS, "Mint failed");
        }

        config.mintedCount += qty;

        // 3. Payout the creator (using your protocol fee)
        _payout(config.creator, msg.value);

        // 4. Batch Transfer to Buyer
        {
            address[] memory senders = new address[](qty);
            address[] memory receivers = new address[](qty);
            for (uint32 i = 0; i < qty; i++) { 
                senders[i] = address(this); 
                receivers[i] = msg.sender; 
            }
            require(HTS.transferNFTs(token, senders, receivers, serials) == HEDERA_SUCCESS, "Transfer failed");
        }
        emit NFTMinted(token, serials, msg.sender);
    }

    function mintNFTs(address token, string[] memory uris) external payable  {
        require(uris.length > 0, "No URIs");
        require(uris.length <= maxMintPerCall, "Exceeds max mint per session");
        require( token == hedrafiCollectionToken || msg.sender == collections[token].creator, "Unauthorized to mint" );
        
        if (mintingFee > 0) {
            uint256 totalFee = mintingFee * uris.length;
            require(msg.value == totalFee, "Insufficient hbar for fee");
            (bool f, ) = payable(admin).call{value: totalFee}("");
            require(f, "Fee failed");
            totalAdminFees += totalFee;
        }

        bytes[] memory metadata = new bytes[](uris.length);
        for (uint i = 0; i < uris.length; i++) { metadata[i] = bytes(uris[i]); }

        (int64 res, , int64[] memory serials) = HTS.mintToken(token, 0, metadata);
        require(res == HEDERA_SUCCESS, "Mint failed");

        address[] memory s = new address[](serials.length);
        address[] memory r = new address[](serials.length);
        for (uint i = 0; i < serials.length; i++) { 
            s[i] = address(this); 
            r[i] = msg.sender;
        }

        require(HTS.transferNFTs(token, s, r, serials) == HEDERA_SUCCESS, "Transfer failed");
        emit NFTMinted(token, serials, msg.sender);
    }

    // ---------------- 2. MARKETPLACE (ALLOWANCE MODEL) ----------------
    function listNFT(address token, int64 serialNumber, uint256 price) external  {
        require(price > 0, "Price must be > 0");

        // 1. Convert serial number for the ERC-721 call
        uint256 nftSerial = uint256(int256(serialNumber));
        address owner = IERC721(token).ownerOf(nftSerial);

        // 3. Security Check
        require(owner == msg.sender, "You're not the NFT owner");

        // 4. Verification Check: Did the user approve the marketplace?
        bool isApproved = IERC721(token).getApproved(nftSerial) == address(this) || 
                          IERC721(token).isApprovedForAll(owner, address(this));

        require(isApproved, "Marketplace: Not approved to sell this NFT");

        listings[token][serialNumber] = Listing(msg.sender, price, true);
        
        emit NFTListed(token, serialNumber, price, msg.sender);
    }

    function cancelListing(address token, int64 serialNumber) external {
        require(listings[token][serialNumber].seller == msg.sender, "Unauthorized");
        delete listings[token][serialNumber];
        
        Offer memory offer = highestOffer[token][serialNumber];
        if (offer.active) {
            delete highestOffer[token][serialNumber];
        } 

        emit ListingCancelled(token, serialNumber, msg.sender);
    }


    function buyNFT(address token, int64 serialNumber) external nonReentrant  {
        
        Listing storage listing = listings[token][serialNumber];
        require(listing.active, "Invalid buy");

        address seller = listing.seller;
        uint256 price = listing.price;

        //Security & Approval Checks
        {
            uint256 nftSerial = uint256(uint64(serialNumber));
            address owner = IERC721(token).ownerOf(nftSerial);
            require(owner == seller, "Nft not available for sale");

            bool isApproved = IERC721(token).getApproved(nftSerial) == address(this) || 
                            IERC721(token).isApprovedForAll(owner, address(this));
            require(isApproved, "Marketplace: Not approved");
        }


        // HTS Transfer Block (Scoped to prevent Stack Too Deep)
        {
            NftTransfer[] memory nftTransfers = new NftTransfer[](1);
            nftTransfers[0] = NftTransfer({
                senderAccountID: seller,
                receiverAccountID: msg.sender,
                serialNumber: serialNumber,
                isApproval: true 
            });

            TokenTransferList[] memory tokenTransfers = new TokenTransferList[](1);
            tokenTransfers[0] = TokenTransferList({
                token: token,
                transfers: new AccountAmount[](0),
                nftTransfers: nftTransfers
            });

            uint256 fee = (price * feePercent) / 10000;
            uint256 sellerAmount = price - fee;

            AccountAmount[] memory hbarAmounts = new AccountAmount[](3);
            hbarAmounts[0] = AccountAmount(msg.sender, -int64(uint64(price)), true);
            hbarAmounts[1] = AccountAmount(seller, int64(uint64(sellerAmount)), false);
            hbarAmounts[2] = AccountAmount(admin, int64(uint64(fee)), false);

            int64 response = HTS.cryptoTransfer(TransferList(hbarAmounts), tokenTransfers);

            if (response != 22) {
                revert(string(abi.encodePacked("HTS_FAIL: ", uint256(uint64(response)))));
            }

            totalAdminFees += fee; 
        }

        delete listings[token][serialNumber];
      
        Offer memory offer = highestOffer[token][serialNumber];
        if (offer.active) {
            delete highestOffer[token][serialNumber];
        }

        emit NFTSold(token, serialNumber, price, msg.sender, seller);
    }

    function placeOffer(address token, int64 serialNumber, uint256 amount) external nonReentrant  {

        Offer memory current = highestOffer[token][serialNumber];
        require(amount > current.amount, "Higher bid needed");

        Listing memory listing = listings[token][serialNumber];
        require(listing.active, "item no longer available");

        // Convert serial number for the ERC-721 call
        uint256 nftSerial = uint256(int256(serialNumber));
        address owner = IERC721(token).ownerOf(nftSerial);

        // Security Check
        require(owner == listing.seller, "Item no longer available");

        highestOffer[token][serialNumber] = Offer(msg.sender, amount, true);
        emit OfferPlaced(token, serialNumber, amount, msg.sender);
    }

    function acceptOffer(address token, int64 serialNumber) external nonReentrant {
        Offer storage offer = highestOffer[token][serialNumber];
        Listing storage listing = listings[token][serialNumber];
        require(offer.active, "No offer");
        require(msg.sender == listing.seller, "Not the seller");

        {
            // 1. Convert serial number for the ERC-721 call
            uint256 nftSerial = uint256(int256(serialNumber));
            address owner = IERC721(token).ownerOf(nftSerial);

            // 2. Security Check
            require(owner == msg.sender, "You're not the NFT owner");

            // 3. Verification Check: Did the user approve the marketplace?
            bool isApproved = IERC721(token).getApproved(nftSerial) == address(this) || 
                            IERC721(token).isApprovedForAll(owner, address(this));
            require(isApproved, "Marketplace: Not approved to sell this NFT");
        }

        address bidder = offer.bidder;
        uint256 amount = offer.amount;


        // Scoped HTS Call
        {
            NftTransfer[] memory nftTransfers = new NftTransfer[](1);
            nftTransfers[0] = NftTransfer({
                senderAccountID: msg.sender,
                receiverAccountID: bidder,
                serialNumber: serialNumber,
                isApproval: true 
            });

            TokenTransferList[] memory tokenTransfers = new TokenTransferList[](1);
            tokenTransfers[0] = TokenTransferList({
                token: token,
                transfers: new AccountAmount[](0),
                nftTransfers: nftTransfers
            });

            uint256 fee = (amount * feePercent) / 10000;
            uint256 sellerAmount = amount - fee;
 
            AccountAmount[] memory hbarAmounts = new AccountAmount[](3);
            hbarAmounts[0] = AccountAmount(bidder, -int64(uint64(amount)), true);
            hbarAmounts[1] = AccountAmount(msg.sender, int64(uint64(sellerAmount)), false);
            hbarAmounts[2] = AccountAmount(admin, int64(uint64(fee)), false);
            int64 response = HTS.cryptoTransfer(TransferList(hbarAmounts), tokenTransfers);
            require(response == 22, "HTS_FAIL");

            totalAdminFees += fee;
        }

        delete highestOffer[token][serialNumber];
        delete listings[token][serialNumber];

        emit OfferAccepted(token, serialNumber, amount, bidder, msg.sender);
    }

    function withdrawOffer(address token, int64 serialNumber) external nonReentrant {
        Offer memory offer = highestOffer[token][serialNumber];
        require(offer.active && offer.bidder == msg.sender, "Unauthorized");
        delete highestOffer[token][serialNumber]; 

        emit OfferWithdrawn(token, serialNumber, offer.amount, msg.sender);
    }

    // ---------------- 3. FEE UPDATES (HIP-1010) ----------------
    function updateFees(address token, int64 _newRoyalty, int64 _newFallback) external {
        require(collections[token].creator == msg.sender, "Not creator");
        require(_newRoyalty <= 1000, "Max 10%");

        RoyaltyFee[] memory royalties = new RoyaltyFee[](1);
        royalties[0] = RoyaltyFee(_newRoyalty, 10000, _newFallback, address(0), true, msg.sender);

        require(HTS.updateNonFungibleTokenCustomFees(token, new FixedFee[](0), royalties) == HEDERA_SUCCESS, "Failed");
        emit FeeUpdated(token, _newRoyalty, _newFallback);
    }

    // ---------------- 4. INTERNAL & ADMIN ----------------
    function _payout(address recipient, uint256 total) internal {
        uint256 fee = (total * feePercent) / 10000;
        uint256 payout = total - fee;

        (bool s1, ) = payable(admin).call{value: fee}("");
        require(s1, "Admin Payout failed");
        totalAdminFees += fee; 

        (bool s2, ) = payable(recipient).call{value: payout}("");
        // Payout Seller 
        if (!s2) {
            pendingWithdrawals[recipient] += payout;
            emit WithdrawalAvailable(recipient, payout);
        }
    }

    function withdrawFunds() external nonReentrant {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "Nothing to withdraw");

        pendingWithdrawals[msg.sender] = 0;

        (bool s, ) = payable(msg.sender).call{value: amount}("");
        require(s, "Withdrawal failed");

        emit HBARWithdrawn(msg.sender, amount);
    }

    function setFees(uint256 _perc, uint256 _mintingFee) external onlyAdmin {
        require(_perc <= 1000, "Max 10%");
        feePercent = _perc;
        mintingFee = _mintingFee;
    }

    function configureLaunchpad(address token, uint64 _price, bool _active) external {
        require(collections[token].creator == msg.sender, "Unauthorized");
        collections[token].mintPrice = _price;
        collections[token].publicMintActive = _active;
    }

    function setHedrafiCollectionToken(address _tokenAddress) external onlyAdmin {
        hedrafiCollectionToken = _tokenAddress; 
    }

    function setMaxMintPerCall(uint256 _maxMintPerCall) external onlyAdmin {
        maxMintPerCall = _maxMintPerCall;
    }
   
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) return "0";
        uint256 j = _i; uint256 len;
        while (j != 0) { len++; j /= 10; }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) { bstr[--k] = bytes1(uint8(48 + (_i % 10))); _i /= 10; }
        return string(bstr);
    }

    receive() external payable {}
}