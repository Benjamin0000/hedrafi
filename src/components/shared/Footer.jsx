import logo from "../../assets/logo.png";

const Footer = () => {
    return (
        <footer className="relative backdrop-blur-xl bg-gray-900/50 border-t border-purple-500/20 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    <div className="flex items-center gap-3">
                        <img src={logo} width={50} alt="HedraFi"/>
                        <div>
                            <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">HedraFi</div>
                            <div className="text-sm text-gray-400">Hedera's Unified DeFi + NFT Hub</div>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <a href="#"  className="text-gray-400 hover:text-purple-400 transition-colors">Twitter/X</a>
                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">LinkedIn</a>
                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Discord</a>
                    </div>
                </div>
                <div className="text-center text-gray-500 text-sm">© 2025 HedraFi. All rights reserved.</div>
            </div>
        </footer>
    )
}

export default Footer;