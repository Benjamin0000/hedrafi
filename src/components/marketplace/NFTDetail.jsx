import { Link, useParams } from 'react-router-dom';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import { ContractId } from "@hashgraph/sdk";
import { useState, useEffect } from 'react';
import { convertIpfsToPinata, evmContractToHederaId, evmToHederaAccount, finalizeBuy } from "../../lib/marketplace"
import marketplaceABI from "../../ABIs/marketplaceABI.json";
import { useWriteContract, useAssociateTokens, useAccountId,useEvmAddress, useWallet, useApproveTokenAllowance } from "@buidlerlabs/hashgraph-react-wallets";
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import { checkTokenAssociation } from '../../helpers';
import { toast } from 'react-toastify';
import { ArrowLeft, FileText, Sparkles, ShieldCheck, Activity, Info, Layers, Tag, Wallet, CheckCircle } from 'lucide-react';

const marketplaceContract = process.env.REACT_APP_MARKETPLACE_CONTRACT; 
const nftTokenContract = process.env.REACT_APP_NFT_CONTRACT_EVM;
const nftTokenContractH = process.env.REACT_APP_NFT_CONTRACT;  
const API_URL = process.env.REACT_APP_API_URL; 
const hrtToken = process.env.REACT_APP_HTS_REWARD_TOKEN; 

const NFTDetail = () => {
  const { isConnected } = useWallet(HWCConnector);
  const { data: accountId } = useAccountId({ autoFetch: isConnected });
  const { writeContract } = useWriteContract();
  const { associateTokens } = useAssociateTokens();
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });
  const { approve } = useApproveTokenAllowance(); 

  const [nft, setNft] = useState({}); 
  const [creator, setCreator] = useState(null);
  const [owner, setOwner] = useState('---');
  const [loadingItem, setLoadingItem] = useState(true);  
  const { id } = useParams();

  useEffect(() => {
    if(!id) return; 
    const loadNFT = async () => {
      try {
        const res = await fetch(`${API_URL}/api/nft/${id}`);
        const data = await res.json();
        setNft(data);
      } catch (e) {
        console.error(e);
      }
    };
    loadNFT();
  }, [id, API_URL]);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        if(nft && nft.creator){
          const creatorID = await evmToHederaAccount(nft.creator);
          setCreator(creatorID);
        }
      } catch (e) {
        console.warn("Creator not found:", e);
      }
    };

    const fetchOwner = async () => {
      try {
        if(nft && nft.owner){
          const ownerID = await evmToHederaAccount(nft.owner);
          setOwner(ownerID);
        }
      } catch (e) {
        console.warn("Owner not found:", e);
      }
    };

    fetchOwner();
    fetchCreator();

    if(nft?.id){
      setLoadingItem(false); 
    }
  }, [nft]);

  const buyOnChain = async () => {
    const associated = await checkTokenAssociation(accountId, nftTokenContractH);

    if (!associated) {
      try {
        await associateTokens([nftTokenContractH]);
        toast.success('NFT token associated!');
      } catch (e) {
        console.error(e);
        return toast.error('Failed to associate HTS token');
      }
    }

    const TOKENS = [{ tokenId: hrtToken, amount: nft.price * 10**8 }];
    const SPENDER = marketplaceContract;
    const transactionIdOrHash = await approve(TOKENS, SPENDER);

    if(!transactionIdOrHash){
        toast.error("Approval failed");
        return; 
    }

    const txHash = await writeContract({
      contractId: ContractId.fromString(marketplaceContract),
      abi: marketplaceABI,
      functionName: "buyNFT",
      args: [
        nftTokenContract,
        nft.serial_number,
      ],
      metaArgs: { gas: 1_200_000 }
    });
    console.log("buy tx:", txHash);
    finalizeBuy(nft.id, evmAddress);
  };

  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container-main">
          <Link to="/marketplace" className="inline-flex items-center gap-3 text-slate-500 hover:text-white mb-12 group transition-all">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:text-cyber-blue transition-all border border-white/5">
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Gallery</span>
          </Link>

          {loadingItem ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-8">
               <div className="w-20 h-20 border-4 border-blue-600/20 border-t-cyber-blue rounded-full animate-spin shadow-[0_0_20px_rgba(0,240,255,0.2)]"></div>
               <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 animate-pulse">Retrieving Metadata</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              {/* Left: Premium Preview */}
              <div className="lg:col-span-7 space-y-12">
                <div className="glass-card rounded-[3.5rem] border-white/[0.05] overflow-hidden shadow-2xl relative group bg-[#02050E]">
                  <div className="absolute inset-0 bg-blue-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  <img 
                    src={convertIpfsToPinata(nft?.image_url)} 
                    alt={nft?.name}
                    className="w-full aspect-square object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                  <div className="absolute top-8 left-8">
                     <div className="bg-brand-base/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                        <Layers size={16} className="text-cyber-blue" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">GENESIS_TOKEN_HTS</span>
                     </div>
                  </div>
                </div>

                {/* Description Glass Card */}
                <div className="glass-card p-10 md:p-14 rounded-[3.5rem] border-white/[0.05] space-y-8 bg-[#040A1A] shadow-2xl">
                   <div className="flex items-center gap-5 border-b border-white/5 pb-8">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/5 flex items-center justify-center border border-white/5">
                         <FileText size={24} className="text-blue-500" />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight">Provenance & Technical Insight</h3>
                   </div>
                   <p className="text-slate-400 text-lg leading-relaxed font-medium">
                      {nft?.description || "Institutional-grade digital medium with cryptographic provenance secured on the Hedera hashgraph."}
                   </p>
                </div>
              </div>

              {/* Right: Technical Specifications & Actions */}
              <div className="lg:col-span-5 space-y-10">
                <div className="space-y-4">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
                      <ShieldCheck size={14} /> Certified Asset
                   </div>
                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                      {nft?.name}
                   </h1>
                   <div className="flex items-center gap-4 pt-2">
                      <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse"></div>
                         <span className="text-[10px] text-cyber-blue font-black uppercase tracking-widest leading-none">Serial #{nft.serial_number}</span>
                      </div>
                      <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest py-1.5 px-3 border border-slate-800 rounded-full">Mirror_Node: {nft.id?.substring(0, 10)}...</div>
                   </div>
                </div>

                {/* Price & Purchase Logic */}
                <div className="glass-card p-12 rounded-[3.5rem] border-white/[0.05] relative overflow-hidden group shadow-2xl bg-[#02050E]">
                   <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/[0.03] blur-3xl rounded-full"></div>
                   <div className="relative z-10 space-y-10">
                      <div className="flex justify-between items-center">
                         <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                            <Tag size={14} /> Valuation Output
                         </div>
                         <div className="text-[10px] font-mono font-bold text-slate-600 bg-white/5 px-3 py-1 rounded-lg">HTS_NATIVE</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-6xl font-mono font-black text-white tracking-tighter">
                           {Number(nft.price).toFixed(2)}
                        </div>
                        <div className="text-lg text-slate-600 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                           HRT REWARD TOKEN <Info size={14} />
                        </div>
                      </div>

                      {nft?.owner?.toLowerCase() !== evmAddress?.toLowerCase() ? (
                        <button
                          onClick={buyOnChain}
                          className="btn-primary w-full !py-7 text-xl group relative overflow-hidden shadow-blue-500/20 shadow-xl"
                        >
                          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                          <span className="relative z-10 flex items-center justify-center gap-3 font-black tracking-tight">
                             Acquire Artifact <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                          </span>
                        </button>
                      ) : (
                        <div className="w-full py-7 rounded-[2rem] bg-green-500/5 border border-green-500/20 flex items-center justify-center gap-3">
                           <CheckCircle size={20} className="text-green-500" />
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500">Asset In Your Custody</span>
                        </div>
                      )}
                   </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-5">
                   {[
                     { label: 'Network', value: 'Hedera Mainnet', icon: Activity, color: 'text-white' },
                     { label: 'Protocol', value: 'HTS Standard', icon: Layers, color: 'text-white' },
                     { label: 'Custody', value: owner?.substring(0, 10) + '...', icon: Wallet, color: 'text-blue-400', mono: true },
                     { label: 'Trust', value: 'Verified Contract', icon: ShieldCheck, color: 'text-green-400' }
                   ].map((item, idx) => (
                     <div key={idx} className="glass-card p-6 rounded-3xl border-white/[0.05] space-y-3 bg-[#040A1A] hover:border-white/10 transition-colors shadow-lg">
                        <div className="flex items-center gap-2">
                           <item.icon size={12} className="text-slate-600" />
                           <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">{item.label}</div>
                        </div>
                        <div className={`text-xs font-black truncate ${item.color} ${item.mono ? 'font-mono' : ''}`}>{item.value}</div>
                     </div>
                   ))}
                </div>

                {/* Attributes Section */}
                {nft?.attributes && nft.attributes.length > 0 && (
                  <div className="glass-card p-10 rounded-[3.5rem] border-white/[0.05] space-y-8 bg-[#040A1A] shadow-2xl">
                     <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 flex items-center gap-2">
                        <Sparkles size={14} className="text-indigo-500" /> Coded Attributes
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        {nft.attributes.map((attr, idx) => (
                          <div key={idx} className="bg-[#030712] border border-white/5 p-5 rounded-2xl space-y-2 hover:bg-[#060B1C] hover:border-blue-500/20 transition-all shadow-inner group/attr">
                             <div className="text-slate-600 text-[8px] font-black uppercase tracking-[0.2em] leading-none group-hover/attr:text-blue-500 transition-colors">{attr.trait_type}</div>
                             <div className="text-white text-sm font-black truncate tracking-tight">{attr.value}</div>
                          </div>
                        ))}
                     </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NFTDetail;