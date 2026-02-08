import { Link } from 'react-router-dom';
import { AreaChart, Cpu, ShieldCheck, ArrowRight, Sparkles, Rocket, Globe } from 'lucide-react';
import Header from "../shared/Header";
import Footer from "../shared/Footer"; 
import logo from '../../assets/logo.png';
import { useEffect } from 'react';

const Homepage = () => {
  useEffect(() => {
    const loader = document.getElementById("startup-loader");
    if (loader) loader.style.display = "none";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Premium Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(0,102,255,0.15)_0%,_transparent_50%)]"></div>
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      </div>

      <Header />

      <main className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="pt-24 pb-32 md:pt-40 md:pb-48 px-4 sm:px-6 lg:px-8">
          <div className="container-main flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 text-center lg:text-left space-y-8 max-w-3xl">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[1.1] tracking-tighter">
                Architecting <br />
                <span className="text-gradient">Digital Vistas</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                HedraFi delivers high-fidelity financial instruments and creative protocols. 
                Experience institutional-grade HBAR staking and a professional NFT suite.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                <Link to="/staking" className="flex-1 sm:flex-none">
                  <button className="btn-primary w-full sm:w-auto !py-6 !px-12 text-xl shadow-[0_0_30px_rgba(0,102,255,0.3)]">
                    Stake Assets <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/studio" className="flex-1 sm:flex-none">
                  <button className="btn-glass w-full sm:w-auto !py-6 !px-12 text-xl">
                    Creator Studio
                  </button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-10 border-t border-white/5">
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Infrastructure Partners</div>
                 <div className="flex items-center gap-6 md:gap-8 overflow-hidden grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                     <span className="text-xl font-black text-white cursor-default select-none tracking-tighter">HEDERA</span>
                     <span className="text-xl font-black text-white cursor-default select-none tracking-tighter italic">ZKVERIFY</span>
                     <span className="text-xl font-black text-white cursor-default select-none tracking-tighter">SAUCERSWAP</span>
                 </div>
              </div>
            </div>

            <div className="flex-1 relative lg:mt-0 mt-20 w-full max-w-lg lg:max-w-none">
               <div className="relative aspect-square w-full max-w-[500px] mx-auto group">
                  {/* Advanced Visual Aura Layers */}
                  <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
                  <div className="absolute inset-[-10%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                  
                  {/* Stylized Logo Frame - Restored Glassy Aesthetic */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                     {/* External Frame Border */}
                     <div className="absolute inset-0 rounded-[4rem] border border-white/20 group-hover:border-blue-500/40 transition-all duration-700 backdrop-blur-sm"></div>
                     
                     {/* Main Glass Container */}
                     <div className="relative glass-card rounded-[3.5rem] p-12 md:p-16 w-full h-full flex items-center justify-center border-white/20 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-float-slow backdrop-blur-2xl bg-white/5">
                        {/* Subtle inner gradients to blend the black logo background while maintaining transparency */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-600/20 opacity-60"></div>
                        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,255,255,0.02)]"></div>
                        
                        <img 
                           src={logo} 
                           alt="HedraFi Central" 
                           className="w-full relative z-10 drop-shadow-[0_0_30px_rgba(0,102,255,0.4)] transition-transform duration-[2s] group-hover:scale-105 object-contain"
                        />
                     </div>
                  </div>
                  
                  {/* Professional Insight Badges - Fixed Z-Index Layering */}
                  <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 z-20 glass-card px-6 py-4 sm:px-8 sm:py-5 rounded-3xl border-blue-500/30 shadow-2xl backdrop-blur-3xl animate-float-slow group-hover:translate-y-[-10px] transition-all duration-700 bg-white/10" style={{animationDelay: '1s'}}>
                     <div className="text-cyan-400 font-black text-2xl sm:text-3xl tracking-tighter shadow-blue-500/20">24.5%</div>
                     <div className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] leading-none mt-1">Staking Yield</div>
                  </div>
                  
                  <div className="absolute -bottom-6 -left-4 sm:-bottom-10 sm:-left-8 z-20 glass-card px-6 py-4 sm:px-8 sm:py-5 rounded-3xl border-white/20 shadow-2xl backdrop-blur-3xl animate-float-slow group-hover:translate-y-[10px] transition-all duration-700 bg-white/10" style={{animationDelay: '2s'}}>
                     <div className="flex items-center gap-2 sm:gap-3">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                       <div className="text-white font-black text-xl sm:text-2xl tracking-tighter uppercase italic">Institutional</div>
                     </div>
                     <div className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] leading-none mt-1">Grade Infrastructure</div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Feature Matrix */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-[#050B1C]/30">
          <div className="container-main">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
                <div className="space-y-4 max-w-2xl">
                  <div className="w-12 h-1 bg-cyber-blue rounded-full mb-6"></div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">System <span className="text-gradient">Pillars</span></h2>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">
                    Designed for scalability and user autonomy, HedraFi provides a curated selection of DeFi instruments for the modern digital economy.
                  </p>
                </div>
                <Link to="/staking" className="group">
                  <div className="flex items-center gap-3 text-cyber-blue text-xs font-black uppercase tracking-widest py-3 border-b border-cyber-blue/20 group-hover:border-cyber-blue transition-all">
                    Explore Ecosystem <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Aggregated Yield", desc: "Institutional-grade staking logic with auto-compounding potential and real-time yield tracking.", icon: AreaChart, stats: "2.5M HBAR TVL" },
                  { title: "Foundry Studio", desc: "Professional NFT manufacturing suite with HTS integration and advanced metadata engineering.", icon: Cpu, stats: "V1.2 Stable" },
                  { title: "Native Security", desc: "Built with a security-first mentalty, utilizing Hedera's HTS protocols for trustless asset management.", icon: ShieldCheck, stats: "Audit Pending" }
                ].map((item, idx) => (
                  <div key={idx} className="glass-card group p-10 rounded-[2.5rem] hover:bg-[#0E1529] transition-all duration-500 border-white/[0.05] hover:border-blue-500/20 shadow-xl">
                    <div className="w-14 h-14 bg-blue-600/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                      <item.icon className="text-cyber-blue group-hover:scale-110 transition-transform duration-500" size={28} />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-slate-400 mb-10 leading-relaxed font-medium">{item.desc}</p>
                    <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-black tracking-[0.2em] uppercase">
                       <span className="text-slate-500">{item.stats}</span>
                       <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all cursor-pointer">
                         <ArrowRight size={14} />
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Global Access Section */}
        <section className="py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px]"></div>
          </div>
          
          <div className="container-main relative z-10">
            <div className="glass-card p-12 md:p-24 rounded-[4rem] text-center border-white/10 relative overflow-hidden group max-w-5xl mx-auto shadow-2xl">
              <div className="absolute inset-0 bg-blue-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 space-y-10">
                <div className="inline-flex p-4 rounded-3xl bg-blue-600/5 border border-white/5 mb-4">
                  <Rocket size={40} className="text-cyber-blue" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">THE FUTURE IS <br /><span className="text-gradient">WITHOUT FRICTION.</span></h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                  Join the next generation of digital finance on Hedera. Scalable, secure, and entirely yours.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
                  <Link to="/staking">
                    <button className="btn-primary !px-12 !py-6 text-xl">Start Staking Today</button>
                  </Link>
                  <button className="btn-glass !px-12 !py-6 text-xl">Protocol Documentation</button>
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