import { useState, useEffect } from 'react';
import {
  useWallet, useWriteContract, useAccountId, useAssociateTokens, useReadContract, useEvmAddress
} from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import { Star, Landmark, Link as LinkIcon, Flame, IdCard, Medal, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';

import MarketplaceSidebar from "../shared/MarketplaceSidebar";
import MobileTopBar from "../shared/MobileTopBar";
import AmbientBackground from "../shared/AmbientBackground";
import { checkTokenAssociation } from '../../helpers';
import ABI from '../../ABIs/pioneerMintingABI.json';
import { pioneerCouncil } from '../../lib/staking';

const PioneerCouncilPass = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
        const whitelisted = await readContract({ address: EVM_CONTRACT_ADDRESS, abi: ABI, functionName: 'users', args: [evmAddress] })
        return whitelisted;
    }
    const getSerialNumber = async () => {
        try { const number = await pioneerCouncil.minted(); return Number(number); } catch (e) { console.error(e); }
    }
    const handleMint = async () => {
        if (!isConnected) return toast.error('Connect your wallet first');
        if (!isAssociated) {
            try { await associateTokens([tokenID]); toast.success('NFT associated!'); setIsAssociated(true); return; } catch { return toast.error('Failed to associate'); }
        }
        try {
            setClaiming(true);
            await writeContract({ contractId: contractID, abi: ABI, functionName: 'mint', metaArgs: { gas: 2_000_000} });
            toast.success('NFT minted!'); setTimeout(() => window.location.reload(), 2000);
        } catch (e) { toast.error('minting failed'); } finally { setClaiming(false); }
    };

    useEffect(() => { getSerialNumber().then(n => setSerialNumber(n)); }, []);
    useEffect(() => {
        const check = async () => {
            if (evmAddress) {
                const w = await isWhiteListed(); setIsWhitelisted(Number(w));
                const a = await checkTokenAssociation(accountId, tokenID); setIsAssociated(a);
            }
        }; check();
    }, [evmAddress, accountId]);

    const calcNo = serialNumber + 1 < maxAvaliable? serialNumber + 1 : maxAvaliable
    const paddedSerial = String(calcNo).padStart(3, '0');

    return (
        <div className="relative min-h-screen bg-[#030712] text-slate-200 font-sans">
            <AmbientBackground />
            <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />
            <div className="relative z-10 flex items-start">
                <MarketplaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onDisconnect={() => {}} />

                <main className="flex-1 min-w-0">
                    <div className="pt-8 md:pt-10 pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w- mx-auto">

                            {/* Header - compact */}
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-1 h-4 rounded-full bg-blue-500" />
                                        <span className="text- font-black uppercase tracking-[0.3em] text-slate-500">HedraFi Protocol • Pioneer</span>
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase leading-none">
                                        PIONEER <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">COUNCIL</span>
                                    </h1>
                                    <p className="text- text-slate-500 mt-2 max-w-md">Not given. Earned. First 215 architects only.</p>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                                    <ShieldCheck size={14} className="text-emerald-400" />
                                    <p className="text- font-bold text-slate-400">Hedera Mainnet • {serialNumber}/215 Minted</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] xl:grid-cols-[440px_1fr] gap-6 items-start">

                                {/* LEFT */}
                                <div className="space-y-4">
                                    <div className="rounded- border border-white/10 bg-[#02050E]/90 p-4">
                                        <div className="w-full aspect-[4/4.5] bg-[#050A15] border border-white/[0.05] rounded- flex justify-center items-center relative overflow-hidden">
                                            <div className="absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none">
                                                <div className="w- h- bg-cyan-500/20 rounded-full blur-" />
                                            </div>
                                            <video width={280} autoPlay loop muted playsInline src={`${videos[calcNo]}`} className="rounded-lg relative z-10" />
                                            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/10" />
                                            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/10" />
                                            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/10" />
                                            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/10" />
                                        </div>

                                        <div className="flex flex-col items-center mt-4 gap-3">
                                            <span className="px-3 py-1 border border-white/[0.06] bg-[#02050E] rounded-md font-mono text-cyan-400 font-bold text- tracking-[0.3em]">#{paddedSerial} / 050</span>

                                            {evmAddress? (
                                                <div className="w-full space-y-2">
                                                    {isWhitelisted == 1 && <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text- font-bold text-emerald-300 text-center">✓ Eligible to mint</div>}
                                                    {isWhitelisted == 2 && <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text- font-bold text-blue-300 text-center">Already minted</div>}
                                                    {isWhitelisted == 0 && <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text- font-bold text-red-300 text-center">Not whitelisted</div>}

                                                    <button onClick={handleMint} disabled={isWhitelisted!= 1 || claiming}
                                                        className={`w-full h-11 rounded-xl text-white text- font-black uppercase tracking-widest flex items-center justify-center gap-2 ${isWhitelisted == 1? 'bg-gradient-to-r from-blue-600 to-emerald-500 hover:opacity-90' : 'bg-white/5 opacity-40 cursor-not-allowed'}`}>
                                                        {claiming? 'Minting...' : isAssociated? 'Mint Relic' : 'Associate'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text- font-bold tracking-widest text-slate-500 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-lg">Connect wallet</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="rounded- border border-white/5 bg-white/[0.02] p-4 text-center">
                                        <p className="text- font-black tracking-[0.2em] text-cyan-400 uppercase">Not a token. A relic.</p>
                                        <p className="text- text-slate-500 leading-relaxed mt-2">Immutable mark of commitment. Reserved for those who walked the path before it was lit.</p>
                                    </div>
                                </div>

                                {/* RIGHT */}
                                <div className="space-y-4">
                                    <div className="rounded- border border-white/10 bg-[#02050E]/90 p-5">
                                        <h3 className="text- font-black tracking-[0.2em] text-slate-500 uppercase mb-3 flex items-center gap-2"><Star size={12} className="text-cyan-400" /> A Symbol of the First</h3>
                                        <p className="text- text-slate-300 leading-relaxed">The Pioneer Council Relic is reserved for the first believers and early architects. Foundation of HedraFi.</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                                            {[
                                                { icon: Medal, title: "Pioneer Status", desc: "One of first 215 architects." },
                                                { icon: IdCard, title: "Exclusive Access", desc: "Private drops & council rooms." },
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                                    <div className="w-8 h-8 rounded-lg bg-[#02050E] border border-white/5 flex items-center justify-center shrink-0">
                                                        <item.icon size={14} className="text-cyan-400" />
                                                    </div>
                                                    <div><h4 className="text- font-black text-slate-200 uppercase">{item.title}</h4><p className="text- text-slate-500 leading-tight mt-0.5">{item.desc}</p></div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-4 gap-2 mt-5">
                                            {[
                                                { icon: Landmark, top: "215", bot: "Cap" },
                                                { icon: LinkIcon, top: "On-Chain", bot: "Verified" },
                                                { icon: Flame, top: "Hedera", bot: "L1" },
                                                { icon: ShieldCheck, top: `${serialNumber}/215`, bot: "Minted" },
                                            ].map((spec, i) => (
                                                <div key={i} className="text-center p-2.5 bg-white/[0.02] border border-white/5 rounded-lg">
                                                    <spec.icon size={14} className="text-cyan-400/60 mx-auto mb-1" />
                                                    <div className="text- font-black text-white">{spec.top}</div>
                                                    <div className="text- font-bold text-slate-500 uppercase">{spec.bot}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PioneerCouncilPass;