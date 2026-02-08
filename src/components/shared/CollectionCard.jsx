import { Link } from 'react-router-dom';

const CollectionCard = ({ collection }) => {
  return (
    <Link to={`/marketplace/collection/${collection.id}`} className="group block">
      <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden transition-all duration-500 hover:bg-white/[0.03] hover:border-blue-500/30 shadow-2xl relative">
        <div className="relative h-40 bg-white/5 overflow-hidden">
          {collection.banner && (
            <img 
              src={collection.banner} 
              alt={collection.name}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-base via-transparent to-transparent"></div>
        </div>
        
        <div className="relative px-6 -mt-10 flex flex-col items-center text-center space-y-4 pb-8">
          <div className="w-20 h-20 rounded-2xl border-4 border-brand-base overflow-hidden bg-brand-surface shadow-2xl group-hover:scale-110 transition-transform duration-500">
            <img 
              src={collection.logo} 
              alt={collection.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white truncate leading-tight group-hover:text-cyber-blue transition-colors">{collection.name}</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed line-clamp-2 max-w-[240px] px-2">{collection.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full pt-4">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Items</div>
              <div className="font-mono font-bold text-sm text-white">{collection.items}</div>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Owners</div>
              <div className="font-mono font-bold text-sm text-white">{collection.owners}</div>
            </div>
            <div className="bg-blue-600/10 p-3 rounded-2xl border border-blue-500/20">
              <div className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1">Floor</div>
              <div className="font-mono font-bold text-sm text-cyber-blue">{collection.floor}ℏ</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;