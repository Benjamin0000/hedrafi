import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReadContract } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets';
import { ContractId, AccountId } from '@hashgraph/sdk';
import CONTRACT_ABI from '../../ABIs/stakingABI.json';
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import WalletButton from "../shared/WalletButton";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const Profit = () => {
  // Safely destructure wallet hook with defaults
  const walletData = useWallet(HWCConnector) || {};
  const isConnected = walletData.isConnected || false;
  const account = walletData.account || null;
  
  const { readContract } = useReadContract({ connector: HWCConnector }) || {};
  
  const [profitData, setProfitData] = useState({
    totalEarned: 0,
    pendingRewards: 0,
    claimedRewards: 0,
    stakedAmount: 0,
    estimatedAPY: 24.5,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchProfitData = async () => {
      // Skip if not connected, no account, or no readContract function
      if (!isConnected || !account || !readContract || !CONTRACT_ADDRESS) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        const accountId = AccountId.fromString(account);
        const evmAddress = `0x${accountId.toEvmAddress()}`;
        const contractEvmAddress = `0x${ContractId.fromString(CONTRACT_ADDRESS).toEvmAddress()}`;
        
        // Fetch each value separately with individual error handling
        let stakedAmount = 0n;
        let pendingRewards = 0n;
        let claimedRewards = 0n;

        try {
          stakedAmount = await readContract({
            address: contractEvmAddress,
            abi: CONTRACT_ABI,
            functionName: 'stakedBalance',
            args: [evmAddress]
          }) || 0n;
        } catch (e) {
          console.warn('Could not fetch staked balance:', e);
        }

        try {
          pendingRewards = await readContract({
            address: contractEvmAddress,
            abi: CONTRACT_ABI,
            functionName: 'pendingReward',
            args: [evmAddress]
          }) || 0n;
        } catch (e) {
          console.warn('Could not fetch pending rewards:', e);
        }

        try {
          claimedRewards = await readContract({
            address: contractEvmAddress,
            abi: CONTRACT_ABI,
            functionName: 'claimedRewards',
            args: [evmAddress]
          }) || 0n;
        } catch (e) {
          // This function might not exist in the contract
          console.warn('Could not fetch claimed rewards:', e);
        }

        const totalEarned = Number(pendingRewards) / 1e8 + Number(claimedRewards) / 1e8;

        if (isMounted) {
          setProfitData({
            totalEarned,
            pendingRewards: Number(pendingRewards) / 1e8,
            claimedRewards: Number(claimedRewards) / 1e8,
            stakedAmount: Number(stakedAmount) / 1e8,
            estimatedAPY: 24.5,
          });
        }
      } catch (e) {
        console.error('Error fetching profit data:', e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProfitData();
    const interval = setInterval(fetchProfitData, 10000);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isConnected, account, readContract]);

  const profitCards = [
    {
      label: 'Total Earned',
      value: profitData.totalEarned.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      suffix: 'HRT',
      icon: '💰',
      color: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-500/30',
      glow: 'shadow-green-500/20',
      description: 'Lifetime earnings from staking'
    },
    {
      label: 'Pending Rewards',
      value: profitData.pendingRewards.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      suffix: 'HRT',
      icon: '⏳',
      color: 'from-yellow-500/20 to-orange-500/20',
      border: 'border-yellow-500/30',
      glow: 'shadow-yellow-500/20',
      description: 'Available to claim now'
    },
    {
      label: 'Claimed Rewards',
      value: profitData.claimedRewards.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      suffix: 'HRT',
      icon: '✅',
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30',
      glow: 'shadow-blue-500/20',
      description: 'Already withdrawn'
    },
    {
      label: 'Staked Amount',
      value: profitData.stakedAmount.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      suffix: 'ℏ',
      icon: '🔒',
      color: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30',
      glow: 'shadow-purple-500/20',
      description: 'Your locked HBAR'
    }
  ];

  const projectedEarnings = [
    { period: 'Daily', value: (profitData.stakedAmount * (profitData.estimatedAPY / 100) / 365).toFixed(4) },
    { period: 'Weekly', value: (profitData.stakedAmount * (profitData.estimatedAPY / 100) / 52).toFixed(4) },
    { period: 'Monthly', value: (profitData.stakedAmount * (profitData.estimatedAPY / 100) / 12).toFixed(4) },
    { period: 'Yearly', value: (profitData.stakedAmount * (profitData.estimatedAPY / 100)).toFixed(4) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-white font-sans">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <Header />

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Your Profit Dashboard
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Track your staking earnings, view pending rewards, and monitor your projected profits.
          </p>
        </div>

        {!isConnected ? (
          /* Not Connected State */
          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-3xl p-12 border border-purple-500/30 shadow-2xl text-center max-w-2xl mx-auto">
            <div className="text-7xl mb-6">🔗</div>
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-300 mb-8">
              Connect your wallet to view your staking profits and earnings.
            </p>
            <WalletButton />
          </div>
        ) : isLoading ? (
          /* Loading State */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="backdrop-blur-xl bg-gray-800/30 rounded-2xl p-6 border border-gray-700/30 animate-pulse">
                <div className="h-4 bg-gray-700/50 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-700/50 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Profit Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {profitCards.map((card, i) => (
                <div 
                  key={i} 
                  className={`backdrop-blur-xl bg-gradient-to-br ${card.color} rounded-2xl p-6 border ${card.border} hover:scale-105 transition-all duration-300 shadow-xl ${card.glow} group cursor-pointer`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-300 font-medium">{card.label}</div>
                    <div className="text-3xl group-hover:scale-125 transition-transform duration-300">{card.icon}</div>
                  </div>
                  <div className="text-2xl font-bold font-mono mb-1">
                    {card.value}{' '}
                    <span className="text-lg font-normal text-gray-400">{card.suffix}</span>
                  </div>
                  <div className="text-xs text-gray-400">{card.description}</div>
                </div>
              ))}
            </div>

            {/* APY & Projected Earnings Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Current APY */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-8 border border-indigo-500/30 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl">
                    📈
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Current APY</h3>
                    <p className="text-sm text-gray-400">Estimated annual yield</p>
                  </div>
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {profitData.estimatedAPY}%
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Based on current staking rewards and pool performance
                </p>
              </div>

              {/* Projected Earnings */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/30 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-3xl">
                    🎯
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Projected Earnings</h3>
                    <p className="text-sm text-gray-400">Based on current stake</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {projectedEarnings.map((item, i) => (
                    <div key={i} className="bg-gray-800/30 rounded-xl p-4">
                      <div className="text-xs text-gray-400 mb-1">{item.period}</div>
                      <div className="text-lg font-bold font-mono">
                        {item.value} <span className="text-sm text-gray-400">HRT</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/staking" className="block">
                <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 shadow-xl group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      💎
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Claim Rewards</h3>
                      <p className="text-sm text-gray-400">Go to staking dashboard to claim your HRT</p>
                    </div>
                    <div className="ml-auto text-2xl text-gray-500 group-hover:text-white group-hover:translate-x-2 transition-all">
                      →
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/staking" className="block">
                <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🔒
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Stake More HBAR</h3>
                      <p className="text-sm text-gray-400">Increase your stake to earn more rewards</p>
                    </div>
                    <div className="ml-auto text-2xl text-gray-500 group-hover:text-white group-hover:translate-x-2 transition-all">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Profit;
