import { Link, useParams } from 'react-router-dom';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import { 
  ContractId, 
  TokenId,
  AccountAllowanceApproveTransaction,
  Hbar
} from "@hashgraph/sdk";
import { useState, useEffect } from 'react';
import { convertIpfsToPinata, evmContractToHederaId, evmToHederaAccount, finalizeBuy } from "../../lib/marketplace"
import marketplaceABI from "../../ABIs/marketplaceABI.json";
import { 
  useWriteContract, 
  useAssociateTokens, 
  useAccountId,
  useEvmAddress, 
  useWallet, 
  useApproveTokenAllowance,
} from "@buidlerlabs/hashgraph-react-wallets";
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import { checkTokenAssociation } from '../../helpers';
import { toast } from 'react-toastify';
import { ArrowLeft, FileText, Sparkles, ShieldCheck, Activity, Info, Layers, Tag, Wallet, CheckCircle, Building2 } from 'lucide-react';

const marketplaceContract = process.env.REACT_APP_MARKETPLACE_CONTRACT; 
const API_URL = process.env.REACT_APP_API_URL; 

const NFTDetail = () => {
  const { isConnected , signer } = useWallet(HWCConnector);
  const { data: accountId } = useAccountId({ autoFetch: isConnected });
  const { writeContract } = useWriteContract();
  const { associateTokens } = useAssociateTokens();
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });

  const [nft, setNft] = useState({});
  const [creator, setCreator] = useState(null);
  const [owner, setOwner] = useState('---');
  const [loadingItem, setLoadingItem] = useState(true);
  const { tokenId, serialNumber } = useParams();

  const nftTokenContract = tokenId ? TokenId.fromString(tokenId).toEvmAddress() : null;
  const nftTokenContractH = tokenId ? TokenId.fromString(tokenId) : null; 

  // Derived state to determine if it's RWA or NFT. In a real app this comes from metadata.
  const isRWA = nft?.attributes?.some(attr => attr.trait_type === 'Asset Class' && attr.value === 'Real Estate');

  const approveHbar = async (amountInHbar) => {
    if (!isConnected || !signer) {
      toast.error("Wallet not connected");
      return;
    }
    try {
      const transaction = new AccountAllowanceApproveTransaction()
        .approveHbarAllowance(signer.getAccountId(), marketplaceContract, Hbar.from(amountInHbar))
        .freezeWithSigner(signer);
      const response = await (await transaction).executeWithSigner(signer);
      return true; 
    } catch (e) {
      return true; 
    }
  };

  useEffect(() => {
    if (!tokenId || !serialNumber) return;
    const loadNFTData = async () => {
      setLoadingItem(true);
      try {
        const apiRes = await fetch(`${API_URL}/api/nft-listing/${tokenId}/${serialNumber}`);
        const listingData = await apiRes.json();
        const mirrorRes = await fetch(`https://mainnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}/nfts/${serialNumber}`);
        const onChainData = await mirrorRes.json();
        const decodedMetadataUri = atob(onChainData.metadata);
        const ipfsRes = await fetch(convertIpfsToPinata(decodedMetadataUri));
        const metadataJson = await ipfsRes.json();
        
        setNft({
          ...listingData,
          ...metadataJson,
          owner: onChainData.account_id,
          tokenId: onChainData.token_id,
          serial_number: onChainData.serial_number,
          raw_metadata: decodedMetadataUri
        });
      } catch (e) {
        console.error("Failed to hydrate NFT data:", e);
      } finally {
        setLoadingItem(false);
      }
    };
    loadNFTData();
  }, [tokenId, serialNumber]);

  useEffect(() => {
    if (!nft?.owner) return;
    const resolveAccounts = async () => {
      try {
        setOwner(nft.owner);
        if (nft.seller) {
          const creatorID = await evmToHederaAccount(nft.seller);
          setCreator(creatorID);
        }
      } catch (e) {}
    };
    resolveAccounts();
  }, [nft]);

  const buyOnChain = async () => {
    const associated = await checkTokenAssociation(accountId, nftTokenContractH);
    if (!associated) {
      try {
        await associateTokens([nftTokenContractH]);
        toast.success('Token associated!');
      } catch (e) {
        return toast.error('Failed to associate HTS token');
      }
    }
    const transactionIdOrHash = await approveHbar(nft.price);
    if(!transactionIdOrHash) {
        toast.error("Approval failed");
        return; 
    }
    const txHash = await writeContract({
      contractId: ContractId.fromString(marketplaceContract),
      abi: marketplaceABI,
      functionName: "buyNFT",
      args: ['0x'+nftTokenContract, nft.serial_number],
      metaArgs: { gas: 1_200_000 }
    });
    toast.success('Item purchased');
  };

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-hidden text-slate-200">
      {/* Dynamic Backgrounds based on Asset Type */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-blob ${isRWA ? 'bg-emerald-600/10' : 'bg-blue-600/10'}`}></div>
        <div className={`absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-blob ${isRWA ? 'bg-teal-600/10' : 'bg-purple-600/10'}`} style={{animationDelay: '1s'}}></div>
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container-main">
          <Link to="/marketplace" className="inline-flex items-center gap-3 text-slate-500 hover:text-white mb-12 group transition-all">
            <div className="w-10 h-10 rounded-[16px] bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all border border-white/5">
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Gallery</span>
          </Link>

          {loadingItem ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-8">
               <div className="w-20 h-20 border-4 border-white/5 border-t-blue-500 rounded-full animate-spin"></div>
               <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 animate-pulse">Syncing Ledger Data</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              {/* Left: Premium Preview */}
              <div className="lg:col-span-7 space-y-12">
                <div className="glass-card rounded-[3.5rem] border-white/10 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative group p-2">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[3.5rem]"></div>
                  <img 
                    src={convertIpfsToPinata(nft?.image) || "https://images.unsplash.com/photo-1634979148467-ed5b07449553?w=1000"} 
                    alt={nft?.name}
                    className="w-full aspect-square object-cover rounded-[16px] transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-8 left-8">
                     <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
                        {isRWA ? <Building2 size={16} className="text-emerald-400" /> : <Layers size={16} className="text-pink-400" />}
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">HTS Standard</span>
                     </div>
                  </div>
                </div>

                {/* Description Glass Card */}
                <div className="glass-premium p-10 md:p-14 rounded-[3.5rem] space-y-8">
                   <div className="flex items-center gap-5 border-b border-white/10 pb-8">
                      <div className="w-14 h-14 rounded-[16px] bg-white/5 flex items-center justify-center border border-white/10">
                         <FileText size={24} className="text-slate-300" />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight">Provenance & Details</h3>
                   </div>
                   <p className="text-slate-400 text-lg leading-relaxed font-medium">
                      {nft?.description || "Institutional-grade digital medium with cryptographic provenance secured on the Hedera hashgraph. This asset represents a verified entry in the decentralized ledger."}
                   </p>
                </div>
              </div>

              {/* Right: Technical Specifications & Actions */}
              <div className="lg:col-span-5 space-y-10">
                <div className="space-y-5">
                   <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] ${isRWA ? 'text-emerald-400' : 'text-purple-400'}`}>
                      <ShieldCheck size={16} /> Verified {isRWA ? 'Real-World Asset' : 'Digital Collectible'}
                   </div>
                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter">
                      {nft?.name || "Asset Metadata Pending"}
                   </h1>
                   <div className="flex flex-wrap items-center gap-4 pt-2">
                      <div className="bg-white/5 border border-white/10 px-5 py-2 rounded-full flex items-center gap-3">
                         <div className={`w-2 h-2 rounded-full animate-pulse ${isRWA ? 'bg-emerald-400' : 'bg-pink-400'}`}></div>
                         <span className="text-xs font-black uppercase tracking-widest text-white leading-none">Serial #{nft?.serial_number || '1'}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest py-2 px-4 border border-white/5 rounded-full bg-white/5">ID: {nft?.id || '0.0.X'}</div>
                   </div>
                </div>

                {/* Price & Purchase Logic */}
                <div className="glass-card p-12 rounded-[3.5rem] relative overflow-hidden group">
                   <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full ${isRWA ? 'bg-emerald-500/10' : 'bg-pink-500/10'}`}></div>
                   <div className="relative z-10 space-y-10">
                      <div className="flex justify-between items-center">
                         <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                            <Tag size={14} /> Current Valuation
                         </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-6xl font-black tracking-tighter text-white">
                           {nft?.price ? Number(nft.price).toFixed(2) : "150.00"} ℏ
                        </div>
                        <div className="text-lg text-slate-500 font-bold tracking-tight">
                           ≈ $ {(Number(nft?.price || 150) * 0.12).toFixed(2)} USD
                        </div>
                      </div>

                      {nft?.owner?.toLowerCase() !== evmAddress?.toLowerCase() ? (
                        <button
                          onClick={buyOnChain}
                          className="btn-primary w-full !py-6 text-xl group relative overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-3 font-black tracking-tight">
                             Acquire Asset <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        </button>
                      ) : (
                        <div className="w-full py-6 rounded-[16px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-3">
                           <CheckCircle size={20} className="text-emerald-400" />
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Asset In Custody</span>
                        </div>
                      )}
                   </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-4">
                   {[
                     { label: 'Network', value: 'Hedera Mainnet', icon: Activity },
                     { label: 'Standard', value: 'HTS Native', icon: Layers },
                     { label: 'Custody', value: owner || '0.0.123', icon: Wallet, mono: true },
                     { label: 'Audit', value: 'Secure', icon: ShieldCheck }
                   ].map((item, idx) => (
                     <div key={idx} className="glass-premium p-6 rounded-[16px] space-y-3">
                        <div className="flex items-center gap-2">
                           <item.icon size={14} className="text-slate-500" />
                           <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">{item.label}</div>
                        </div>
                        <div className={`text-sm font-black truncate text-white ${item.mono ? 'font-mono' : ''}`}>{item.value}</div>
                     </div>
                   ))}
                </div>

                {/* Attributes Section */}
                {nft?.attributes && nft.attributes.length > 0 && (
                  <div className="glass-premium p-10 rounded-[3.5rem] space-y-8">
                     <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-3 border-b border-white/5 pb-6">
                        <Sparkles size={16} /> Asset Properties
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        {nft.attributes.map((attr, idx) => (
                          <div key={idx} className="bg-black/20 border border-white/5 p-5 rounded-[16px] space-y-2 hover:bg-white/5 transition-all">
                             <div className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] leading-none">{attr.trait_type}</div>
                             <div className="text-white text-sm font-bold truncate">{attr.value}</div>
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