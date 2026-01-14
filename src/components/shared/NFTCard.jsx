import { Link } from 'react-router-dom';
import { convertIpfsToPinata } from "../../lib/marketplace"

const NFTCard = ({ nft }) => {
  return (
    <Link to={`/marketplace/nft/${nft.id}`}>
      <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-purple-500/20 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105 shadow-xl group">
        <div className="relative aspect-square overflow-hidden bg-gray-900/50">
          <img 
            src={convertIpfsToPinata(nft.image_url)} 
            alt={nft.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW
          </span>
          {/* {nft.isNew && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </span>
          )} */}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold truncate">{nft.name}</h3>
              {/* <p className="text-sm text-gray-400 truncate">{nft.collection}</p> */}
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-purple-500/20">
            <div>
              <div className="text-xs text-gray-400">Price</div>
              <div className="font-bold text-purple-300">{Number(nft.price).toFixed(2)} HRT</div>
            </div>
            <button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg shadow-purple-500/30">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;