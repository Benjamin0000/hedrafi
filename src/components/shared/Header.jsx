import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import WalletButton from './WalletButton';

const Header = () => {
    return (
        <header className="backdrop-blur-xl bg-gray-900/50 border-b border-purple-500/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <a href='/'>
                        <img src={logo} width={60} alt="HedraFi Logo"/> 
                    </a>
                    <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/30">
                        TestNet
                    </span>
                </div>
                <nav className="flex gap-6">
                    <Link to="/studio" className="text-gray-300 hover:text-purple-400 transition-colors">Studio</Link>
                    <Link to="/marketplace" className="text-gray-300 hover:text-purple-400 transition-colors">Marketplace</Link>
                    <Link to="/staking" className="text-gray-300 hover:text-purple-400 transition-colors">Staking</Link>
                </nav>
                <WalletButton />
            </div>
        </header>
    )
}
export default Header;