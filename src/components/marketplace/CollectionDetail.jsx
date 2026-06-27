import { Link } from 'react-router-dom';
import AssetCard from '../shared/AssetCard';
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { ArrowLeft, CheckCircle, LayoutGrid, TrendingUp, BarChart, Users, ShoppingBag, ShieldCheck } from 'lucide-react';

// Mock collection data using new unified structure
const mockCollection = {
  id: 1,
  name: 'Cosmic Dragons',
  type: 'nft',
  description: 'A collection of mythical dragons from across the cosmos, each with unique powers and abilities. This premium collection features hand-crafted artwork and immersive lore.',
  banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
  logo: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=200&auto=format&fit=crop',
  creator: {
    name: 'SpaceArtist Studio',
    address: '0.0.123456',
    verified: true
  },
  stats: {
    items: 50,
    owners: 32,
    floor: '45',
    volume: '2.4K',
    listed: 12
  },
  nfts: [
    { id: 1, name: 'Cosmic Dragon #001', collection: 'Cosmic Dragons', price: '50 ℏ', image: 'https://images.unsplash.com/photo-1634979148467-ed5b07449553?w=600' },
    { id: 2, name: 'Cosmic Dragon #007', collection: 'Cosmic Dragons', price: '45 ℏ', image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=600' },
    { id: 3, name: 'Cosmic Dragon #013', collection: 'Cosmic Dragons', price: '55 ℏ', image: 'https://images.unsplash.com/photo-1635273051725-97da70718990?w=600' },
    { id: 4, name: 'Cosmic Dragon #021', collection: 'Cosmic Dragons', price: '48 ℏ', image: 'https://images.unsplash.com/photo-1642534277313-093ca399e469?w=600' }
  ]
};

const CollectionDetail = () => {
  return (
    <div className="relative min-h-screen bg-[#030712] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 rounded-full blur-[120px] animate-blob" style={{animationDelay: '2s'}}></div>
      </div>

      <Header />

      <main className="relative z-10 pt-20 pb-20">
        {/* Banner Section */}
        <div className="relative h-[45vh] w-full overflow-hidden">
          <img 
            src={mockCollection.banner} 
            alt={mockCollection.name}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full">
            <div className="container-main pb-12">
               <Link to="/marketplace" className="inline-flex items-center gap-3 text-slate-400 hover:text-white mb-8 group transition-all">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                     <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Marketplace</span>
               </Link>
            </div>
          </div>
        </div>

        <div className="container-main -mt-24 relative z-20">
          <div className="flex flex-col gap-16">
            {/* Collection Identity Card */}
            <div className="glass-premium p-8 md:p-12 rounded-[3.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10">
                {/* Logo */}
                <div className="w-48 h-48 rounded-[16px] overflow-hidden border-4 border-[#030712] flex-shrink-0 shadow-2xl relative group">
                  <img 
                    src={mockCollection.logo} 
                    alt={mockCollection.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>

                {/* Identity Info */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                  <div className="space-y-4">
                     <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-2">{mockCollection.name}</h1>
                     <div className="flex items-center justify-center lg:justify-start gap-4">
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Curated By</span>
                        <div className="flex items-center gap-2 group cursor-pointer bg-white/5 px-4 py-2 rounded-full border border-white/5">
                           <span className="text-white font-black uppercase tracking-widest text-xs group-hover:text-pink-400 transition-colors">{mockCollection.creator.name}</span>
                           {mockCollection.creator.verified && (
                              <ShieldCheck size={16} className="text-emerald-400" />
                           )}
                        </div>
                     </div>
                  </div>
                  <p className="text-slate-400 text-lg font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0">
                     {mockCollection.description}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-12 pt-12 border-t border-white/10">
                {[
                   { label: 'Artifacts', value: mockCollection.stats.items, icon: LayoutGrid },
                   { label: 'Custodians', value: mockCollection.stats.owners, icon: Users },
                   { label: 'Floor Level', value: `${mockCollection.stats.floor} ℏ`, icon: TrendingUp, color: 'text-white' },
                   { label: 'Total Volume', value: `${mockCollection.stats.volume} ℏ`, icon: BarChart, color: 'text-pink-400' },
                   { label: 'Listed', value: `${mockCollection.stats.listed}%`, icon: ShoppingBag }
                ].map((stat, idx) => (
                   <div key={idx} className="bg-black/20 p-6 rounded-[16px] hover:bg-white/5 transition-all border border-white/5 group">
                      <div className="flex items-center gap-2 mb-3">
                         <stat.icon size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                         <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</span>
                      </div>
                      <div className={`text-3xl font-black tracking-tighter ${stat.color || 'text-white'}`}>{stat.value}</div>
                   </div>
                ))}
              </div>
            </div>

            {/* Gallery Section */}
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 pb-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-[16px] bg-white/5 flex items-center justify-center border border-white/10">
                      <LayoutGrid size={24} className="text-white" />
                   </div>
                   <h2 className="text-3xl font-black text-white tracking-tight">Collection Items</h2>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <select className="flex-1 md:w-64 bg-black/40 border border-white/10 rounded-full px-6 py-4 font-black uppercase tracking-[0.2em] text-[10px] text-slate-300 outline-none focus:border-white/30 transition-all cursor-pointer">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Recently Listed</option>
                    <option>Highest Rarity</option>
                  </select>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockCollection.nfts.map((nft) => (
                   <Link to={`/marketplace/nft/${nft.id}/1`} key={nft.id}>
                     <AssetCard asset={nft} type={mockCollection.type} />
                   </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionDetail;