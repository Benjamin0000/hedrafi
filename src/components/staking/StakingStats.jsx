import { useState, useEffect } from 'react';
import { stakingContract, rewardToken } from '../../lib/staking'
import { Lock, Diamond, Banknote, Users } from 'lucide-react';

const StakingStats = () => {

  const [stats, setStats] = useState({
    totalStakedHBAR: 0,
    totalHRTLocked: 0,
    totalRewardPaid: 0,
    totalUsers: 0
  });

  const fetchStats = async () => {
    if (!stakingContract || !rewardToken){
      console.warn('Staking contract ' + (stakingContract ? 'is initialized' : 'not initialized'));
      console.warn('rewardToken contract ' + (rewardToken ? 'is initialized' : 'not initialized'));
      return;
    } 
    try {
      const [
        totalStakedHBAR,
        totalRewardPaid,
        totalUsers,
        totalHRTLocked
      ] = await Promise.all([
        stakingContract.totalStakedHBAR(),
        stakingContract.totalRewardDistributed(),
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
      label: 'HBAR Locked', 
      value: stats.totalStakedHBAR.toLocaleString() + ' ℏ', 
      icon: Lock, 
      color: 'bg-blue-500/5 text-blue-500',
      border: 'border-blue-500/10',
      glow: 'group-hover:bg-blue-600/10'
    },
    { 
      label: '$HRT Locked', 
      value: stats.totalHRTLocked.toLocaleString(), 
      suffix: '',
      icon: Diamond, 
      color: 'bg-indigo-500/5 text-indigo-400',
      border: 'border-indigo-500/10',
      glow: 'group-hover:bg-indigo-600/10'
    },
    {  
      label: '$HRT Distributed', 
      value: stats.totalRewardPaid.toLocaleString(), 
      icon: Banknote, 
      color: 'bg-cyber-blue/5 text-cyber-blue',
      border: 'border-cyber-blue/10',
      glow: 'group-hover:bg-cyber-blue/10'
    },
    { 
      label: 'Participants', 
      value: stats.totalUsers.toLocaleString(), 
      suffix: '',
      icon: Users, 
      color: 'bg-white/5 text-slate-400',
      border: 'border-white/5',
      glow: 'group-hover:bg-slate-400/10'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 w-full">
      {statsData.map((stat, index) => (
        <div 
          key={index} 
          className={`glass-card p-6 rounded-[2rem] md:rounded-[2.5rem] border-white/[0.05] relative overflow-hidden group hover:bg-[#0E1529] transition-all duration-700 shadow-xl flex flex-col justify-between min-h-[160px] md:min-h-[200px]`}
        >
          {/* Advanced Glow Layer */}
          <div className={`absolute -top-10 -right-10 w-40 h-40 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${stat.glow}`}></div>
          
          <div className="relative z-10 space-y-4 md:space-y-6">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center ${stat.color} border ${stat.border} group-hover:border-blue-500/30 transition-all duration-500 shadow-inner`}>
              <stat.icon size={22} className="group-hover:scale-110 transition-transform duration-500" />
            </div>
            
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 leading-none">{stat.label}</div>
              <div className="text-[18px] font-mono font-black text-white tracking-tighter">{stat.value}</div>
            </div>
          </div>

          {/* Bottom Progress Indicator (Subtle Decoration) */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      ))}
    </div>
  );
};

export default StakingStats;