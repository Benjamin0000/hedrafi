import { useEffect, useState } from "react";
import Header from "../shared/Header";
import Modal from "../shared/Modal";
import { useWriteContract, useEvmAddress, useWallet, useAccountId, useApproveTokenNftAllowance } from "@buidlerlabs/hashgraph-react-wallets";
import { convertIpfsToPinata, checkNFTAllowanceMirrorNode } from "../../lib/marketplace"
import marketplaceABI from "../../ABIs/marketplaceABI.json";
import { toast } from "react-toastify";
import { ContractId } from "@hashgraph/sdk";


const marketplaceContract = process.env.REACT_APP_MARKETPLACE_CONTRACT; 
const nftTokenContractEVM = process.env.REACT_APP_NFT_CONTRACT_EVM; 
const nftTokenContract = process.env.REACT_APP_NFT_CONTRACT; 
const API_URL = process.env.REACT_APP_API_URL; 


const MyNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [price, setPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const { isConnected } = useWallet()
  const { writeContract } = useWriteContract();
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });
  const { data: accountId } = useAccountId({ autoFetch: isConnected });
  const { approve } = useApproveTokenNftAllowance(); 

  useEffect(() => {
  
    if(!evmAddress) return;
    const loadNFTs = async () => {
        const res = await fetch(`${API_URL}/api/my-nfts/${evmAddress}`);
        const data = await res.json();
        setNfts(data);
        // const allowed = await checkNFTAllowanceMirrorNode(accountId, nftTokenContract, marketplaceContract); 
        // setAllowed(allowed); 
    };
    loadNFTs();

  }, [evmAddress]);

  const openListModal = (nft) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  const listNFT = async () => {

    // if(!allowed){
        const TOKENS = [{ tokenId: nftTokenContract, serial: selectedNFT.serial_number }];
        const SPENDER = marketplaceContract;
        const transactionIdOrHash = await approve(TOKENS, SPENDER);

        if(!transactionIdOrHash){
            //check for failure
            toast.error("approval faild")
            return; 
        }
    // }


    const txHash = await ListOnChain(selectedNFT.serial_number);
    if(!txHash) {
        toast.error("Listing faild"); 
        return;
    }

    try{
        await fetch(`${API_URL}/api/list-nft`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token_id: selectedNFT.id,
                price,
                seller: evmAddress,
            }),
        });
        toast.success("Listing successful"); 
        setTimeout(()=>{
            window.location.reload(); 
        }, 2000)
    }catch(e){
        toast.error("Listing faild"); 
    }
    setIsModalOpen(false);
  };


    const ListOnChain = async (serial_number) => {

     const priceInTinyUnits = price * 10 ** 8;

      const txHash = await writeContract({
        contractId: ContractId.fromString(marketplaceContract),
        abi: marketplaceABI,
        functionName: "listNFT",
        args: [
          nftTokenContractEVM,
          serial_number,
          priceInTinyUnits
        ],
        metaArgs: { gas: 1_200_000 }
      });

      return txHash; 
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          My NFTs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.serial_number}
              className="bg-gray-900/60 border border-purple-500/20 rounded-xl overflow-hidden shadow-xl hover:scale-105 transition cursor-pointer"
              onClick={() => openListModal(nft)}
            >
              <img
                src={convertIpfsToPinata(nft.image_url)}
                alt={nft.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold">{nft.name}</h3>
                <p className="text-sm text-gray-400">Token #{nft.serial_number}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="List NFT for Sale"
      >
        {selectedNFT && (
          <div className="space-y-4">
            <img
              src={convertIpfsToPinata(selectedNFT.image_url)}
              className="w-full h-56 object-cover rounded-lg"
            />

            <div>
              <label className="text-sm font-semibold">Price (HRT)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-gray-900 border border-purple-500/30 rounded-lg px-4 py-2 mt-1"
              />
            </div>

            <button
              onClick={listNFT}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 py-3 rounded-xl font-bold"
            >
              List NFT
              
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyNFTs;
