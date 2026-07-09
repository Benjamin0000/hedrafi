import { useState, useEffect } from 'react';

const CountdownUnit = ({ value, label, color }) => (
  <div className="flex flex-col items-center">
    <div className="glass-card w-20 h-24 sm:w-28 sm:h-32 md:w-32 md:h-36 rounded-[16px] border border-white/[0.05] bg-[#0A1024]/60 flex items-center justify-center relative overflow-hidden group shadow-2xl">
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-b ${color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500`}></div>
      <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t ${color} opacity-[0.05] blur-2xl`}></div>
      
      <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-mono tracking-tighter relative z-10 transition-all duration-500 group-hover:scale-110">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="mt-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-slate-500">{label}</span>
  </div>
);

// Target: July 6, 2026 09:00:00 UTC
const TARGET_DATE = new Date('2026-07-06T09:00:00Z').getTime();

const calculateTimeLeft = (targetTime) => {
  const now = new Date().getTime();
  const difference = targetTime - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000)
  };
};

const MarketplaceCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(TARGET_DATE));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft(TARGET_DATE);
      setTimeLeft(newTime);

      if (newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4 sm:gap-6 md:gap-8 justify-center animate-fade-in">
      <CountdownUnit value={timeLeft.days} label="Days" color="from-blue-500 to-cyan-500" />
      <CountdownUnit value={timeLeft.hours} label="Hours" color="from-blue-500 to-cyan-500" />
      <CountdownUnit value={timeLeft.minutes} label="Minutes" color="from-blue-600 to-indigo-600" />
      <CountdownUnit value={timeLeft.seconds} label="Seconds" color="from-blue-600 to-indigo-600" />
    </div>
  );
};

export default MarketplaceCountdown;
