import { X, BadgeCheck, Check, Sparkles } from 'lucide-react';


const benefits = [
    'Blue checkmark badge on your profile',
    'Priority placement across Explore & search',
    'Verified badge carried onto your collections',
    'Early access to new launchpad drops'
];


/* =========================================================
   MAIN COMPONENT
========================================================= */

const ActivationModal = ({ isOpen, onClose, onActivate }) => {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">


            <div className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-[#050A15] p-7 sm:p-8 overflow-hidden">


                {/* Ambient glow */}

                <div className="absolute top-[-20%] right-[-10%] w-56 h-56 bg-cyan-500/[0.12] rounded-full blur-[90px] pointer-events-none" />

                <div className="absolute bottom-[-20%] left-[-10%] w-56 h-56 bg-blue-500/[0.08] rounded-full blur-[90px] pointer-events-none" />


                {/* Close */}

                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <X size={15} />
                </button>


                <div className="relative">


                    {/* Badge icon */}

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_10px_30px_rgba(34,211,238,0.25)]">

                        <BadgeCheck size={26} className="text-[#030712]" />

                    </div>


                    {/* Title */}

                    <h2 className="text-xl font-black text-white mt-5">
                        Get the blue checkmark
                    </h2>

                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                        Activate your profile to stand out across HedraFi with a verified badge.
                    </p>


                    {/* Benefits */}

                    <ul className="mt-6 space-y-3">

                        {benefits.map((benefit) => (

                            <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-300">

                                <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <Check size={11} className="text-cyan-400" />
                                </span>

                                {benefit}

                            </li>

                        ))}

                    </ul>


                    {/* Price */}

                    <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 flex items-center justify-between">

                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-600">
                                Monthly
                            </p>
                            <p className="text-lg font-black text-white mt-1">
                                12 HBAR
                            </p>
                        </div>

                        <p className="text-[10px] text-slate-600 max-w-[120px] text-right leading-relaxed">
                            Cancel anytime from your profile settings
                        </p>

                    </div>


                    {/* CTA */}

                    <button
                        type="button"
                        onClick={onActivate}
                        className="w-full mt-6 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-[#030712] flex items-center justify-center gap-2 text-sm font-black hover:opacity-90 transition-opacity"
                    >
                        <Sparkles size={16} />
                        Activate Profile
                    </button>


                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full mt-3 text-xs font-bold text-slate-600 hover:text-slate-400 transition-colors"
                    >
                        Not now
                    </button>

                </div>

            </div>

        </div>

    );

};


export default ActivationModal;