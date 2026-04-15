import { Lock, Key, Zap, Fuel } from "lucide-react";

const SecurityCard = ({ icon: Icon, title, description }) => (
  <div className="glass-card p-6 rounded-2xl border-white/[0.05] shadow-lg hover:shadow-xl transition-all duration-500 group">
    <div className="flex items-start gap-4">
      {/* Icon */}
      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
        <Icon size={24} className="text-green-400 group-hover:text-green-300" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "No Middlemen",
      description:
        "Assets are locked in transparent smart contracts, not private wallets. Full transparency and auditability.",
    },
    {
      icon: Key,
      title: "Self-Custody",
      description:
        "Only the depositor's key can trigger withdrawals. You maintain complete control over your assets.",
    },
    {
      icon: Zap,
      title: "Real-Time Rewards",
      description:
        "$HRT rewards are distributed automatically with no manual approval. Instant, trustless distribution.",
    },
    {
      icon: Fuel,
      title: "$HRT Utility",
      description:
        "$HRT is the fuel powering the marketplace and real-world asset (RWA) ecosystem. Every token has utility.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Security You Can <span className="text-gradient">Verify</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {securityFeatures.map((feature, idx) => (
          <SecurityCard key={idx} {...feature} />
        ))}
      </div>

      {/* Additional Context */}
      <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
        <p className="text-slate-300 text-sm leading-relaxed">
          <span className="text-green-400 font-bold">✓ Fully Audited</span> —
          Our smart contracts have been independently audited by leading
          security firms. All code is open-source and verifiable on Hedera.
        </p>
      </div>
    </div>
  );
};

export default SecuritySection;
