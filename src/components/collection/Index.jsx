import { useState, useMemo } from 'react';
import MarketplaceSidebar from "../shared/MarketplaceSidebar";
import MobileTopBar from "../shared/MobileTopBar";
import AmbientBackground from "../shared/AmbientBackground";
import FuturisticCountdownSmall, { getTarget28th } from "../shared/FuturisticCountdownSmall";

const CollectionsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const target = useMemo(() => getTarget28th(), []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-200">
      <AmbientBackground />
      <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />
      <div className="relative z-10 flex items-start">
        <MarketplaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onDisconnect={() => {}} />
        <main className="flex-1 min-w-0 min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text- font-black tracking-[0.3em] text-slate-600 uppercase mb-4">Collections</p>
            <FuturisticCountdownSmall targetDate={target} />
            <p className="text- text-slate-600 mt-4">Curated collections unveiling on the 28th</p>
          </div>
        </main>
      </div>
    </div>
  );
};
export default CollectionsPage;