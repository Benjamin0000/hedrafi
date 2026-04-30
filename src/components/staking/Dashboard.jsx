import { useState, useEffect } from "react";
import { stakingContract } from "../../lib/staking";
import WalletInfo from "./WalletInfo";
import StakePanel from "./StakePanel";
import StakingStats from "./StakingStats";
import WhyStakeGrid from "./WhyStakeGrid";
import SecuritySection from "./SecuritySection";
import EcosystemBenefits from "./EcosystemBenefits";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import PioneerCountdown from "./PioneerCountdown";

const Dashboard = () => {
  const [totalParticipants, setTotalParticipants] = useState(0);

  const fetchGlobalStats = async () => {
    if (!stakingContract) return;
    try {
      const totalUsers = await stakingContract.totalUsers();
      setTotalParticipants(Number(totalUsers));
    } catch (e) {
      console.error("Error fetching global stats:", e);
    }
  };

  useEffect(() => {
    fetchGlobalStats();
    const interval = setInterval(fetchGlobalStats, 10000);
    
    // Handle hash scroll on mount
    if (window.location.hash === '#stake-form') {
      setTimeout(() => {
        scrollToForm();
      }, 500); // Small delay to ensure render
    }

    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => {
    const element = document.getElementById("stake-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-blue/5 rounded-full blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Header />

      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Discord Join Banner */}
          <div className="mb-10 animate-fade-in">
             <a 
               href="https://discord.gg/cDjN62RJKC" 
               target="_blank" 
               rel="noopener noreferrer"
               className="group flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:px-8 rounded-[2rem] bg-indigo-600/5 hover:bg-indigo-600/10 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-500 shadow-xl"
             >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
                      <svg width="20" height="20" viewBox="0 0 127.14 96.36" fill="white">
                        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.06,72.06,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.39,80.21a105.73,105.73,0,0,0,32.77,16.15,77.7,77.7,0,0,0,7.31-11.86A69,69,0,0,1,28.68,78.1a48.09,48.09,0,0,0,4.06-3.14c18.71,8.59,39,8.59,57.4,0a48.53,48.53,0,0,0,4.06,3.14,69.1,69.1,0,0,1-11.78,6.4,77.74,77.74,0,0,0,7.31,11.86,105.56,105.56,0,0,0,32.8-16.14C131,51.13,124.16,27.52,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5.09-12.73,11.45-12.73S54.18,46,54,53,49,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.09-12.73,11.44-12.73S96.23,46,96.05,53,91,65.69,84.69,65.69Z"/>
                      </svg>
                   </div>
                   <div className="text-left">
                      <p className="text-sm md:text-md font-bold text-white tracking-tight">Join our Discord for real-time updates and support!</p>
                      <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-black">Community & Support Governance</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                   Get Involved <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </div>
             </a>
          </div>

          <div className="flex flex-col gap-10 md:gap-14">
            
            {/* HERO SECTION - REPLICATING IMAGE 1 */}
            <div className="glass-card rounded-[2.5rem] border border-white/[0.05] shadow-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden group w-full bg-[#0A1128]/40">
               {/* Ambient Glow inside card */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] -mr-40 -mt-40 pointer-events-none"></div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
                  {/* Left Hero Content */}
                  <div className="lg:col-span-7 space-y-6">
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]"></div>
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-cyan-100">Premium Staking Infrastructure</span>
                     </div>
                     
                     <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-white">
                        Staking Infrastructure
                     </h1>
                     
                     <p className="text-slate-300 text-lg font-medium max-w-xl leading-relaxed">
                        Secure your assets within the HedraFi protocol. Monitor multi-layered yield streams and participate in ecosystem governance through a 100% non-custodial interface.
                     </p>

                     <div className="flex flex-wrap items-center gap-6 pt-4">
                        <button 
                          onClick={scrollToForm}
                          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                        >
                           Join the First 400 Pioneers
                        </button>

                        <div className="glass-card p-4 rounded-2xl border-white/[0.05] shadow-xl flex flex-col justify-center min-w-[140px] bg-white/[0.02]">
                           <p className="text-[9px] text-slate-500 font-black tracking-widest uppercase mb-1">Live Counter</p>
                           <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-black text-white">{totalParticipants > 0 ? totalParticipants.toLocaleString() : '...'}</span>
                              <span className="text-sm font-bold text-slate-400">/ 400</span>
                           </div>
                           <p className="text-[9px] text-cyan-500 font-black tracking-widest uppercase mt-1 text-shadow-sm shadow-cyan-500">Pioneers Joined</p>
                        </div>
                     </div>
                  </div>

                  {/* Right Highlight Card */}
                  <div className="lg:col-span-5 flex items-center justify-end">
                     <PioneerCountdown />
                  </div>
               </div>
            </div>

            {/* SECTION 2: Layout - Stats on Top */}
            <div className="w-full">
               <StakingStats />
            </div>

            {/* SECTION 3: Layout - Wallet Info ON LEFT, Stake Panel ON RIGHT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start focus-within:scroll-mt-40">
               {/* Left column: Wallet Overview */}
               <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-40 order-2 lg:order-1">
                  <div className="glass-card p-6 rounded-[3rem] border border-white/[0.05] bg-[#0A1024] shadow-2xl">
                     <WalletInfo />
                  </div>
               </div>

               {/* Right column: Staking Form */}
               <div className="lg:col-span-7 xl:col-span-8 space-y-10 order-1 lg:order-2">
                  <StakePanel />
               </div>
            </div>

            {/* SECTION 4: Why Stake Grid */}
            <div className="pt-12 w-full max-w-7xl mx-auto border-t border-white/10">
               <WhyStakeGrid />
            </div>

            {/* SECTION 5: Security Section */}
            <div className="pt-12 w-full max-w-7xl mx-auto border-t border-white/10">
               <SecuritySection />
            </div>

            {/* SECTION 6: Ecosystem Benefits */}
            <div className="pt-12 border-t border-white/10 w-full max-w-7xl mx-auto">
               <EcosystemBenefits />
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
