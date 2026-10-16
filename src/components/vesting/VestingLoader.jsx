import { useState } from "react";
import MarketplaceSidebar from "../shared/MarketplaceSidebar";
import MobileTopBar from "../shared/MobileTopBar";
import AmbientBackground from "../shared/AmbientBackground";

const VestingLoader = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
    <div className="relative min-h-screen bg-[#030712] text-slate-200 font-sans">
            <AmbientBackground />
            <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />
            <div className="relative z-10 flex items-start">
                <MarketplaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onDisconnect={() => {}} />
                <main className="flex-1 min-w-0">
                    <div className="pt-10 md:pt-14 pb-24 px-4 sm:px-6 lg:px-10">
                        <div className="max-w-6xl mx-auto animate-pulse">
                            <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10">
                                <div>
                                    <div className="h-4 w-32 bg-white/[0.06] rounded-full mb-4" />
                                    <div className="h-8 w-64 bg-white/[0.08] rounded-xl" />
                                    <div className="h-4 w-80 bg-white/[0.04] rounded-lg mt-4" />
                                </div>
                                <div className="h- w- bg-white/[0.03] border border-white/5 rounded-2xl" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
                                <div className="space-y-6">
                                    <div className="rounded- border border-white/10 bg-[#02050E]/90 p-6 md:p-8 space-y-6">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/[0.06]" />
                                            <div className="space-y-3">
                                                <div className="h-5 w-48 bg-white/[0.08] rounded-lg" />
                                                <div className="h-3 w-64 bg-white/[0.04] rounded-lg" />
                                            </div>
                                        </div>
                                        <div className="h-12 w-full bg-white/[0.03] rounded-xl border border-white/5" />
                                        <div className="h-14 w-full bg-gradient-to-r from-blue-600/20 to-emerald-500/20 rounded-xl" />
                                    </div>
                                </div>
                                <div className="p-6 rounded- border border-white/10 bg-[#02050E]/90 space-y-4">
                                    <div className="h-4 w-24 bg-white/[0.06] rounded-full" />
                                    <div className="h-20 w-full bg-white/[0.03] rounded-2xl" />
                                    <div className="h-20 w-full bg-white/[0.03] rounded-2xl" />
                                    <div className="flex items-center justify-center gap-2 pt-6 text- font-black tracking-widest text-slate-600">
                                        <div className="w-4 h-4 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin" />
                                        LOADING VESTING...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default VestingLoader;