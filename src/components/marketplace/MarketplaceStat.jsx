
const MarketplaceStat = ({
    icon: Icon,
    label,
    value,
    highlight = false
}) => {

    return (

        <div className="p-6 md:p-7 rounded-[24px] border border-white/[0.06] bg-[#050A15]">

            <div className="flex items-center justify-between">

                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">

                    {label}

                </p>

                <Icon
                    size={16}
                    className="text-slate-600"
                />

            </div>


            <p className={`text-2xl md:text-3xl font-black tracking-tight mt-5 ${
                highlight
                    ? 'text-emerald-400'
                    : 'text-white'
            }`}>

                {value}

            </p>

        </div>

    );

};


            // <section className="px-4 sm:px-6 lg:px-8 pb-28">

            //         <div className="container-main">

            //             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            //                 <MarketplaceStat
            //                     icon={Gem}
            //                     label="Total Volume"
            //                     value="12.4M ℏ"
            //                 />

            //                 <MarketplaceStat
            //                     icon={Layers3}
            //                     label="Collections"
            //                     value="1,842"
            //                 />

            //                 <MarketplaceStat
            //                     icon={Zap}
            //                     label="Assets Listed"
            //                     value="48,291"
            //                 />

            //                 <MarketplaceStat
            //                     icon={BarChart3}
            //                     label="24H Activity"
            //                     value="+18.4%"
            //                     highlight
            //                 />

            //             </div>

            //         </div>

            //     </section>