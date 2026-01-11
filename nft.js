import {
  Client,
  PrivateKey,
  AccountId, 
  ContractId, 
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType
} from "@hashgraph/sdk";
import dotenv from "dotenv";
dotenv.config({ path: '.env.local' });  

const client = Client.forTestnet();

const operatorId = AccountId.fromString(process.env.HEDERA_OPERATOR_ID);
const operatorKey = PrivateKey.fromStringECDSA(process.env.HEDERA_OPERATOR_KEY);
const marketPlaceContract = ContractId.fromString(process.env.REACT_APP_MARKETPLACE_CONTRACT); 

client.setOperator(operatorId, operatorKey);

const tx = await new TokenCreateTransaction()
  .setTokenName("Hedrafi Store Front")
  .setTokenSymbol("HSF")
  .setTreasuryAccountId(operatorId)
  .setTokenType(TokenType.NonFungibleUnique)
  .setSupplyType(TokenSupplyType.Finite)
  .setMaxSupply(2**63-1)
  .setSupplyKey(marketPlaceContract)
  .freezeWith(client)
  .sign(operatorKey);

const submit = await tx.execute(client);
const receipt = await submit.getReceipt(client);

console.log("Token ID:", receipt.tokenId.toString());