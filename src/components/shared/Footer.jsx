import { Twitter, Github, MessageCircle, ArrowUpRight } from 'lucide-react';
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="relative bg-[#02050E] border-t border-white/5 pt-20 pb-10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none"></div>
            
            <div className="container-main relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-6 col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <img src={logo} width={40} alt="HedraFi" className="opacity-90"/>
                            <div className="text-2xl font-black tracking-tighter text-white">HedraFi</div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                            The definitive suite for yield strategies and creative manufacturing on the Hedera Hashgraph network.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, href: "#Text" },
                                { icon: MessageCircle, href: "#Text" },
                                { icon: Github, href: "#Text" }
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-cyber-blue hover:border-cyber-blue/30 hover:bg-blue-600/5 transition-all">
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Protocol</h4>
                        <ul className="space-y-4">
                            {['Studio', 'Marketplace', 'Staking', 'Profit'].map((link) => (
                                <li key={link}>
                                    <Link to={`/${link.toLowerCase()}`} className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                                        {link} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyber-blue" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Governance</h4>
                        <ul className="space-y-4">
                            {['Snapshot', 'Treasury', 'Whitepaper', 'Forum'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                                        {link} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Live Status</h4>
                        <div className="glass p-5 rounded-2xl border-white/5 space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 font-medium">Network</span>
                                <span className="text-green-400 font-black flex items-center gap-1.5 uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    Operational
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 font-medium">TestNet V2</span>
                                <span className="text-blue-400 font-black uppercase tracking-widest">Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    <div>© {currentYear} HedraFi Protocol. Decentralized Archive.</div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;