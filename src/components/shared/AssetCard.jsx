import { Link } from 'react-router-dom';
import { Building2, Image as ImageIcon, TrendingUp, ShieldCheck } from 'lucide-react';

const AssetCard = ({ asset, type }) => {
  // type is 'rwa' or 'nft'
  return (
    <div className="bg-[#050A15] border border-white/[0.05] rounded-[16px] p-4 group cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(34,211,238,0.2)] transition-all duration-500 hover:border-cyan-500/30">
        {/* Image / Visual */}
        <div className="relative aspect-square rounded-[16px] overflow-hidden mb-5">
            <img src={asset.image} alt={asset.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
                {type === 'rwa' ? (
                    <span className="badge-rwa flex items-center gap-1 backdrop-blur-md bg-black/40">
                        <Building2 size={12} /> RWA
                    </span>
                ) : (
                    <span className="badge-nft flex items-center gap-1 backdrop-blur-md bg-black/40">
                        <ImageIcon size={12} /> Digital
                    </span>
                )}
            </div>
        </div>

        {/* Info */}
        <div className="space-y-4 px-2">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-black text-xl leading-tight tracking-tight text-white group-hover:text-cyan-400 transition-colors">{asset.name}</h3>
                    {asset.collection && <p className="text-slate-400 text-sm font-medium mt-1">{asset.collection}</p>}
                </div>
                {type === 'rwa' && <ShieldCheck size={20} className="text-emerald-400 shrink-0" title="Verified Asset" />}
            </div>
            
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm border-t border-white/10 pt-4">
                {type === 'rwa' ? (
                    <>
                        <div className="flex flex-col">
                            <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Location</span>
                            <span className="font-bold text-slate-200 mt-1">{asset.location || 'Miami, FL'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Est. Yield</span>
                            <span className="font-black text-emerald-400 flex items-center gap-1 mt-1"><TrendingUp size={14}/> {asset.yield || '8.5% APY'}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Price</span>
                            <span className="font-bold text-slate-200 mt-1">{asset.price || '150 ℏ'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">Highest Bid</span>
                            <span className="font-black text-cyan-400 flex items-center gap-1 mt-1">120 ℏ</span>
                        </div>
                    </>
                )}
            </div>
            
            {/* Action */}
            <div className="pt-2">
               <button className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold text-sm transition-colors text-white group-hover:border-white/20">
                  {type === 'rwa' ? 'View Instrument Details' : 'View Asset Details'}
               </button>
            </div>
        </div>
    </div>
  );
};

export default AssetCard;
