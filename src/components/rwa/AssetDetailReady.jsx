import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, ChevronRight, CheckCircle2, Lock, FileSignature } from 'lucide-react';
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import axios from 'axios';
import { useWallet, useWriteContract, useAssociateTokens } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import MARKETPLACE_ABI from '../../ABIs/marketplaceABI.json';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const MARKETPLACE_ADDRESS = process.env.REACT_APP_MARKETPLACE_ADDRESS || '0x0000000000000000000000000000000000000000'; // Fallback

const AssetDetailReady = () => {
    const { id } = useParams();
    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);

    // Web3 / Smart Contract States
    const { isConnected } = useWallet(HWCConnector);
    const { writeContract } = useWriteContract({ connector: HWCConnector });
    const { associateTokens } = useAssociateTokens({ connector: HWCConnector });
    
    const [isApproved, setIsApproved] = useState(false);
    const [isApproving, setIsApproving] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);

    useEffect(() => {
        const fetchAssetDetail = async () => {
            try {
                // Placeholder DB Stream Fetch
                // const res = await axios.get(`${API_URL}/api/rwa-assets/${id}`);
                // setAsset(res.data.asset);
                
                // Fallback mock data mirroring expected DB schema
                setTimeout(() => {
                    setAsset({
                        id,
                        title: 'Prime NYC Real Estate Fund',
                        description: 'A tokenized institutional-grade real estate fund focusing on premium commercial properties in Manhattan. Yield is generated through commercial leases and distributed quarterly.',
                        apy: '8.5%',
                        tvl: '$1.2M',
                        pricePerToken: 50, // USDC or HBAR
                        status: 'Active',
                        contractAddress: '0x0000000000000000000000000000000000012345',
                        tokenId: '0.0.12345', // HTS Token ID
                        serialNumber: 1
                    });
                    setLoading(false);
                }, 600);
            } catch (error) {
                console.error("Failed to fetch asset details:", error);
                setLoading(false);
            }
        };

        fetchAssetDetail();
    }, [id]);

    const handleApprove = async () => {
        if (!isConnected) return toast.error('Please connect your wallet first.');
        if (!asset) return;

        setIsApproving(true);
        try {
            // In Hedera, "Approve" for receiving an NFT usually means associating the token
            await associateTokens([asset.tokenId]);
            toast.success('Token Associated / Approved Successfully!');
            setIsApproved(true);
        } catch (error) {
            console.error('Approval failed:', error);
            // If they are already associated, it might throw an error, we can handle it gracefully
            if (error.message?.includes('TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT')) {
                setIsApproved(true);
                toast.success('Token already associated.');
            } else {
                toast.error('Approval failed. See console.');
            }
        } finally {
            setIsApproving(false);
        }
    };

    const handlePurchase = async () => {
        if (!isConnected) return toast.error('Please connect your wallet first.');
        if (!isApproved) return toast.error('Please approve/associate the token first.');
        
        setIsPurchasing(true);
        try {
            // Ensure the value is converted appropriately (e.g., to tinybars if HBAR)
            const priceInTinybars = asset.pricePerToken * 100_000_000; 

            await writeContract({
                contractId: MARKETPLACE_ADDRESS,
                abi: MARKETPLACE_ABI,
                functionName: 'buyNFT',
                args: [asset.contractAddress, asset.serialNumber],
                metaArgs: { gas: 300_000, amount: priceInTinybars },
            });

            toast.success('Asset Purchased Successfully!');
            
            // Trigger backend DB update stream here if needed
            // await axios.post(`${API_URL}/api/finalize-buy`, { id: asset.id, buyer: accountId });
            
        } catch (error) {
            console.error('Purchase failed:', error);
            toast.error('Transaction failed.');
        } finally {
            setIsPurchasing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-institutional text-white font-sans">
                <Header />
                <div className="pt-32 pb-20 flex justify-center items-center h-[calc(100vh-200px)]">
                    <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!asset) {
        return (
            <div className="min-h-screen bg-institutional text-white font-sans">
                <Header />
                <div className="pt-32 pb-20 flex justify-center items-center h-[calc(100vh-200px)]">
                    <div className="text-white text-xl font-bold">Asset not found</div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#02050E] text-slate-200 font-sans relative overflow-hidden">
            {/* Dark Mode Background Accents */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-cyan-600/5 rounded-full blur-[150px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            <Header />
            <div className="relative z-10 pt-32 pb-20 container-main">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-8 font-black">
                    <Link to="/assets" className="hover:text-white transition-colors">Assets</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-cyan-400">{asset.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column: Asset Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-[#050A15] rounded-[16px] p-10 border border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-[#02050E]/80 backdrop-blur-md border border-white/[0.05] text-white px-3 py-1 rounded-[6px] text-[9px] font-black uppercase tracking-[0.2em] flex items-center shadow-xl">
                                    {asset.status}
                                </span>

                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">{asset.title}</h1>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-3xl font-medium">{asset.description}</p>
                            
                            <div className="grid grid-cols-3 mt-10 bg-[#02050E] rounded-[8px] border border-white/[0.05] overflow-hidden shadow-inner">
                                <div className="p-6 border-r border-white/[0.05]">
                                    <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-black mb-2">Target APY</p>
                                    <p className="text-3xl font-black text-white tracking-tighter">{asset.apy}</p>
                                </div>
                                <div className="p-6 border-r border-white/[0.05]">
                                    <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-black mb-2">Token Price</p>
                                    <p className="text-3xl font-black text-white tracking-tighter">${asset.pricePerToken}</p>
                                </div>
                                <div className="p-6">
                                    <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-black mb-2">Total Value</p>
                                    <p className="text-3xl font-black text-slate-300 tracking-tighter">{asset.tvl}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contract Details */}
                        <div className="bg-[#050A15] rounded-[16px] p-8 border border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-3">
                                <Lock className="w-3 h-3 text-cyan-400" />
                                Protocol Data
                            </h2>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center py-4 border-b border-white/[0.05]">
                                    <span className="text-xs font-bold text-slate-400">Token ID</span>
                                    <span className="font-mono text-cyan-400 text-xs font-bold bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-md">{asset.tokenId}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-white/[0.05]">
                                    <span className="text-xs font-bold text-slate-400">Contract Address</span>
                                    <span className="font-mono text-slate-300 text-[10px] bg-[#02050E] border border-white/[0.05] px-3 py-1.5 rounded-md">{asset.contractAddress}</span>
                                </div>
                                <div className="flex justify-between items-center py-4">
                                    <span className="text-xs font-bold text-slate-400">Network</span>
                                    <span className="text-white font-black text-xs uppercase tracking-[0.2em]">Hedera</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Interaction */}
                    <div className="space-y-6">
                        <div className="bg-[#050A15] rounded-[16px] p-8 sticky top-32 border border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                            <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Investment Portal</h3>
                            
                            <div className="space-y-4 mb-8">
                                <div className="bg-[#02050E] rounded-[8px] p-6 border border-white/[0.05] shadow-inner">
                                    <label className="block text-[9px] text-slate-500 uppercase tracking-[0.2em] font-black mb-3">Amount Required</label>
                                    <div className="flex justify-between items-center">
                                        <div className="text-3xl font-black text-white">{asset.pricePerToken}.00</div>
                                        <div className="px-3 py-1.5 rounded-[6px] bg-[#050A15] border border-white/[0.05] text-cyan-400 font-black text-[10px] tracking-[0.2em] uppercase flex items-center gap-1.5 shadow-xl">
                                            ℏ HBAR
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {!isApproved ? (
                                    <button 
                                        onClick={handleApprove}
                                        disabled={isApproving}
                                        className="w-full bg-[#050A15] hover:bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-black uppercase tracking-[0.2em] text-[10px] py-5 rounded-[8px] transition-all duration-300 disabled:opacity-50 flex justify-center items-center gap-3 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                    >
                                        {isApproving ? (
                                            <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <FileSignature className="w-4 h-4" />
                                                Approve Contract
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handlePurchase}
                                        disabled={isPurchasing}
                                        className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#02050E] font-black uppercase tracking-[0.2em] text-[10px] py-5 rounded-[8px] transition-all duration-300 disabled:opacity-50 flex justify-center items-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                                    >
                                        {isPurchasing ? (
                                            <div className="w-4 h-4 border-2 border-[#02050E]/30 border-t-[#02050E] rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-4 h-4" />
                                                Execute Transaction
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                            
                            <p className="text-[9px] text-slate-500 text-center mt-6 font-black uppercase tracking-[0.2em] leading-relaxed">
                                By executing, you agree to the Asset terms & conditions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AssetDetailReady;
