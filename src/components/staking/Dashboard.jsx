import WalletInfo from './WalletInfo';
import StakePanel from './StakePanel';
import StakingStats from './StakingStats';
import Header from "../shared/Header"
import Footer from "../shared/Footer"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-white font-sans">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <Header/>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Wallet Info Sidebar */}
          <div className="lg:col-span-3">
            <WalletInfo />
          </div>

          {/* Main Dashboard */}
          <div className="lg:col-span-9 space-y-6">
            {/* Stats Grid */}
            <StakingStats />

            {/* Staking Panel */}
            <StakePanel />

            {/* NFT & Marketplace */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NFT Dashboard */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 shadow-xl group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    🎨
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">NFT Studio</h3>
                    <p className="text-sm text-gray-400">Create & Manage NFTs</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  Mint, collect, and showcase your NFTs on Hedera's lightning-fast network.
                </p>
                <button className="w-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-200 px-4 py-3 rounded-xl font-semibold transition-all opacity-60 cursor-not-allowed">
                  Coming Soon
                </button>
              </div>

              {/* Marketplace */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/30 hover:border-green-500/50 transition-all duration-300 shadow-xl group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    🛒
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Marketplace</h3>
                    <p className="text-sm text-gray-400">Trade & Discover</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  Trade NFTs with other users in a decentralized marketplace with low fees.
                </p>
                <button className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-200 px-4 py-3 rounded-xl font-semibold transition-all opacity-60 cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default Dashboard;