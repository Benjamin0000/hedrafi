import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;
//this function is for testing purposes
export async function finalizeMint(txHash, metadataUrl) {
  // Persist to Laravel
  const res = await fetch(`${API_URL}/api/finalize-nft`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tx_id: txHash,
      metadata_url: metadataUrl,
    })
  });
  const { success } = await res.json();
  console.log(res.json)
  toast.success('Minting successful!');
}