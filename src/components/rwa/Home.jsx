import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Shield, ArrowRight, TrendingUp, Tag, Building2, Lock,
    Sparkles, Clock3, Globe2, Zap
} from 'lucide-react';

import MarketplaceSidebar from "../shared/MarketplaceSidebar";
import MobileTopBar from "../shared/MobileTopBar";
import AmbientBackground from "../shared/AmbientBackground";

// =========================================================
// PREVIEW DATA (unchanged)
// =========================================================
const previewAssets = [
    { id: 1, title: 'Prime NYC Real Estate Fund', apy: '8.5%', tvl: '$1.2M', status: 'Coming Soon', tier: '$500', category: 'Real Estate', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'Solar Infrastructure Yield', apy: '11.2%', tvl: '$850K', status: 'Coming Soon', tier: '$200', category: 'Energy', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop' },
    { id: 3, title: 'Treasury Bill Tokenized', apy: '5.1%', tvl: '$5.5M', status: 'Coming Soon', tier: '$5000', category: 'Treasury', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop' },
    { id: 4, title: 'European Logistics Hub', apy: '7.4%', tvl: '$2.1M', status: 'Coming Soon', tier: '$1000', category: 'Logistics', image: 'https://images.unsplash.com/photo-1784913106296-d25c10bf36a7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0' },
    { id: 5, title: 'Clean Energy Grid', apy: '10.5%', tvl: '$400K', status: 'Coming Soon', tier: '$500', category: 'Energy', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop' },
    { id: 6, title: 'Manhattan Commercial', apy: '6.8%', tvl: '$3.4M', status: 'Coming Soon', tier: '$5000', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop' }
];

const AssetsHome = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const loader = document.getElementById("startup-loader");
        if (loader) loader.style.display = "none";
    }, []);

    return (
        <div className="relative min-h-screen bg-[#030712] text-slate-200 font-sans">
            <AmbientBackground />
            <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />

            <div className="relative z-10 flex items-start">
                <MarketplaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onDisconnect={() => {}} />

                <main className="flex-1 min-w-0">
                    <div className="pt-8 md:pt-10 pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w- mx-auto">

                            {/* HEADER - compact */}
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-1 h-4 rounded-full bg-emerald-500" />
                                        <span className="text- font-black uppercase tracking-[0.3em] text-slate-500">HedraFi • RWA Preview</span>
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-none">
                                        Real-World Assets <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">are coming.</span>
                                    </h1>
                                    <p className="text- text-slate-500 mt-2 max-w-lg">A new way to access tokenized real-world opportunities is being built.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/10">
                                        <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" /></span>
                                        <span className="text- font-black uppercase tracking-widest text-emerald-400">Feature Preview</span>
                                    </div>
                                </div>
                            </div>

                            {/* HERO - compact */}
                            <div className="relative overflow-hidden rounded- border border-emerald-500/[0.12] bg-[#050A15]/80 p-5 md:p-7 text-center">
                                <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w- h- bg-emerald-500/[0.08] rounded-full blur-" />
                                <div className="relative z-10">
                                    <p className="text- text-slate-400 max-w-xl mx-auto leading-relaxed">These assets are demonstration listings only. Investment and transactions are not available yet.</p>
                                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                                        <PreviewPill icon={Shield} text="Secure" />
                                        <PreviewPill icon={Globe2} text="Global" />
                                        <PreviewPill icon={Zap} text="Hedera" />
                                    </div>
                                </div>
                            </div>

                            {/* STATS */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4">
                                <PreviewStat label="Asset Classes" value="06" />
                                <PreviewStat label="Preview Assets" value="06" />
                                <PreviewStat label="Target Markets" value="Global" />
                                <PreviewStat label="Status" value="Building" />
                            </div>

                            {/* ASSETS */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={12} className="text-emerald-400" />
                                        <span className="text- font-black uppercase tracking-widest text-slate-400">Preview Marketplace • 6 assets</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5">
                                        <Clock3 size={10} className="text-emerald-400" />
                                        <span className="text- font-black uppercase tracking-widest text-slate-500">Not yet available</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {previewAssets.map((asset) => <PreviewAssetCard key={asset.id} asset={asset} />)}
                                </div>
                            </div>

                            {/* VISION - compact */}
                            <div className="mt-8 rounded- border border-white/[0.06] bg-[#050A15]/70 p-5 md:p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Building2 size={12} className="text-emerald-400" />
                                    <span className="text- font-black uppercase tracking-[0.25em] text-emerald-400">The Vision</span>
                                </div>
                                <h2 className="text-lg font-black text-white tracking-tight">Bringing the physical world on-chain.</h2>
                                <p className="text- text-slate-500 mt-2 leading-relaxed max-w-2xl">HedraFi's RWA marketplace is designed to make tokenized real-world opportunities easier to discover and eventually access.</p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
                                    <ComingFeature icon={Building2} title="Real Estate" description="Tokenized property and income-generating assets." />
                                    <ComingFeature icon={TrendingUp} title="Yield Assets" description="Structured opportunities with transparent data." />
                                    <ComingFeature icon={Shield} title="On-Chain" description="Built around transparent blockchain infra." />
                                </div>
                            </div>

                            {/* BOTTOM CTA - compact */}
                            <div className="text-center py-8 mt-6 border-t border-white/[0.05]">
                                <p className="text- font-black uppercase tracking-[0.3em] text-slate-600">HedraFi Marketplace</p>
                                <h2 className="text-lg font-black text-white mt-2">More opportunities are on the way.</h2>
                                <Link to="/marketplace" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/15 text-emerald-400 text- font-black uppercase tracking-widest hover:bg-emerald-500/[0.12] transition-all">
                                    Explore Marketplace <ArrowRight size={12} />
                                </Link>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// =========================================================
// COMPACT CARDS
// =========================================================
const PreviewAssetCard = ({ asset }) => (
    <div className="group relative rounded- overflow-hidden border border-white/[0.06] bg-[#050A15]">
        <div className="relative h-36 overflow-hidden">
            <img src={asset.image} alt={asset.title} className="w-full h-full object-cover grayscale opacity-40 blur-[0.3px] group-hover:scale-105 group-hover:opacity-50 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 to-[#02050E]/90" />
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#02050E]/80 backdrop-blur border border-emerald-500/15">
                <Lock size={8} className="text-emerald-400" />
                <span className="text- font-black uppercase tracking-widest text-emerald-300">Coming Soon</span>
            </div>
            <div className="absolute top-2.5 right-2.5">
                <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur border border-white/10 text- font-black uppercase tracking-widest text-slate-400">{asset.category}</span>
            </div>
        </div>

        <div className="p-3.5">
            <div className="flex items-start justify-between gap-3">
                <h3 className="text- font-black text-white leading-tight line-clamp-1">{asset.title}</h3>
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/10 text- font-black text-emerald-400 shrink-0"><Tag size={8} />{asset.tier}</span>
            </div>

            <div className="grid grid-cols-2 gap-px mt-3 rounded-lg overflow-hidden border border-white/5 bg-white/[0.04]">
                <div className="bg-[#02050E] p-2.5">
                    <p className="text- text-slate-600 uppercase tracking-widest font-black">Target APY</p>
                    <p className="text- font-black text-slate-300 mt-0.5 flex items-center gap-1">{asset.apy}<TrendingUp size={10} className="text-emerald-400" /></p>
                </div>
                <div className="bg-[#02050E] p-2.5">
                    <p className="text- text-slate-600 uppercase tracking-widest font-black">Preview TVL</p>
                    <p className="text- font-black text-slate-300 mt-0.5">{asset.tvl}</p>
                </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                <span className="flex items-center gap-1 text-slate-600 text- font-black uppercase tracking-widest"><Lock size={9} />Not available</span>
                <div className="w-6 h-6 rounded-md bg-white/[0.03] border border-white/5 flex items-center justify-center"><ArrowRight size={10} className="text-slate-700" /></div>
            </div>
        </div>
    </div>
);

const PreviewPill = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5">
        <Icon size={10} className="text-emerald-400" />
        <span className="text- font-black uppercase tracking-widest text-slate-500">{text}</span>
    </div>
);

const PreviewStat = ({ label, value }) => (
    <div className="px-3.5 py-3 rounded-xl bg-[#050A15]/70 border border-white/5">
        <p className="text- font-black uppercase tracking-widest text-slate-600">{label}</p>
        <p className="text- font-black text-white mt-0.5">{value}</p>
    </div>
);

const ComingFeature = ({ icon: Icon, title, description }) => (
    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center">
            <Icon size={12} className="text-emerald-400" />
        </div>
        <h3 className="text- font-black text-white mt-2.5">{title}</h3>
        <p className="text- text-slate-500 leading-relaxed mt-1">{description}</p>
    </div>
);

export default AssetsHome;