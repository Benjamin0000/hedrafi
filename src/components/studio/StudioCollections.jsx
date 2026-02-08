import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../shared/Modal';
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import { ArrowLeft, Archive, Plus, ShieldCheck, Database, Info } from 'lucide-react';

// Mock data
const mockCollections = [
  {
    id: 1,
    name: 'Cosmic Dragons',
    symbol: 'CDRG',
    description: 'A collection of mythical dragons from across the cosmos',
    royalty: 10,
    items: 50,
    banner: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1500',
    logo: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    name: 'Digital Dreamscape',
    symbol: 'DSCPE',
    description: 'Abstract art exploring the boundaries of digital reality',
    royalty: 5,
    items: 25,
    banner: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1500',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400'
  }
];

const StudioCollections = () => {
  const [collections] = useState(mockCollections);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openCollectionDetail = (collection) => {
    setSelectedCollection(collection);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyber-blue/5 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <Header />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
           <div className="space-y-4">
              <Link to="/studio" className="inline-flex items-center gap-3 text-slate-500 hover:text-white transition-all group">
                 <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-blue-600/20 transition-all">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Studio</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                 Creative <span className="text-gradient">Vaults</span>
              </h1>
              <p className="text-slate-400 max-w-xl font-medium leading-relaxed">
                 Manage your HTS-powered NFT collections with professional-grade metadata control and protocol-level security.
              </p>
           </div>
           <button
             disabled
             className="btn-glass opacity-50 cursor-not-allowed text-[10px] font-black tracking-[0.2em] uppercase flex items-center gap-2"
           >
             <Plus size={14} /> NEW COLLECTION (V2)
           </button>
        </div>

        {collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <div
                key={collection.id}
                onClick={() => openCollectionDetail(collection)}
                className="glass-card group rounded-[3rem] border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col bg-[#02050E]"
              >
                {/* Banner Asset */}
                <div className="relative h-48 bg-white/5 overflow-hidden">
                  <img 
                    src={collection.banner} 
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02050E] to-transparent opacity-80"></div>
                </div>

                {/* Identity Area */}
                <div className="relative px-8 -mt-12 space-y-4 flex-grow flex flex-col">
                  <div className="w-24 h-24 rounded-3xl border-4 border-[#02050E] overflow-hidden bg-white/5 shadow-2xl relative z-10 mx-auto lg:mx-0">
                    <img 
                      src={collection.logo} 
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2 pb-8 flex-grow">
                     <div className="flex justify-between items-start">
                        <div>
                           <h3 className="text-2xl font-black text-white truncate group-hover:text-cyber-blue transition-colors tracking-tight">{collection.name}</h3>
                           <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{collection.symbol} Protocol</p>
                        </div>
                     </div>
                     <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">{collection.description}</p>
                  </div>

                  {/* Quantitative Data */}
                  <div className="grid grid-cols-2 gap-4 pb-8 border-t border-white/5 pt-6">
                    <div className="space-y-1">
                      <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Total Assets</div>
                      <div className="text-xl font-mono font-black text-white">{collection.items}</div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Royalties</div>
                      <div className="text-xl font-mono font-black text-cyan-400">{collection.royalty}%</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 glass-card rounded-[4rem] border-white/5 text-center space-y-8 bg-[#02050E]">
             <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/5">
                <Archive size={40} className="text-slate-600" />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-black text-white tracking-tight">No Vaults Initialized</h3>
                <p className="text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">Your creative ledger is currently empty. Initialize your first collection to start minting.</p>
             </div>
          </div>
        )}
      </main>

      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Vault Technical Specs"
        size="lg"
      >
        {selectedCollection && (
          <div className="space-y-10">
            {/* Immersive Header */}
            <div className="relative h-48 sm:h-64 rounded-[3rem] overflow-hidden group shadow-2xl border border-white/10 bg-[#02050E]">
              <img 
                src={selectedCollection.banner} 
                alt={selectedCollection.name}
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02050E] via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-8 left-8 flex items-end gap-6">
                 <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-[#02050E] bg-white/5 shadow-2xl relative z-20">
                    <img src={selectedCollection.logo} alt="" className="w-full h-full object-cover" />
                 </div>
                 <div className="pb-1 sm:pb-3 space-y-1">
                    <h2 className="text-2xl sm:text-4xl font-black text-white leading-none tracking-tight">{selectedCollection.name}</h2>
                    <p className="text-[10px] sm:text-xs font-black text-blue-400 uppercase tracking-[0.2em]">{selectedCollection.symbol} Protocol</p>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
               <div className="md:col-span-12 space-y-10">
                  <div className="space-y-4">
                     <div className="flex items-center gap-2">
                        <Info size={14} className="text-blue-500" />
                        <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Collection Manifesto</h4>
                     </div>
                     <p className="text-lg text-white font-medium leading-relaxed">{selectedCollection.description}</p>
                  </div>

                  {/* Tech Grid */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="glass-card p-8 rounded-[2.5rem] border-white/5 text-center space-y-2 bg-[#02050E]">
                      <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Supply Cap</div>
                      <div className="text-3xl font-mono font-black text-white">{selectedCollection.items}</div>
                    </div>
                    <div className="glass-card p-8 rounded-[2.5rem] border-white/5 text-center space-y-2 bg-[#02050E]">
                       <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">On-chain Fee</div>
                       <div className="text-3xl font-mono font-black text-cyan-400">{selectedCollection.royalty}%</div>
                    </div>
                    <div className="glass-card p-8 rounded-[2.5rem] border-white/5 text-center space-y-2 bg-[#02050E]">
                       <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Unique Owners</div>
                       <div className="text-3xl font-mono font-black text-slate-800">00</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 pt-6">
                    <button disabled className="btn-primary flex-1 !py-6 opacity-40 flex items-center justify-center gap-2">
                       <ShieldCheck size={20} /> MINT TOKEN TO VAULT
                    </button>
                    <button disabled className="btn-glass flex-1 !py-6 opacity-40 flex items-center justify-center gap-2">
                       <Database size={20} /> UPDATE METADATA
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-2 pb-4">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                     <p className="text-[10px] font-black text-center text-slate-600 uppercase tracking-[0.3em]">Technical updates locked by proxy admin</p>
                  </div>
               </div>
            </div>
          </div>
        )}
      </Modal>
      <Footer />
    </div>
  );
};

export default StudioCollections;