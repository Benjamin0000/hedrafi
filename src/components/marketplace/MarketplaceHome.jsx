import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import { Search, SlidersHorizontal, Rocket, Palette, ArrowRight, LayoutGrid, Sparkles } from 'lucide-react';
import MarketplaceCountdown from './MarketplaceCountdown';

const MarketplaceHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['All', 'Art', 'Gaming', 'Music', 'Photography', 'Sports'];

  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyber-blue/5 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <Header />

      <main className="relative z-10 w-full pt-20">
        {/* Marketplace Hero */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
          <div className="container-main flex flex-col items-center text-center space-y-12">
            <div className="space-y-6 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 text-cyber-blue text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-sm">
                <Sparkles size={12} className="text-cyber-blue" />
                The Premier Hedera NFT Hub
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] text-white">
                Digital <span className="text-gradient">Artifacts</span><br />
                & Rare Assets
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                Discover, collect, and trade the most prestigious digital properties on the world's most sustainable distributed ledger.
              </p>
            </div>

            {/* Futuristic Search */}
            <div className="w-full max-w-3xl glass-card p-2 rounded-[2.5rem] border-white/[0.05] relative group shadow-2xl">
               <div className="absolute inset-0 bg-blue-600/5 rounded-[2.5rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
               <div className="relative flex items-center">
                  <div className="pl-6 text-slate-500">
                    <Search size={24} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search collection, artist, or attribute..."
                    className="w-full bg-transparent p-6 text-white outline-none font-bold placeholder:text-slate-800 text-lg"
                  />
                  <div className="pr-4 hidden md:block">
                     <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-2">
                        <SlidersHorizontal size={14} /> Filters
                     </button>
                  </div>
               </div>
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat.toLowerCase())}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                    selectedCategory === cat.toLowerCase()
                    ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-500/20'
                    : 'bg-white/[0.03] border-white/5 text-slate-500 hover:text-white hover:bg-white/[0.08] hover:border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* NFT Gallery Section */}
        <section className="pb-32 px-4 sm:px-6 lg:px-8">
          <div className="container-main space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
               <div className="space-y-2">
                  <div className="flex items-center gap-2 text-cyber-blue">
                     <LayoutGrid size={16} />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">Market Catalog</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Latest Listings</h2>
                  <p className="text-slate-500 font-medium text-lg">Curated digital assets hitting the chain.</p>
               </div>
               <Link to="/marketplace" className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2 group">
                  EXPLORE ALL COLLECTIONS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>

            <div className="w-full flex flex-col items-center justify-center py-24 text-center space-y-12">
              <div className="w-24 h-24 rounded-[2rem] bg-blue-600/5 flex items-center justify-center border border-white/10">
                <Sparkles size={40} className="text-cyber-blue" />
              </div>

              <div className="space-y-4 max-w-2xl px-6">
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
                  Marketplace <span className="text-gradient">Launching Soon</span>
                </h3>
                <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
                  The HedraFi NFT marketplace is in its final stage of deployment. 
                  Soon you’ll be able to discover, trade, and collect premium digital assets on Hedera.
                </p>
              </div>

              <div className="py-10 w-full">
                 <MarketplaceCountdown />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl pt-6">
                <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-[#0A1024]/40 h-full flex flex-col items-start text-left group hover:border-white/10 transition-all">
                  <h4 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-cyber-blue transition-colors">Curated Collections</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">Explore high-quality creator launches and exclusive digital series.</p>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-[#0A1024]/40 h-full flex flex-col items-start text-left group hover:border-white/10 transition-all">
                  <h4 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-cyber-blue transition-colors">Seamless Trading</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">Fast, eco-friendly, and ultra-low fee NFT transactions on Hedera.</p>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-[#0A1024]/40 h-full flex flex-col items-start text-left group hover:border-white/10 transition-all">
                  <h4 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-cyber-blue transition-colors">Creator Economy</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">Advanced tools to launch, manage, and monetize your digital vision.</p>
                </div>
              </div>

              <div className="pt-10">
                <p className="text-cyber-blue text-sm font-black tracking-[0.2em] uppercase">
                  🎉 Early staking participants get priority access to NFT drops
                </p>
              </div>

              <div className='pt-8'>
                <Link to="/staking#stake-form" className="group">
                  <button className="btn-primary !px-16 !py-6 text-xl w-full sm:w-auto relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <Rocket size={24} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> Start Earning HRT
                      </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MarketplaceHome;