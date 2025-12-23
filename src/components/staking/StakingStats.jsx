import { useState, useEffect } from 'react';
import { stakingContract, rewardToken } from '../../lib/staking'

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS_EVM;

const StakingStats = () => {

  const [stats, setStats] = useState({
    totalStakedHBAR: 0,
    totalHRTLocked: 0,
    totalRewardPaid: 0,
    totalUsers: 0
  });

  const fetchStats = async () => {
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
        rewardToken.balanceOf(CONTRACT_ADDRESS)
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
      icon: '🔒', 
      color: 'from-blue-500/20 to-cyan-500/20', 
      border: 'border-blue-500/30',
      glow: 'shadow-blue-500/20'
    },
    { 
      label: 'Total HRT Locked', 
      value: stats.totalHRTLocked.toLocaleString(), 
      icon: '💎', 
      color: 'from-purple-500/20 to-pink-500/20', 
      border: 'border-purple-500/30',
      glow: 'shadow-purple-500/20',
      suffix: 'HRT',
    },
    { 
      label: 'Total Reward Paid', 
      value: stats.totalRewardPaid.toLocaleString(), 
      icon: '💎', 
      color: 'from-green-500/20 to-emerald-500/20', 
      border: 'border-green-500/30',
      glow: 'shadow-green-500/20', 
      suffix: 'HRT',
    },
    { 
      label: 'Total Users', 
      value: stats.totalUsers.toString(), 
      icon: '👥', 
      color: 'from-orange-500/20 to-yellow-500/20', 
      border: 'border-orange-500/30',
      glow: 'shadow-orange-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, i) => (
        <div 
          key={i} 
          className={`backdrop-blur-xl bg-gradient-to-br ${stat.color} rounded-2xl p-4 border ${stat.border} hover:scale-105 transition-all duration-300  ${stat.glow} group cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-300 font-medium">{stat.label}</div>
            <div className="text-2xl group-hover:scale-125 transition-transform duration-300">{stat.icon}</div>
          </div>
          <div className="text-xl font-bold font-mono">{stat.value}{' '}
           {stat.suffix && <sub className="text-lg font-normal text-sm">{stat.suffix}</sub>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StakingStats;