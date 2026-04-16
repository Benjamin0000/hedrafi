import { useNavigate, useLocation } from "react-router-dom";

const PhaseNotification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname !== "/staking") {
      navigate("/staking");
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes globalGlow {
            0%, 100% { 
              box-shadow: 0 0 15px rgba(0, 240, 255, 0.15), inset 0 0 5px rgba(0, 240, 255, 0.02);
              border-color: rgba(0, 240, 255, 0.2);
            }
            50% { 
              box-shadow: 0 0 25px rgba(0, 240, 255, 0.3), inset 0 0 10px rgba(0, 240, 255, 0.05);
              border-color: rgba(0, 240, 255, 0.4);
            }
          }
          .animate-global-glow {
            animation: globalGlow 3s ease-in-out infinite;
          }
        `}
      </style>
      <div className="fixed top-[100px] left-0 w-full z-[110] flex justify-center px-4 pointer-events-none">
        <div
          className="pointer-events-auto bg-[#0A1630]/90 backdrop-blur-xl border border-cyan-500/30 rounded-full px-8 py-2.5 transition-all duration-500 hover:bg-[#0E2045] hover:border-cyan-500/50 cursor-pointer animate-global-glow flex items-center gap-3.5 group"
          onClick={handleClick}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-cyan-400 animate-pulse opacity-50"></div>
          </div>
          <p className="text-[11px] md:text-xs font-black text-white leading-none tracking-[0.1em] uppercase">
            Phase 1 Live: Only 400 Pioneer slots available. <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">Stake now</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PhaseNotification;
