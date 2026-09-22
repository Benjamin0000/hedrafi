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
    if (!stakingContract ||!rewardToken) return;
    try {
      const [totalStakedHBAR, totalRewardPaid, totalUsers, totalHRTLocked] = await Promise.all([
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
    const id = setInterval(fetchStats, 10000);
    return () => clearInterval(id);
  }, []);

  const statsData = [
    { label: "HBAR Locked", value: stats.totalStakedHBAR.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }), suffix: "ℏ", icon: Lock, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/10" },
    { label: "$HRT Locked", value: stats.totalHRTLocked.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }), icon: Banknote, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/10" },
    { label: "$HRT Paid", value: stats.totalRewardPaid.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }), icon: Diamond, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/10" },
    { label: "Users", value: stats.totalUsers.toLocaleString(), icon: Users, color: "text-slate-400", bg: "bg-white/[0.05] border-white/5" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
      {statsData.map((stat, i) => (
        <div key={i} className="rounded- border border-white/[0.05] bg-[#0A1024]/60 p-4 flex flex-col justify-between min-h- hover:bg-[#0D152D] transition-all group">
          <div className="flex justify-between items-start">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${stat.bg} ${stat.color}`}>
              <stat.icon size={14} />
            </div>
            <span className="text- font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
          </div>
          <div className="mt-3">
            <div className="text- font-black text-white font-mono leading-none flex items-baseline gap-1">
              {stat.value}<span className="text- text-slate-500 font-sans">{stat.suffix}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StakingStats;