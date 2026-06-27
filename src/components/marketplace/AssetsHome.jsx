import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, TrendingUp, Tag, Layers, Building2 } from 'lucide-react';
import Header from "../shared/Header";
import Footer from "../shared/Footer";

// We'll map mock assets to relevant premium imagery to eliminate the blank text-box feel
const getAssetImage = (title) => {
    if (title.includes('Real Estate')) return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop';
    if (title.includes('Solar')) return 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop';
    if (title.includes('Treasury')) return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop';
    if (title.includes('Logistics')) return 'https://images.unsplash.com/photo-1586528116311-ad8ed7fc51f7?q=80&w=800&auto=format&fit=crop';
    if (title.includes('Energy')) return 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop';
    if (title.includes('Commercial')) return 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop';
};

const AssetsHome = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTier, setActiveTier] = useState('All');

    const tiers = ['All', '$5', '$10', '$20', '$50'];

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                // Fallback mock data mirroring expected DB schema
                setTimeout(() => {
                    setAssets([
                        { id: 1, title: 'Prime NYC Real Estate Fund', apy: '8.5%', tvl: '$1.2M', status: 'Active', tier: '$50', price: 50 },
                        { id: 2, title: 'Solar Infrastructure Yield', apy: '11.2%', tvl: '$850K', status: 'Funding', tier: '$20', price: 20 },
                        { id: 3, title: 'Treasury Bill Tokenized', apy: '5.1%', tvl: '$5.5M', status: 'Active', tier: '$5', price: 5 },
                        { id: 4, title: 'European Logistics Hub', apy: '7.4%', tvl: '$2.1M', status: 'Active', tier: '$10', price: 10 },
                        { id: 5, title: 'Clean Energy Grid', apy: '10.5%', tvl: '$400K', status: 'Funding', tier: '$5', price: 5 },
                        { id: 6, title: 'Manhattan Commercial', apy: '6.8%', tvl: '$3.4M', status: 'Active', tier: '$50', price: 50 }
                    ]);
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error("Failed to fetch assets", error);
                setLoading(false);
            }
        };
        fetchAssets();
    }, []);

    const filteredAssets = activeTier === 'All' 
        ? assets 
        : assets.filter(asset => asset.tier === activeTier);

    return (
        <div className="min-h-screen bg-[#02050E] text-slate-200 font-sans relative overflow-hidden">
            {/* Dark Mode Background Accents */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-cyan-600/5 rounded-full blur-[150px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            <Header />
            <div className="relative z-10 pt-32 pb-20 container-main">
                <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/[0.05] pb-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                            Real-World Assets
                        </h1>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed">
                            Access high-yield, secure, and globally compliant tokenized financial instruments.
                        </p>
                    </div>

                    {/* Premium Segmented Control */}
                    <div className="flex bg-[#050A15]/80 p-1.5 rounded-[12px] border border-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-x-auto max-w-full hide-scrollbar">
                        {tiers.map(tier => (
                            <button
                                key={tier}
                                onClick={() => setActiveTier(tier)}
                                className={`px-6 py-2.5 rounded-[8px] font-black tracking-[0.1em] text-[11px] uppercase transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                                    activeTier === tier 
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03] border border-transparent'
                                }`}
                            >
                                {tier !== 'All' && <Tag size={12} />}
                                {tier}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-[#050A15] border border-white/[0.05] rounded-[16px] h-[450px] animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredAssets.map((asset) => (
                            <Link to={`/assets/${asset.id}`} key={asset.id} className="block group h-full">
                                <div className="bg-[#050A15] rounded-[16px] h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/[0.05] hover:border-cyan-500/30">
                                    
                                    {/* Visual Thumbnail */}
                                    <div className="relative h-48 w-full border-b border-white/[0.05] overflow-hidden bg-[#02050E]">
                                        <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <img 
                                            src={getAssetImage(asset.title)} 
                                            alt={asset.title} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-60"
                                        />
                                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                                            <span className="bg-[#02050E]/80 backdrop-blur-md border border-white/[0.05] text-white px-3 py-1 rounded-[6px] text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 shadow-xl">
                                                <Building2 size={10} className="text-cyan-400" />
                                                {asset.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Body */}
                                    <div className="p-6 flex flex-col flex-grow relative z-20 bg-gradient-to-b from-[#050A15] to-[#02050E]">
                                        <div className="flex justify-between items-start mb-6">
                                            <h3 className="text-xl font-black text-white leading-tight tracking-tight group-hover:text-cyan-400 transition-colors pr-4">{asset.title}</h3>
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-black text-[10px] shrink-0">
                                                <Tag size={10} />
                                                {asset.tier}
                                            </div>
                                        </div>
                                        
                                        {/* Financial Terminal Data */}
                                        <div className="grid grid-cols-2 mt-auto mb-6 bg-[#02050E] rounded-[8px] border border-white/[0.05] overflow-hidden shadow-inner">
                                            <div className="p-3 border-r border-white/[0.05] flex flex-col justify-center">
                                                <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">Target APY</p>
                                                <p className="text-lg font-black text-white tracking-tighter flex items-center gap-1">
                                                    {asset.apy} <TrendingUp size={12} className="text-cyan-400" />
                                                </p>
                                            </div>
                                            <div className="p-3 flex flex-col justify-center">
                                                <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">Total Value</p>
                                                <p className="text-lg font-black text-slate-300 tracking-tighter">{asset.tvl}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Integrated Action */}
                                        <div className="flex items-center justify-between text-cyan-500 group-hover:text-cyan-300 transition-colors pt-2 border-t border-white/[0.05]">
                                            <span className="font-black text-[10px] tracking-[0.2em] uppercase">Invest Instrument</span>
                                            <div className="w-8 h-8 rounded-[8px] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all">
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AssetsHome;
