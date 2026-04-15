import { useState } from "react";
import { X, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PhaseNotification = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleClick = () => {
    navigate("/staking");
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 left-4 right-4 md:right-8 z-50 flex justify-center px-4 md:px-0 pointer-events-none">
      <div
        className="relative w-full max-w-md pointer-events-auto bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_0_40px_rgba(0,174,240,0.12)] rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,174,240,0.18)] cursor-pointer group ring-1 ring-cyan-500/10"
        onClick={handleClick}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute top-3 right-3 z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close notification"
        >
          {/* <X size={16} className="text-slate-400 hover:text-slate-300" /> */}
        </button>

        <div className="flex items-center justify-center gap-4 px-5 py-4 text-center">
          <div className="flex-shrink-0 animate-pulse rounded-full bg-cyan-500/10 p-2">
            <Rocket size={22} className="text-cyan-400" />
          </div>
          <p className="text-sm font-semibold text-white leading-5 group-hover:text-cyan-400 transition-colors max-w-[65%] mx-auto">
            <span className="hidden sm:inline">Phase 1 Live:</span>
            <span className="sm:hidden">Phase 1:</span> Only 400 slots. Stake
            now →
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhaseNotification;
