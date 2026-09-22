import { useEffect, useState } from 'react';
import { Clock, Zap } from 'lucide-react';

const useCountdown = (targetDate) => {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0, expired: false });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0, expired: true });
      setT({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
        expired: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return t;
};

export const getTarget28th = () => {
  const now = new Date();
  let target = new Date(now.getFullYear(), now.getMonth(), 28, 23, 59, 59);
  if (now > target) target = new Date(now.getFullYear(), now.getMonth() + 1, 28, 23, 59, 59);
  return target;
};

const FuturisticCountdownSmall = ({ targetDate }) => {
  const { d, h, m, s, expired } = useCountdown(targetDate);
  if (expired) return null;

  const Box = ({ v, l }) => (
    <div className="relative">
      <div className="absolute -inset-[0.5px] rounded- bg-gradient-to-b from-cyan-400/20 to-blue-500/10 blur-[0.5px]" />
      <div className="relative min-w- rounded- border border-white/[0.06] bg-[#0A1024]/90 px-2 py-2 text-center">
        <div className="font-mono text- font-black text-white leading-none tabular-nums">{String(v).padStart(2, '0')}</div>
        <div className="mt-0.5 text- font-black tracking-[0.15em] text-slate-500">{l}</div>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded- border border-white/[0.08] bg-[#060A18]/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(34,211,238,0.15),inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h- w- bg-cyan-500/15 blur- rounded-full pointer-events-none" />
      <div className="relative px-4 py-3.5 flex items-center gap-3">
        <div className="h-7 w-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center"><Clock size={12} className="text-cyan-400" /></div>
        <div className="leading-none">
          <div className="text- font-black tracking-[0.25em] text-cyan-300 flex items-center gap-1"><span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse inline-block" />LAUNCH IN</div>
          <div className="text- font-bold text-slate-400 mt-1">{new Date(targetDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()} • 23:59 UTC</div>
        </div>
        <div className="h-8 w-px bg-white/5 mx-1" />
        <div className="flex items-center gap-1.5">
          <Box v={d} l="D" /><span className="text- text-slate-700 font-mono">:</span><Box v={h} l="H" /><span className="text- text-slate-700 font-mono">:</span><Box v={m} l="M" /><span className="text- text-slate-700 font-mono">:</span><Box v={s} l="S" />
        </div>
        <div className="hidden sm:flex items-center gap-1 ml-2 pl-3 border-l border-white/5"><Zap size={11} className="text-emerald-400" /><span className="text- font-black tracking-widest text-slate-500">HEDRAFI</span></div>
      </div>
    </div>
  );
};

export default FuturisticCountdownSmall;