import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../shared/Header"
import { ContractId } from "@hashgraph/sdk";
import { useWriteContract, useEvmAddress, useWallet, useAssociateTokens, useAccountId } from "@buidlerlabs/hashgraph-react-wallets";
import marketplaceABI from "../../ABIs/marketplaceABI.json";
import { finalizeMint } from "../../lib/marketplace"
import { toast } from 'react-toastify';
import { checkTokenAssociation } from '../../helpers';

const marketplaceContract = process.env.REACT_APP_MARKETPLACE_CONTRACT; 
const nftTokenContract = process.env.REACT_APP_NFT_CONTRACT_EVM; 
const nftTokenContractH = process.env.REACT_APP_NFT_CONTRACT;  
const API_URL = process.env.REACT_APP_API_URL; 

const MintNFT = () => {
  const { isConnected } = useWallet()
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
    royalty: '10',
    owner: evmAddress
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addAttribute = () => {
    setAttributes(prev => [...prev, { trait_type: '', value: '' }]);
  };

  const removeAttribute = (index) => {
    setAttributes(prev => prev.filter((_, i) => i !== index));
  };

  const updateAttribute = (index, field, value) => {
    const updated = [...attributes];
    updated[index][field] = value;
    setAttributes(updated);
  };

  const formatAttributes = () => {
    return attributes
      .filter(attr => attr.trait_type.trim() && attr.value.trim())
      .map(attr => ({
        trait_type: attr.trait_type.trim(),
        value: attr.value.trim()
      }));
  };



  const mintOnChain = async (uris, metadata_url) => {
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

    const txHash = await writeContract({
      contractId: ContractId.fromString(marketplaceContract),
      abi: marketplaceABI,
      functionName: "mintNFTs",
      args: [
        nftTokenContract,
        uris,
        parseInt(formData.royalty) * 100
      ],
      metaArgs: { gas: 1_200_000 }
    });

    // tokenId, metadataUrl, owner
    console.log("Mint tx:", txHash);
    finalizeMint(txHash, metadata_url);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!uploadedFile) newErrors.file = 'Please upload a file';
    if (formData.supply < 1) newErrors.supply = 'Supply must be at least 1';
    if (formData.royalty < 0 || formData.royalty > 50) newErrors.royalty = 'Royalty must be between 0-50%';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMint = async () => {
    if (!validateForm()) return;

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('external_link', formData.externalLink);
    form.append('image', uploadedFile);
    form.append('attributes', JSON.stringify(formatAttributes()));
    form.append('owner', evmAddress);
    form.append('royalty', formData.royalty);

    try{
      setMinting(true)
      const res = await fetch(`${API_URL}/api/upload-metadata`, {
        method: 'POST',
        body: form
      });

      const { metadata_url } = await res.json();

      // repeat url by supply
      const uris = Array(parseInt(formData.supply)).fill(metadata_url);

      console.log("the metadata url")
      console.log(metadata_url)

      await mintOnChain(uris, metadata_url);
    }catch(e){
      setMinting(false)
      toast.error("minting faild");
    } finally{
      setMinting(false)
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-white font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      <Header/>
      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link to="/studio" className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-2 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Studio
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
            Mint NFT
          </h1>
          <p className="text-gray-400">Create your unique digital asset on Hedera</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Upload Zone */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 shadow-xl">
              <label className="block text-sm font-semibold mb-3">Upload File *</label>
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  errors.file ? 'border-red-500/50 bg-red-500/5' : 'border-purple-500/30 hover:border-purple-500/50 bg-gray-900/30'
                }`}
                onClick={() => document.getElementById('file-upload').click()}
              >
                {previewUrl ? (
                  <div className="space-y-3">
                    <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                    <p className="text-sm text-gray-400">{uploadedFile?.name}</p>
                    <button className="text-purple-400 text-sm hover:text-purple-300">Change file</button>
                  </div>
                ) : (
                  <>
                    <div className="text-5xl mb-3">📁</div>
                    <p className="text-gray-300 mb-1">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF, SVG, MP4, MP3 (Max 100MB)</p>
                  </>
                )}
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*,video/*,audio/*"
                onChange={handleFileUpload}
              />
              {errors.file && <p className="text-red-400 text-sm mt-2">{errors.file}</p>}
            </div>

            {/* Metadata Fields */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 shadow-xl space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Cosmic Dragon #1"
                  className={`w-full bg-gray-900/50 border ${errors.name ? 'border-red-500/50' : 'border-purple-500/20'} rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500`}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your NFT..."
                  rows="4"
                  className={`w-full bg-gray-900/50 border ${errors.description ? 'border-red-500/50' : 'border-purple-500/20'} rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500 resize-none`}
                ></textarea>
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* External Link */}
              <div>
                <label className="block text-sm font-semibold mb-2">External Link (Optional)</label>
                <input
                  type="url"
                  name="externalLink"
                  value={formData.externalLink}
                  onChange={handleInputChange}
                  placeholder="https://yoursite.com/item"
                  className="w-full bg-gray-900/50 border border-purple-500/20 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Attributes</label>

                {attributes.map((attr, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Trait type"
                      value={attr.trait_type}
                      onChange={(e) => updateAttribute(i, 'trait_type', e.target.value)}
                      className="w-1/2 bg-gray-900/50 border border-purple-500/20 rounded-lg px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={attr.value}
                      onChange={(e) => updateAttribute(i, 'value', e.target.value)}
                      className="w-1/2 bg-gray-900/50 border border-purple-500/20 rounded-lg px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeAttribute(i)}
                      className="text-red-400 px-2"
                    >✕</button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addAttribute}
                  className="text-purple-400 text-sm mt-2"
                >
                  + Add Attribute
                </button>
              </div>


              {/* Supply & Royalty */}
              <div className="grid grid-cols-2 gap-4">
                {/* <div>
                  <label className="block text-sm font-semibold mb-2">Supply *</label>
                  <input
                    type="number"
                    name="supply"
                    value={formData.supply}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full bg-gray-900/50 border ${errors.supply ? 'border-red-500/50' : 'border-purple-500/20'} rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
                  />
                  {errors.supply && <p className="text-red-400 text-sm mt-1">{errors.supply}</p>}
                </div> */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Royalty % *</label>
                  <input
                    type="number"
                    name="royalty"
                    value={formData.royalty}
                    onChange={handleInputChange}
                    min="0"
                    max="50"
                    className={`w-full bg-gray-900/50 border ${errors.royalty ? 'border-red-500/50' : 'border-purple-500/20'} rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
                  />
                  {errors.royalty && <p className="text-red-400 text-sm mt-1">{errors.royalty}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 shadow-xl sticky top-24">
              <h3 className="text-xl font-bold mb-4">Preview</h3>
              
              {/* NFT Card Preview */}
              <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-purple-500/10 mb-6">
                {previewUrl ? (
                  <img src={previewUrl} alt="NFT Preview" className="w-full aspect-square object-cover" />
                ) : (
                  <div className="w-full aspect-square bg-gray-800/50 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🖼️</div>
                      <p>Upload file to preview</p>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-1">{formData.name || 'NFT Name'}</h4>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{formData.description || 'NFT description will appear here...'}</p>
                  <div className="flex justify-between items-center text-sm">
                    {/* <div>
                      <div className="text-gray-400">Supply</div>
                      <div className="font-semibold">{formData.supply}</div>
                    </div> */}
                    <div>
                      <div className="text-gray-400">Royalty</div>
                      <div className="font-semibold">{formData.royalty}%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mint Button */}
              <button
                onClick={handleMint}
                disabled={minting}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg"
              > 
                { minting ? "Minting..." : "Mint NFT" }
              </button>
             
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MintNFT;