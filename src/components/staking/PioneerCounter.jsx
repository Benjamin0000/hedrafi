import { Users, Zap } from "lucide-react";

const PioneerCounter = ({ currentPioneers = 18, totalSlots = 400 }) => {
  const progress = (currentPioneers / totalSlots) * 100;

  return (
    <div className="glass-card p-8 rounded-3xl border-white/[0.05] shadow-2xl hover:shadow-2xl transition-all duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
          <Users size={24} className="text-cyan-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Pioneer Status</h3>
          <p className="text-sm text-slate-400">Phase 1 Progress</p>
        </div>
      </div>

      {/* Counter Display */}
      <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {currentPioneers}
          </span>
          <span className="text-2xl font-bold text-slate-500">
            / {totalSlots}
          </span>
        </div>
        <p className="text-sm text-slate-400">Pioneers Joined</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3 mb-6">
        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700 shadow-[0_0_20px_rgba(0,240,255,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>{Math.round(progress)}% Complete</span>
          <span>{totalSlots - currentPioneers} slots remaining</span>
        </div>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-[0.98] flex items-center justify-center gap-2 group">
        <Zap size={18} className="group-hover:animate-pulse" />
        Secure Your Spot
      </button>

      {/* Motivational Text */}
      <p className="text-center text-xs text-slate-400 mt-4">
        ⏰ Limited availability for the first 400 stakers
      </p>
    </div>
  );
};

export default PioneerCounter;
