import { useState, useEffect } from 'react';
import { stakingContract, rewardToken } from '../../lib/staking'
import { Lock, Diamond, Banknote, Users } from 'lucide-react';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const StakingStats = () => {

  const [stats, setStats] = useState({
    totalStakedHBAR: 0,
    totalHRTLocked: 0,
    totalRewardPaid: 0,
    totalUsers: 0
  });

  const fetchStats = async () => {
    if (!stakingContract || !rewardToken) return;
    try {
      const [
        totalStakedHBAR,
        totalRewardPaid,
        totalUsers,
        totalHRTLocked
      ] = await Promise.all([
        stakingContract.totalStakedHBAR(),
        stakingContract.totalRewardPaid(),
        stakingContract.totalUsers(),
        rewardToken.balanceOf(stakingContract.target)
      ]);

      setStats({
        totalStakedHBAR: Number(totalStakedHBAR) / 1e8,
        totalRewardPaid: Number(totalRewardPaid) / 1e8,
        totalUsers: Number(totalUsers),
        totalHRTLocked: Number(totalHRTLocked) / 1e8
      });
    } catch (e) {
      console.error('fetchStats error:', e);
    }
  };


  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const statsData = [
    { 
      label: 'Total HBAR Locked', 
      value: stats.totalStakedHBAR.toLocaleString() + ' ℏ', 
      icon: Lock, 
      color: 'bg-blue-500/5 text-blue-500',
      border: 'border-blue-500/10'
    },
    { 
      label: 'Total HRT Distributed', 
      value: stats.totalHRTLocked.toLocaleString(), 
      icon: Diamond, 
      color: 'bg-indigo-500/5 text-indigo-400',
      border: 'border-indigo-500/10'
    },
    { 
      label: 'Platform Earnings', 
      value: stats.totalRewardPaid.toLocaleString() + ' ℏ', 
      icon: Banknote, 
      color: 'bg-cyber-blue/5 text-cyber-blue',
      border: 'border-cyber-blue/10'
    },
    { 
      label: 'Total Participants', 
      value: stats.totalUsers.toLocaleString(), 
      icon: Users, 
      color: 'bg-white/5 text-slate-400',
      border: 'border-white/5'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {statsData.map((stat, index) => (
        <div 
          key={index} 
          className={`glass-card p-8 rounded-[2.5rem] border-white/[0.05] relative overflow-hidden group hover:bg-[#0E1529] transition-all duration-700 shadow-xl`}
        >
          {/* Advanced Glow Layer */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="relative z-10 space-y-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color} border ${stat.border} group-hover:border-blue-500/30 transition-all duration-500 shadow-inner`}>
              <stat.icon size={24} className="group-hover:scale-110 transition-transform duration-500" />
            </div>
            
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 leading-none">{stat.label}</div>
              <div className="text-3xl font-mono font-black text-white tracking-tighter">{stat.value}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StakingStats;