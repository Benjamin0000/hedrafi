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
      label: "HBAR Locked",
      value: stats.totalStakedHBAR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      suffix: "ℏ",
      icon: Lock,
      color: "bg-blue-600/5 text-blue-500",
      border: "border-blue-500/10",
    },
    {
      label: "$HRT Locked",
      value: stats.totalHRTLocked.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      suffix: "",
      icon: Banknote,
      color: "bg-cyan-600/5 text-cyan-400",
      border: "border-cyan-500/10",
    },
    {
      label: "$HRT Distributed",
      value: stats.totalRewardPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      suffix: "",
      icon: Diamond,
      color: "bg-indigo-600/5 text-indigo-400",
      border: "border-indigo-500/10",
    },
    {
      label: "Participants",
      value: stats.totalUsers.toLocaleString(),
      suffix: "",
      icon: Users,
      color: "bg-slate-600/5 text-slate-400",
      border: "border-slate-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="glass-card rounded-[2rem] border border-white/[0.05] bg-[#0A1024]/60 p-8 flex flex-col justify-between min-h-[220px] hover:bg-[#0D152D] transition-all duration-500 group shadow-xl relative overflow-hidden"
        >
          {/* Animated Glow on hover */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/5 rounded-full blur-[60px] group-hover:bg-blue-500/10 transition-all duration-700"></div>

          <div className="flex justify-between items-start mb-6 relative z-10">
             <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} border ${stat.border} shadow-inner`}>
               <stat.icon size={20} />
             </div>
             <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 leading-tight text-right">
              {stat.label}
            </div>
          </div>
          
          <div className="space-y-1 relative z-10">
            <div className="text-3xl md:text-4xl font-black text-white flex items-baseline gap-2 font-mono tracking-tighter">
              {stat.value}
              {stat.suffix && <span className="text-slate-600 text-xs font-bold uppercase">{stat.suffix}</span>}
            </div>
          </div>

          <div className="h-0.5 w-full bg-white/[0.02] rounded-full mt-6 overflow-hidden">
             <div className="h-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 w-1/4 group-hover:w-full transition-all duration-1000 ease-out"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StakingStats;
