import { XIcon, ArrowUpRight } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';
import logo from "../../assets/hedrafinew.png";
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const linkClass =
        "group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-white";

    const arrowClass =
        "h-3.5 w-3.5 text-cyan-400 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100";

    const headingClass =
        "mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white";

    const socialClass =
        "flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 transition-all duration-200 hover:border-cyan-400/30 hover:bg-cyan-400/[0.07] hover:text-cyan-300";

    return (
        <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#02050E]">

            {/* Ambient background glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[min(800px,100%)] -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[120px]"
            />

            <div className="container-main relative z-10">

                {/* Main footer */}
                <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-16">

                    {/* Brand */}
                    <div className="space-y-5 sm:col-span-2 lg:col-span-5">

                        <Link
                            to="/"
                            aria-label="HedraFi home"
                            className="inline-flex w-fit items-center gap-3"
                        >
                            <img
                                src={logo}
                                width={42}
                                height={42}
                                alt=""
                                className="h-[42px] w-[42px] object-contain"
                            />

                            <span className="text-2xl font-black tracking-tight text-white">
                                HedraFi
                            </span>
                        </Link>

                        <p className="max-w-sm text-sm leading-7 text-slate-400">
                            Building an open digital economy where creators,
                            collectors, and communities can discover new
                            opportunities through NFTs and blockchain-powered
                            experiences on Hedera.
                        </p>


                        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            <span className="text-xs font-medium text-slate-400">
                                Built on Hedera
                            </span>
                        </div>

                    </div>

                    {/* Explore */}
                    <div className="lg:col-span-2">

                        <h4 className={headingClass}>
                            Explore
                        </h4>

                        <ul className="space-y-4">

                            <li>
                                <Link to="/marketplace" className={linkClass}>
                                    Marketplace
                                    <ArrowUpRight className={arrowClass} />
                                </Link>
                            </li>

                            <li>
                                <Link to="/staking" className={linkClass}>
                                    Staking
                                    <ArrowUpRight className={arrowClass} />
                                </Link>
                            </li>

                            <li>
                                <Link to="/curve" className={linkClass}>
                                    Get Hedrafi Token
                                    <ArrowUpRight className={arrowClass} />
                                </Link>
                            </li>
                        </ul>

                    </div>

                    {/* About & resources */}
                    <div className="lg:col-span-2">

                        <h4 className={headingClass}>
                            Resources
                        </h4>

                        <ul className="space-y-4">

                            <li>
                                <a href="/about.html" className={linkClass}>
                                    About HedraFi
                                    <ArrowUpRight className={arrowClass} />
                                </a>
                            </li>

                            <li>
                                <a href="/litepaper.html" className={linkClass}>
                                    Litepaper
                                    <ArrowUpRight className={arrowClass} />
                                </a>
                            </li>

                            <li>
                                <a href="/tokenomics.html" className={linkClass}>
                                    Tokenomics
                                    <ArrowUpRight className={arrowClass} />
                                </a>
                            </li>

                        </ul>

                    </div>

                    {/* Community */}
                    <div className="lg:col-span-3">

                        <h4 className={headingClass}>
                            Community
                        </h4>

                        <p className="mb-5 max-w-xs text-sm leading-6 text-slate-400">
                            Follow the journey, connect with the community,
                            and stay informed about the HedraFi ecosystem.
                        </p>

                        <div className="flex flex-wrap gap-3">

                            <a
                                href="https://x.com/hedrafi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.09] px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
                            >
                                Follow on X
                                <ArrowUpRight size={14} />
                            </a>

                            <a
                                href="https://discord.gg/cDjN62RJKC"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.09] px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
                            >
                                <SiDiscord size={14} />
                                Join Discord
                            </a>

                        </div>

                    </div>

                </div>

                {/* Bottom bar */}
                <div className="flex flex-col gap-5 border-t border-white/[0.07] py-6 md:flex-row md:items-center md:justify-between">

                    <p className="text-xs text-slate-500">
                        © {currentYear} HedraFi. All rights reserved.
                    </p>

                    <nav
                        aria-label="Legal links"
                        className="flex flex-wrap items-center gap-x-6 gap-y-3"
                    >
                        <a
                            href="/privacy.html"
                            className="text-xs text-slate-500 transition-colors hover:text-white"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="/terms.html"
                            className="text-xs text-slate-500 transition-colors hover:text-white"
                        >
                            Terms of Use
                        </a>

                        <a
                            href="/cookies.html"
                            className="text-xs text-slate-500 transition-colors hover:text-white"
                        >
                            Cookie Policy
                        </a>
                    </nav>

                    <p className="text-xs text-slate-500 md:text-right">
                        Powered by <span className="font-medium text-slate-300">Hedera</span>
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;
