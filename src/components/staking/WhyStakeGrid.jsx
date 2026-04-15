import { TrendingUp, Shield, Vote } from "lucide-react";

const WhyStakeCard = ({ icon: Icon, title, description }) => (
  <div className="glass-card p-8 rounded-2xl border-white/[0.05] shadow-lg hover:shadow-2xl transition-all duration-500 group hover:border-white/10">
    {/* Icon Container */}
    <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
      <Icon size={28} className="text-cyan-400 group-hover:text-cyan-300" />
    </div>

    {/* Content */}
    <h3 className="text-xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>

    {/* Bottom Accent Line */}
    <div className="mt-6 h-1 w-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full group-hover:w-full transition-all duration-500"></div>
  </div>
);

const WhyStakeGrid = () => {
  const reasons = [
    {
      icon: TrendingUp,
      title: "Yield",
      description:
        "Earn $HRT daily as the protocol scales. Passive income aligned with network growth.",
    },
    {
      icon: Shield,
      title: "Safety",
      description:
        "Assets are secured via Hedera Token Service and smart contracts. Fully non-custodial.",
    },
    {
      icon: Vote,
      title: "Governance",
      description:
        "Early stakers gain influence over protocol decisions. Your voice shapes HedraFi's future.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Why <span className="text-gradient">Stake</span> with HedraFi?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map((reason, idx) => (
          <WhyStakeCard key={idx} {...reason} />
        ))}
      </div>
    </div>
  );
};

export default WhyStakeGrid;
