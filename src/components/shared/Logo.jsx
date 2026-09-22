import { Link } from 'react-router-dom';
import logo from "../../assets/hedrafinew.png";

const Logo = ({ size = 'default' }) => {

    const isCompact = size === 'compact';

    return (

        <div className="flex items-center gap-2.5">

            <div>
                <Link to='/' className="hover:scale-105 transition-transform duration-300">
                        <img src={logo} width={45} alt="HedraFi Logo" className="drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"/> 
                </Link>
            </div>

            <span
                className={`
                    font-black tracking-tight text-white
                    ${isCompact ? 'text-sm' : 'text-base'}
                `}
            >
                HEDRAFI
            </span>

        </div>

    );

};


export default Logo;