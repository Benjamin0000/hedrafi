import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReadContract, useWallet } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import { ContractId, AccountId } from '@hashgraph/sdk';
import CONTRACT_ABI from '../../ABIs/stakingABI.json';
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import WalletButton from "../shared/WalletButton";
import { TrendingUp, Coins, Leaf, Wallet, ShieldCheck, Lock, Activity, ArrowRight, Info, Zap } from 'lucide-react';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const Profit = () => {
  const walletData = useWallet(HWCConnector) || {};
  const isConnected = walletData.isConnected || false;
  const account = walletData.account || null;
  const { readContract } = useReadContract({ connector: HWCConnector }) || {};
  
  const [profitData, setProfitData] = useState({
    totalEarned: 0,
    pendingRewards: 0,
    claimedRewards: 0,
    stakedAmount: 0,
    projectedDaily: 0,
    projectedWeekly: 0,
    projectedMonthly: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchProfitData = async () => {
      if (!isConnected || !account || !readContract || !CONTRACT_ADDRESS) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        const accountId = AccountId.fromString(account);
        const evmAddress = `0x${accountId.toEvmAddress()}`;
        const contractEvmAddress = `0x${ContractId.fromString(CONTRACT_ADDRESS).toEvmAddress()}`;
        
        let stakedAmount = 0n;
        let pendingRewards = 0n;
        let claimedRewards = 0n;

        try {
          stakedAmount = await readContract({
            address: contractEvmAddress,
            abi: CONTRACT_ABI,
            functionName: 'userStake',
            args: [evmAddress]
          }) || 0n;
        } catch (e) { console.warn(e); }

        try {
          pendingRewards = await readContract({
            address: contractEvmAddress,
            abi: CONTRACT_ABI,
            functionName: 'pendingReward',
            args: [evmAddress]
          }) || 0n;
        } catch (e) { console.warn(e); }

        try {
          claimedRewards = await readContract({
            address: contractEvmAddress,
            abi: CONTRACT_ABI,
            functionName: 'userClaimed',
            args: [evmAddress]
          }) || 0n;
        } catch (e) { console.warn(e); }

        const pending = Number(pendingRewards) / 1e8;
        const claimed = Number(claimedRewards) / 1e8;
        const staked = Number(stakedAmount) / 1e8;
        const total = pending + claimed;
        const apy = 0.245; 
        const daily = (staked * apy) / 365;

        if (isMounted) {
          setProfitData({
            totalEarned: total,
            pendingRewards: pending,
            claimedRewards: claimed,
            stakedAmount: staked,
            projectedDaily: daily,
            projectedWeekly: daily * 7,
            projectedMonthly: daily * 30
          });
        }
      } catch (e) {
        console.error('Error fetching profit data:', e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProfitData();
    const interval = setInterval(fetchProfitData, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isConnected, account, readContract]);

  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container-main">
          <div className="flex flex-col gap-12 md:gap-16">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
              <div className="space-y-4 max-w-3xl">
                <div className="w-12 h-1 bg-cyber-blue rounded-full mb-6"></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
                  Yield <span className="text-gradient">Analytics</span>
                </h1>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  Analyze your staking performance, monitor projected yields, and optimize your portfolio growth with institutional-grade precision.
                </p>
              </div>
              <div className="glass-card px-8 py-5 rounded-3xl border-white/[0.05] flex items-center gap-5 shadow-xl">
                 <div className="w-12 h-12 rounded-2xl bg-blue-600/5 flex items-center justify-center border border-white/5">
                    <TrendingUp size={24} className="text-cyber-blue" />
                 </div>
                 <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Target Yield</div>
                    <div className="text-xl font-mono font-black text-white">24.50% APY</div>
                 </div>
              </div>
            </div>

            {!isConnected ? (
              <div className="glass-card p-12 md:p-24 rounded-[4rem] border-white/[0.05] text-center space-y-10 mt-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/[0.02] pointer-events-none"></div>
                <div className="w-24 h-24 bg-blue-600/5 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/10 shadow-inner">
                   <Lock size={40} className="text-blue-500" />
                </div>
                <div className="space-y-4 relative z-10">
                   <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Access Restricted</h2>
                   <p className="text-slate-400 text-lg max-w-md mx-auto font-medium">Link your Hedera Identity to unlock institutional grade analytics and real-time yield harvesting.</p>
                </div>
                <div className="pt-4 flex justify-center">
                   <WalletButton />
                </div>
              </div>
            ) : (
              <div className="space-y-12 md:space-y-16">
                {/* Core Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                   {[
                     { label: 'Cumulative Yield', value: profitData.totalEarned.toFixed(2), unit: 'HRT', icon: Coins, color: 'text-blue-400' },
                     { label: 'Live Harvest', value: profitData.pendingRewards.toFixed(4), unit: 'HRT', icon: Leaf, color: 'text-green-400' },
                     { label: 'Settled Rewards', value: profitData.claimedRewards.toFixed(2), unit: 'HRT', icon: Activity, color: 'text-indigo-400' },
                     { label: 'Active Principal', value: profitData.stakedAmount.toFixed(2), unit: 'HBAR', icon: Wallet, color: 'text-cyber-blue' }
                   ].map((stat, idx) => (
                     <div key={idx} className="glass-card p-8 rounded-[2.5rem] border-white/[0.05] group hover:bg-[#0E1529] transition-all duration-500 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex justify-between items-start mb-8 relative z-10">
                           <div className="w-12 h-12 bg-blue-600/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-blue-500/30 transition-colors">
                              <stat.icon className="text-cyber-blue" size={20} />
                           </div>
                           <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 bg-white/5 px-2.5 py-1 rounded-lg">Real-time</div>
                        </div>
                        <div className="space-y-2 relative z-10">
                           <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
                           <div className={`text-2xl md:text-3xl font-mono font-black tracking-tighter ${stat.color}`}>
                              {stat.value} <span className="text-[10px] text-slate-600 uppercase font-black ml-1">{stat.unit}</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                {/* Projections & Mastery Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                   {/* Yield Mastery Glass Card */}
                   <div className="lg:col-span-8 glass-card p-10 md:p-16 rounded-[3.5rem] border-white/[0.05] relative overflow-hidden group min-h-[450px] shadow-2xl">
                      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] -mr-40 -mt-20 group-hover:bg-blue-600/10 transition-colors duration-1000"></div>
                      <div className="relative z-10 h-full flex flex-col justify-between">
                         <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 text-cyber-blue text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                               <ShieldCheck size={12} className="text-cyber-blue" />
                               Protocol Efficiency Verified
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black leading-tight text-white tracking-tight">Sustainable <br /><span className="text-gradient">Wealth Generation</span></h2>
                            <p className="text-slate-400 max-w-lg leading-relaxed font-medium text-lg">Your stake of {profitData.stakedAmount.toLocaleString()} HBAR is processed through our high-fidelity consensus protocol for maximum uptime.</p>
                         </div>
                         
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-16 border-t border-white/5">
                            <div className="space-y-2">
                               <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                  Daily Yield
                               </div>
                               <div className="text-2xl font-mono font-black text-white">+{profitData.projectedDaily.toFixed(2)} <span className="text-xs text-slate-600 uppercase">HRT</span></div>
                            </div>
                            <div className="space-y-2">
                               <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                  Weekly Forecast
                               </div>
                               <div className="text-2xl font-mono font-black text-white">+{profitData.projectedWeekly.toFixed(2)} <span className="text-xs text-slate-600 uppercase">HRT</span></div>
                            </div>
                            <div className="space-y-2">
                               <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue"></div>
                                  Monthly Target
                               </div>
                               <div className="text-2xl font-mono font-black text-white">+{profitData.projectedMonthly.toFixed(2)} <span className="text-xs text-slate-600 uppercase">HRT</span></div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Quick Actions Side */}
                   <div className="lg:col-span-4 space-y-8">
                      <div className="glass-card p-10 rounded-[3rem] border-white/[0.05] h-full flex flex-col justify-between shadow-2xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl"></div>
                         <div className="space-y-6 relative z-10">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                               <Zap size={24} className="text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-black text-white tracking-tight">Strategic Scaling</h3>
                            <p className="text-slate-400 font-medium leading-relaxed">Increase your principal position to accelerate reward accumulation and improve ecosystem tiering.</p>
                         </div>
                         <div className="space-y-4 pt-10 relative z-10">
                            <Link to="/staking" className="block group">
                               <button className="btn-primary w-full flex items-center justify-center gap-3 !py-5 text-lg group-hover:shadow-blue-500/30 transition-all">
                                  Optimize Principal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <div className="bg-[#040A1A] p-5 rounded-2xl border border-white/5 text-center">
                               <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-1">Coming Next</div>
                               <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Yield Compounding Engine V2</div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profit;
