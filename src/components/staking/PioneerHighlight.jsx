import { Crown, Zap, Shield, TrendingUp } from "lucide-react";

const PioneerHighlight = () => {
  return (
    <div className="glass-card p-8 md:p-12 rounded-3xl border-white/[0.05] shadow-2xl overflow-hidden relative group">
      {/* Background Gradient Orb */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
      <div
        className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-700"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
            <Crown size={24} className="text-amber-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Join the First{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              400 Pioneers
            </span>
          </h2>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-3xl">
          We are currently in{" "}
          <span className="font-bold text-cyan-400">Phase 1</span> of the
          HedraFi rollout. The first 400 stakers are more than just users—they
          are the{" "}
          <span className="font-bold text-white">
            Pioneers who anchor the network
          </span>
          . By staking{" "}
          <span className="font-bold text-emerald-400">1,000 HBAR or more</span>
          , you secure your place in the governance of the next great Hedera
          utility.
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-2">
              <Zap size={18} className="text-yellow-400" />
              <span className="font-bold text-white">Governance Power</span>
            </div>
            <p className="text-sm text-slate-400">
              Shape protocol decisions from day one
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={18} className="text-green-400" />
              <span className="font-bold text-white">Premium Yields</span>
            </div>
            <p className="text-sm text-slate-400">
              Early stakers earn enhanced rewards
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-2">
              <Shield size={18} className="text-blue-400" />
              <span className="font-bold text-white">Pioneer Status</span>
            </div>
            <p className="text-sm text-slate-400">
              Exclusive benefits and recognition
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 flex gap-4">
          <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98]">
            Become a Pioneer
          </button>
          <button className="flex-1 bg-white/5 border border-white/20 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PioneerHighlight;
