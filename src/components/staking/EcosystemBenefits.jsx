import { TrendingUp, Palette, Globe, Trophy } from "lucide-react";

const BenefitCard = ({ icon: Icon, number, title, description }) => (
  <div className="glass-card p-10 rounded-[2.5rem] border border-white/[0.05] shadow-xl hover:shadow-2xl transition-all duration-500 group bg-[#0A1024]/40 h-full flex flex-col items-start relative box-border">
    {/* Number Badge - Positioned to pop out without clipping */}
    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-mono font-black text-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] border-4 border-[#040816] rotate-[-12deg] group-hover:rotate-0 transition-transform duration-500 z-20">
      {number}
    </div>

    {/* Icon */}
    <div className="mb-8 inline-flex p-5 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
      <Icon size={32} className="text-purple-400 group-hover:text-purple-300" />
    </div>

    {/* Content */}
    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-purple-400 transition-colors duration-300 tracking-tight">
      {title}
    </h3>
    <p className="text-slate-400 text-md leading-relaxed font-medium mb-auto">{description}</p>

    {/* Interactive Element */}
    <div className="mt-8 inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black tracking-widest uppercase text-slate-400 group-hover:border-purple-500/50 group-hover:text-purple-400 transition-all duration-300">
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
