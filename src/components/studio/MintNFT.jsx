import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import { ContractId } from "@hashgraph/sdk";
import { useWriteContract, useEvmAddress, useWallet, useAssociateTokens, useAccountId } from "@buidlerlabs/hashgraph-react-wallets";
import marketplaceABI from "../../ABIs/marketplaceABI.json";
import { finalizeMint } from "../../lib/marketplace"
import { toast } from 'react-toastify';
import { checkTokenAssociation } from '../../helpers';
import { ArrowLeft, Sparkles, Upload, Image as ImageIcon, FileText, Settings, CheckCircle, Zap, X, PlusCircle, ShieldCheck } from 'lucide-react';

const marketplaceContract = process.env.REACT_APP_MARKETPLACE_CONTRACT; 
const nftTokenContract = process.env.REACT_APP_NFT_CONTRACT_EVM; 
const nftTokenContractH = process.env.REACT_APP_NFT_CONTRACT;  
const API_URL = process.env.REACT_APP_API_URL; 

const MintNFT = () => {
  const { isConnected } = useWallet();
  const { writeContract } = useWriteContract();
  const { associateTokens } = useAssociateTokens();
  const { data: accountId } = useAccountId({ autoFetch: isConnected });
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });

  const [attributes, setAttributes] = useState([
    { trait_type: "", value: "" }
  ]);

  const [minting, setMinting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    externalLink: '',
    supply: '1',
   //  royalty: '10',
    owner: evmAddress
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addAttribute = () => setAttributes(prev => [...prev, { trait_type: '', value: '' }]);
  const removeAttribute = (index) => setAttributes(prev => prev.filter((_, i) => i !== index));
  const updateAttribute = (index, field, value) => {
    const updated = [...attributes];
    updated[index][field] = value;
    setAttributes(updated);
  };

  const formatAttributes = () => attributes.filter(attr => attr.trait_type.trim() && attr.value.trim());

  const mintOnChain = async (uris, metadata_url) => {
    const associated = await checkTokenAssociation(accountId, nftTokenContractH);
    if (!associated) {
      try {
        await associateTokens([nftTokenContractH]);
        toast.success('NFT token associated!');
      } catch (e) {
        return toast.error('Failed to associate HTS token');
      }
    }

    const txHash = await writeContract({
      contractId: ContractId.fromString(marketplaceContract),
      abi: marketplaceABI,
      functionName: "mintNFTs",
      args: [nftTokenContract, uris],
      metaArgs: { gas: 1_200_000 }
    });
    toast.success('Minting successful');
   //  finalizeMint(txHash, metadata_url);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!uploadedFile) newErrors.file = 'Upload required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMint = async () => {
    if (!validateForm()) return;
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('image', uploadedFile);
    form.append('attributes', JSON.stringify(formatAttributes()));
    form.append('owner', evmAddress);
   //  form.append('royalty', formData.royalty);

    try{
      setMinting(true);
      const res = await fetch(`${API_URL}/api/upload-metadata`, { method: 'POST', body: form });
      const { metadata_url } = await res.json();
      const uris = Array(parseInt(formData.supply)).fill(metadata_url);
      await mintOnChain(uris, metadata_url);
    }catch(e){
      toast.error("Minting failed");
    } finally{
      setMinting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container-main flex flex-col gap-12 md:gap-16">
           {/* Header Section */}
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
              <div className="space-y-4 max-w-3xl">
                 <Link to="/studio" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-all group mb-4">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Studio</span>
                 </Link>
                 <div className="w-12 h-1 bg-cyber-blue rounded-full mb-6"></div>
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
                    Mint <span className="text-gradient">Artifact</span>
                 </h1>
                 <p className="text-slate-400 text-lg font-medium leading-relaxed">
                    Deploy your high-fidelity asset to the Hedera network with institutional-grade HTS protocols and verifiable provenance.
                 </p>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
              {/* Creator Forms */}
              <div className="lg:col-span-7 space-y-10">
                 {/* Upload Zone */}
                 <div className="glass-card p-2 rounded-[3.5rem] border-white/[0.05] relative group shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div 
                      className={`relative z-10 border-2 border-dashed rounded-[3rem] p-12 md:p-20 text-center cursor-pointer transition-all duration-500 ${
                        errors.file ? 'border-red-500/30 bg-red-500/5' : 'border-white/10 hover:border-blue-500/40 bg-[#040A1A]/50'
                      }`}
                      onClick={() => document.getElementById('file-upload').click()}
                    >
                      {previewUrl ? (
                         <div className="space-y-6">
                            <img src={previewUrl} alt="Preview" className="max-h-[400px] mx-auto rounded-[2rem] shadow-2xl border border-white/10" />
                            <div className="flex justify-center items-center gap-2 text-[10px] font-black text-cyber-blue uppercase tracking-[0.2em] bg-blue-500/5 py-3 px-6 rounded-full inline-flex border border-blue-500/10">
                               <Upload size={14} /> Replace High Fidelity Asset
                            </div>
                         </div>
                      ) : (
                         <div className="space-y-6 py-10">
                            <div className="w-24 h-24 bg-blue-600/5 rounded-3xl flex items-center justify-center mx-auto border border-white/5 group-hover:border-blue-500/30 transition-colors shadow-inner">
                               <ImageIcon size={40} className="text-blue-500 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="space-y-3">
                               <p className="text-white font-black uppercase tracking-[0.2em] text-sm">Deploy Digital Medium</p>
                               <p className="text-[10px] text-slate-500 font-bold tracking-[0.25em]">DROP FILE OR INITIALIZED EXPLORER</p>
                            </div>
                         </div>
                      )}
                      <input id="file-upload" type="file" className="hidden" accept="image/*,video/*,audio/*" onChange={handleFileUpload} />
                    </div>
                 </div>

                 {/* Configuration Form */}
                 <div className="glass-card p-10 md:p-12 rounded-[3.5rem] border-white/[0.05] space-y-12 shadow-2xl">
                    <div className="space-y-10">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                             <FileText size={14} className="text-blue-500" /> Identifier & Naming
                          </label>
                          <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="ARTIFACT_REVISION_01"
                            className="bg-[#030712] border border-white/10 w-full px-8 py-5 rounded-2xl font-mono text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-800 text-lg shadow-inner"
                          />
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                             <Settings size={14} className="text-indigo-500" /> Description & Logic
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Engineering notes and creative intent..."
                            rows="4"
                            className="bg-[#030712] border border-white/10 w-full px-8 py-5 rounded-2xl font-medium text-white outline-none focus:border-blue-500/50 transition-all resize-none shadow-inner"
                          />
                       </div>

                       <div className="space-y-8">
                          <div className="flex justify-between items-center">
                             <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Atomic Attributes</label>
                             <button onClick={addAttribute} className="text-[10px] font-black text-cyber-blue hover:text-white transition-colors flex items-center gap-2">
                                <PlusCircle size={14} /> ADD DATA NODE
                             </button>
                          </div>
                          <div className="space-y-4">
                             {attributes.map((attr, i) => (
                                <div key={i} className="flex flex-col sm:flex-row gap-4 group animate-fade-in">
                                   <input
                                      placeholder="PROPERTY"
                                      value={attr.trait_type}
                                      onChange={(e) => updateAttribute(i, 'trait_type', e.target.value)}
                                      className="flex-1 bg-[#030712] border border-white/5 px-6 py-4 rounded-xl text-xs font-black text-white outline-none focus:border-blue-500/50 shadow-inner"
                                   />
                                   <input
                                      placeholder="VALUE"
                                      value={attr.value}
                                      onChange={(e) => updateAttribute(i, 'value', e.target.value)}
                                      className="flex-1 bg-[#030712] border border-white/5 px-6 py-4 rounded-xl text-xs font-black text-white outline-none focus:border-blue-500/50 shadow-inner"
                                   />
                                   <button onClick={() => removeAttribute(i)} className="w-12 h-12 flex items-center justify-center bg-red-500/5 border border-red-500/10 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                      <X size={16} />
                                   </button>
                                </div>
                             ))}
                          </div>
                       </div>

                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                          {/* <div className="space-y-4">
                             <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Emission Supply</label>
                             <div className="bg-[#030712] border border-white/5 px-8 py-5 rounded-2xl text-slate-700 font-mono text-lg shadow-inner">001 (Unique)</div>
                          </div> */}
                          {/* <div className="space-y-4">
                             <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Royalty Partition (%)</label>
                             <div className="relative group/royalty">
                                <input
                                  type="number"
                                  name="royalty"
                                  value={formData.royalty}
                                  onChange={handleInputChange}
                                  className="bg-[#030712] border border-white/10 w-full px-8 py-5 rounded-2xl font-mono text-white outline-none focus:border-blue-500/50 transition-all text-lg shadow-inner"
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700 font-black">%</div>
                             </div>
                          </div> */}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Real-time Preview */}
              <div className="lg:col-span-5">
                 <div className="lg:sticky lg:top-32 space-y-8">
                    <div className="glass-card p-10 rounded-[3.5rem] border-white/[0.05] space-y-10 shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl"></div>
                       <h3 className="text-xl font-black text-white border-b border-white/5 pb-8 tracking-tight flex items-center gap-3">
                          <CheckCircle size={20} className="text-cyber-blue" /> Final Deployment
                       </h3>
                       
                       {/* Mini Preview Card */}
                       <div className="glass-card rounded-[2.5rem] border-white/10 overflow-hidden bg-[#02050E] flex flex-col items-center group/preview relative">
                          <div className="w-full aspect-square bg-[#040A1A] flex items-center justify-center relative overflow-hidden">
                             {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-1000 group-hover/preview:scale-110" />
                             ) : (
                                <div className="text-center space-y-3 opacity-10 group-hover/preview:opacity-20 transition-opacity">
                                   <ImageIcon size={64} className="mx-auto" />
                                   <div className="text-[8px] font-black uppercase tracking-[0.4em]">Node_Standby</div>
                                </div>
                             )}
                             <div className="absolute top-6 right-6">
                                <span className="bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 text-cyber-blue text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg animate-pulse">Draft_Mode</span>
                             </div>
                          </div>
                          <div className="p-10 w-full space-y-3 text-center">
                             <h4 className="text-2xl font-black text-white truncate tracking-tight">{formData.name || 'UNLISTED_ASSET'}</h4>
                             <div className="flex justify-center items-center gap-4 text-slate-500">
                                <div className="text-[10px] font-black uppercase tracking-widest">{formData.royalty}% Allocation</div>
                                <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                                <div className="text-[10px] font-black uppercase tracking-widest">HTS Native</div>
                             </div>
                          </div>
                       </div>

                       <div className="space-y-6 pt-4">
                          <button
                            onClick={handleMint}
                            disabled={minting || !isConnected}
                            className={`btn-primary w-full !py-6 text-xl group relative overflow-hidden ${(!isConnected) ? 'opacity-50 grayscale' : ''}`}
                          >
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            {minting ? (
                               <div className="relative z-10 flex items-center justify-center gap-4">
                                  <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                                  <span className="uppercase tracking-widest font-black text-sm">TRANSMITTING...</span>
                               </div>
                            ) : (
                               <span className="relative z-10 flex items-center justify-center gap-3 font-black tracking-tight">
                                  EXECUTE PROTOCOL <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                               </span>
                            )}
                          </button>
                          {!isConnected && (
                             <div className="flex items-center justify-center gap-2 bg-red-500/5 py-4 rounded-2xl border border-red-500/10">
                                <Zap size={14} className="text-red-500 animate-pulse" />
                                <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">Authentication Required</p>
                             </div>
                          )}
                       </div>
                    </div>

                    {/* Network Insight */}
                    <div className="glass-card p-6 rounded-3xl border-white/[0.05] flex items-center gap-5 shadow-xl relative overflow-hidden bg-[#040A1A]">
                       <div className="w-12 h-12 rounded-2xl bg-green-500/5 flex items-center justify-center border border-green-500/10">
                          <ShieldCheck size={24} className="text-green-500" />
                       </div>
                       <div>
                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Network Transmission Fee</div>
                          <div className="text-lg font-mono font-black text-white">~0.012 HBAR <span className="text-[10px] text-green-500 ml-1">OPTIMIZED</span></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MintNFT;