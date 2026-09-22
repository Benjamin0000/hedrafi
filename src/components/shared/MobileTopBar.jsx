import { Menu } from 'lucide-react';
import Logo from './Logo';


const MobileTopBar = ({ onMenuClick }) => {

    return (

        <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between gap-3 px-4 h-14 border-b border-white/[0.06] bg-[#030712]/90 backdrop-blur-md">

            <button
                type="button"
                onClick={onMenuClick}
                className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-300 hover:text-white hover:border-emerald-500/25 transition-all"
                aria-label="Open menu"
            >
                <Menu size={17} />
            </button>


            <Logo size="compact" />


            {/* Spacer to keep the logo visually centered against the menu button */}
            <div className="w-9" />

        </div>

    );

};


export default MobileTopBar;