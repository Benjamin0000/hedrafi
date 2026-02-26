import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Modal from "../shared/Modal";
import { useWriteContract, useEvmAddress, useWallet, useAccountId, useApproveTokenNftAllowance } from "@buidlerlabs/hashgraph-react-wallets";
import { convertIpfsToPinata, checkNFTAllowanceMirrorNode, fetchNFTMetadata,  } from "../../lib/marketplace"
import marketplaceABI from "../../ABIs/marketplaceABI.json";
import { toast } from "react-toastify";
import { ContractId, TokenId } from "@hashgraph/sdk";
import { Box, Settings, Activity, ArrowRight, Lock, Tag, Sparkles, Filter, LayoutGrid, Info, ShieldCheck } from 'lucide-react';

const marketplaceContract = process.env.REACT_APP_MARKETPLACE_CONTRACT; 
const nftTokenContractEVM = process.env.REACT_APP_NFT_CONTRACT_EVM; 
const nftTokenContract = process.env.REACT_APP_NFT_CONTRACT; 
const API_URL = process.env.REACT_APP_API_URL; 


const MyNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [price, setPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isConnected } = useWallet();
  const { writeContract } = useWriteContract();
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });
  const { approve } = useApproveTokenNftAllowance(); 


      useEffect(() => {
      if (!evmAddress) return;

      const loadNFTs = async () => {
         try {
            const mirrorNodeBase = "https://mainnet.mirrornode.hedera.com";
            const res = await fetch(`${mirrorNodeBase}/api/v1/accounts/${evmAddress}/nfts?limit=10`);
            const data = await res.json();

            // Resolve all metadata in parallel
            const resolvedNfts = await Promise.all(
            data.nfts.map(async (nft) => {
               const details = await fetchNFTMetadata(nft.metadata);
               return {
                  ...nft,
                  id: TokenId.fromString(nft.token_id).toEvmAddress(),
                  // Fallback to a placeholder if metadata fetch fails
                  name: details?.name || `Artifact #${nft.serial_number}`,
                  image_url: details?.image_url || "/placeholder-nft.png",
               };
            })
            );

            setNfts(resolvedNfts);
         } catch (error) {
            toast.error("Failed to sync inventory");
         }
      };

      loadNFTs();
      }, [evmAddress]);


  const openListModal = (nft) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  const listNFT = async () => {
    const TOKENS = [{ tokenId: selectedNFT.token_id, serial: selectedNFT.serial_number }];
    const SPENDER = marketplaceContract;
    const transactionIdOrHash = await approve(TOKENS, SPENDER);

    if(!transactionIdOrHash){
        toast.error("Approval failed");
        return; 
    }

    const txHash = await ListOnChain(selectedNFT.serial_number);
    if(!txHash) {
        toast.error("Listing failed"); 
        return;
    }

    try{
        await fetch(`${API_URL}/api/list-nft`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               token: selectedNFT.id,
               seller: evmAddress,
               serialNumber: selectedNFT.serial_number,
               price,
            }),
        });
        toast.success("Listing successful"); 
        setTimeout(() => window.location.reload(), 2000);
    }catch(e){
        toast.error("Listing failed"); 
    }
    setIsModalOpen(false);
  };

  const ListOnChain = async (serial_number) => {
    const priceInTinyUnits = price * 10 ** 8;
    const txHash = await writeContract({
      contractId: ContractId.fromString(marketplaceContract),
      abi: marketplaceABI,
      functionName: "listNFT",
      args: [nftTokenContractEVM, serial_number, priceInTinyUnits],
      metaArgs: { gas: 1_200_000 }
    });
    return txHash; 
  };

  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[100%] bg-indigo-600/5 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container-main">
          <div className="flex flex-col gap-12 md:gap-16">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
               <div className="space-y-4 max-w-3xl">
                  <div className="w-12 h-1 bg-cyber-blue rounded-full mb-6"></div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
                     Personal <span className="text-gradient">Gallery</span>
                  </h1>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">
                     Curate your collection and manage your digital legacy on the world's most sustainable ledger with institutional precision.
                  </p>
               </div>
               <div className="glass-card px-8 py-5 rounded-3xl border-white/[0.05] flex items-center gap-5 shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/5 flex items-center justify-center border border-white/5">
                     <Activity size={24} className="text-cyber-blue animate-pulse" />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Live Inventory</div>
                     <div className="text-lg font-mono font-black text-white">{nfts.length} ASSETS DETECTED</div>
                  </div>
               </div>
            </div>

            {/* Personal Inventory Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
               {nfts.length > 0 ? nfts.map((nft, index) => (
                 <div
                   key={index}
                   className="glass-card group rounded-[3rem] border-white/[0.05] overflow-hidden hover:bg-[#0E1529] hover:border-blue-500/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col shadow-2xl"
                   onClick={() => openListModal(nft)}
                 >
                   {/* Visual Asset */}
                   <div className="relative aspect-square overflow-hidden bg-[#040A1A]">
                     <img
                       src={convertIpfsToPinata(nft.image_url)}
                       alt={nft.name}
                       className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                     />
                     <div className="absolute top-6 right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="bg-brand-base/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl flex items-center gap-2">
                           <Settings size={14} className="group-hover:rotate-90 transition-transform" /> Manage
                        </div>
                     </div>
                     {nft.price && (
                        <div className="absolute bottom-6 left-6">
                           <span className="bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 text-cyber-blue text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg">
                              <span className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse"></span>
                              Listed
                           </span>
                        </div>
                     )}
                   </div>

                   {/* Metadata Area */}
                   <div className="p-10 space-y-6 flex-grow flex flex-col justify-between">
                     <div className="space-y-2">
                       <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 leading-none">Serial #{nft.serial_number}</div>
                       <h3 className="text-2xl font-black text-white truncate group-hover:text-cyber-blue transition-colors tracking-tight">{nft.name}</h3>
                     </div>

                     <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        {nft.price ? (
                           <div className="text-xl font-mono font-black text-white">
                              {Number(nft.price)} <span className="text-[10px] text-slate-600 font-black">ℏ</span>
                           </div>
                        ) : (
                           <div className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] flex items-center gap-2">
                              <Lock size={12} /> Vaulted
                           </div>
                        )}
                        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                           <Tag size={18} />
                        </div>
                     </div>
                   </div>
                 </div>
               )) : (
                 <div className="col-span-full py-32 glass-card rounded-[4rem] border-white/[0.05] text-center space-y-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-24 h-24 bg-blue-600/5 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/10 shadow-inner">
                       <Box size={48} className="text-blue-500 opacity-30" />
                    </div>
                    <div className="space-y-4 max-w-lg mx-auto relative z-10">
                       <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">No Artifacts Detected</h3>
                       <p className="text-slate-400 text-lg font-medium leading-relaxed">You haven't minted or acquired any digital artifacts yet. Begin your journey in the Creator Studio.</p>
                    </div>
                    <div className="relative z-10">
                       <Link to="/studio/mint">
                          <button className="btn-primary !px-12 !py-5 text-lg group">
                             Initialize Studio <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform inline" />
                          </button>
                       </Link>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Artifact Configuration"
      >
        {selectedNFT && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-2">
             <div className="space-y-8">
                <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/[0.05] aspect-square shadow-2xl bg-[#02050E]">
                  <img
                    src={convertIpfsToPinata(selectedNFT.image_url)}
                    alt={selectedNFT.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                   <h4 className="text-3xl font-black text-white tracking-tight">{selectedNFT.name}</h4>
                   <div className="flex items-center gap-3 text-slate-500">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 py-1 px-3 rounded-lg"># {selectedNFT.serial_number}</div>
                      <div className="text-[10px] font-mono tracking-tighter truncate max-w-[200px]">MIRROR_NODE: {selectedNFT.id}</div>
                   </div>
                </div>
             </div>

             <div className="flex flex-col justify-between py-2">
                <div className="space-y-10">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                         <Tag size={14} className="text-blue-500" /> Listing Valuation (ℏ)
                      </label>
                      <div className="relative group">
                         <input
                           type="text"
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}
                           className="w-full bg-[#030712] border border-white/10 rounded-2xl px-8 py-5 font-mono text-white text-2xl outline-none focus:border-blue-500/50 transition-all shadow-inner"
                           placeholder="0.00"
                         />
                         <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-700 font-black">ℏ</div>
                      </div>
                      <div className="flex items-start gap-2 text-slate-500">
                         <Info size={12} className="mt-0.5" />
                         <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">HBAR conversion occurs at protocol checkout level.</p>
                      </div>
                   </div>

                   <div className="glass-card p-8 rounded-3xl border-white/[0.05] space-y-4 shadow-xl bg-[#040A1A]">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                         <span className="text-slate-500">Transmission Fee</span>
                         <span className="text-white">2.50%</span>
                      </div>
                      <div className="w-full h-px bg-white/5"></div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                         <span className="text-slate-500">HTS Provenance</span>
                         <span className="text-green-500 flex items-center gap-1.5 border border-green-500/10 bg-green-500/5 px-2 py-0.5 rounded-lg">
                            <ShieldCheck size={10} /> Verified
                         </span>
                      </div>
                   </div>
                </div>

                <div className="pt-10 flex flex-col sm:flex-row gap-4">
                   <button
                     onClick={listNFT}
                     className="btn-primary flex-1 !py-6 text-lg relative overflow-hidden group"
                   >
                     <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                     <span className="relative z-10 flex items-center justify-center gap-2">
                        Execute Listing <Tag size={20} />
                     </span>
                   </button>
                   <button
                     onClick={() => setIsModalOpen(false)}
                     className="btn-glass !px-10 border border-white/5 hover:border-white/10"
                   >
                     Cancel
                   </button>
                </div>
             </div>
          </div>
        )}
      </Modal>
      <Footer />
    </div>
  );
};

export default MyNFTs;
