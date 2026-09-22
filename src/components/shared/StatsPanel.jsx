import { MoreHorizontal } from 'lucide-react';


/* =========================================================
   MAIN COMPONENT
========================================================= */

const StatsPanel = ({ stats = [] }) => {

    return (

        <div className="rounded-2xl border border-white/[0.07] bg-[#050A15] p-4 shrink-0 w-[280px] sm:w-auto">


            {/* Header */}

            <div className="flex items-center justify-between mb-4">

                <h3 className="text-sm font-black text-white tracking-tight">
                    Marketplace Overview
                </h3>


                <button
                    type="button"
                    className="w-6 h-6 rounded-lg bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-white transition-all"
                    aria-label="More options"
                >
                    <MoreHorizontal size={13} />
                </button>

            </div>


            {/* Stat grid */}

            <div className="grid grid-cols-2 gap-3">

                {stats.map(({ label, value }) => (

                    <div
                        key={label}
                        className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-3"
                    >

                        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-600">
                            {label}
                        </p>


                        <p className="text-sm font-black text-white mt-1.5">
                            {value}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

};


export default StatsPanel;