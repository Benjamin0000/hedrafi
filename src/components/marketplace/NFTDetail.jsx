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
  useSignAndExecuteTransaction
} from "@buidlerlabs/hashgraph-react-wallets";
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import { checkTokenAssociation } from '../../helpers';
import { toast } from 'react-toastify';
import { ArrowLeft, FileText, Sparkles, ShieldCheck, Activity, Info, Layers, Tag, Wallet, CheckCircle } from 'lucide-react';

const marketplaceContract = process.env.REACT_APP_MARKETPLACE_CONTRACT; 
const API_URL = process.env.REACT_APP_API_URL; 

const NFTDetail = () => {
  const { isConnected , signer } = useWallet(HWCConnector);
  const { data: accountId } = useAccountId({ autoFetch: isConnected });
  const { writeContract } = useWriteContract();
  const { associateTokens } = useAssociateTokens();
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });
  const { approve } = useApproveTokenAllowance(); 

  const [nft, setNft] = useState({});
  const [creator, setCreator] = useState(null);
  const [owner, setOwner] = useState('---');
  const [loadingItem, setLoadingItem] = useState(true);
  const { tokenId, serialNumber } = useParams();

  const nftTokenContract = TokenId.fromString(tokenId).toEvmAddress();
  const nftTokenContractH = TokenId.fromString(tokenId); 


  const approveHbar = async (amountInHbar) => {
    if (!isConnected || !signer) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      // 1. Create the HBAR Approval Transaction
      const transaction = new AccountAllowanceApproveTransaction()
        .approveHbarAllowance(
          signer.getAccountId(), // Owner (The user)
          marketplaceContract,   // Spender (The Marketplace)
          Hbar.from(amountInHbar) // Amount
        )
        .freezeWithSigner(signer); // Freeze it to prepare for signing

      // 2. Execute directly via the signer
      const response = await (await transaction).executeWithSigner(signer);

      return true; 
      
      // 3. Get the receipt to confirm on-chain success
      // const receipt = (await response).getReceiptWithSigner(signer);
      console.log("response")
      console.log(response)
      console.log("receipt")
      // console.log(receipt)
      
      // if(receipt.status.toString() === "SUCCESS") {
      //     toast.success("HBAR Allowance approved!");
      //     return response.transactionId.toString();
      // }
    } catch (e) {
      return true; 
      // console.error("HBAR Approval Error:", e);
      // toast.error("HBAR Approval failed");
    }
  };


  useEffect(() => {
    // Ensure we have the params from the URL (React Router)
    if (!tokenId || !serialNumber) return;

    const loadNFTData = async () => {
      setLoadingItem(true);
      try {
        // 1. Fetch Marketplace Listing Data (Price, Listing ID, etc.)
        // Assuming your API can find a listing by token and serial
        const apiRes = await fetch(`${API_URL}/api/nft-listing/${tokenId}/${serialNumber}`);
        const listingData = await apiRes.json();

        // 2. Fetch Real-time On-Chain Data from Mirror Node
        const mirrorRes = await fetch(
          `https://mainnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}/nfts/${serialNumber}`
        );
        const onChainData = await mirrorRes.json();

        // 3. Decode Metadata (Base64 -> IPFS Link)
        const decodedMetadataUri = atob(onChainData.metadata);
        
        // 4. Fetch the actual JSON from IPFS to get Name/Image/Attributes
        // (Using the helper you already have or a direct fetch)
        const ipfsRes = await fetch(convertIpfsToPinata(decodedMetadataUri));
        const metadataJson = await ipfsRes.json();

        // 5. Combine everything into your 'nft' state
        setNft({
          ...listingData,         // id (database), price, seller
          ...metadataJson,        // name, image_url, description, attributes
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

  // Creator/Owner ID Conversion Effect
  useEffect(() => {
    if (!nft?.owner) return;

    const resolveAccounts = async () => {
      try {
        // If your 'nft' object has 'seller' from DB and 'owner' from Mirror Node
        const ownerID = nft.owner;
        setOwner(ownerID);
        
        if (nft.seller) {
          const creatorID = await evmToHederaAccount(nft.seller);
          setCreator(creatorID);
        }
      } catch (e) {
        console.warn("Account resolution failed:", e);
      }
    };

    resolveAccounts();
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

    const transactionIdOrHash = await approveHbar(nft.price);


    if(!transactionIdOrHash){
        toast.error("Approval failed");
        return; 
    }

    const txHash = await writeContract({
      contractId: ContractId.fromString(marketplaceContract),
      abi: marketplaceABI,
      functionName: "buyNFT",
      args: [
        '0x'+nftTokenContract,
        nft.serial_number,
      ],
      metaArgs: { gas: 1_200_000 }
    });
    console.log("buy tx:", txHash);
    toast.success('Item purchased');
    // finalizeBuy(nft.id, evmAddress);
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
                    src={convertIpfsToPinata(nft?.image)} 
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
                      <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest py-1.5 px-3 border border-slate-800 rounded-full">Mirror_Node: {nft.id}...</div>
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
                           {Number(nft.price).toFixed(2)} ℏ
                        </div>
                        <div className="text-lg text-slate-600 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                           {/* HRT REWARD TOKEN <Info size={14} /> */}
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
                     { label: 'Custody', value: owner, icon: Wallet, color: 'text-blue-400', mono: true },
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