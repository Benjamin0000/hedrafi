import { useState, useEffect } from "react";

// Target date: June 1, 2026 23:59:59 UTC
const TARGET_DATE = new Date("2026-06-01T23:59:59Z").getTime();

const calculateTimeLeft = (target) => {
  const now = new Date().getTime();
  const distance = target - now;

  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
};

const PioneerCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(TARGET_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft(TARGET_DATE);
      setTimeLeft(newTime);
      
      if (newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad = (num) => String(num).padStart(2, "0");

  return (
    <div className="glass-card w-full lg:max-w-sm rounded-[2rem] p-8 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.15)] space-y-6 bg-[#080d20] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] pointer-events-none rounded-full"></div>
      
      <div className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 w-full text-center mb-2">
         <span className="text-[10px] font-black tracking-[0.2em] uppercase text-amber-400">Pioneer Sprint Ends In:</span>
      </div>

      {/* Countdown Timer */}
      <div className="flex justify-center items-center gap-2 text-3xl font-mono font-black text-white tracking-widest my-4">
        <div className="flex flex-col items-center">
           <span>{pad(timeLeft.days)}</span>
           <span className="text-[8px] text-slate-500 uppercase tracking-widest font-sans">Days</span>
        </div>
        <span className="text-amber-500/50 pb-4">:</span>
        <div className="flex flex-col items-center">
           <span>{pad(timeLeft.hours)}</span>
           <span className="text-[8px] text-slate-500 uppercase tracking-widest font-sans">Hrs</span>
        </div>
        <span className="text-amber-500/50 pb-4">:</span>
        <div className="flex flex-col items-center">
           <span>{pad(timeLeft.minutes)}</span>
           <span className="text-[8px] text-slate-500 uppercase tracking-widest font-sans">Min</span>
        </div>
        <span className="text-amber-500/50 pb-4">:</span>
        <div className="flex flex-col items-center">
           <span className="text-amber-400">{pad(timeLeft.seconds)}</span>
           <span className="text-[8px] text-amber-500/50 uppercase tracking-widest font-sans">Sec</span>
        </div>
      </div>
      
      <p className="text-sm text-slate-300 leading-relaxed text-center">
         Stake <span className="text-white font-bold">any amount of HBAR</span> now to secure 1 of 400 <span className="text-amber-400 font-bold">Premium Pioneer Council NFT Badges</span>. The gate closes on June 1st.
      </p>

      <button 
        onClick={() => document.getElementById("stake-form")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 text-xs tracking-widest uppercase mt-4"
      >
         Secure Your Spot Now
      </button>
    </div>
  );
};

export default PioneerCountdown;
