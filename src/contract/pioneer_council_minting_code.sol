// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


struct TokenKey { uint256 keyType; KeyValue key; }
struct KeyValue { bool inheritAccountKey; address contractId; bytes ed25519; bytes ECDSA_secp256k1; address delegatableContractId; }
struct Expiry { uint32 second; address autoRenewAccount; uint32 autoRenewPeriod; }
struct HederaToken { string name; string symbol; address treasury; string memo; bool tokenSupplyType; int64 maxSupply; bool freezeDefault; TokenKey[] tokenKeys; Expiry expiry; }
struct FixedFee { int64 amount; address tokenId; bool useHbarsForPayment; bool useCurrentTokenForPayment; address feeCollector; }
struct RoyaltyFee { int64 numerator; int64 denominator; int64 amount; address tokenId; bool useHbarsForPayment; address feeCollector; }
struct User {
    int status; // 1 = done 2 = minted
}

interface IHederaTokenService {
    function transferNFT(address token, address sender, address receiver, int64 serialNumber) external returns (int responseCode);
    function mintToken(address token, int64 amount, bytes[] memory metadata) external returns (int64 responseCode, int64 newTotalSupply, int64[] memory serialNumbers);
    function associateToken(address account, address token) external returns (int responseCode);
    function updateNonFungibleTokenCustomFees(address token, FixedFee[] memory fixedFees, RoyaltyFee[] memory royaltyFees) external returns (int64 responseCode);
    function createNonFungibleToken(HederaToken memory token) external payable returns (int64 responseCode, address tokenAddress);
}

contract PioneerCouncilMinting {
    IHederaTokenService constant HTS = IHederaTokenService(address(0x167));
    int constant HEDERA_SUCCESS = 22;
    // ---------------- STATE VARIABLES ----------------
    address public admin;
    address public token; 
    uint256 public mintingFee = 0;   //hbar
    uint256 public minted = 0;
    bool private locked;
 
    mapping(address => User) public users;
    mapping(uint256 => string) public approvedMetadata;
   
    modifier onlyAdmin() { require(msg.sender == admin, "Only admin"); _; }
    modifier nonReentrant() { require(!locked, "No reentrancy"); locked = true; _; locked = false; }

    event NFTMinted(address indexed token, int64[] serialNumbers, address indexed to);
    event CollectionCreated(address indexed token);
    event RoyaltyUpdated(address indexed token, int64 royalty, int64 fallbackAmount);

    constructor(
        uint256[] memory _serials,
        string[] memory uris

    ) { 
        admin = msg.sender;
        addMetadata(_serials, uris);
    }

    function addMetadata(uint256[] memory serials, string[] memory uris) public onlyAdmin {
        for(uint i = 0; i < serials.length; i++) {
            approvedMetadata[serials[i]] = uris[i];
        }
    }

    function createCollection(
        string memory _name, 
        string memory _symbol
    ) external payable  onlyAdmin {
        require(token == address(0), "Collection already created");
        // 1. Setup Identity
        address contractAddress = address(this);
       
        // 2. Setup Keys - Using ONLY delegatableContractId in Slot 5
        // This is the most compatible way for a contract to be its own admin
        TokenKey[] memory keys = new TokenKey[](3);
        
        keys[0] = TokenKey(1, KeyValue(false, address(0), new bytes(0), new bytes(0), contractAddress)); // Admin
        keys[1] = TokenKey(16, KeyValue(false, address(0), new bytes(0), new bytes(0), contractAddress)); // Supply
        keys[2] = TokenKey(32, KeyValue(false, address(0), new bytes(0), new bytes(0), contractAddress)); //Fee Schedule Key
        
        // 3. Build the Token Struct 
        HederaToken memory Token;
        Token.name = _name;
        Token.symbol = _symbol;
        Token.treasury = contractAddress;
        Token.tokenSupplyType = true;
        Token.maxSupply = 215;
        Token.tokenKeys = keys;
        Token.expiry = Expiry(0, contractAddress, 7000000);

        // 5. Call the SIMPLER precompile
        // Note: We pass an empty FixedFee array as required by the function signature
        (int64 response, address tokenAddress) = HTS.createNonFungibleToken{value: msg.value}(Token);
        
        // 6. Check for Success (22)
        require(response == HEDERA_SUCCESS, "Token creation failed");
        token = tokenAddress; 

        emit CollectionCreated(tokenAddress);
    }


    function mint() external payable nonReentrant {
        require(token != address(0), "Collection not created");
        require(minted < 215, "Minting closed");
        User storage user = users[msg.sender];
        require(user.status == 1, "not eligible to mint");

        if(mintingFee > 0){
            require(msg.value == mintingFee, "you must pay the mint price");
            (bool s, ) = payable(admin).call{value: mintingFee}("");
            require(s, "Fee Payout failed");
        }

        string memory _metadata = approvedMetadata[minted + 1];
        require(bytes(_metadata).length > 0, "Metadata not ready");

       
        bytes[] memory metadata = new bytes[](1);
        metadata[0] = bytes(_metadata);

        int64 res;  int64[] memory serials;
        (res, , serials) = HTS.mintToken(token, 0, metadata);
        require(res == HEDERA_SUCCESS, "Mint failed");
        
        minted += 1;
        user.status = 2; // completed

        address sender = address(this);
        address receiver = msg.sender;
            
        require(HTS.transferNFT(token, sender, receiver, serials[0]) == HEDERA_SUCCESS, "Transfer failed");
        
        emit NFTMinted(token, serials, msg.sender);
    }

    function whiteList(address[] memory _users) external onlyAdmin {

        for (uint i = 0; i <_users.length; i++){
            address newUser = _users[i]; 
            users[newUser].status  = 1;
        }
    }


    function setFees(uint256 _mintingFee) external onlyAdmin {
        mintingFee = _mintingFee;
    }

    function updateRoyalty(int64 _newRoyalty, int64 _newFallback) external onlyAdmin {
        require(_newRoyalty <= 1000, "Max 10%");
        RoyaltyFee[] memory royalties = new RoyaltyFee[](1);
        royalties[0] = RoyaltyFee(_newRoyalty, 10000, _newFallback, address(0), true, admin);
        require(HTS.updateNonFungibleTokenCustomFees(token, new FixedFee[](0), royalties) == HEDERA_SUCCESS, "Failed to update fee");
        emit RoyaltyUpdated(token, _newRoyalty, _newFallback);
    }

    function fundTreasury() external payable {}

    receive() external payable {}
}