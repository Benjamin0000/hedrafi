import { useParams, Link } from 'react-router-dom';
import logo from "../assets/logo.png";

// Mock NFT data
const mockNFT = {
  id: 1,
  name: 'Cosmic Dragon #001',
  description: 'A legendary dragon from the depths of space, wielding cosmic powers beyond imagination. This rare piece is the first in the Cosmic Dragons collection.',
  image: 'https://via.placeholder.com/800/6366f1/ffffff',
  collection: {
    id: 1,
    name: 'Cosmic Dragons',
    logo: 'https://via.placeholder.com/100/8b5cf6/ffffff'
  },
  creator: {
    name: 'SpaceArtist',
    address: '0.0.123456',
    verified: true
  },
  owner: {
    name: 'CollectorDAO',
    address: '0.0.789012'
  },
  metadata: {
    tokenId: 'NFT001',
    standard: 'HTS',
    network: 'Hedera',
    contract: '0.0.654321'
  },
  attributes: [
    { trait: 'Rarity', value: 'Legendary' },
    { trait: 'Element', value: 'Cosmic' },
    { trait: 'Power Level', value: '9500' },
    { trait: 'Wings', value: 'Nebula' }
  ]
};

const NFTDetail = () => {
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

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        <Link to="/marketplace" className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-2 mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Image */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl sticky top-24 h-fit">
            <img 
              src={mockNFT.image} 
              alt={mockNFT.name}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Collection */}
            <Link to={`/marketplace/collection/${mockNFT.collection.id}`} className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
              <img src={mockNFT.collection.logo} alt={mockNFT.collection.name} className="w-6 h-6 rounded" />
              <span className="font-semibold">{mockNFT.collection.name}</span>
            </Link>

            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{mockNFT.name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Owned by</span>
                <span className="text-purple-300 font-semibold">{mockNFT.owner.name}</span>
              </div>
            </div>

            {/* Description */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20">
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{mockNFT.description}</p>
            </div>

            {/* Price Section */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl p-6 border border-purple-500/30">
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-1">Current Price</div>
                <div className="text-3xl font-bold">Coming Soon</div>
              </div>
              <button
                disabled
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg opacity-50 cursor-not-allowed"
              >
                Buy Now (Coming Soon)
              </button>
            </div>

            {/* Attributes */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20">
              <h3 className="font-semibold mb-4">Attributes</h3>
              <div className="grid grid-cols-2 gap-3">
                {mockNFT.attributes.map((attr, i) => (
                  <div key={i} className="bg-gray-900/50 p-3 rounded-xl border border-purple-500/10">
                    <div className="text-xs text-gray-400 mb-1">{attr.trait}</div>
                    <div className="font-semibold">{attr.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Creator Info */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20">
              <h3 className="font-semibold mb-4">Creator</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full"></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{mockNFT.creator.name}</span>
                    {mockNFT.creator.verified && (
                      <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">{mockNFT.creator.address}</div>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20">
              <h3 className="font-semibold mb-4">Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Token ID</span>
                  <span className="font-mono">{mockNFT.metadata.tokenId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Standard</span>
                  <span className="font-mono">{mockNFT.metadata.standard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network</span>
                  <span className="font-mono">{mockNFT.metadata.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contract</span>
                  <span className="font-mono text-purple-400 hover:text-purple-300 cursor-pointer">
                    {mockNFT.metadata.contract}
                  </span>
                </div>
              </div>
            </div>

            {/* Activity (Coming Soon) */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-semibold mb-2">Activity History</h3>
              <p className="text-gray-400 text-sm">Transaction history coming soon</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NFTDetail;