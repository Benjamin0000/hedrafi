import { NavLink } from 'react-router-dom';
import { useWallet, useBalance, useAccountId, useEvmAddress, useTokensBalance } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'; 
import {
    Compass,
    Images,
    GemIcon,
    User,
    Coins,
    Landmark,
    Ticket,
    X,
    Rocket,
    Lock, 
    TrendingUp, 
    CalendarClock
} from 'lucide-react';
import Logo from './Logo';
import logo from "../../assets/hedrafinew.png";
import hbarLogo from "../../assets/hbar_logo.png";
import WalletButton from './WalletButton';
import AuthModal from './AuthModal';

const HRT_TOKEN_ID = process.env.REACT_APP_REWARD_TOKEN;

const HDFI_TOKEN = "0.0.10881443"; 

/* =========================================================
   NAV ITEMS
========================================================= */

const navItems = [
    { label: 'Explore', to: '/marketplace', icon: Compass, end: true },
    { label: 'Collections', to: '/collections', icon: Images },
    { label: 'Launchpad', to: '/launchpads', icon: Rocket },
    // { label: 'Create', to: '/marketplace/create', icon: PlusCircle },
    { label: 'Profile', to: '/profile', icon: User },
    { label: 'Staking', to: '/staking', icon: Coins },
    { label: 'RWAs', to: '/rwa', icon: Landmark },
    { label: 'Pioneer Pass', to: '/pioneer-pass', icon: Ticket },
    { label: 'Get HDFI', to: '/curve', icon: TrendingUp},
    { label: 'Vesting', to: '/vesting', icon: CalendarClock}
];


/* =========================================================
   MAIN COMPONENT
========================================================= */

const MarketplaceSidebar = ({
    isOpen = false,
    onClose = () => {},
}) => {



    const { isConnected } = useWallet(HWCConnector);
    const { data: balanceData } = useBalance({ autoFetch: isConnected });
    const { data: accountId } = useAccountId({ autoFetch: isConnected });
    const { data: tokensBalance } = useTokensBalance({
    tokens: [HDFI_TOKEN],
        autoFetch: isConnected
    });

    const hdfiBalance = tokensBalance?.find(t => t.token_id === HDFI_TOKEN)?.balance ?? 0;
    const hbarBalance = balanceData?.value ? balanceData.value : 0; 
    const wallet = {
        hbarBalance: Number(hbarBalance.toFixed(2)).toLocaleString(),
        hdfiBalance: Number((hdfiBalance / 1e8).toFixed(2)).toLocaleString()
    };



    const SidebarContent = (

        <div className="flex flex-col h-full">


            {/* =================================================
                LOGO
            ================================================= */}

            <div className="flex items-center justify-between px-4 pt-5 pb-4">

                <Logo />


                {/* Close button — mobile drawer only */}

                <button
                    type="button"
                    onClick={onClose}
                    className="lg:hidden w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    aria-label="Close menu"
                >
                    <X size={15} />
                </button>

            </div>


            {/* =================================================
                NAV
            ================================================= */}

            <nav className="flex flex-col gap-1 px-3">

                {navItems.map(({ label, to, icon: Icon, end }) => (

                    <NavLink
                        key={label}
                        to={to}
                        end={end}
                        onClick={onClose}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-2.5 rounded-xl
                            text-xs font-bold tracking-wide
                            border transition-all
                            ${
                                isActive
                                    ? 'bg-emerald-500/[0.09] border-emerald-500/25 text-emerald-300'
                                    : 'bg-transparent border-transparent text-slate-500 hover:text-slate-200 hover:bg-white/[0.03]'
                            }
                        `}
                    >

                        <Icon size={16} strokeWidth={2.25} />

                        {label}

                    </NavLink>

                ))}

            </nav>


            {/* Spacer pushes wallet block to the bottom */}

            <div className="flex-1" />


            {/* =================================================
                WALLET
            ================================================= */}

            <div className="px-3 pb-5 pt-3 border-t border-white/[0.06]">

                {/* Balances */}
                <div className="rounded-xl overflow-hidden bg-white/[0.025] border border-white/[0.06]">

                    <div className="flex items-center justify-between px-3 py-2.5
                                    hover:bg-white/[0.035] transition-colors">

                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.06]
                                            flex items-center justify-center">
                                <span className="text-[9px] font-black text-slate-400">
                                    <img src={hbarLogo} width={45} alt="HBAR Logo" className="drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"/>
                                </span>
                            </div>

                            <span className="text-[10px] font-bold tracking-[0.12em] text-slate-400">
                                HBAR
                            </span>
                        </div>

                        <span className="text-xs font-black text-white tabular-nums truncate ml-2">
                            {wallet.hbarBalance}
                        </span>

                    </div>

                    <div className="mx-3 border-t border-white/[0.05]" />

                    <div className="flex items-center justify-between px-3 py-2.5
                                    hover:bg-white/[0.035] transition-colors">

                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.06]
                                            flex items-center justify-center">
                                <span className="text-[9px] font-black text-slate-400">
                                    <img src={logo} width={45} alt="HDFI Logo" className="drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"/>
                                </span>
                            </div>

                            <span className="text-[10px] font-bold tracking-[0.12em] text-slate-400">
                                HDFI
                            </span>
                        </div>

                        <span className="text-xs font-black text-white tabular-nums truncate ml-2">
                            {wallet.hdfiBalance}
                        </span>

                    </div>

                     <WalletButton width={"100%"} />

                </div>

               

            </div>

        </div>

    );


    return (

        <>

            {/* =====================================================
                DESKTOP — sticky column, feels pinned like a
                Twitter-style profile sidebar as the page scrolls
            ===================================================== */}

            <aside className="hidden lg:flex lg:flex-col w-52 shrink-0 sticky top-0 h-screen border-r border-white/[0.05]">

                {SidebarContent}

            </aside>


            {/* =====================================================
                MOBILE — slide-in drawer + backdrop
            ===================================================== */}

            <div
                onClick={onClose}
                aria-hidden="true"
                className={`
                    lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm
                    transition-opacity duration-300
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
            />

            <aside
                className={`
                    lg:hidden fixed inset-y-0 left-0 z-50 w-72
                    bg-[#03060d] border-r border-white/[0.07]
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >

                {SidebarContent}

            </aside>
            <AuthModal/>
        </>

    );

};


export default MarketplaceSidebar;