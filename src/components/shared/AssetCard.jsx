import {
    Heart,
    BadgeCheck,
    ArrowUpRight,
    Crown,
    Flame
} from 'lucide-react';


const AssetCard = ({ asset, type = 'nft' }) => {

    const isFeatured = asset.featured;
    const isTrending = asset.trending;

    return (

        <div
            className="
                group relative h-full
                rounded-[20px]
                bg-[#050A15]
                border border-white/[0.07]
                overflow-hidden
                transition-all duration-500
                hover:-translate-y-1
                hover:border-emerald-500/25
                hover:shadow-[0_25px_60px_-25px_rgba(16,185,129,0.18)]
            "
        >


            {/* =====================================================
                IMAGE
            ===================================================== */}

            <div className="relative aspect-square overflow-hidden bg-[#030712]">


                <img
                    src={asset.image}
                    alt={asset.name}
                    className="
                        w-full h-full
                        object-cover
                        transition-transform duration-700
                        group-hover:scale-[1.04]
                    "
                />


                {/* Bottom gradient */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#050A15]/80 via-transparent to-transparent pointer-events-none" />


                {/* =================================================
                    TOP BADGES
                ================================================= */}

                <div className="absolute top-3 left-3 flex items-center gap-1.5">


                    {isFeatured && (

                        <span
                            className="
                                inline-flex items-center gap-1.5
                                px-2.5 py-1.5
                                rounded-lg
                                bg-black/45
                                backdrop-blur-md
                                border border-emerald-500/20
                                text-[8px]
                                font-black
                                uppercase
                                tracking-[0.14em]
                                text-emerald-300
                            "
                        >

                            <Crown size={10} />

                            Featured

                        </span>

                    )}


                    {isTrending && !isFeatured && (

                        <span
                            className="
                                inline-flex items-center gap-1.5
                                px-2.5 py-1.5
                                rounded-lg
                                bg-black/45
                                backdrop-blur-md
                                border border-white/10
                                text-[8px]
                                font-black
                                uppercase
                                tracking-[0.14em]
                                text-slate-300
                            "
                        >

                            <Flame size={10} />

                            Trending

                        </span>

                    )}

                </div>


                {/* =================================================
                    FAVORITE
                ================================================= */}

                <button
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className="
                        absolute top-3 right-3
                        w-8 h-8
                        rounded-lg
                        bg-black/35
                        backdrop-blur-md
                        border border-white/10
                        flex items-center justify-center
                        text-slate-400
                        hover:text-white
                        hover:bg-black/50
                        transition-all
                    "
                    aria-label="Add to favorites"
                >

                    <Heart size={14} />

                </button>


                {/* =================================================
                    HOVER ACTION
                ================================================= */}

                <div
                    className="
                        absolute
                        left-3 right-3 bottom-3
                        translate-y-3
                        opacity-0
                        group-hover:translate-y-0
                        group-hover:opacity-100
                        transition-all duration-300
                    "
                >

                    <div
                        className="
                            h-9
                            rounded-lg
                            bg-white
                            text-black
                            flex items-center justify-center gap-2
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                        "
                    >

                        View NFT

                        <ArrowUpRight size={13} />

                    </div>

                </div>

            </div>


            {/* =====================================================
                CONTENT
            ===================================================== */}

            <div className="p-4">


                {/* Collection */}

                <div className="flex items-center gap-1.5 min-w-0">

                    <p className="text-[10px] text-slate-500 truncate">

                        {asset.collection || 'HedraFi Collection'}

                    </p>


                    {asset.verified && (

                        <BadgeCheck
                            size={12}
                            className="text-cyan-400 shrink-0"
                        />

                    )}

                </div>


                {/* NFT Name */}

                <h3
                    className="
                        text-sm md:text-base
                        font-black
                        text-white
                        mt-1.5
                        truncate
                        group-hover:text-emerald-300
                        transition-colors
                    "
                >

                    {asset.name}

                </h3>


                {/* Creator */}

                {asset.creator && (

                    <p className="text-[10px] text-slate-600 mt-1 truncate">

                        by {asset.creator}

                    </p>

                )}


                {/* =================================================
                    PRICE
                ================================================= */}

                <div className="flex items-end justify-between gap-3 mt-4 pt-3 border-t border-white/[0.05]">


                    <div>

                        <p className="text-[8px] font-black uppercase tracking-[0.16em] text-slate-600">
                            Price
                        </p>


                        <p className="text-sm font-black text-white mt-1">
                            {asset.price || '—'}
                        </p>

                    </div>


                    {asset.volume && (

                        <div className="text-right">

                            <p className="text-[8px] font-black uppercase tracking-[0.16em] text-slate-600">
                                Volume
                            </p>


                            <p className="text-[10px] font-bold text-slate-400 mt-1">
                                {asset.volume}
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );
};


export default AssetCard;