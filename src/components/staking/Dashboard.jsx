import WalletInfo from "./WalletInfo";
import StakePanel from "./StakePanel";
import StakingStats from "./StakingStats";
import WhyStakeGrid from "./WhyStakeGrid";
import SecuritySection from "./SecuritySection";
import EcosystemBenefits from "./EcosystemBenefits";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const Dashboard = () => {
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
                        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                           Join the First 400 Pioneers
                        </button>

                        <div className="glass-card p-4 rounded-2xl border-white/[0.05] shadow-xl flex flex-col justify-center min-w-[140px] bg-white/[0.02]">
                           <p className="text-[9px] text-slate-500 font-black tracking-widest uppercase mb-1">Live Counter</p>
                           <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-black text-white">18</span>
                              <span className="text-sm font-bold text-slate-400">/ 400</span>
                           </div>
                           <p className="text-[9px] text-cyan-500 font-black tracking-widest uppercase mt-1 text-shadow-sm shadow-cyan-500">Pioneers Joined</p>
                        </div>
                     </div>
                  </div>

                  {/* Right Highlight Card */}
                  <div className="lg:col-span-5 flex items-center justify-end">
                     <div className="glass-card w-full lg:max-w-sm rounded-[2rem] p-8 border border-white/[0.08] shadow-2xl space-y-6 bg-[#080d20]">
                        <div className="inline-block px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 w-full text-center mb-2">
                           <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white">Join the First 400 Pioneers</span>
                        </div>
                        
                        <p className="text-sm text-slate-300 leading-relaxed">
                           We are currently in Phase 1 of the HedraFi rollout. The first 400 stakers are more than just users—they are the Pioneers who anchor the network. By staking 1,500 HBAR or more, you secure your place in the governance of the next great Hedera utility.
                        </p>

                        <button className="w-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-bold py-4 rounded-xl transition-all text-xs tracking-widest uppercase mt-4">
                           Secure Your Spot
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* SECTION 2: Layout - Stats on Top */}
            <div className="w-full">
               <StakingStats />
            </div>

            {/* SECTION 3: Stake Panel & Wallet Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
               {/* Left column: Staking Form */}
               <div className="lg:col-span-7 xl:col-span-8 space-y-10">
                  <StakePanel />
               </div>

               {/* Right column: Wallet Overview */}
               <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-40">
                  <div className="glass-card p-6 rounded-[3rem] border border-white/[0.05] bg-[#0A1024] shadow-2xl">
                     <WalletInfo />
                  </div>
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
