import { useState, useEffect } from "react";
import { stakingContract, rewardToken } from "../../lib/staking";
import { Lock, Diamond, Banknote, Users } from "lucide-react";

const StakingStats = () => {
  const [stats, setStats] = useState({
    totalStakedHBAR: 0,
    totalHRTLocked: 0,
    totalRewardPaid: 0,
    totalUsers: 0,
  });

  const fetchStats = async () => {
    if (!stakingContract || !rewardToken) {
      console.warn("Staking contract " + (stakingContract ? "is initialized" : "not initialized"));
      return;
    }
    try {
      const [totalStakedHBAR, totalRewardPaid, totalUsers, totalHRTLocked] =
        await Promise.all([
          stakingContract.totalStakedHBAR(),
          stakingContract.totalRewardDistributed(),
          stakingContract.totalUsers(),
          rewardToken.balanceOf(stakingContract.target),
        ]);

      setStats({
        totalStakedHBAR: Number(totalStakedHBAR) / 1e8,
        totalRewardPaid: Number(totalRewardPaid) / 1e8,
        totalUsers: Number(totalUsers),
        totalHRTLocked: Number(totalHRTLocked) / 1e8,
      });
    } catch (e) {
      console.error("fetchStats error:", e);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const statsData = [
    {
      label: "Total\nHBAR\nLocked",
      value: stats.totalStakedHBAR.toLocaleString(),
      suffix: "ℏ",
      icon: Lock,
      color: "bg-blue-600/5 text-blue-500",
      border: "border-blue-500/20",
    },
    {
      label: "Total\nHRT\nDistributed",
      value: stats.totalRewardPaid.toLocaleString(),
      suffix: "",
      icon: Diamond,
      color: "bg-indigo-600/5 text-indigo-400",
      border: "border-indigo-500/20",
    },
    {
      label: "Platform\nEarnings",
      value: "0",
      suffix: "ℏ",
      icon: Banknote,
      color: "bg-cyan-600/5 text-cyan-400",
      border: "border-cyan-500/20",
    },
    {
      label: "Total\nParticipant",
      value: stats.totalUsers.toLocaleString(),
      suffix: "",
      icon: Users,
      color: "bg-slate-600/5 text-slate-400",
      border: "border-slate-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="glass-card rounded-[3rem] border border-white/[0.05] bg-[#0A1024]/60 p-10 md:p-12 flex flex-col justify-center min-h-[280px] hover:bg-[#0D152D] transition-all duration-500 group shadow-2xl relative overflow-hidden"
        >
          {/* Animated Glow on hover */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all duration-700"></div>

          <div className="flex items-center gap-6 mb-8">
             <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center ${stat.color} border ${stat.border} shadow-inner`}>
               <stat.icon size={28} />
             </div>
             <div className="text-[12px] sm:text-[14px] font-black uppercase tracking-[0.3em] text-slate-500 leading-tight whitespace-pre-line text-left">
              {stat.label}
            </div>
          </div>
          
          <div className="space-y-2 mb-2">
            <div className="text-5xl sm:text-6xl font-black text-white flex items-baseline gap-3 font-mono tracking-tighter">
              {stat.value}
              {stat.suffix && <span className="text-slate-500 text-xl font-bold uppercase">{stat.suffix}</span>}
            </div>
          </div>

          <div className="h-1 w-full bg-white/[0.02] rounded-full mt-6 overflow-hidden">
             <div className="h-full bg-gradient-to-r from-blue-500/40 to-cyan-500/40 w-1/3 group-hover:w-full transition-all duration-1000 ease-out"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StakingStats;
