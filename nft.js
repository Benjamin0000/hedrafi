// import {
//   Client,
//   PrivateKey,
//   AccountId, 
//   ContractId, 
//   TokenCreateTransaction,
//   TokenType,
//   TokenSupplyType
// } from "@hashgraph/sdk";
// import dotenv from "dotenv";
// dotenv.config({ path: '.env.local' });  

// const client = Client.forTestnet();

// const operatorId = AccountId.fromString(process.env.HEDERA_OPERATOR_ID);
// const operatorKey = PrivateKey.fromStringECDSA(process.env.HEDERA_OPERATOR_KEY);
// const marketPlaceContract = ContractId.fromString(process.env.REACT_APP_MARKETPLACE_CONTRACT); 

// client.setOperator(operatorId, operatorKey);

// const tx = await new TokenCreateTransaction()
//   .setTokenName("Hedrafi Store Front")
//   .setTokenSymbol("HSF")
//   .setTreasuryAccountId(operatorId)
//   .setTokenType(TokenType.NonFungibleUnique)
//   .setSupplyType(TokenSupplyType.Finite)
//   .setMaxSupply(2**63-1)
//   .setSupplyKey(marketPlaceContract)
//   .freezeWith(client)
//   .sign(operatorKey);

// const submit = await tx.execute(client);
// const receipt = await submit.getReceipt(client);

// console.log("Token ID:", receipt.tokenId.toString());


// import {
//   Client,
//   PrivateKey,
//   AccountId,
//   ContractId,
//   AccountAllowanceApproveTransaction,
//   TokenId,
//   NftId
// } from "@hashgraph/sdk";

// import dotenv from "dotenv";
// dotenv.config({ path: '.env.local' });  

// const operatorId = AccountId.fromString(process.env.HEDERA_OPERATOR_ID);
// const operatorKey = PrivateKey.fromStringECDSA(process.env.HEDERA_OPERATOR_KEY);
// const marketPlaceContract = ContractId.fromString(process.env.REACT_APP_MARKETPLACE_CONTRACT); 

// const client = Client.forTestnet();
// client.setOperator(operatorId, operatorKey);

// const nftId = new NftId(TokenId.fromString("0.0.7984938"), 1); // Replace 123 with your serial

// await new AccountAllowanceApproveTransaction()
//   .approveTokenNftAllowance(
//      nftId,
//      operatorId,                    // owner (treasury)
//      marketPlaceContract            // spender (contract)
//   )
//   .execute(client);

//   console.log("finished")






import {
  Client,
  PrivateKey,
  AccountId,
  ContractId,
  AccountAllowanceApproveTransaction,
  TokenCreateTransaction,
  TokenId,
  NftId,
  TransactionId,
  Hbar,
  TokenType,
  TokenSupplyType
} from "@hashgraph/sdk";

import dotenv from "dotenv";
dotenv.config({ path: '.env.local' });  

const operatorId = AccountId.fromString(process.env.HEDERA_OPERATOR_ID);
const operatorKey = PrivateKey.fromStringECDSA(process.env.HEDERA_OPERATOR_KEY);
const marketPlaceContract = ContractId.fromString(process.env.REACT_APP_MARKETPLACE_CONTRACT); 

const client = Client.forTestnet();
client.setOperator(operatorId, operatorKey);



async function createHRTToken() {
    // 1. Configure the client with your operator details
    // const operatorId = process.env.OPERATOR_ID;
    // const operatorKey = PrivateKey.fromStringECDSA(process.env.OPERATOR_KEY);
    // const client = Client.forMainnet().setOperator(operatorId, operatorKey);

    console.log("Creating HRT Token...");

    // 2. Define the supply (1 Billion * 10^8 decimals)
    // Note: 1,000,000,000.00000000
    const initialSupply = 100000000000000000n; 

    // 3. Create the transaction
    const transaction = new TokenCreateTransaction()
        .setTokenName("HedraFi Reward Token")
        .setTokenSymbol("HRT")
        .setTokenType(TokenType.FungibleCommon)
        .setDecimals(8)
        .setInitialSupply(initialSupply)
        .setTreasuryAccountId(operatorId)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(initialSupply)
        // Admin key allows you to update/delete. If omitted, token is immutable.
        .setAdminKey(operatorKey) 
        .freezeWith(client);

    // 4. Sign and submit
    const signTx = await transaction.sign(operatorKey);
    const txResponse = await signTx.execute(client);

    // 5. Get the receipt to see the Token ID
    const receipt = await txResponse.getReceipt(client);
    const tokenId = receipt.tokenId;

    console.log(`✅ HRT Token Created! Token ID: ${tokenId}`);
}


const result = await createHRTToken(); 
console.log(result); 


// const nftId = new NftId(TokenId.fromString("0.0.8015487"), 1); // Replace 123 with your serial

// const transaction =  new AccountAllowanceApproveTransaction()
//   .approveTokenNftAllowance(
//      nftId,
//      operatorId,                    // owner (treasury)
//      marketPlaceContract            // spender (contract)
//   );

// const transaction = new AccountAllowanceApproveTransaction()
//     .approveTokenNftAllowanceAllSerials(
//         TokenId.fromString("0.0.7988490"), // The NFT Collection ID
//         operatorId,                          // The User's Account ID
//         marketPlaceContract             // The Spender (Your Contract ID)
//     );

// // Sign with the owner's key (since they are granting the allowance)
// const txResponse = await transaction.execute(client);
// const receipt = await txResponse.getReceipt(client);

// console.log(`Approval Status: ${receipt.status.toString()}`);

// console.log("finished")



// async function approveHbarSpending(client, buyerId, contractId, amountAsHbar) {
//     // 1. Create the transaction
//     const transaction = new AccountAllowanceApproveTransaction()
//         .approveHbarAllowance(
//             buyerId,      // The owner of the HBAR
//             contractId,   // The spender (your Marketplace Contract)
//             new Hbar(amountAsHbar) // The amount limit
//         )
//         .setTransactionId(TransactionId.generate(buyerId))
//         .freezeWith(client);

//     // 2. Sign and execute
//     // Note: The Buyer must sign this transaction
//     const response = await transaction.execute(client);
    
//     // 3. Get receipt
//     const receipt = await response.getReceipt(client);
    
//     console.log(`Allowance status: ${receipt.status.toString()}`);
//     return receipt.status.toString() === "SUCCESS";
// }


// const result = await approveHbarSpending(client, operatorId, marketPlaceContract, 10); 
// console.log(result)

// await new AccountAllowanceApproveTransaction()
//   .approveTokenAllowance(
//      TokenId.fromString("0.0.7349761"),
//      operatorId,                    // owner (treasury)
//      marketPlaceContract,            // spender (contract)
//     100000000000
//   )
//   .execute(client);

// console.log(ContractId.fromString('0.0.7970381').toEvmAddress())


// import { 
//     Client, 
//     ContractExecuteTransaction, 
//     ContractFunctionParameters, 
//     Hbar,
//     AccountId,
//     ContractId,
//     PrivateKey,
//     ContractInfoQuery,
// } from "@hashgraph/sdk";

// import dotenv from "dotenv";
// dotenv.config({ path: '.env.local' });  

// async function main() {
//     // 1. Initialize Client
//     const client = Client.forTestnet(); // Or Client.forTestnet()
//     client.setOperator(
//       AccountId.fromString(process.env.HEDERA_OPERATOR_ID), 
//       PrivateKey.fromStringECDSA(process.env.HEDERA_OPERATOR_KEY)
//     );

//     const contractId = ContractId.fromString("0.0.7972823");

//     console.log(`Calling contract: ${contractId}...`);

//     try {

//     //   console.log("Verifying contract identity on ledger...");
//     // const info = await new ContractInfoQuery()
//     //     .setContractId(contractId)
//     //     .execute(client);

//     //   console.log(info)
    
//     // console.log(`Contract verified. Solidity Address: ${info.contractSolidityAddress}`);
//     // return; 
//         // 2. Build the transaction
//         const transaction = new ContractExecuteTransaction()
//             .setContractId(contractId)
//             .setGas(3000000) // High gas for HTS creation
//             .setPayableAmount(new Hbar(35)) // msg.value for token creation + rent
//             .setFunction(
//                 "createCollection",
//                 new ContractFunctionParameters()
//                     .addString("My Collection")     // _name
//                     .addString("MC")                // _symbol
//                     .addInt64(1000)                 // _maxSupply
//                     // .addInt64(500)                  // _royaltyNumerator (5%)
//                     // .addInt64(1)                    // _fallbackFee (1 HBAR)
//                     .addString("ipfs://QmZn52MNZviWHpftftcLYgFAU3p7wt4226T8RrWk5Ykjq5/")       // _baseUri
//             );

//         // 3. Execute and get receipt
//         const txResponse = await transaction.execute(client);
//         const receipt = await txResponse.getReceipt(client);

//         console.log(`Transaction Status: ${receipt.status.toString()}`);
//         console.log(`Check it on Hashscan: https://hashscan.io/testnet/transaction/${txResponse.transactionId}`);

//     } catch (error) {
//         console.error("Transaction Failed!");
//         console.error(error);
//     }
// }

// main();





// import { 
//     Client, 
//     ContractCreateFlow, 
//     Hbar,
//     AccountId,
//     PrivateKey
// } from "@hashgraph/sdk";
// import dotenv from "dotenv";
// import fs from "fs";

// dotenv.config({ path: '.env.local' });

// async function deploy() {
//     // 1. Initialize Client
//     const client = Client.forTestnet();
//     client.setOperator(
//         AccountId.fromString(process.env.HEDERA_OPERATOR_ID), 
//         PrivateKey.fromStringECDSA(process.env.HEDERA_OPERATOR_KEY)
//     );

//     try {
//         // 2. Read Bytecode correctly (Synchronously for setup scripts)
//         // Ensure bytecod.bin contains the raw hex string from Remix
//         const bytecode = fs.readFileSync("./bytecod.bin", "utf8").trim(); 

//         console.log("🚀 Deploying contract via ContractCreateFlow...");

//         // 3. Execute the Flow
//         // ContractCreateFlow handles FileCreate, FileAppend, and ContractCreate in one go.
//         const contractCreateTx = new ContractCreateFlow()
//             .setBytecode(bytecode)
//             .setGas(4000000) 
//             // .setInitialBalance(new Hbar(10)) // Pre-fund the contract to pay for HTS fees
//             .setConstructorParameters(null); 

//         const txResponse = await contractCreateTx.execute(client);
//         const receipt = await txResponse.getReceipt(client);
        
//         const newContractId = receipt.contractId;
//         // Convert the ID to its EVM/Solidity format for your records
//         const solidityAddress = newContractId.toEvmAddress();

//         console.log(`✅ Success!`);
//         console.log(`Contract ID: ${newContractId}`);
//         console.log(`Solidity Address: 0x${solidityAddress}`);

//     } catch (error) {
//         console.error("❌ Deployment Failed!");
//         console.error(error);
//     }
// }

// deploy();