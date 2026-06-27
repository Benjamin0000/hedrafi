import React, { useState } from 'react';
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { Eye, Lock, Star, Landmark, Link as LinkIcon, Infinity, Flame, Settings } from 'lucide-react';

const PioneerCouncilPass = () => {
    const [serialNumber, setSerialNumber] = useState(1);
    const [showDevTools, setShowDevTools] = useState(false);
    
    const paddedSerial = String(serialNumber).padStart(3, '0');

    return (
        <div className="min-h-screen bg-[#02050E] text-slate-200 font-sans relative overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/5 rounded-full blur-[150px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            <Header />

            <main className="relative z-10 pt-32 pb-20 container-main">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Column: 3D Asset Viewer Placeholder */}
                    <div className="relative flex flex-col items-center">
                        
                        {/* 3D Asset Container Placeholder */}
                        <div className="w-full max-w-[500px] h-[600px] bg-[#050A15] border border-white/[0.05] rounded-[16px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex items-center justify-center relative overflow-hidden group">
                            
                            {/* Subtle Ambient Glow inside container */}
                            <div className="absolute inset-0 flex justify-center items-center opacity-30 pointer-events-none z-0">
                                <div className="w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[80px]"></div>
                            </div>
                            
                            {/* The Placeholder Graphic / Text */}
                            <div className="z-10 flex flex-col items-center text-center space-y-4 px-8">
                                <div className="w-16 h-16 rounded-full border border-cyan-500/20 bg-cyan-500/5 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,211,238,0.1)] group-hover:border-cyan-500/40 transition-colors duration-700">
                                    <Landmark size={24} className="text-cyan-400/50" />
                                </div>
                                <span className="font-mono text-cyan-400/60 text-[10px] tracking-[0.3em] uppercase">
                                    [ Premium Interactive Pass Port ]
                                </span>
                                <span className="font-mono text-slate-500 text-[10px] tracking-[0.2em] uppercase">
                                    3D Render Engine Offline
                                </span>
                                <div className="mt-8 px-4 py-1.5 border border-white/[0.05] bg-[#02050E] rounded-md font-mono text-cyan-400 font-black text-xs tracking-[0.4em] shadow-inner">
                                    #{paddedSerial}
                                </div>
                            </div>

                            {/* Corner Accents for the 'Vault' feel */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10"></div>
                            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/10"></div>
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/10"></div>
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/10"></div>
                        </div>

                        {/* Bottom Text Block */}
                        <div className="mt-16 text-center max-w-lg z-10">
                            <h2 className="text-lg md:text-xl font-black tracking-widest text-cyan-400 uppercase mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                                NOT A TOKEN. A RELIC.
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed font-medium mb-6">
                                The Pioneer Council Relic is an immutable mark of commitment and vision. Reserved strictly for those who walked the path before it was lit.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Text Information */}
                    <div className="space-y-8">
                        {/* Header Titles */}
                        <div className="space-y-4 text-center lg:text-left">
{/*                             <p className="text-xs md:text-sm font-black tracking-[0.3em] text-slate-500 uppercase">
                                NOT GIVEN. EARNED.<br />
                                NOT FOR SALE. FOREVER.
                            </p> */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white uppercase">
                                PIONEER <br />
                                <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">COUNCIL</span>
                            </h1>
                            <div className="flex items-center justify-center lg:justify-start gap-4 pt-6">
                                <div className="h-px bg-white/[0.05] w-16"></div>
                                <span className="text-xs font-black tracking-widest text-slate-400 uppercase">FOUNDING MEMBER STATUS</span>
                                <div className="h-px bg-white/[0.05] w-16"></div>
                            </div>
                        </div>

                        {/* Top Info Box */}
                        <div className="bg-[#050A15] rounded-[16px] p-8 lg:p-10 border border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                            {/* Decorative Accent */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <h3 className="text-sm font-black tracking-widest text-cyan-400 uppercase mb-4 flex items-center gap-3">
                                <Star size={14} /> A SYMBOL OF THE FIRST.
                            </h3>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6 font-medium">
                                The Pioneer Council Relic is reserved for the first believers and early architects. You are not just a participant; you are the foundation upon which HedraFi is built.
                            </p>
                            <p className="text-xs font-black tracking-[0.2em] text-cyan-400/80 uppercase">
                                RECOGNIZED ON-CHAIN. PERMANENTLY RECORDED.
                            </p>
                        </div>

                        {/* Rep Box */}
                        <div className="bg-[#050A15] rounded-[16px] p-8 lg:p-10 border border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative">
                            <div className="flex items-center justify-center gap-4 mb-10">
                                <div className="h-px bg-white/[0.05] w-10"></div>
                                <h3 className="text-xs font-black tracking-widest text-slate-500 uppercase">CORE UTILITY PROTOCOL</h3>
                                <div className="h-px bg-white/[0.05] w-10"></div>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { icon: Landmark, title: "PIONEER STATUS", desc: "Recognized unequivocally as one of the first 200 architects of HedraFi." },
                                    { icon: Eye, title: "EXCLUSIVE ACCESS", desc: "Priority gateway to future yields, private drops, and closed council rooms." },
                                    { icon: Lock, title: "NON-TRANSFERABLE SOUL", desc: "Cryptographically bound to your identity. Your honor. Your legacy." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start group">
                                        <div className="w-12 h-12 rounded-full bg-[#02050E] border border-white/[0.05] flex items-center justify-center shrink-0 group-hover:border-cyan-500/30 transition-colors">
                                            <item.icon size={20} className="text-cyan-400" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black tracking-widest text-slate-200 uppercase mb-2">{item.title}</h4>
                                            <p className="text-base text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/[0.05]">
                            {[
                                { icon: Landmark, top: "200", mid: "PIONEERS", bot: "STRICT CAP" },
                                { icon: LinkIcon, top: "ON-CHAIN", mid: "", bot: "VERIFIABLE" },
                                { icon: Infinity, top: "SOULBOUND", mid: "", bot: "NON-TRADEABLE" },
                                { icon: Flame, top: "BUILT ON", mid: "", bot: "HEDERA L1" }
                            ].map((spec, i) => (
                                <div key={i} className="text-center flex flex-col items-center p-6 bg-[#050A15] border border-white/[0.02] rounded-[16px] hover:border-cyan-500/10 transition-colors">
                                    <spec.icon size={20} className="text-cyan-400/50 mb-4" strokeWidth={1.5} />
                                    <div className="text-xs font-black tracking-widest text-slate-200 uppercase">{spec.top}</div>
                                    {spec.mid && <div className="text-xs font-black tracking-widest text-slate-200 uppercase">{spec.mid}</div>}
                                    <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-2">{spec.bot}</div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </main>

            {/* Developer / Batch Engine Toggle */}
{/*             <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
                {showDevTools && (
                    <div className="bg-[#02050E] border border-cyan-500/20 p-4 rounded-[12px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl w-64 animate-reveal">
                        <div className="text-[9px] text-cyan-400 uppercase tracking-[0.2em] font-black mb-4 flex items-center justify-between">
                            Batch Engine <Settings size={10} />
                        </div>
                        <div className="flex items-center justify-between gap-3 mb-4 bg-[#050A15] p-2 rounded-md border border-white/[0.05]">
                            <button 
                                onClick={() => setSerialNumber(prev => Math.max(1, prev - 1))}
                                className="w-8 h-8 flex items-center justify-center bg-white/[0.02] hover:bg-white/[0.05] rounded-[6px] text-slate-400 transition-colors"
                            >
                                -
                            </button>
                            <span className="font-mono text-xs font-black text-cyan-400 tracking-[0.2em]">#{paddedSerial}</span>
                            <button 
                                onClick={() => setSerialNumber(prev => Math.min(200, prev + 1))}
                                className="w-8 h-8 flex items-center justify-center bg-white/[0.02] hover:bg-white/[0.05] rounded-[6px] text-slate-400 transition-colors"
                            >
                                +
                            </button>
                        </div>
                        <button 
                            onClick={() => setSerialNumber(prev => Math.min(200, prev + 10))}
                            className="w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-[9px] uppercase font-black tracking-[0.2em] rounded-[6px] border border-cyan-500/20 transition-all"
                        >
                            Queue Next 10
                        </button>
                    </div>
                )}
                
                <button 
                    onClick={() => setShowDevTools(!showDevTools)}
                    className="w-10 h-10 bg-[#050A15] border border-white/[0.05] hover:border-cyan-500/30 text-slate-500 hover:text-cyan-400 rounded-full flex items-center justify-center shadow-2xl transition-all"
                    title="Toggle Developer Engine"
                >
                    <Settings size={16} />
                </button>
            </div> */}

            <Footer />
        </div>
    );
};

export default PioneerCouncilPass;
