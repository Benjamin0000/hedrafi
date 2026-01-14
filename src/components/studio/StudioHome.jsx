// src/components/StudioHome.jsx

import { Link } from 'react-router-dom';
import Header from "../shared/Header"

const StudioHome = () => {
  const stats = [
    { label: 'NFTs Created', value: '0', icon: '' },
    { label: 'Collections', value: '0', icon: '' },
    { label: 'Total Sales', value: '0 ℏ', icon: '' },
    { label: 'Followers', value: '0', icon: '' }
  ];

  const quickActions = [
    {
      title: 'Mint NFT',
      description: 'Create a new digital asset',
      icon: '✨',
      link: '/studio/mint',
      color: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30'
    }, 
    {
      title: 'Manage NFTs',
      description: 'Organize your NFTs',
      icon: '📚',
      link: '/studio/mynfts',
      color: 'from-indigo-500/20 to-purple-500/20',
      border: 'border-indigo-500/30'
    }, 
    // {
    //   title: 'Manage Collections',
    //   description: 'Organize your NFTs',
    //   icon: '📚',
    //   link: '/studio/collections',
    //   color: 'from-indigo-500/20 to-purple-500/20',
    //   border: 'border-indigo-500/30'
    // },
    {
      title: 'Setup Storefront',
      description: 'Customize your profile',
      icon: '🏪',
      link: '/studio/storefront',
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-white font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

    <Header/>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
            Creator Studio
          </h1>
          <p className="text-gray-400">Manage your NFT creations and collections</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 shadow-xl hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-400">{stat.label}</div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, i) => (
              <Link key={i} to={action.link}>
                <div className={`backdrop-blur-xl bg-gradient-to-br ${action.color} rounded-2xl p-6 border ${action.border} hover:border-purple-500/50 transition-all duration-300 hover:scale-105 shadow-xl group`}>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{action.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity / Empty State */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Recent Activity</h2>
          <div
            className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 sm:p-12 border border-purple-500/20 shadow-xl text-center">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎯</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-300">Get Started</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 max-w-md mx-auto px-2">
              Begin your creator journey by minting your first NFT or setting up your storefront
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/studio/mint" className="w-full sm:w-auto">
              <button
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-500/30 active:scale-95 sm:hover:scale-105">
                Mint Your First NFT
              </button>
              </Link>
              <Link to="/studio/storefront" className="w-full sm:w-auto">
              <button
                className="w-full sm:w-auto bg-gray-700/50 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95 sm:hover:scale-105">
                Setup Storefront
              </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudioHome;