import { Link } from 'react-router-dom';
import { Building2, Layers, Globe, Sparkles, ArrowRight } from 'lucide-react';
import Header from "../shared/Header";
import Footer from "../shared/Footer"; 
import logo from '../../assets/hedrafinew.png';
import { useEffect } from 'react';

const Homepage = () => {
  useEffect(() => {
    const loader = document.getElementById("startup-loader");
    if (loader) loader.style.display = "none";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-hidden text-slate-200">
      {/* Insane Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(16,185,129,0.15)_0%,_transparent_50%)]"></div>
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-blob" style={{animationDelay: '2s'}}></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      </div>

      <Header />

      <main className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="pt-24 pb-32 md:pt-40 md:pb-48 px-4 sm:px-6 lg:px-8">
          <div className="container-main flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">
            <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl">

              <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black leading-tight tracking-tight animate-reveal" style={{animationDelay: '0.1s'}}>
                RWA & <br />
                <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">NFTs</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium animate-reveal" style={{animationDelay: '0.2s'}}>
                Tokenize the physical world. Trade premium digital collectibles. Welcome to the first institutional-grade marketplace on Hedera.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6 animate-reveal" style={{animationDelay: '0.3s'}}>
                <Link to="/marketplace" className="flex-1 sm:flex-none">
                  <button className="btn-primary w-full sm:w-auto !py-6 !px-12 text-xl shadow-[0_0_40px_rgba(37,99,235,0.4)]">
                    Explore Marketplace <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/studio" className="flex-1 sm:flex-none">
                  <button className="btn-glass w-full sm:w-auto !py-6 !px-12 text-xl">
                    Tokenize Asset
                  </button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-10 border-t border-white/5 animate-reveal" style={{animationDelay: '0.4s'}}>
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Infrastructure</div>
                 <div className="flex items-center gap-6 md:gap-8 overflow-hidden grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                     <span className="text-xl font-black text-white cursor-default select-none tracking-tighter">HEDERA</span>
                     <span className="text-xl font-black text-white cursor-default select-none tracking-tighter">SAUCERSWAP</span>
                 </div>
              </div>
            </div>

            <div className="flex-1 relative lg:mt-0 mt-20 w-full max-w-lg lg:max-w-[450px] animate-reveal" style={{animationDelay: '0.5s'}}>
               <div className="relative aspect-square w-full mx-auto group">
                  <div className="absolute inset-0 bg-cyan-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
                  <div className="absolute inset-[-10%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                  
                  {/* Floating Elements / Mock UI */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                     <div className="relative rounded-[16px] p-2 w-full h-full border border-white/[0.05] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] animate-float-slow group-hover:border-cyan-500/30 transition-colors duration-700">
                        <img 
                           src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
                           alt="Institutional Asset" 
                           className=" blur-sm w-full h-full object-cover rounded-[12px] opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#02050E] via-[#02050E]/60 to-transparent"></div>
                        
                        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                            <div className="max-w-[65%]">
                                <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.2em] mb-3 w-fit">Valued Asset</div>
                                <h3 className="text-2xl font-black text-white leading-tight tracking-tight">Prime NYC Real Estate Fund</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">Est. Value</p>
                                <p className="text-2xl font-black text-cyan-400">$1.2M</p>
                            </div>
                        </div>
                     </div>
                  </div>
                  
                  {/* Floating Badges */}
                  <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 z-20 bg-[#050A15]/90 backdrop-blur-xl border border-white/[0.05] px-6 py-4 sm:px-8 sm:py-5 rounded-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-float-slow group-hover:translate-y-[-10px] group-hover:border-cyan-500/20 transition-all duration-700" style={{animationDelay: '1s'}}>
                     <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] leading-none mb-2">Total Volume</div>
                     <div className="text-cyan-400 font-black text-2xl sm:text-3xl tracking-tighter">45M+ ℏ</div>
                  </div>
                  
                  <div className="absolute -bottom-6 -left-4 sm:-bottom-10 sm:-left-8 z-20 bg-[#050A15]/90 backdrop-blur-xl border border-white/[0.05] px-6 py-4 sm:px-8 sm:py-5 rounded-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-float-slow group-hover:translate-y-[10px] group-hover:border-cyan-500/20 transition-all duration-700" style={{animationDelay: '2s'}}>
                     <div className="flex items-center gap-2 sm:gap-3">
                       <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.6)]"></div>
                       <div className="text-white font-black text-xl sm:text-2xl tracking-tight uppercase">Compliant</div>
                     </div>
                     <div className="text-[9px] sm:text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] leading-none mt-2">Institutional Grade</div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-[#080d1a]">
          <div className="container-main">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Explore Markets</h2>
                  <p className="text-slate-400 text-lg">From digital art to tokenized real estate.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Link to="/marketplace" className="group">
                    <div className="relative glass-card h-[400px] rounded-[16px] p-10 overflow-hidden border-white/10 hover:border-emerald-500/30 transition-all duration-500 flex flex-col justify-end">
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 group-hover:opacity-30 transition-all duration-700 mix-blend-luminosity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent"></div>
                        <div className="relative z-10">
                            <Building2 size={40} className="text-emerald-400 mb-6" />
                            <h3 className="text-4xl font-black mb-2 text-white">Real-World Assets</h3>
                            <p className="text-slate-400 font-medium max-w-md">Fractionalized ownership of premium real estate, luxury goods, and yield-generating physical assets.</p>
                        </div>
                    </div>
                  </Link>

                  <Link to="/marketplace" className="group">
                    <div className="relative glass-card h-[400px] rounded-[16px] p-10 overflow-hidden border-white/10 hover:border-purple-500/30 transition-all duration-500 flex flex-col justify-end">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-[#030712] to-[#030712] opacity-50 group-hover:opacity-80 transition-opacity"></div>
                        <div className="relative z-10">
                            <Layers size={40} className="text-purple-400 mb-6" />
                            <h3 className="text-4xl font-black mb-2 text-white">Digital Collectibles</h3>
                            <p className="text-slate-400 font-medium max-w-md">Discover, collect, and trade extraordinary NFTs from top creators across the Hedera ecosystem.</p>
                        </div>
                    </div>
                  </Link>
              </div>
          </div>
        </section>

        {/* Global Access Section */}
        <section className="py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[160px]"></div>
          </div>
          
          <div className="container-main relative z-10">
            <div className="glass-card p-12 md:p-24 rounded-[16px] text-center border-white/10 relative overflow-hidden group max-w-5xl mx-auto shadow-2xl">
              <div className="absolute inset-0 bg-indigo-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 space-y-10">
                <div className="inline-flex p-4 rounded-[16px] bg-indigo-600/10 border border-indigo-500/20 mb-4 animate-bounce">
                  <Globe size={40} className="text-indigo-400" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">THE WORLD ON <br /><span className="text-gradient">HEDERA.</span></h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                  Join the most sophisticated marketplace. Institutional compliance meets Web3 innovation.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
                  <Link to="/marketplace">
                    <button className="btn-primary !px-12 !py-6 text-xl">Enter Market</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;