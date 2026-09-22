/* global BigInt */

import { toast } from 'react-toastify';
import axios from "axios";
import { useState } from 'react';


const API_URL = process.env.REACT_APP_API_URL;


export function convertIpfsToPinata(ipfsUri) {
  if (!ipfsUri) return "";

  if (ipfsUri.startsWith("ipfs://")) {
    const cid = ipfsUri.replace("ipfs://", "");
    return `${IPFS_GATEWAYS[0]}${cid}`;
  }

  return ipfsUri;
}


//this function is for testing purposes
export async function finalizeMint(txHash, metadataUrl) {
  // Persist to Laravel

  setTimeout(async ()=>{
    try {
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
        setTimeout(()=>{
          window.location.href = "/studio/mynfts"; 
        }, 2000)
      }
    } catch (error) {
      console.error("Finalize mint error:", error);
    }
  }, 2000)

}

//testnet function 
export async function finalizeBuy(id, buyer){
    setTimeout(async ()=>{
      try {
        const res = await fetch(`${API_URL}/api/finalize-buy`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            buyer
          })
        });
        const { success } = await res.json();
        console.log("the finalize final")
        if(success){
          toast.success('NFT bought successfully!');
          setTimeout(()=>{
            window.location.href = "/studio/mynfts";
          }, 2000)
        }
      } catch (error) {
        console.error("Finalize buy error:", error);
      }
    }, 2000)
}





export async function fetchNFTMetadata(mirrorNodeMetadata) {
  try {
    // 1. Decode Base64 from Mirror Node
    const decodedUri = atob(mirrorNodeMetadata);
    
    // 2. Convert to a gateway URL (using your Pinata helper)
    const jsonUrl = convertIpfsToPinata(decodedUri);
    
    // 3. Fetch the actual JSON file
    const response = await fetch(jsonUrl);
    if (!response.ok) return null;
    const json = await response.json();
    
    // 4. Extract standard HIP-412 fields
    return {
      name: json.name || "Unknown Artifact",
      description: json.description || "",
      // Use the 'image' field from JSON, converted to Pinata
      image_url: convertIpfsToPinata(json.image),
      attributes: json.attributes || []
    };
  } catch (e) {
    console.error("Metadata resolution failed:", e);
    return null;
  }
}


export const checkNFTAllowanceMirrorNode = async (ownerId, tokenId, contractId) => {
  try {
    const response = await axios.get(`https://mainnet.mirrornode.hedera.com/api/v1/accounts/${ownerId}/nft/allowances`);
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



export async function evmToHederaAccount(evmAddress) {
  const res = await fetch(
    `https://mainnet.mirrornode.hedera.com/api/v1/accounts/${evmAddress}`
  );

  const data = await res.json();

  if (!data.account) throw new Error("Account not found on Hedera");

  return data.account; // e.g. "0.0.6987678"
}

export function evmContractToHederaId(evmAddress) {
  if(!evmAddress) return ""; 
  const clean = evmAddress.replace(/^0x0+/, '');
  const num = BigInt('0x' + clean).toString(10);
  return `0.0.${num}`;
}







const IPFS_GATEWAYS = [
  "https://gateway.pinata.cloud/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
  "https://dweb.link/ipfs/",
];

/**
 * Extract the CID/path from an IPFS URI.
 */
function getIpfsPath(ipfsUri) {
  if (!ipfsUri) return "";

  if (ipfsUri.startsWith("ipfs://")) {
    return ipfsUri.replace("ipfs://", "");
  }

  return ipfsUri;
}

/**
 * Convert an IPFS URI to a gateway URL.
 *
 * Example:
 * ipfs://QmExample
 * -> https://ipfs.io/ipfs/QmExample
 */
export function convertIpfsToGateway(ipfsUri) {
  if (!ipfsUri) return "";

  // Already a normal HTTP/HTTPS URL
  if (
    ipfsUri.startsWith("http://") ||
    ipfsUri.startsWith("https://")
  ) {
    return ipfsUri;
  }

  const ipfsPath = getIpfsPath(ipfsUri);

  return `${IPFS_GATEWAYS[0]}${ipfsPath}`;
}

/**
 * Get all available gateway URLs for an IPFS URI.
 *
 * These can be tried one after another if a gateway fails.
 */
export function getIpfsGatewayUrls(ipfsUri) {
  if (!ipfsUri) return [];

  // If it's already an HTTP/HTTPS URL,
  // use it first before trying the IPFS gateways.
  if (
    ipfsUri.startsWith("http://") ||
    ipfsUri.startsWith("https://")
  ) {
    const ipfsPath = getIpfsPath(ipfsUri);

    return [
      ipfsUri,
      ...IPFS_GATEWAYS.map(
        (gateway) => `${gateway}${ipfsPath}`
      ),
    ];
  }

  const ipfsPath = getIpfsPath(ipfsUri);

  return IPFS_GATEWAYS.map(
    (gateway) => `${gateway}${ipfsPath}`
  );
}


export  function IpfsImage({
  src,
  alt = "",
  ...props
}) {
  const gateways = getIpfsGatewayUrls(src);
  const [gatewayIndex, setGatewayIndex] = useState(0);

  if (!gateways.length) {
    return null;
  }

  const handleError = () => {
    if (gatewayIndex < gateways.length - 1) {
      setGatewayIndex((index) => index + 1);
    }
  };

  return (
    <img
      src={gateways[gatewayIndex]}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}



