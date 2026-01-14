import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import NFTCard from '../shared/NFTCard';
import CollectionCard from '../shared/CollectionCard';



// Mock data
const mockNFTs = [
  { id: 1, name: 'Cosmic Dragon #001', collection: 'Cosmic Dragons', price: '50', image: 'https://via.placeholder.com/400/6366f1/ffffff', isNew: true },
  { id: 2, name: 'Dreamscape #042', collection: 'Digital Dreamscape', price: '35', image: 'https://via.placeholder.com/400/8b5cf6/ffffff', isNew: true },
  { id: 3, name: 'Astral Journey #007', collection: 'Cosmic Dragons', price: '45', image: 'https://via.placeholder.com/400/a855f7/ffffff', isNew: false },
  { id: 4, name: 'Neon City #123', collection: 'Urban Legends', price: '60', image: 'https://via.placeholder.com/400/c084fc/ffffff', isNew: false }
];

const mockCollections = [
  { id: 1, name: 'Cosmic Dragons', description: 'Mythical dragons from across the cosmos', items: 50, owners: 32, floor: '45', logo: 'https://via.placeholder.com/200/8b5cf6/ffffff', banner: 'https://via.placeholder.com/800x200/6366f1/ffffff' },
  { id: 2, name: 'Digital Dreamscape', description: 'Abstract digital reality', items: 25, owners: 18, floor: '30', logo: 'https://via.placeholder.com/200/a855f7/ffffff', banner: 'https://via.placeholder.com/800x200/8b5cf6/ffffff' }
];

const MarketplaceHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = ['All', 'Art', 'Gaming', 'Music', 'Photography', 'Sports'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-white font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>


      <Header/>

      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent px-2">
            Discover, Collect, Trade
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Explore unique NFTs on Hedera's lightning-fast network
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto px-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search NFTs, collections..."
                className="w-full bg-gray-900/50 border border-purple-500/20 rounded-xl px-4 sm:px-6 py-3 sm:py-4 pr-10 sm:pr-12 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500 backdrop-blur-xl text-sm sm:text-base"
              />
              <svg className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="relative px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 sm:px-6 py-2 rounded-xl text-sm sm:text-base font-semibold transition-all ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/30'
                    : 'bg-gray-800/50 hover:bg-gray-800 border border-purple-500/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Collections */}
      <section className="relative py-8 sm:py-12 px-4 sm:px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Trending Collections</h2>
            <Link to="/marketplace" className="text-sm sm:text-base text-purple-400 hover:text-purple-300 font-semibold">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mockCollections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
            {/* Placeholder for more */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-purple-500/20 p-8 sm:p-12 flex items-center justify-center text-center">
              <div>
                <div className="text-3xl sm:text-4xl mb-3">🔜</div>
                <p className="text-sm sm:text-base text-gray-400">More collections coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest NFTs */}
      <section className="relative py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Latest NFTs</h2>
            <Link to="/marketplace" className="text-sm sm:text-base text-purple-400 hover:text-purple-300 font-semibold">
              View All 
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {mockNFTs.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-purple-500/30 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Start Your Collection Today</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">Join thousands of creators and collectors on HedraFi</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/studio/mint" className="w-full sm:w-auto">
              <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg shadow-purple-500/30 active:scale-95 sm:hover:scale-105">
                Create NFT
              </button>
            </Link>
            <Link to="/marketplace" className="w-full sm:w-auto">
              <button className="w-full bg-gray-800/50 hover:bg-gray-800 border border-purple-500/30 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 active:scale-95 sm:hover:scale-105">
                Explore More
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default MarketplaceHome;