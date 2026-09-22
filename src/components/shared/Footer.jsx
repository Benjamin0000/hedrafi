
import { XIcon, ArrowUpRight, Github } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';
import logo from "../../assets/hedrafinew.png";
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const linkClass =
        "text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group";

    const arrowClass =
        "opacity-0 group-hover:opacity-100 transition-opacity text-cyber-blue";

    return (
        <footer className="relative bg-[#02050E] border-t border-white/5 pt-20 pb-8 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none" />

            <div className="container-main relative z-10">

                {/* Main Footer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="space-y-6 lg:col-span-1">

                        <Link to="/" className="flex items-center gap-3 w-fit">
                            <img
                                src={logo}
                                width={40}
                                alt="HedraFi"
                                className="opacity-90"
                            />
                            <span className="text-2xl font-black tracking-tighter text-white">
                                HedraFi
                            </span>
                        </Link>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                            A decentralized ecosystem for creating, 
                            trading, and earning through NFTs, 
                            real-world assets, staking, 
                            and community participation — powered by Hedera.
                        </p>

                        <div className="flex gap-4">

                            <a
                                href="https://x.com/hedrafi"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="HedraFi on X"
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-cyber-blue hover:border-cyber-blue/30 hover:bg-blue-600/5 transition-all"
                            >
                                <XIcon size={18} />
                            </a>

                            <a
                                href="https://discord.gg/cDjN62RJKC"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Join HedraFi Discord"
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-cyber-blue hover:border-cyber-blue/30 hover:bg-blue-600/5 transition-all"
                            >
                                <SiDiscord size={18} />
                            </a>

                            {/* <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="HedraFi on GitHub"
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-cyber-blue hover:border-cyber-blue/30 hover:bg-blue-600/5 transition-all"
                            >
                                <Github size={18} />
                            </a> */}

                        </div>
                    </div>

                    {/* Explore */}
                    <div className="space-y-6">

                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                            Explore
                        </h4>

                        <ul className="space-y-4">

                            {[
                                // { name: 'Stores', path: '/studio' },
                                { name: 'Marketplace', path: '/marketplace' },
                                { name: 'Staking', path: '/staking' },
                            ].map((link) => (

                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className={linkClass}
                                    >
                                        {link.name}

                                        <ArrowUpRight
                                            size={14}
                                            className={arrowClass}
                                        />
                                    </Link>
                                </li>

                            ))}

                        </ul>

                    </div>

                    {/* Protocol */}
                    <div className="space-y-6">

                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                            Protocol
                        </h4>

                        <ul className="space-y-4">

                            <li>
                                <a
                                    href="/litepaper.html"
                                    className={linkClass}
                                >
                                    Litepaper

                                    <ArrowUpRight
                                        size={14}
                                        className={arrowClass}
                                    />
                                </a>
                            </li>

                            <li>
                                <Link to="/tokenomics" className={linkClass}>
                                    Tokenomics

                                    <ArrowUpRight
                                        size={14}
                                        className={arrowClass}
                                    />
                                </Link>
                            </li>

                            <li>
                                <Link to="/about" className={linkClass}>
                                    About HedraFi

                                    <ArrowUpRight
                                        size={14}
                                        className={arrowClass}
                                    />
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Resources */}
                    <div className="space-y-6">

                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                            Resources
                        </h4>

                        <ul className="space-y-4">

                            <li>
                                <a href="#" className={linkClass}>
                                    Documentation

                                    <ArrowUpRight
                                        size={14}
                                        className={arrowClass}
                                    />
                                </a>
                            </li>

                            <li>
                                <a href="#" className={linkClass}>
                                    Help & Support

                                    <ArrowUpRight
                                        size={14}
                                        className={arrowClass}
                                    />
                                </a>
                            </li>

                            <li>
                                <a href="#" className={linkClass}>
                                    FAQ

                                    <ArrowUpRight
                                        size={14}
                                        className={arrowClass}
                                    />
                                </a>
                            </li>

                        </ul>

                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">

                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center md:text-left">
                        © {currentYear} HedraFi Protocol
                    </div>

                    <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">

                        <Link
                            to="/privacy"
                            className="hover:text-white transition-colors"
                        >
                            Privacy
                        </Link>

                        <Link
                            to="/terms"
                            className="hover:text-white transition-colors"
                        >
                            Terms
                        </Link>

                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Cookies
                        </a>

                    </div>

                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        Built on Hedera
                    </div>

                </div>

            </div>

        </footer>
    );
};
export default Footer;
