import { Link } from 'react-router-dom';
import { convertIpfsToPinata } from "../../lib/marketplace"

const NFTCard = ({ nft }) => {
  return (
    <Link to={`/marketplace/nft/${nft.token_id}/${nft.id}`} className="group block">
      <div className="glass rounded-[2rem] border-white/5 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-white/[0.03] hover:border-blue-500/30 shadow-2xl relative">
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={convertIpfsToPinata(nft.image_url)} 
            alt={nft.name}
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute top-4 right-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
             <span className="bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-cyber-blue text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                New Drop
             </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-1">
             <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 leading-none">Serial #{(nft.id % 999).toString().padStart(3, '0')}</div>
             <h3 className="text-xl font-bold text-white truncate leading-tight group-hover:text-cyber-blue transition-colors">{nft.name}</h3>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div>
              <div className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">List Price</div>
              <div className="text-lg font-mono font-black text-cyber-blue">
                 {Number(nft.price).toFixed(2)} <span className="text-[10px] text-gray-500 font-bold">ℏ</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all">
               →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;