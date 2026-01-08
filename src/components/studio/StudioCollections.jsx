// src/components/StudioCollections.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../shared/Modal';
import EmptyState from '../shared/EmptyState';
import Header from "../shared/Header"

// Mock data
const mockCollections = [
  {
    id: 1,
    name: 'Cosmic Dragons',
    symbol: 'CDRG',
    description: 'A collection of mythical dragons from across the cosmos',
    royalty: 10,
    items: 50,
    banner: 'https://via.placeholder.com/800x200/6366f1/ffffff',
    logo: 'https://via.placeholder.com/200/8b5cf6/ffffff'
  },
  {
    id: 2,
    name: 'Digital Dreamscape',
    symbol: 'DSCPE',
    description: 'Abstract art exploring the boundaries of digital reality',
    royalty: 5,
    items: 25,
    banner: 'https://via.placeholder.com/800x200/8b5cf6/ffffff',
    logo: 'https://via.placeholder.com/200/a855f7/ffffff'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-white font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <Header/>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <Link to="/studio" className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-2 mb-3 sm:mb-4 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Studio
            </Link>
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              Your Collections
            </h1>
            <p className="text-sm sm:text-base text-gray-400">Manage and organize your NFT collections</p>
          </div>
          <button
            disabled
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg opacity-50 cursor-not-allowed"
          >
            Create Collection (Coming Soon)
          </button>
        </div>

        {/* Collections Grid */}
        {collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {collections.map((collection) => (
              <div
                key={collection.id}
                onClick={() => openCollectionDetail(collection)}
                className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-purple-500/20 overflow-hidden hover:border-purple-500/50 transition-all duration-300 active:scale-95 sm:hover:scale-105 shadow-xl cursor-pointer group"
              >
                {/* Banner */}
                <div className="relative h-24 sm:h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
                  <img 
                    src={collection.banner} 
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Logo */}
                <div className="relative px-3 sm:px-4 -mt-10 sm:-mt-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-4 border-gray-900 overflow-hidden bg-gray-800 shadow-xl">
                    <img 
                      src={collection.logo} 
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 pt-2">
                  <h3 className="text-lg sm:text-xl font-bold mb-1">{collection.name}</h3>
                  <p className="text-xs sm:text-sm text-purple-300 mb-2">{collection.symbol}</p>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 line-clamp-2">{collection.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-900/50 p-2 rounded-lg">
                      <div className="text-xs text-gray-400">Items</div>
                      <div className="text-sm sm:text-base font-bold">{collection.items}</div>
                    </div>
                    <div className="bg-gray-900/50 p-2 rounded-lg">
                      <div className="text-xs text-gray-400">Royalty</div>
                      <div className="text-sm sm:text-base font-bold">{collection.royalty}%</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="📦"
            title="No Collections Yet"
            description="Create your first collection to organize and showcase your NFTs"
            action={{
              label: 'Create Collection (Coming Soon)',
              onClick: () => alert('Coming Soon!')
            }}
          />
        )}
      </main>

      {/* Collection Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Collection Details"
        size="lg"
      >
        {selectedCollection && (
          <div className="space-y-4 sm:space-y-6">
            {/* Banner */}
            <div className="relative h-32 sm:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
              <img 
                src={selectedCollection.banner} 
                alt={selectedCollection.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Logo & Basic Info */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-800 border-2 border-purple-500/30 flex-shrink-0">
                <img 
                  src={selectedCollection.logo} 
                  alt={selectedCollection.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold mb-1">{selectedCollection.name}</h2>
                <p className="text-sm sm:text-base text-purple-300 font-semibold mb-2">{selectedCollection.symbol}</p>
                <p className="text-sm sm:text-base text-gray-400">{selectedCollection.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="bg-gray-900/50 p-3 sm:p-4 rounded-xl text-center">
                <div className="text-xs sm:text-sm text-gray-400 mb-1">Items</div>
                <div className="text-lg sm:text-2xl font-bold">{selectedCollection.items}</div>
              </div>
              <div className="bg-gray-900/50 p-3 sm:p-4 rounded-xl text-center">
                <div className="text-xs sm:text-sm text-gray-400 mb-1">Royalty</div>
                <div className="text-lg sm:text-2xl font-bold">{selectedCollection.royalty}%</div>
              </div>
              <div className="bg-gray-900/50 p-3 sm:p-4 rounded-xl text-center">
                <div className="text-xs sm:text-sm text-gray-400 mb-1">Owners</div>
                <div className="text-lg sm:text-2xl font-bold">-</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                disabled
                className="flex-1 bg-purple-500/20 border border-purple-500/50 text-purple-200 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all opacity-60 cursor-not-allowed"
              >
                Add NFT to Collection
              </button>
              <button
                disabled
                className="flex-1 bg-indigo-500/20 border border-indigo-500/50 text-indigo-200 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all opacity-60 cursor-not-allowed"
              >
                Edit Collection
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">Backend integration in progress</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudioCollections;