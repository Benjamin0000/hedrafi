import { Link } from 'react-router-dom';
import Header from "../shared/Header";
import Footer from "../shared/Footer"; 

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-white font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <Header/>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">HedraFi</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">Hedera's first unified DeFi + NFT hub. Stake HBAR, earn HRT, and mint NFTs with one click.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/staking">
              <button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-purple-500/30 hover:scale-105">Stake & Earn HRT</button>
            </Link>
            <Link to="/studio">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-pink-500/30 hover:scale-105">Launch NFT Studio</button>
            </Link>
          </div>
        </div>
      </section>

      {/* HRT Token & Staking Section */}
      <section className="relative py-20 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">HRT Token & Staking Rewards</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Early adopters can stake HBAR to earn HRT rewards, unlock NFT features, and participate in premium creator tiers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-8 border border-blue-500/30 shadow-xl hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🔒</div>
              <div className="text-sm text-gray-300 mb-2">Total HBAR Staked</div>
              <div className="text-4xl font-bold">168+</div>
            </div>
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30 shadow-xl hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">💎</div>
              <div className="text-sm text-gray-300 mb-2">Total HRT Distributed</div>
              <div className="text-4xl font-bold">9,000+</div>
            </div>
            <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-8 border border-green-500/30 shadow-xl hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">💰</div>
              <div className="text-sm text-gray-300 mb-2">Your Potential Rewards</div>
              <div className="text-4xl font-bold">24.5% APY</div>
            </div>
          </div>
        </div>
      </section>

      {/* NFT Studio Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-12 border border-purple-500/30 shadow-2xl">
              <div className="text-7xl mb-4">🎨</div>
              <div className="text-2xl font-bold mb-2">NFT Creation Made Simple</div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">NFT Studio & Marketplace</h2>
              <p className="text-lg text-gray-300 mb-8">HedraFi makes NFT creation and trading effortless on Hedera.</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✓</div>
                  <div><div className="font-semibold">One-click NFT minting</div><div className="text-sm text-gray-400">HTS integration</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✓</div>
                  <div><div className="font-semibold">Creator storefronts</div><div className="text-sm text-gray-400">For artists, businesses, and DAOs</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✓</div>
                  <div><div className="font-semibold">Automatic royalty enforcement</div><div className="text-sm text-gray-400">Using HTS metadata</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✓</div>
                  <div><div className="font-semibold">NFT collections linked with staking</div><div className="text-sm text-gray-400">Tiers & HRT utility</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔮</div>
                  <div><div className="font-semibold">Future: Cross-chain bridging</div><div className="text-sm text-gray-400">Using zkVerify + Horizen ZK proofs</div></div>
                </div>
              </div>
              <Link to="/studio">
                <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-purple-500/30 hover:scale-105">Explore NFT Studio</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

 

    {/* How It Works */}
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">How HedraFi Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-xl font-bold mb-2">Stake HBAR</h3>
            <p className="text-gray-400">Earn HRT rewards</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-xl font-bold mb-2">Use HRT</h3>
            <p className="text-gray-400">Access NFT Studio & features</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-xl font-bold mb-2">Mint & Trade</h3>
            <p className="text-gray-400">Create NFTs, list on marketplace</p>
          </div>
        </div>
      </div>
    </section>




    <section className="relative py-20 px-6 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Roadmap
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Q4 2025 - Immediate Launch Phase */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl p-6 border border-purple-500/30">
            <div className="text-sm font-bold text-purple-300 mb-2">Q4 2025</div>
            <h3 className="text-xl font-bold mb-4">Immediate Launch Phase</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• New homepage & staking dashboard</li>
              <li>• HRT token and staking contract live on TestNet</li>
              <li>• NFT Studio UI integrated (Coming Soon)</li>
              <li>• MainNet staking launch</li>
            </ul>
          </div>

          {/* Q1 2026 - Ecosystem Release */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-indigo-500/30">
            <div className="text-sm font-bold text-indigo-300 mb-2">Q1 2026</div>
            <h3 className="text-xl font-bold mb-4">Full Ecosystem Release</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• NFT Studio v1 (HTS minting)</li>
              <li>• Creator storefronts</li>
              <li>• Marketplace</li>
              <li>• Staking campaigns & HRT rewards</li>
            </ul>
          </div>

          {/* Q2 2026 - Growth */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
            <div className="text-sm font-bold text-green-300 mb-2">Q2 2026</div>
            <h3 className="text-xl font-bold mb-4">Growth & Adoption</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Weekly NFT minting challenges</li>
              <li>• Premium creator features</li>
              <li>• 15K HBAR TVL milestone</li>
              <li>• 10K+ NFTs minted</li>
            </ul>
          </div>

          {/* Q3 2026 - zkVerify Phase */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/30">
            <div className="text-sm font-bold text-pink-300 mb-2">Q3 2026</div>
            <h3 className="text-xl font-bold mb-4">ZK Expansion</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• zkVerify integration</li>
              <li>• NFT authenticity proofs</li>
              <li>• Cross-chain bridging prototype</li>
            </ul>
          </div>

        </div>
      </div>
    </section>










     <Footer/>
        
    </div>
  );
};

export default Homepage;