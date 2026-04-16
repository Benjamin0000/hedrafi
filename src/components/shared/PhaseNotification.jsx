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
              box-shadow: 0 0 25px rgba(0, 240, 255, 0.4), inset 0 0 10px rgba(0, 240, 255, 0.1);
              border-color: rgba(0, 240, 255, 0.4);
            }
            50% { 
              box-shadow: 0 0 50px rgba(0, 240, 255, 0.7), inset 0 0 20px rgba(0, 240, 255, 0.2);
              border-color: rgba(0, 240, 255, 0.8);
            }
          }
          .animate-global-glow {
            animation: globalGlow 2s ease-in-out infinite;
          }
        `}
      </style>
      <div className="fixed top-[100px] left-0 w-full z-[110] flex justify-center px-4 pointer-events-none">
        <div
          className="pointer-events-auto bg-[#0A1630]/95 backdrop-blur-2xl border border-cyan-500/50 rounded-full px-10 py-3.5 transition-all duration-500 hover:bg-[#0E2045] hover:scale-105 cursor-pointer animate-global-glow flex items-center gap-4 group"
          onClick={handleClick}
        >
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75"></div>
          </div>
          <p className="text-sm font-black text-white leading-5 tracking-[0.05em] uppercase">
            Phase 1 Live: Only 400 Pioneer slots available. <span className="text-cyan-400 group-hover:text-white transition-colors">Stake now</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PhaseNotification;
