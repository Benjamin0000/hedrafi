import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';


const PAGE_SIZE = 3;


/* =========================================================
   MAIN COMPONENT
========================================================= */

const CreatorsPanel = ({ creators = [] }) => {

    const [page, setPage] = useState(0);

    const pageCount = Math.max(1, Math.ceil(creators.length / PAGE_SIZE));

    const visible = creators.slice(
        page * PAGE_SIZE,
        page * PAGE_SIZE + PAGE_SIZE
    );

    const goTo = (nextPage) => {
        setPage((nextPage + pageCount) % pageCount);
    };


    return (

        <div className="rounded-2xl border border-white/[0.07] bg-[#050A15] p-4 shrink-0 w-[280px] sm:w-auto">


            {/* Header */}

            <div className="flex items-center justify-between mb-4">

                <h3 className="text-sm font-black text-white tracking-tight">
                    Featured Creators
                </h3>


                <div className="flex items-center gap-1">

                    <button
                        type="button"
                        onClick={() => goTo(page - 1)}
                        className="w-6 h-6 rounded-lg bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-white hover:border-emerald-500/25 transition-all"
                        aria-label="Previous creators"
                    >
                        <ChevronLeft size={13} />
                    </button>


                    <button
                        type="button"
                        onClick={() => goTo(page + 1)}
                        className="w-6 h-6 rounded-lg bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-white hover:border-emerald-500/25 transition-all"
                        aria-label="Next creators"
                    >
                        <ChevronRight size={13} />
                    </button>

                </div>

            </div>


            {/* Creators row */}

            <div className="grid grid-cols-3 gap-2">

                {visible.map((creator) => (

                    <Link
                        key={creator.id}
                        to={`/marketplace/creator/${creator.id}`}
                        className="flex flex-col items-center text-center group"
                    >

                        <div className="relative">

                            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/[0.08] bg-white/[0.03]">

                                <img
                                    src={creator.avatar}
                                    alt={creator.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                            </div>


                            {creator.verified && (

                                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#050A15] flex items-center justify-center">

                                    <BadgeCheck size={11} className="text-cyan-400" />

                                </div>

                            )}

                        </div>


                        <p className="text-[10px] font-bold text-slate-300 mt-2 truncate w-full group-hover:text-emerald-300 transition-colors">
                            {creator.name}
                        </p>


                        <p className="text-[9px] text-slate-600 truncate w-full">
                            Creator
                        </p>

                    </Link>

                ))}

            </div>


            {/* Dots */}

            {pageCount > 1 && (

                <div className="flex justify-center gap-1.5 mt-4">

                    {Array.from({ length: pageCount }).map((_, i) => (

                        <button
                            key={i}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Go to page ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all ${
                                i === page
                                    ? 'w-4 bg-emerald-400'
                                    : 'w-1.5 bg-white/15 hover:bg-white/30'
                            }`}
                        />

                    ))}

                </div>

            )}

        </div>

    );

};


export default CreatorsPanel;