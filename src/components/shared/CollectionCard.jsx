import { Link } from 'react-router-dom';

const CollectionCard = ({ collection }) => {
  return (
    <Link to={`/marketplace/collection/${collection.id}`}>
      <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-purple-500/20 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105 shadow-xl group">
        <div className="relative h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
          {collection.banner && (
            <img 
              src={collection.banner} 
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
        </div>
        <div className="relative px-4 -mt-12">
          <div className="w-20 h-20 rounded-xl border-4 border-gray-900 overflow-hidden bg-gray-800 shadow-xl">
            <img 
              src={collection.logo} 
              alt={collection.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="p-4 pt-2">
          <h3 className="text-xl font-bold mb-1 truncate">{collection.name}</h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">{collection.description}</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-900/50 p-2 rounded-lg text-center">
              <div className="text-xs text-gray-400">Items</div>
              <div className="font-bold text-sm">{collection.items}</div>
            </div>
            <div className="bg-gray-900/50 p-2 rounded-lg text-center">
              <div className="text-xs text-gray-400">Owners</div>
              <div className="font-bold text-sm">{collection.owners}</div>
            </div>
            <div className="bg-gray-900/50 p-2 rounded-lg text-center">
              <div className="text-xs text-gray-400">Floor</div>
              <div className="font-bold text-sm text-purple-300">{collection.floor}ℏ</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;