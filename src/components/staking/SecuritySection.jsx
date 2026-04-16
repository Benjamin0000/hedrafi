import { Shield, LockKeyhole, Zap, Search } from "lucide-react";

const SecurityCard = ({ icon: Icon, title, description }) => (
  <div className="glass-card p-8 rounded-[2rem] border border-white/[0.05] flex flex-col items-start hover:border-cyan-500/20 transition-all duration-300 w-full h-full bg-[#0A1024]">
    {/* Icon */}
    <div className="p-3.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
      <Icon size={20} className="text-cyan-400" />
    </div>

    {/* Content */}
    <h3 className="text-xl font-black text-white mb-4 leading-tight">
      {title}
    </h3>
    <p className="text-sm text-slate-400 leading-relaxed font-medium">
      {description}
    </p>
  </div>
);

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "No Middlemen",
      description:
        "Assets are locked in transparent smart contracts, not private wallets.",
    },
    {
      icon: LockKeyhole,
      title: "Self-Custody",
      description:
        "Only the depositor's key can trigger withdrawals.",
    },
    {
      icon: Zap,
      title: "Real-Time Rewards",
      description:
        "$HRT rewards are distributed automatically with no manual approval.",
    },
    {
      icon: Search,
      title: "$HRT Utility",
      description:
        "$HRT is the fuel powering the marketplace and real-world asset (RWA) ecosystem.",
    },
  ];

  return (
    <div className="space-y-10 w-full">
      <div className="flex items-center gap-4">
        <div className="w-12 h-1 bg-cyan-400"></div>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Security You Can Verify
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityFeatures.map((feature, idx) => (
          <SecurityCard key={idx} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default SecuritySection;
