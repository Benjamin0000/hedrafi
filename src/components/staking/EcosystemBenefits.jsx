import { TrendingUp, Palette, Globe, Trophy } from "lucide-react";

const BenefitCard = ({ icon: Icon, number, title, description }) => (
  <div className="glass-card p-8 rounded-2xl border-white/[0.05] shadow-lg hover:shadow-2xl transition-all duration-500 group">
    {/* Number Badge */}
    <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-lg shadow-lg">
      {number}
    </div>

    {/* Icon */}
    <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
      <Icon size={28} className="text-purple-400 group-hover:text-purple-300" />
    </div>

    {/* Content */}
    <h3 className="text-xl font-black text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>

    {/* Interactive Element */}
    <div className="mt-4 inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400 group-hover:border-purple-500/50 group-hover:text-purple-400 transition-all duration-300">
      Learn More →
    </div>
  </div>
);

const EcosystemBenefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      number: "1",
      title: "Yield",
      description:
        "Earn $HRT daily as the HedraFi ecosystem grows. Rewards scale with network adoption.",
    },
    {
      icon: Palette,
      number: "2",
      title: "Marketplace",
      description:
        "Discounted fees on NFT transactions plus exclusive access to premium collections and drops.",
    },
    {
      icon: Globe,
      number: "3",
      title: "RWA Access",
      description:
        "Priority access to tokenized real-world assets. Be among the first to discover new opportunities.",
    },
    {
      icon: Trophy,
      number: "4",
      title: "Pioneer Perk",
      description:
        "Exclusive Pioneer status badge and recognition in future modules. VIP treatment locked in forever.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          One Stake, Multiple <span className="text-gradient">Horizons</span>
        </h2>
      </div>

      <p className="text-slate-400 text-lg max-w-3xl">
        Your staked position unlocks benefits across the entire HedraFi
        ecosystem. More than yield—it's an all-access pass to the future of
        Hedera finance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Connection Lines (Desktop Only) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line
              x1="25%"
              y1="0"
              x2="25%"
              y2="100%"
              stroke="url(#gradient)"
              strokeWidth="1"
              opacity="0.2"
            />
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="url(#gradient)"
              strokeWidth="1"
              opacity="0.2"
            />
            <line
              x1="75%"
              y1="0"
              x2="75%"
              y2="100%"
              stroke="url(#gradient)"
              strokeWidth="1"
              opacity="0.2"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Cards */}
        {benefits.map((benefit, idx) => (
          <div key={idx} className="relative">
            <BenefitCard {...benefit} />
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl text-center">
        <p className="text-slate-300 mb-4">
          Ready to unlock all ecosystem benefits?
        </p>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 active:scale-[0.98]">
          Start Staking Now
        </button>
      </div>
    </div>
  );
};

export default EcosystemBenefits;
