import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { Search, SlidersHorizontal, LayoutGrid, ArrowRight } from 'lucide-react';
import MarketplaceCountdown from './MarketplaceCountdown';
import AssetCard from '../shared/AssetCard';

const nftAssets = [
  { id: 5, name: 'Cosmic Dragon #042', price: '150 ℏ', volume: '12K', image: 'https://images.unsplash.com/photo-1634979148467-ed5b07449553?w=800', collection: 'Cosmic Dragons' },
  { id: 6, name: 'Cyberpunk Skyline', price: '450 ℏ', volume: '89K', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800', collection: 'Neon Nights' },
  { id: 7, name: 'Ethereal Landscape', price: '25 ℏ', volume: '1.2K', image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800', collection: 'Abstract Minds' },
  { id: 8, name: 'Neon Genesis', price: '88 ℏ', volume: '5K', image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=800', collection: 'Genesis Core' }
];

const MarketplaceHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'PFP', 'Art', 'Gaming', 'Virtual Worlds', 'Music'];

  useEffect(() => {
    const loader = document.getElementById("startup-loader");
    if (loader) loader.style.display = "none";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#02050E] overflow-hidden text-slate-200 font-sans">
      {/* Dark Mode Background Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-cyan-600/5 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <Header />

      <main className="relative z-10 w-full pt-20">
        {/* Marketplace Hero */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/[0.05]">
          <div className="container-main flex flex-col items-center text-center space-y-12">
            <div className="space-y-6 max-w-4xl animate-reveal">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-white">
                Trade Premium <br />
                <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                   Digital Collectibles
                </span>
              </h1>
            </div>

            {/* Futuristic Search */}
            <div className="w-full max-w-3xl space-y-8 animate-reveal" style={{animationDelay: '0.1s'}}>
               <div className="bg-[#050A15]/80 p-2 rounded-[16px] border border-white/[0.05] relative group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] focus-within:border-cyan-500/30 transition-colors">
                  <div className="absolute inset-0 rounded-[16px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 bg-cyan-500/10"></div>
                  <div className="relative flex items-center">
                     <div className="pl-6 text-slate-500">
                       <Search size={24} />
                     </div>
                     <input
                       type="text"
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       placeholder="Search collections, artists, or attributes..."
                       className="w-full bg-transparent p-5 text-white outline-none font-bold placeholder:text-slate-600 text-lg"
                     />
                     <div className="pr-2 hidden md:block">
                        <button className="bg-[#02050E] border border-white/[0.05] hover:border-cyan-500/30 text-slate-300 hover:text-cyan-400 px-8 py-4 rounded-[12px] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2">
                           <SlidersHorizontal size={14} /> Filters
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap justify-center gap-3 animate-reveal" style={{animationDelay: '0.2s'}}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSearchQuery(cat === 'All' ? '' : cat)}
                  className={`px-6 py-2 rounded-[8px] font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-300 ${
                      searchQuery === cat || (cat === 'All' && searchQuery === '')
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                      : 'bg-[#050A15] border border-white/[0.05] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Asset Grid Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="container-main space-y-12 animate-reveal" style={{animationDelay: '0.3s'}}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/[0.05] pb-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[16px] flex items-center justify-center border bg-cyan-500/10 border-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                     <LayoutGrid size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Trending Collections</h2>
                    <p className="text-slate-500 font-medium text-lg mt-1">Curated digital assets hitting the chain.</p>
                  </div>
               </div>
               <button 
                  onClick={() => { setSearchQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors flex items-center gap-2 bg-[#050A15] border border-white/[0.05] px-6 py-3 rounded-[8px] hover:border-cyan-500/30"
               >
                  View All <ArrowRight size={14} />
               </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {nftAssets.map((asset) => (
                <Link to={`/marketplace/collection/${asset.id}`} key={asset.id} className="block h-full">
                    <AssetCard asset={asset} type="nft" />
                </Link>
              ))}
            </div>

            <div className="w-full flex flex-col items-center justify-center pt-32 text-center space-y-10 border-t border-white/[0.05] mt-24">
              <div className="space-y-4 max-w-2xl px-6">
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                  Global Trading <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">Initializing</span>
                </h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  Full secondary marketplace capabilities are unlocking shortly.
                </p>
              </div>

              <div className="py-6 w-full">
                 <MarketplaceCountdown />
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