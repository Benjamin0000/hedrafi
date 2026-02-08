import { Link } from 'react-router-dom';
import NFTCard from '../shared/NFTCard';
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import { ArrowLeft, CheckCircle, LayoutGrid, TrendingUp, BarChart, Users, ShoppingBag, Waves } from 'lucide-react';

// Mock collection data
const mockCollection = {
  id: 1,
  name: 'Cosmic Dragons',
  description: 'A collection of mythical dragons from across the cosmos, each with unique powers and abilities. This premium collection features hand-crafted artwork and immersive lore.',
  banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
  logo: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=200&auto=format&fit=crop',
  creator: {
    name: 'SpaceArtist',
    address: '0.0.123456',
    verified: true
  },
  stats: {
    items: 50,
    owners: 32,
    floor: '45',
    volume: '2,450',
    listed: 12
  },
  nfts: [
    { id: 1, name: 'Cosmic Dragon #001', collection: 'Cosmic Dragons', price: '50', image: 'https://images.unsplash.com/photo-1634979148467-ed5b07449553?q=80&w=400&auto=format&fit=crop', isNew: true },
    { id: 2, name: 'Cosmic Dragon #007', collection: 'Cosmic Dragons', price: '45', image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=400&auto=format&fit=crop', isNew: false },
    { id: 3, name: 'Cosmic Dragon #013', collection: 'Cosmic Dragons', price: '55', image: 'https://images.unsplash.com/photo-1635273051725-97da70718990?q=80&w=400&auto=format&fit=crop', isNew: false },
    { id: 4, name: 'Cosmic Dragon #021', collection: 'Cosmic Dragons', price: '48', image: 'https://images.unsplash.com/photo-1642534277313-093ca399e469?q=80&w=400&auto=format&fit=crop', isNew: false }
  ]
};

const CollectionDetail = () => {
  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20">
        {/* Banner Section */}
        <div className="relative h-[40vh] w-full overflow-hidden">
          <img 
            src={mockCollection.banner} 
            alt={mockCollection.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040816] via-[#040816]/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full">
            <div className="container-main px-4 sm:px-6 lg:px-8 pb-12">
               <Link to="/marketplace" className="inline-flex items-center gap-3 text-slate-400 hover:text-white mb-8 group transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                     <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Gallery Explorer</span>
               </Link>
            </div>
          </div>
        </div>

        <div className="container-main px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
          <div className="flex flex-col gap-16">
            {/* Collection Identity Card */}
            <div className="glass-card p-8 md:p-12 rounded-[3.5rem] border-white/[0.05] shadow-2xl bg-[#040A1A]/80 backdrop-blur-2xl">
              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10">
                {/* Logo */}
                <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-white/10 flex-shrink-0 shadow-2xl relative group">
                  <img 
                    src={mockCollection.logo} 
                    alt={mockCollection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Identity Info */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                  <div className="space-y-4">
                     <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-2">{mockCollection.name}</h1>
                     <div className="flex items-center justify-center lg:justify-start gap-4">
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Curated By</span>
                        <div className="flex items-center gap-2 group cursor-pointer">
                           <span className="text-cyber-blue font-black uppercase tracking-widest text-sm hover:text-white transition-colors">{mockCollection.creator.name}</span>
                           {mockCollection.creator.verified && (
                              <CheckCircle size={16} className="text-cyber-blue" />
                           )}
                        </div>
                     </div>
                  </div>
                  <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
                     {mockCollection.description}
                  </p>
                </div>

                {/* Header Stats */}
                <div className="hidden xl:flex flex-col gap-4 border-l border-white/5 pl-10">
                   <div className="bg-blue-600/5 border border-blue-500/10 px-6 py-4 rounded-3xl">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Floor Price</div>
                      <div className="text-2xl font-mono font-black text-white">{mockCollection.stats.floor} <span className="text-[10px] text-cyber-blue">HBAR</span></div>
                   </div>
                   <div className="bg-white/5 border border-white/5 px-6 py-4 rounded-3xl">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Total Volume</div>
                      <div className="text-2xl font-mono font-black text-white">{mockCollection.stats.volume} <span className="text-[10px] text-slate-500">HBAR</span></div>
                   </div>
                </div>
              </div>

              {/* Stats Grid - Mobile/Tablet Responsive */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-12 pt-12 border-t border-white/5">
                {[
                   { label: 'Artifacts', value: mockCollection.stats.items, icon: LayoutGrid },
                   { label: 'Custodians', value: mockCollection.stats.owners, icon: Users },
                   { label: 'Floor Level', value: `${mockCollection.stats.floor} ℏ`, icon: TrendingUp, color: 'text-cyber-blue' },
                   { label: 'Protocol Vol', value: `${mockCollection.stats.volume} ℏ`, icon: BarChart },
                   { label: 'Listed Units', value: mockCollection.stats.listed, icon: ShoppingBag }
                ].map((stat, idx) => (
                   <div key={idx} className="bg-white/[0.03] p-6 rounded-3xl hover:bg-white/[0.05] transition-all border border-transparent hover:border-white/5 group">
                      <div className="flex items-center gap-2 mb-2">
                         <stat.icon size={12} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                         <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</span>
                      </div>
                      <div className={`text-2xl font-mono font-black ${stat.color || 'text-white'}`}>{stat.value}</div>
                   </div>
                ))}
              </div>
            </div>

            {/* Gallery Section */}
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 pb-10">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-2xl bg-blue-600/5 flex items-center justify-center border border-white/5">
                      <LayoutGrid size={20} className="text-blue-500" />
                   </div>
                   <h2 className="text-3xl font-black text-white tracking-tight">Artifact Collection</h2>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <select className="flex-1 md:w-64 bg-[#030712] border border-white/10 rounded-2xl px-6 py-4 font-black uppercase tracking-[0.2em] text-[10px] text-slate-400 outline-none focus:border-blue-500/50 transition-all cursor-pointer shadow-inner">
                    <option>Sort: Valuation Ascending</option>
                    <option>Sort: Valuation Descending</option>
                    <option>Sort: Recently Deployed</option>
                    <option>Sort: Metadata Chronology</option>
                  </select>
                </div>
              </div>

              {/* NFT Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                {mockCollection.nfts.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
              </div>
            </div>

            {/* Analytics Coming Soon Overlay */}
            <div className="glass-card rounded-[4rem] border-white/[0.05] p-16 md:p-24 text-center relative overflow-hidden group shadow-2xl shadow-indigo-500/10">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.03] via-transparent to-indigo-600/[0.03]"></div>
               <div className="relative z-10 space-y-8">
                  <div className="w-24 h-24 bg-blue-600/5 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-[1s]">
                     <Waves size={48} className="text-cyber-blue animate-pulse" />
                  </div>
                  <div className="space-y-4 max-w-xl mx-auto">
                     <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">Spectral Analytics</h3>
                     <p className="text-slate-400 text-lg font-medium leading-relaxed">Cryptographic price charts, custodial transit history, and HTS volume analytics are being synchronized with the Hedera Mirror Node.</p>
                  </div>
                  <div className="pt-4">
                     <span className="bg-blue-600/10 border border-blue-500/20 text-cyber-blue text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.3em] inline-block shadow-lg">Protocol Synchronization In Progress</span>
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

export default CollectionDetail;