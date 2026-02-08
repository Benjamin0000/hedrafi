import { Link } from 'react-router-dom';
import { Paintbrush, ShoppingBag, ArrowRight } from 'lucide-react';
import WalletInfo from './WalletInfo';
import StakePanel from './StakePanel';
import StakingStats from './StakingStats';
import Header from "../shared/Header"
import Footer from "../shared/Footer"

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-blue/5 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container-main">
          <div className="flex flex-col gap-12 md:gap-16">
            {/* Dashboard Header */}
            <div className="space-y-4 max-w-3xl">
              <div className="w-12 h-1 bg-cyber-blue rounded-full mb-6"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
                Staking <span className="text-gradient">Infrastructure</span>
              </h1>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Secure your assets in the HedraFi protocol. Monitor multi-layered yield streams and participate in ecosystem governance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
              {/* Left Column: Wallet Info */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
                 <div className="glass-card p-2 rounded-[2.5rem] border-white/[0.05] shadow-2xl">
                    <WalletInfo />
                 </div>
              </div>

              {/* Right Column: Stats & Staking */}
              <div className="lg:col-span-8 space-y-8 md:space-y-12">
                <StakingStats />
                <StakePanel />

                {/* Ecosystem Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                   <div className="glass-card p-10 rounded-[3rem] border-white/[0.05] group hover:bg-[#0E1529] transition-all duration-500 shadow-xl overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="w-12 h-12 bg-blue-600/5 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                        <Paintbrush size={24} className="text-cyber-blue" />
                      </div>
                      <h3 className="text-2xl font-black mb-3 text-white tracking-tight">NFT Studio</h3>
                      <p className="text-slate-400 mb-8 leading-relaxed font-medium">Professional-grade creation tools with full HTS protocol support.</p>
                      <Link to="/studio" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 hover:text-white transition-colors">
                         Enter Studio <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                   </div>
                   
                   <div className="glass-card p-10 rounded-[3rem] border-white/[0.05] group hover:bg-[#0E1529] transition-all duration-500 shadow-xl overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="w-12 h-12 bg-blue-600/5 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                        <ShoppingBag size={24} className="text-cyber-blue" />
                      </div>
                      <h3 className="text-2xl font-black mb-3 text-white tracking-tight">Marketplace</h3>
                      <p className="text-slate-400 mb-8 leading-relaxed font-medium">High-liquidity secondary market for premium creative assets.</p>
                      <Link to="/marketplace" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 hover:text-white transition-colors">
                         View Market <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
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

export default Dashboard;