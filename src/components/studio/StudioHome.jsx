import { Link } from 'react-router-dom';
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import { Palette, Folder, Gem, Trophy, Zap, Sparkles, Box, LayoutPanelLeft, Wallet, ArrowRight, Activity } from 'lucide-react';

const StudioHome = () => {
  const stats = [
    { label: 'NFTs Created', value: '12', icon: Palette },
    { label: 'Collections', value: '3', icon: Folder },
    { label: 'Volume Traded', value: '450 HRT', icon: Gem },
    { label: 'Artist Rank', value: 'Top 5%', icon: Trophy }
  ];

  const quickActions = [
    {
      title: 'Mint NFT',
      description: 'Deploy a new unique asset to Hedera',
      icon: Sparkles,
      link: '/studio/mint',
      color: 'bg-blue-600/10',
      border: 'border-blue-500/20'
    }, 
    {
      title: 'My Inventory',
      description: 'Manage and list your created assets',
      icon: Box,
      link: '/studio/mynfts',
      color: 'bg-indigo-600/10',
      border: 'border-indigo-500/20'
    }, 
    {
      title: 'Storefront',
      description: 'Customize your collector profile',
      icon: LayoutPanelLeft,
      link: '/studio/storefront',
      color: 'bg-cyber-blue/5',
      border: 'border-cyber-blue/20'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[100%] bg-indigo-600/5 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container-main">
          <div className="flex flex-col gap-12 md:gap-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
               <div className="space-y-4 max-w-3xl">
                  <div className="w-12 h-1 bg-cyber-blue rounded-full mb-6"></div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
                     Creator <span className="text-gradient">Studio</span>
                  </h1>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">
                     Precision tools for the modern digital architect. Engineer, mint, and showcase your rare collections with institutional-grade protocols.
                  </p>
               </div>
               <div className="glass-card px-8 py-5 rounded-3xl border-white/[0.05] flex items-center gap-5 shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/5 flex items-center justify-center border border-white/5">
                     <Activity size={24} className="text-cyber-blue animate-pulse" />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Network Node</div>
                     <div className="text-lg font-mono font-black text-white">SYNCHRONIZED</div>
                  </div>
               </div>
            </div>

            {/* Stats Grid */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <div 
                  key={i}
                  className="glass-card p-8 rounded-[2.5rem] border-white/[0.05] group hover:bg-[#0E1529] transition-all duration-500 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 leading-none">{stat.label}</div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/5 flex items-center justify-center border border-white/5 group-hover:border-blue-500/30 transition-colors shadow-inner">
                       <stat.icon size={20} className="text-cyber-blue" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-mono font-black text-white tracking-tighter">{stat.value}</div>
                </div>
              ))}
            </div> */}

            {/* Quick Actions */}
            <div className="space-y-10">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                 <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Action Matrix</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {quickActions.map((action, i) => (
                  <Link key={i} to={action.link} className="group">
                    <div className="glass-card h-full p-10 rounded-[3rem] border-white/[0.05] relative overflow-hidden transition-all duration-500 hover:bg-[#0E1529] hover:border-blue-500/20 hover:-translate-y-2 shadow-xl">
                      <div className={`absolute top-0 right-0 w-32 h-32 ${action.color} blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000`}></div>
                      <div className="relative z-10 space-y-8">
                         <div className="w-16 h-16 bg-blue-600/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-blue-500/30 transition-colors">
                            <action.icon size={32} className="text-cyber-blue group-hover:scale-110 transition-transform duration-500" />
                         </div>
                         <div className="space-y-3">
                            <h3 className="text-2xl font-black text-white tracking-tight">{action.title}</h3>
                            <p className="text-slate-400 font-medium leading-relaxed">{action.description}</p>
                         </div>
                         <div className="pt-2 flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            INITIALIZE SEQUENCE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                         </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Entry Point / Empty State */}
            <div className="glass-card p-12 md:p-24 rounded-[4rem] border-white/[0.05] text-center relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-blue-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 max-w-2xl mx-auto space-y-12">
                 <div className="space-y-8">
                    <div className="w-24 h-24 bg-blue-600/5 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/10 shadow-inner">
                       <Palette size={48} className="text-blue-500" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">Your Digital Legacy <br /><span className="text-gradient">Starts Now</span></h3>
                    <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
                       Our Studio provides institutional-grade tools to mint and manage your high-fidelity assets on the world's most sustainable ledger.
                    </p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-6 justify-center">
                   <Link to="/studio/mint" className="w-full sm:w-auto group">
                     <button className="btn-primary !px-12 !py-6 text-lg w-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10">Architect First Asset</span>
                     </button>
                   </Link>
                   <Link to="/studio/storefront" className="w-full sm:w-auto">
                     <button className="btn-glass !px-12 !py-6 text-lg w-full border border-white/5 hover:border-white/10">
                       Configure Presence
                     </button>
                   </Link>
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

export default StudioHome;