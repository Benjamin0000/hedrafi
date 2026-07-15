import { useState, useEffect } from 'react';
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { Star, Landmark, Link as LinkIcon, Flame, IdCard } from 'lucide-react';
import { Medal } from 'lucide-react';
import { toast } from 'react-toastify';
import ABI from '../../ABIs/pioneerMintingABI.json'
import { checkTokenAssociation } from '../../helpers';
import { useWallet, useWriteContract, useAccountId, useAssociateTokens, useReadContract, useEvmAddress } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import { pioneerCouncil } from '../../lib/staking'

const PioneerCouncilPass = () => {
    const { isConnected } = useWallet(HWCConnector);
    const { data: accountId } = useAccountId({ autoFetch: isConnected });
    const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });
    const [serialNumber, setSerialNumber] = useState(10);
    const [isWhitelisted, setIsWhitelisted] = useState(0);
    const [isAssociated, setIsAssociated] = useState(true);
    const [claiming, setClaiming] = useState(false);
    const { readContract } = useReadContract();
    const { writeContract } = useWriteContract();
    const { associateTokens } = useAssociateTokens({ connector: HWCConnector });

    const tokenID = "0.0.10631447";
    const contractID = "0.0.10631442"; 
    const EVM_CONTRACT_ADDRESS = "0x6211780f8b48b95cd3ab229bf522465c989ff444";
    const maxAvaliable = 50; 

    const videos = {
        24:"https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeihs5xad4hlhyhplcu442lljhaodjz5dxcfgjo3wk3zure2jdms2ee",
        25: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeibyriiwlrem76wgteeuissogfitxro36ugm5ditrpdijhdejrfvce", 
        26: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeie6xm54dpmugy6erhy5vwwr5nrqsjfehuop2sbiyrrhj5mphjb3om",
        27: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeiadutwtedws4xzg4wf4e6224z36fsceciqu37ju43azsheqqyjqo4", 
        28: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeieft7cqekillh42br4siyjcwkn3ffg5agosbm42xbgpprhypihqyy",
        29: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeifq5vmvkqdl4rbngcup5ixsx2iufiwivy6b5mf34zsupw3crqfupu",
        30: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeibqyksotsmr4v4hhft5yajk4za4cgpcdcs5xhdi24ykluqedegbrq",
        31: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeibyroqir4kimrqf6ml6lv4bs5tusl7yj2btxf3fctvmjkkg5lww4e",
        32: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeif2t5zqsg5o4pkaah3bbjjyngxvkbcxicbt6g7gn5yc5b3jlc56g4",
        33: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeid5epwvupemnif7hteiz52apwc5nsdwcc6m6ek5mfflcygmhtees4",
        34: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeiaadsxysbvpasdilsc5rdy2t2yagh6uh5l6wowaxoeugxixraybnu",
        35: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeihqorrvdd7smh2rahmtmtxpqwhjrip4leyvw2xy65olwhkdb7wiye",
        36: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeiftmpgudthxqloii2jygpyoj4gtldhucis4otsgia7ik24ht6shhe",
        37: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeibtbntj3iq6x4meubb4lya4oz6bz42b4jgnbxnmcwv3rih4vxulwe",
        38: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeicnygytissq7dqto7mxnspdlneqw4i4itbl6wyso36mmvt4kids4a",
        39: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeigzerqubgmtuwpu4rj2d3ja54bpynfe2sv5nuqs4tsa6bu34bv6vu",
        40: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeid7m2a3iqq3vl63k6yrr36gexd66kkq27l66iy5jv4c3m3ka33dpy",
        41: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeibz54g2ca5dosw4io2f7pllzsyzokbqzx26r5vmcndzyrtaoxyud4",
        42: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeibmqezlfvvakec5wiz5awxyjkheesln2rtqu7utxbp65yuiiegd5e",
        43: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeigunfxcxa4m43byodojpubdf4ryxnv5t7kypibxlohpzxsdp3clqm", 
        44: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeifnb7w43j3e22mexwrlqynuui5frpmawv5eppoj3zr2oqat557jci",
        45: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeiamvdbah36sui3wvrzkqngnbncifjdordrv5ry36jusgegwbydmfq",
        46: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeiddqepnplpps52jl2q4ldpgurkgbncewrtpjafyjadbrpq3as6q4m",
        47: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeibdjpesqeep4cycepjb377zcxyh2xmjuwutduzr5z3fifxjscij7e",
        48: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeib5ar4x5kwybfbdsvx5usr6bpfj5stmuugo36hseuohqdsmtbb65q",
        49: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeickg4djglrfwpwlkkoslmdflfgjv33dgyht2pyaloozidbowcv554",
        50: "https://salmon-innovative-cat-855.mypinata.cloud/ipfs/bafybeieslviudaygwda3f35v2fvngjycsvfvmnnxzgfzhoklxatedppnne"
    }; 



    const isWhiteListed = async ()=>{
        try {
            const whitelisted = await readContract({
                address: EVM_CONTRACT_ADDRESS,
                abi: ABI,
                functionName: 'users',
                args: [evmAddress]
            })
            console.log("whitelisted", Number(whitelisted))
            return whitelisted;
        } catch (e) {
            console.error(e)
        }
    }

    const getSerialNumber = async () => {
        try {
            const number = await pioneerCouncil.minted();
            return Number(number);
        } catch (e) {
            console.error("Full Error Details:", e);
        }
    }

    const handleMint = async () => {
        if (!isConnected) return toast.error('Connect your wallet first');

        if (!isAssociated) {
            try {
                await associateTokens([tokenID]);
                toast.success('NFT token associated!');
                setIsAssociated(true);
                return;
            } catch (e) {
                return toast.error('Failed to associate token');
            }
        }

        try {
        setClaiming(true);
        await writeContract({
            contractId: contractID,
            abi: ABI,
            functionName: 'mint',
            metaArgs: { gas: 2_000_000},
        });
        toast.success('NFT minted!');

        setTimeout(() => {
            window.location.reload();
        }, 2000);

        } catch (e) {
            console.error(e);
            toast.error('minting failed');
        } finally {
            setClaiming(false);
        }
    };

    useEffect(() => {
        const fetchSerialNumber = async () => {
            const number = await getSerialNumber();
            console.log("Serial Number", number)
            setSerialNumber(number);
        };
        fetchSerialNumber();
    }, []);

    useEffect(() => {
        const checkIfWhiteListed = async () => {
            if (evmAddress) {
                const whitelisted = await isWhiteListed();
                setIsWhitelisted(Number(whitelisted));
                const associated = await checkTokenAssociation(accountId, tokenID);
                setIsAssociated(associated);

                console.log("isAssociated", associated)
            }
        };
        checkIfWhiteListed();
    }, [evmAddress]);

    
    const calcNo = serialNumber + 1 < maxAvaliable ? serialNumber + 1 : maxAvaliable
    const paddedSerial = String(calcNo).padStart(3, '0');

    return (
        <div className="min-h-screen bg-[#02050E] text-slate-200 font-sans relative overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/5 rounded-full blur-[150px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            <Header />

            <main className="relative z-10 pt-32 pb-20 container-main">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 ">
                    
                    {/* Left Column: 3D Asset Viewer Placeholder */}
                    <div className="relative flex flex-col items-center">
                        
                        {/* 3D Asset Container Placeholder */}
                        <div className="w-full max-w-[500px] h-[600px] bg-[#050A15] border border-white/[0.05] rounded-[16px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex  justify-center relative overflow-hidden group">
                            
                            {/* Subtle Ambient Glow inside container */}
                            <div className="absolute inset-0 flex justify-center items-center opacity-30 pointer-events-none z-0">
                                <div className="w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[80px]"></div>
                            </div> 
                            
                            {/* The Placeholder Graphic / Text */}
                            <div className="z-10 flex flex-col  text-center px-8">
                           
                                {/* <img className=' w-96 h-96' src={`/pioneer_image/pioneer${serialNumber}.jpeg`} alt="" /> */}

                                <video
                                width={320}
                                autoPlay
                                loop
                                muted
                                playsInline
                                src={`${videos[ serialNumber + 1 < maxAvaliable ? serialNumber + 1 : maxAvaliable ]}`}
                                />

                            </div>

                            {/* Corner Accents for the 'Vault' feel */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10"></div>
                            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/10"></div>
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/10"></div>
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/10"></div>
                       
                       
                        </div>


                                <div className="mt-8 px-4 py-1.5 border border-white/[0.05] bg-[#02050E] rounded-md font-mono text-cyan-400 font-black text-xs tracking-[0.4em] shadow-inner">
                                    #{paddedSerial}
                                </div>

                                {evmAddress ?
                                <>
                                    {isWhitelisted == 1 ?
                                        <p>You are eligible to mint</p> 
                                        : isWhitelisted == 2 ? 
                                        <p>You have already minted.</p>
                                            : 
                                        <p>You are not on the whitelist</p>
                                    }

                                    <button 
                                     onClick={handleMint}
                                        disabled={isWhitelisted != 1}
                                        className={` ${isWhitelisted == 1 ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-600 cursor-not-allowed'} text-white text-lg font-bold py-4 px-10 rounded-[16px] transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105`}
                                    >

                                        { claiming ? 'Minting...' : isAssociated ? 'Mint' : 'Associate Token'}
                                    </button>
                                </> : 
                                <div className='text-info'>Connect wallet to mint</div>
                            }

                        {/* Bottom Text Block */}
                        <div className="mt-16 text-center max-w-lg z-10">
                            <h2 className="text-lg md:text-xl font-black tracking-widest text-cyan-400 uppercase mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                                NOT A TOKEN. A RELIC.
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed font-medium mb-6">
                                The Pioneer Council Relic is an immutable mark of commitment and vision. Reserved strictly for those who walked the path before it was lit.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Text Information */}
                    <div className="space-y-8">
                        {/* Header Titles */}
                        <div className="space-y-4 text-center lg:text-left">
                           <p className="text-xs md:text-sm font-black tracking-[0.3em] text-slate-500 uppercase">
                                NOT GIVEN. EARNED.<br />
                            </p> 
                            <h1 className="text-2xl md:text-5xl font-black tracking-tight leading-[1.1] text-white uppercase">
                                PIONEER <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">COUNCIL</span> Relic
                            </h1>
                            <div className="flex items-center justify-center lg:justify-start gap-4 pt-6">
                                <div className="h-px bg-white/[0.05] w-16"></div>
                                <span className="text-xs font-black tracking-widest text-slate-400 uppercase">FOUNDING MEMBER STATUS</span>
                                <div className="h-px bg-white/[0.05] w-16"></div>
                            </div>
                        </div>

                        {/* Top Info Box */}
                        <div className="bg-[#050A15] rounded-[16px] p-8 lg:p-10 border border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                            {/* Decorative Accent */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <h3 className="text-sm font-black tracking-widest text-cyan-400 uppercase mb-4 flex items-center gap-3">
                                <Star size={14} /> A SYMBOL OF THE FIRST.
                            </h3>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6 font-medium">
                                The Pioneer Council Relic is reserved for the first believers and early architects. You are not just a participant; you are the foundation upon which HedraFi is built.
                            </p>
                            <p className="text-xs font-black tracking-[0.2em] text-cyan-400/80 uppercase">
                                RECOGNIZED ON-CHAIN. PERMANENTLY RECORDED.
                            </p>
                        </div>

                        {/* Rep Box */}
                        <div className="bg-[#050A15] rounded-[16px] p-8 lg:p-10 border border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative">
                            <div className="flex items-center justify-center gap-4 mb-10">
                                <div className="h-px bg-white/[0.05] w-10"></div>
                                <h3 className="text-xs font-black tracking-widest text-slate-500 uppercase">CORE UTILITY PROTOCOL</h3>
                                <div className="h-px bg-white/[0.05] w-10"></div>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { icon: Medal, title: "PIONEER STATUS", desc: "Recognized unequivocally as one of the first 215 architects of HedraFi." },
                                    { icon: IdCard, title: "EXCLUSIVE ACCESS", desc: "Priority gateway to future yields, private drops, and closed council rooms." },
                                    // { icon: Lock, title: "NON-TRANSFERABLE SOUL", desc: "Cryptographically bound to your identity. Your honor. Your legacy." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start group">
                                        <div className="w-12 h-12 rounded-full bg-[#02050E] border border-white/[0.05] flex items-center justify-center shrink-0 group-hover:border-cyan-500/30 transition-colors">
                                            <item.icon size={20} className="text-cyan-400" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black tracking-widest text-slate-200 uppercase mb-2">{item.title}</h4>
                                            <p className="text-base text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-white/[0.05]">
                            {[
                                { icon: Landmark, top: "215", mid: "PIONEERS", bot: "STRICT CAP" },
                                { icon: LinkIcon, top: "ON-CHAIN", mid: "", bot: "VERIFIABLE" },
                                // { icon: Infinity, top: "SOULBOUND", mid: "", bot: "NON-TRADEABLE" },
                                { icon: Flame, top: "BUILT ON", mid: "", bot: "HEDERA L1" }
                            ].map((spec, i) => (
                                <div key={i} className="text-center flex flex-col items-center p-6 bg-[#050A15] border border-white/[0.02] rounded-[16px] hover:border-cyan-500/10 transition-colors">
                                    <spec.icon size={20} className="text-cyan-400/50 mb-4" strokeWidth={1.5} />
                                    <div className="text-xs font-black tracking-widest text-slate-200 uppercase">{spec.top}</div>
                                    {spec.mid && <div className="text-xs font-black tracking-widest text-slate-200 uppercase">{spec.mid}</div>}
                                    <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-2">{spec.bot}</div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </main>


            <Footer />
        </div>
    );
};

export default PioneerCouncilPass;
