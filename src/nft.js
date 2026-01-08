import {
  Client,
  PrivateKey,
  AccountId, 
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType
} from "@hashgraph/sdk";
import dotenv from "dotenv";
dotenv.config();  

const client = Client.forMainnet();

const operatorId = AccountId.fromString(process.env.HEDERA_OPERATOR_ID);
const operatorKey = PrivateKey.fromStringECDSA(process.env.HEDERA_OPERATOR_KEY);

client.setOperator(operatorId, operatorKey);

const tx = await new TokenCreateTransaction()
  .setTokenName("Hedrafi Store Front")
  .setTokenSymbol("HEDRAFI")
  .setTreasuryAccountId(operatorId)
  .setTokenType(TokenType.NonFungibleUnique)
  .setSupplyType(TokenSupplyType.Finite)
  .setMaxSupply(10**64)
  .setSupplyKey()  //contract address
  .freezeWith(client)
  .sign(operatorKey);

const submit = await tx.execute(client);
const receipt = await submit.getReceipt(client);

console.log("Token ID:", receipt.tokenId.toString());