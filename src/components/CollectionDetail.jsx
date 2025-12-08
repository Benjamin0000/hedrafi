import { useParams, Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import NFTCard from './NFTCard';

// Mock collection data
const mockCollection = {
  id: 1,
  name: 'Cosmic Dragons',
  description: 'A collection of mythical dragons from across the cosmos, each with unique powers and abilities. This premium collection features hand-crafted artwork and immersive lore.',
  banner: 'https://via.placeholder.com/1200x300/6366f1/ffffff',
  logo: 'https://via.placeholder.com/200/8b5cf6/ffffff',
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
    { id: 1, name: 'Cosmic Dragon #001', collection: 'Cosmic Dragons', price: '50', image: 'https://via.placeholder.com/400/6366f1/ffffff', isNew: true },
    { id: 2, name: 'Cosmic Dragon #007', collection: 'Cosmic Dragons', price: '45', image: 'https://via.placeholder.com/400/8b5cf6/ffffff', isNew: false },
    { id: 3, name: 'Cosmic Dragon #013', collection: 'Cosmic Dragons', price: '55', image: 'https://via.placeholder.com/400/a855f7/ffffff', isNew: false },
    { id: 4, name: 'Cosmic Dragon #021', collection: 'Cosmic Dragons', price: '48', image: 'https://via.placeholder.com/400/c084fc/ffffff', isNew: false }
  ]
};

const CollectionDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-white font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-xl bg-gray-900/50 border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} width={60} alt="HedraFi Logo"/> 
          </Link>
          <nav className="flex gap-6">
            <Link to="/studio" className="text-gray-300 hover:text-purple-400 transition-colors">Studio</Link>
            <Link to="/marketplace" className="text-purple-400 font-semibold">Marketplace</Link>
            <Link to="/staking" className="text-gray-300 hover:text-purple-400 transition-colors">Staking</Link>
          </nav>
        </div>
      </header>

      {/* Banner */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={mockCollection.banner} 
          alt={mockCollection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950"></div>
      </div>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 -mt-16">
        <Link to="/marketplace" className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-2 mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Marketplace
        </Link>

        {/* Collection Info */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-purple-500/20 shadow-2xl mb-8">
          <div className="flex items-start gap-6 mb-6">
            {/* Logo */}
            <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-purple-500/30 flex-shrink-0 shadow-xl">
              <img 
                src={mockCollection.logo} 
                alt={mockCollection.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{mockCollection.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gray-400">by</span>
                <div className="flex items-center gap-2">
                  <span className="text-purple-300 font-semibold">{mockCollection.creator.name}</span>
                  {mockCollection.creator.verified && (
                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{mockCollection.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-900/50 p-4 rounded-xl text-center">
              <div className="text-sm text-gray-400 mb-1">Items</div>
              <div className="text-2xl font-bold">{mockCollection.stats.items}</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl text-center">
              <div className="text-sm text-gray-400 mb-1">Owners</div>
              <div className="text-2xl font-bold">{mockCollection.stats.owners}</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl text-center">
              <div className="text-sm text-gray-400 mb-1">Floor Price</div>
              <div className="text-2xl font-bold text-purple-300">{mockCollection.stats.floor} ℏ</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl text-center">
              <div className="text-sm text-gray-400 mb-1">Volume</div>
              <div className="text-2xl font-bold">{mockCollection.stats.volume} ℏ</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl text-center">
              <div className="text-sm text-gray-400 mb-1">Listed</div>
              <div className="text-2xl font-bold">{mockCollection.stats.listed}</div>
            </div>
          </div>
        </div>

        {/* Filters & NFTs */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Items</h2>
            <div className="flex gap-3">
              <select className="bg-gray-800/50 border border-purple-500/20 rounded-xl px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Recently Listed</option>
                <option>Recently Created</option>
              </select>
            </div>
          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCollection.nfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </div>

        {/* Stats Section (Coming Soon) */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-12 border border-purple-500/20 text-center mb-8">
          <div className="text-5xl mb-4">📈</div>
          <h3 className="text-2xl font-bold mb-2">Activity & Analytics</h3>
          <p className="text-gray-400">Price charts, sales history, and collection analytics coming soon</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative backdrop-blur-xl bg-gray-900/50 border-t border-purple-500/20 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={logo} width={40} alt="HedraFi"/>
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  HedraFi
                </div>
                <div className="text-xs text-gray-400">Hedera's NFT Marketplace</div>
              </div>
            </div>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Discord</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Docs</a>
            </div>
          </div>
          <div className="text-center mt-6 text-gray-500 text-sm">
            © 2025 HedraFi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CollectionDetail;