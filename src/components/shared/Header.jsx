import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutGrid, ShoppingCart, Coins, TrendingUp } from 'lucide-react';
import logo from "../../assets/logo.png";
import WalletButton from './WalletButton';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Studio', path: '/studio', icon: LayoutGrid },
        { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart },
        { name: 'Staking', path: '/staking', icon: Coins },
        { name: 'Profit', path: '/profit', icon: TrendingUp },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`fixed top-0 z-[100] w-full transition-all duration-300 px-4 pt-4 ${scrolled ? 'translate-y-0' : 'translate-y-0'}`}>
            <div className={`max-w-7xl mx-auto backdrop-blur-xl rounded-[2rem] px-6 py-3 flex justify-between items-center transition-all duration-500 border-white/10 ${
                scrolled ? 'bg-white/5 shadow-[0_0_50px_rgba(0,0,0,0.3)] scale-[0.98]' : 'bg-white/[0.02] border-white/5'
            }`}>
                <div className="flex items-center gap-6">
                    <Link to='/' className="hover:scale-105 transition-transform duration-300">
                        <img src={logo} width={45} alt="HedraFi Logo" className="drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"/> 
                    </Link>
                    <div className="hidden lg:block h-6 w-px bg-white/10"></div>
                    {/* <span className="hidden sm:inline-flex bg-blue-500/10 text-cyber-blue text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-cyber-blue/20">
                        TestNet 2.0
                    </span> */}
                </div>
                
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name}
                            to={link.path} 
                            className={`px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group ${
                                isActive(link.path) 
                                ? 'text-white bg-white/5 shadow-[inset_0_0_12px_rgba(255,255,255,0.05)]' 
                                : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.03]'
                            }`}
                        >
                            <link.icon size={16} className={`transition-transform duration-300 group-hover:scale-110 ${isActive(link.path) ? 'text-cyber-blue' : 'text-gray-600 group-hover:text-gray-400'}`} />
                            {link.name}
                            {isActive(link.path) && (
                                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyber-blue shadow-[0_0_10px_#00F0FF]"></span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:block">
                        <WalletButton />
                    </div>
                    
                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <div className={`md:hidden absolute top-full left-4 right-4 mt-4 transition-all duration-500 transform ${
                isMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
            }`}>
                <div className="glass-card rounded-[2rem] p-6 space-y-3 border-white/10 shadow-2xl bg-white/5 backdrop-blur-3xl">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name}
                            to={link.path} 
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center justify-between p-5 rounded-[1.5rem] transition-all ${
                                isActive(link.path)
                                ? 'bg-blue-600/20 border border-blue-500/30'
                                : 'bg-white/5 border border-white/5 hover:bg-white/10'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2.5 rounded-xl ${isActive(link.path) ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400'}`}>
                                    <link.icon size={20} />
                                </div>
                                <span className={`font-black uppercase tracking-widest text-sm ${isActive(link.path) ? 'text-white' : 'text-gray-400'}`}>
                                    {link.name}
                                </span>
                            </div>
                            {isActive(link.path) && <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse"></div>}
                        </Link>
                    ))}
                    <div className="pt-4 sm:hidden">
                        <WalletButton />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
