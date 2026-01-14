import { toast } from 'react-toastify';
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
//this function is for testing purposes
export async function finalizeMint(txHash, metadataUrl) {
  // Persist to Laravel

  setTimeout(async ()=>{
    const res = await fetch(`${API_URL}/api/finalize-nft`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tx_id: txHash,
        metadata_url: metadataUrl,
      })
    });
    const { success } = await res.json();
    console.log("the finalize final")
    if(success){
      toast.success('Minting successful!');
    }
  }, 2000)

}


export function convertIpfsToPinata(ipfsUri) {
  if (!ipfsUri) return "";
  
  // Check if the link starts with ipfs://
  if (ipfsUri.startsWith("ipfs://")) {
    // Extract the CID and append it to the Pinata gateway
    return ipfsUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  }
  
  // If it's already an HTTP link or just a CID, return as is or handle accordingly
  return ipfsUri;
}

export const checkNFTAllowanceMirrorNode = async (ownerId, tokenId, contractId) => {
  try {
    const response = await axios.get(`https://testnet.mirrornode.hedera.com/api/v1/accounts/${ownerId}/nft/allowances`);
    const allowances = response.data.allowances || [];
    return allowances.some(a => 
      a.token_id === tokenId && a.spender === contractId
    );
  } catch (err) {
    if (err.response?.status === 404) {
      // Mirror Node returns 404 "Not found" when no allowances exist
      return false;
    }
    console.error("Mirror node allowance check failed:", err);
    return false;
  }
};

