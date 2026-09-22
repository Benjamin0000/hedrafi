// import { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Footer from "../shared/Footer";
// import AssetCard from '../shared/AssetCard';
// import MarketplaceSidebar from '../shared/MarketplaceSidebar';
// import MobileTopBar from '../shared/MobileTopBar';
// import CreatorsPanel from '../shared/CreatorsPanel';
// import StatsPanel from '../shared/StatsPanel';
// import AmbientBackground from '../shared/AmbientBackground';

// import {
//     Search,
//     ChevronDown
// } from 'lucide-react';


// /* =========================================================
//    DEMO DATA
// ========================================================= */

// const featuredCreators = [
//     {
//         id: 1,
//         name: 'Nova Studios',
//         username: '@novastudios',
//         avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300',
//         items: 24,
//         verified: true
//     },
//     {
//         id: 2,
//         name: 'Genesis Labs',
//         username: '@genesislabs',
//         avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
//         items: 18,
//         verified: true
//     },
//     {
//         id: 3,
//         name: 'Digital Archive',
//         username: '@digitalarchive',
//         avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
//         items: 31,
//         verified: true
//     },
//     {
//         id: 4,
//         name: 'Pixel Studio',
//         username: '@pixelstudio',
//         avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
//         items: 12,
//         verified: true
//     }
// ];


// const marketplaceStats = [
//     { label: 'Total Volume', value: '$62.18M' },
//     { label: 'Number of NFTs', value: '26,140' },
//     { label: 'Return of NFTs', value: '32.89%' },
//     { label: 'Avg. Sale Price', value: '186 ℏ' }
// ];


// const walletInfo = {
//     address: '0.0.4829173',
//     hbarBalance: '1,240.55',
//     hdfiBalance: '8,420.00'
// };


// const nftAssets = [
//     {
//         id: 1,
//         name: 'Cosmic Dragon #042',
//         price: '150 ℏ',
//         image: 'https://images.unsplash.com/photo-1634979148467-ed5b07449553?w=900',
//         collection: 'Cosmic Dragons',
//         creator: 'Nova Studios',
//         verified: true,
//         category: 'Art',
//         trending: true
//     },
//     {
//         id: 2,
//         name: 'Neon Genesis #088',
//         price: '88 ℏ',
//         image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=900',
//         collection: 'Genesis Core',
//         creator: 'Genesis Labs',
//         verified: true,
//         category: 'Gaming'
//     },
//     {
//         id: 3,
//         name: 'Ethereal Horizon',
//         price: '245 ℏ',
//         image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900',
//         collection: 'Abstract Minds',
//         creator: 'Digital Archive',
//         verified: true,
//         category: 'Art',
//         featured: true
//     },
//     {
//         id: 4,
//         name: 'Neon Relic #21',
//         price: '72 ℏ',
//         image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=900',
//         collection: 'Neo Relics',
//         creator: 'Artifact Labs',
//         verified: true,
//         category: 'Collectibles',
//         trending: true
//     },
//     {
//         id: 5,
//         name: 'Cyberpunk Skyline',
//         price: '450 ℏ',
//         image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900',
//         collection: 'Neon Nights',
//         creator: 'Cyber Labs',
//         verified: true,
//         category: 'Art'
//     },
//     {
//         id: 6,
//         name: 'Genesis Core #104',
//         price: '120 ℏ',
//         image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=900',
//         collection: 'Genesis Core',
//         creator: 'Genesis Labs',
//         verified: true,
//         category: 'Gaming',
//         trending: true
//     },
//     {
//         id: 7,
//         name: 'Digital Memory #07',
//         price: '64 ℏ',
//         image: 'https://images.unsplash.com/photo-1634979148467-ed5b07449553?w=900',
//         collection: 'Digital Memories',
//         creator: 'Digital Archive',
//         verified: true,
//         category: 'Collectibles'
//     },
//     {
//         id: 8,
//         name: 'Abstract Form #19',
//         price: '95 ℏ',
//         image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900',
//         collection: 'Abstract Minds',
//         creator: 'Pixel Studio',
//         verified: true,
//         category: 'Art'
//     }
// ];


// const categories = [
//     'All',
//     'Art',
//     'Collectibles',
//     'Gaming',
//     'Music'
// ];


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const MarketplaceHome = () => {

//     const [searchQuery, setSearchQuery] = useState('');
//     const [activeCategory, setActiveCategory] = useState('All');
//     const [sidebarOpen, setSidebarOpen] = useState(false);


//     /* =====================================================
//        STARTUP LOADER
//     ===================================================== */

//     useEffect(() => {

//         const loader = document.getElementById("startup-loader");

//         if (loader) {
//             loader.style.display = "none";
//         }

//     }, []);


//     /* =====================================================
//        LOCK BODY SCROLL WHEN MOBILE DRAWER IS OPEN
//     ===================================================== */

//     useEffect(() => {

//         document.body.style.overflow = sidebarOpen ? 'hidden' : '';

//         return () => {
//             document.body.style.overflow = '';
//         };

//     }, [sidebarOpen]);


//     /* =====================================================
//        FILTER NFTs
//     ===================================================== */

//     const filteredAssets = useMemo(() => {

//         const query = searchQuery.trim().toLowerCase();

//         return nftAssets.filter((asset) => {

//             const matchesCategory =
//                 activeCategory === 'All' ||
//                 asset.category === activeCategory;

//             const matchesSearch =
//                 !query ||
//                 asset.name.toLowerCase().includes(query) ||
//                 asset.collection.toLowerCase().includes(query) ||
//                 asset.creator.toLowerCase().includes(query);

//             return matchesCategory && matchesSearch;

//         });

//     }, [searchQuery, activeCategory]);


//     return (

//         <div className="relative min-h-screen bg-[#030712] text-slate-200 font-sans">


//             {/* =====================================================
//                 AMBIENT BACKGROUND
//             ===================================================== */}

//             <AmbientBackground />


//             {/* =====================================================
//                 MOBILE TOP BAR (replaces <Header/> on small screens)
//             ===================================================== */}

//             <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />


//             {/* =====================================================
//                 BODY — sidebar / gallery / right column
//             ===================================================== */}

//             <div className="relative z-10 flex items-start">


//                 {/* =========================================
//                     SIDEBAR (desktop sticky column + mobile drawer)
//                 ========================================= */}

//                 <MarketplaceSidebar
//                     isOpen={sidebarOpen}
//                     onClose={() => setSidebarOpen(false)}
//                     wallet={walletInfo}
//                     onDisconnect={() => {}}
//                 />


//                 {/* =========================================
//                     CENTER: GALLERY
//                 ========================================= */}

//                 <main className="flex-1 min-w-0">


//                     {/* Sticky toolbar — pinned under the mobile top bar on
//                         small screens, pinned to the viewport top on desktop */}

//                     <div className="sticky top-14 lg:top-0 z-20 bg-[#030712]/90 backdrop-blur-md border-b border-white/[0.05] px-4 sm:px-6 lg:px-8 py-4">

//                         <div className="flex flex-wrap items-center justify-between gap-3">

//                             <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
//                                 NFT Gallery
//                             </h1>


//                             <div className="flex items-center gap-2 flex-1 sm:flex-none sm:min-w-[420px]">


//                                 {/* Search */}

//                                 <div className="flex-1 flex items-center gap-2 bg-[#050A15] border border-white/[0.07] rounded-xl px-3.5 py-2.5">

//                                     <Search size={15} className="text-slate-600 shrink-0" />

//                                     <input
//                                         type="text"
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                         placeholder="Search"
//                                         className="flex-1 min-w-0 bg-transparent outline-none text-xs text-white placeholder:text-slate-600"
//                                     />

//                                 </div>


//                                 {/* Category select */}

//                                 <div className="relative shrink-0">

//                                     <select
//                                         value={activeCategory}
//                                         onChange={(e) => setActiveCategory(e.target.value)}
//                                         className="appearance-none bg-[#050A15] border border-white/[0.07] rounded-xl pl-3.5 pr-8 py-2.5 text-[11px] font-bold text-slate-300 outline-none cursor-pointer hover:border-emerald-500/25 transition-colors"
//                                     >

//                                         {categories.map((category) => (
//                                             <option key={category} value={category}>
//                                                 {category === 'All' ? 'All tabs' : category}
//                                             </option>
//                                         ))}

//                                     </select>


//                                     <ChevronDown
//                                         size={13}
//                                         className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600"
//                                     />

//                                 </div>

//                             </div>

//                         </div>

//                     </div>


//                     <div className="px-4 sm:px-6 lg:px-8 py-6">


//                         {/* =====================================
//                             MOBILE / TABLET — creators + stats
//                             surfaced inline instead of hidden
//                         ===================================== */}

//                         {/* <div className="xl:hidden flex gap-4 overflow-x-auto pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-col scrollbar-hide">

//                             <CreatorsPanel creators={featuredCreators} />

//                             <StatsPanel stats={marketplaceStats} />

//                         </div> */}


//                         {/* Empty state */}

//                         {filteredAssets.length === 0 ? (

//                             <div className="py-20 rounded-2xl border border-white/[0.05] bg-[#050A15] text-center">

//                                 <div className="w-12 h-12 mx-auto rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-600">
//                                     <Search size={20} />
//                                 </div>

//                                 <h3 className="text-lg font-black text-white mt-4">
//                                     No NFTs found
//                                 </h3>

//                                 <p className="text-sm text-slate-600 mt-2">
//                                     Try another search or category.
//                                 </p>

//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setSearchQuery('');
//                                         setActiveCategory('All');
//                                     }}
//                                     className="mt-5 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.16em] text-emerald-300 hover:bg-emerald-500/15 transition-colors"
//                                 >
//                                     Clear filters
//                                 </button>

//                             </div>

//                         ) : (

//                             <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">

//                                 {filteredAssets.map((asset) => (

//                                     <Link
//                                         to={`/marketplace/nft/${asset.id}`}
//                                         key={asset.id}
//                                         className="block h-full"
//                                     >

//                                         <AssetCard asset={asset} type="nft" />

//                                     </Link>

//                                 ))}

//                             </div>

//                         )}

//                     </div>


//                     {/* <Footer /> */}

//                 </main>


//                 {/* =========================================
//                     RIGHT: CREATORS + STATS (desktop only)
//                 ========================================= */}

//                 <div className="hidden xl:flex flex-col gap-5 w-80 shrink-0 sticky top-6 self-start py-6 pr-6">

//                     <CreatorsPanel creators={featuredCreators} />

//                     <StatsPanel stats={marketplaceStats} />

//                 </div>

//             </div>

//         </div>
//     );
// };


// export default MarketplaceHome;



import { useState, useMemo } from 'react';
import MarketplaceSidebar from "../shared/MarketplaceSidebar";
import MobileTopBar from "../shared/MobileTopBar";
import AmbientBackground from "../shared/AmbientBackground";
import FuturisticCountdownSmall, { getTarget28th } from "../shared/FuturisticCountdownSmall";

const MarketplaceHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const target = useMemo(() => getTarget28th(), []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-200">
      <AmbientBackground />
      <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />
      <div className="relative z-10 flex items-start">
        <MarketplaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onDisconnect={() => {}} />
        <main className="flex-1 min-w-0 min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text- font-black tracking-[0.3em] text-slate-600 uppercase mb-4">Explore</p>
            <FuturisticCountdownSmall targetDate={target} />
            <p className="text- text-slate-600 mt-4">Marketplace is locked until launch</p>
          </div>
        </main>
      </div>
    </div>
  );
};
export default MarketplaceHome;