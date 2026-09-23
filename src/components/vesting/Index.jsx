import { useState, useEffect, useMemo } from 'react';
import { ContractId } from "@hashgraph/sdk";
import {
  useWriteContract,
  useAssociateTokens,
  useAccountId,
  useWatchTransactionReceipt,
  useBalance,
  useApproveTokenAllowance,
  useTokensBalance,
  useWallet
} from '@buidlerlabs/hashgraph-react-wallets';
import {
    AlertCircle, Clock, Check, Coins, Lock, TrendingUp,
    Wallet, Zap, ShieldCheck, Hourglass, CalendarClock, ExternalLink
} from 'lucide-react';

import MarketplaceSidebar from "../shared/MarketplaceSidebar";
import MobileTopBar from "../shared/MobileTopBar";
import AmbientBackground from "../shared/AmbientBackground";
import { checkTokenAssociation, checkTokenAllowance } from '../../helpers';
import vestingABI from '../../ABIs/vestingABI.json';
import { vestingRPC, curveRPC } from "../../lib/helpers"
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';

const VESTING_ID = "0.0.10881450"; // your HedraFiVesting mainnet
const HDFI_TOKEN_ID = "0.0.10881443";
const LEGACY_TOKEN_ID = "0.0.10299453"; // old token

const InputLabel = ({ label, hint }) => (
    <div className="mb-2">
        <label className="text- font-black uppercase tracking-[0.18em] text-slate-500">{label}</label>
        {hint && <p className="text-xs text-slate-600 mt-1">{hint}</p>}
    </div>
);
const FieldError = ({ message }) =>!message? null : (
    <p className="mt-2 flex items-start gap-1.5 text- font-bold text-red-400"><AlertCircle size={13} className="shrink-0 mt-" />{message}</p>
);
const ReviewRow = ({ label, value }) => (
    <div className="flex items-center justify-between gap-6 p-4 rounded-xl bg-white/[0.015] border border-white/5">
        <span className="text- font-black uppercase tracking-[0.15em] text-slate-600">{label}</span>
        <span className="text-sm font-bold text-white text-right">{value}</span>
    </div>
);
const inputClass = (invalid) => `
    w-full h-13 px-4 rounded-xl bg-white/[0.025] border outline-none text-sm text-white placeholder:text-slate-700
    ${invalid? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/40 focus:ring-4 focus:ring-purple-500/5'}
`;

const VestingPage = () => {
    const { approve: approveAllowance } = useApproveTokenAllowance();
    const [allowance, setAllowance] = useState(0);
    const [isApproving, setIsApproving] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({ legacyAmount: '' });
    const [vesting, setVesting] = useState(null); // { totalAmount, claimed, startTime, cliff, durationMonths, vType }
    const [releasable, setReleasable] = useState(0);
    const [hasBought, setHasBought] = useState(false);
    const [isAssociatedHDFI, setIsAssociatedHDFI] = useState(true);
    const [isBridging, setIsBridging] = useState(false);
    const [isClaiming, setIsClaiming] = useState(false);

    const { isConnected } = useWallet();
    const { data: accountId } = useAccountId();
    const { data: balanceData } = useBalance();
    const { writeContract } = useWriteContract();
    const { associateTokens } = useAssociateTokens();
    const { watch } = useWatchTransactionReceipt();
    const { isAuthenticated, user } = useAuth();

    const { data: tokensBalance } = useTokensBalance({
        tokens: [LEGACY_TOKEN_ID],
        autoFetch: isConnected
    });
    const token_balance = tokensBalance?.find(t => t.token_id === LEGACY_TOKEN_ID)?.balance ?? 0;
    const hdfiBalance = Number((token_balance / 1e8).toFixed(2))

    const fetchAllowance = async () => {
    if (!accountId) return;
        const amt = await checkTokenAllowance(accountId, VESTING_ID, LEGACY_TOKEN_ID);
        setAllowance(amt);
    };

    useEffect(() => {
    fetchAllowance();
    }, [accountId]);

    const fetchVesting = async () => {
        
        if (!isAuthenticated) return;
      
        try {
            const v = await vestingRPC.getVesting(user.account_id_evm); // returns struct
            const rel = await vestingRPC.releasable(user.account_id_evm);

            const bought = await curveRPC.hasBoughtFromCurve(user.account_id_evm);
            
            if (v && v.exists) {
                setVesting({
                    totalAmount: Number(v.totalAmount) / 1e8,
                    claimed: Number(v.claimed) / 1e8,
                    startTime: Number(v.startTime) * 1000,
                    cliff: Number(v.cliff),
                    durationMonths: Number(v.durationMonths),
                    vType: Number(v.vType)
                });
                setReleasable(Number(rel) / 1e8);
            } else {
                setVesting(null);
            }
            setHasBought(bought);
        } catch (e) { console.log(e); }
    };

    useEffect(() => {
        const checkAssoc = async () => {
            if (!accountId) return;
            console.log("checking token association")
            const a1 = await checkTokenAssociation(accountId, HDFI_TOKEN_ID);
            setIsAssociatedHDFI(a1);
            console.log("token association " + a1)
        };
        checkAssoc();
        fetchVesting();
        const id = setInterval(fetchVesting, 10000);
        return () => clearInterval(id);
    }, [accountId, isAuthenticated]);

    const validateBridge = (data) => {
        const errors = {};
        const amt = data.legacyAmount.trim();
        if (!amt) errors.legacyAmount = 'Enter HRT amount.';
        else if (isNaN(Number(amt))) errors.legacyAmount = 'Invalid number.';
        else if (Number(amt) <= 0) errors.legacyAmount = 'Must be > 0';
        else if (hdfiBalance < amt ) errors.legacyAmount = 'Insufficient $HRT'; 
        return errors;
    };

    const errors = useMemo(() => validateBridge(formData), [formData]);
    const isValid = Object.keys(errors).length === 0;

    const handleAssociate = async (tokenId, setter) => {
        try {
            const txId = await associateTokens([tokenId]);
            watch(txId, {
                onSuccess: () => { toast.success('Associated'); setter(true); fetchVesting(); },
                onError: () => toast.error('Association failed')
            });
        } catch (e) { console.error(e); }
    };

    const handleBridge = async () => {
        if (!isValid ||!hasBought) return;
        const amountNeeded = Number(formData.legacyAmount);

        // 1. Check allowance
        const currentAllowance = await checkTokenAllowance(accountId, VESTING_ID, LEGACY_TOKEN_ID);

        if (currentAllowance < amountNeeded) {
            try {
                setIsApproving(true);
                const txId = await approveAllowance(
                    [{ tokenId: LEGACY_TOKEN_ID, amount: amountNeeded * 1e8 }], // amount in tiny
                    VESTING_ID // SPENDER = vesting contract
                );

                console.log('approval txd', txId)

                watch(txId, {
                    onSuccess: () => {

                        toast.success('Allowance approved! Now bridging...');
                        setIsApproving(false);
                        setAllowance(amountNeeded);
                        // auto-bridge after approve
                        doBridge();

                    },
                    onError: (tx, err) => {
                        setIsApproving(false);
                        toast.error('Allowance approval failed');
                    }
                });
                    return;
                
            } catch (e) {
                setIsApproving(false);
                toast.error('Allowance approval failed');
                return; 
               
            } finally{
                setIsApproving(false);
            } 
        }

        // 2. If allowance is enough, bridge directly
        doBridge();
    };

    const doBridge = async () => {
        try {
            setIsBridging(true);
            const tinybar = Math.floor(Number(formData.legacyAmount) * 1e8);
            const txId = await writeContract({
            contractId: ContractId.fromString(VESTING_ID),
            abi: vestingABI,
            functionName: 'bridgeLegacy',
            args: [tinybar],
            metaArgs: { gas: 300_000 }
            });
            watch(txId, {
                onSuccess: () => {
                    toast.success('$HRT bridged! 6m cliff started');
                    setIsBridging(false);
                    fetchVesting();
                    fetchAllowance();
                },
                onError: (tx, err) => {
                    // if err contains INSUFFICIENT_TOKEN_ALLOWANCE -> tell user to approve
                    toast.error('Bridge failed. Check allowance.');
                    setIsBridging(false);
                }
            });
        } catch (e) { 
            setIsBridging(false); 
        }
        finally{
            setIsBridging(false); 
        }
    };

    const handleClaim = async () => {
        try {
            setIsClaiming(true);
            const txId = await writeContract({
                contractId: ContractId.fromString(VESTING_ID),
                abi: vestingABI,
                functionName: 'userClaim',
                metaArgs: { gas: 250_000 }
            });
            watch(txId, {
                onSuccess: () => { toast.success(`Claimed ${releasable} HDFI`); setIsClaiming(false); fetchVesting(); },
                onError: () => { toast.error('Claim failed - still in cliff?'); setIsClaiming(false); }
            });
        } catch (e) { setIsClaiming(false); }
    };

    // Cliff logic
    const cliffEnd = vesting? new Date(vesting.startTime + vesting.cliff * 1000) : null;
    const isInCliff = cliffEnd? Date.now() < cliffEnd.getTime() : false;
    const monthsPassed = vesting? Math.min(18, Math.floor((Date.now() - (vesting.startTime + vesting.cliff * 1000)) / (30*24*3600*1000)) + (isInCliff? 0 : 1)) : 0;
    const progress = vesting? (vesting.claimed / vesting.totalAmount) * 100 : 0;

    return (
        <div className="relative min-h-screen bg-[#030712] text-slate-200 font-sans">
            <AmbientBackground />
            <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />
            <div className="relative z-10 flex items-start">
                <MarketplaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onDisconnect={() => {}} />

                <main className="flex-1 min-w-0">
                    <div className="pt-10 md:pt-14 pb-24 px-4 sm:px-6 lg:px-10">
                        <div className="max-w-6xl mx-auto">

                            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="flex gap-1"><span className="w-1.5 h-6 rounded-full bg-blue-500" /><span className="w-1.5 h-6 rounded-full bg-purple-500" /><span className="w-1.5 h-6 rounded-full bg-emerald-400" /></div>
                                        <span className="text- font-black uppercase tracking-[0.3em] text-slate-500">HedraFi Protocol</span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-black text-white">Your <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Vesting.</span></h1>
                                    <p className="text-slate-400 mt-4">6-month cliff, then 5.55% monthly for 18 months. Must buy from bonding curve first.</p>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/[0.025] border border-white/5">
                                    <ShieldCheck size={18} className="text-emerald-400" />
                                    <div><p className="text- font-black uppercase tracking-[0.2em] text-slate-600">Network</p><p className="text-xs font-black text-white mt-1">Hedera Mainnet</p></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

                                {/* LEFT */}
                                <div className="space-y-6">

                                    {!vesting? (
                                        <section className="rounded- border border-white/10 bg-[#02050E]/90 p-6 md:p-8">
                                            <div className="flex items-start gap-4 mb-8">
                                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center"><Lock size={21} className="text-blue-400" /></div>
                                                <div><h2 className="text-xl font-black text-white">Bridge Legacy $HRT Token</h2><p className="text-sm text-slate-500 mt-2">Lock your old token to start vesting. Requires bonding curve purchase.</p></div>
                                            </div>

                                            {!hasBought && (
                                                <div className="mb-6 p-4 rounded-2xl border border-red-500/20 bg-red-500/[0.05] flex gap-3">
                                                    <AlertCircle size={16} className="text-red-400 mt-0.5" />
                                                    <div><p className="text-xs font-black text-red-300">You must buy from bonding curve first</p><p className="text- text-red-200/60 mt-1">hasBoughtFromCurve = false. Go to Bonding Curve page.</p></div>
                                                </div>
                                            )}

                                            {!isAssociatedHDFI && <button onClick={() => handleAssociate(HDFI_TOKEN_ID, setIsAssociatedHDFI)} className="mb-4 w-full h-11 rounded-xl bg-amber-500 text-black text-xs font-black">Associate HDFI First</button>}

                                            <div>
                                                <div><small>Balance: {hdfiBalance} $HRT</small></div>
                                                <InputLabel label='$HRT Amount' hint="Amount of old token to lock into 18-month vesting." />
                                                <div className="relative">
                                                    <input value={formData.legacyAmount} onChange={(e) => setFormData({ legacyAmount: e.target.value })} placeholder="e.g. 10000" className={inputClass(!!errors.legacyAmount)} />
                                                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text- font-black text-slate-500">$HRT</span>
                                                </div>
                                                <FieldError message={errors.legacyAmount} />
                                            </div>

                                        <div className="mt-6 space-y-3">
                                            {allowance < Number(formData.legacyAmount || 0) && hasBought && (
                                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300">
                                                Current allowance: {allowance} $HRT. Need: {formData.legacyAmount} $HRT. You'll be asked to approve first.
                                                </div>
                                            )}

                                            <button
                                                onClick={handleBridge}
                                                disabled={!isValid ||!hasBought || isBridging || isApproving}
                                                className={`w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 text-white text-sm font-black flex items-center justify-center gap-3 ${!isValid ||!hasBought? 'opacity-40' : ''}`}
                                            >
                                                <Zap size={18} />
                                                {isApproving? 'Approving $HRT...' : isBridging? 'Bridging...' : allowance < Number(formData.legacyAmount || 0)? `Approve & Bridge ${formData.legacyAmount} $HRT` : `Bridge to Vesting`}
                                            </button>
                                        </div>

                                        </section>
                                    ) : (
                                        <>
                                            <section className="rounded- border border-white/10 bg-[#02050E]/90 p-6 md:p-8">
                                                <div className="flex items-start gap-4 mb-8">
                                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center"><CalendarClock size={21} className="text-emerald-400" /></div>
                                                    <div><h2 className="text-xl font-black text-white">{isInCliff? 'In Cliff Period' : 'Vesting Active'}</h2><p className="text-sm text-slate-500 mt-2">{isInCliff? `Unlocks on ${cliffEnd?.toLocaleDateString()}` : `${monthsPassed} / 18 months unlocked - 5.55% per month`}</p></div>
                                                </div>

                                                <div className="space-y-3">
                                                    <ReviewRow label="Total Vested" value={`${vesting.totalAmount.toLocaleString()} HDFI`} />
                                                    <ReviewRow label="Already Claimed" value={`${vesting.claimed.toLocaleString()} HDFI`} />
                                                    <ReviewRow label="Releasable Now" value={`${releasable.toLocaleString()} HDFI`} />
                                                    <ReviewRow label="Cliff End" value={cliffEnd?.toLocaleDateString() || '-'} />
                                                </div>

                                                <div className="mt-6">
                                                    <div className="flex justify-between text- mb-2"><span className="text-slate-500">Progress</span><span className="font-black text-white">{progress.toFixed(2)}%</span></div>
                                                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400" style={{ width: `${progress}%` }} /></div>
                                                </div>

                                                <button onClick={handleClaim} disabled={releasable <= 0 || isClaiming || isInCliff} className={`mt-6 w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 text-white text-sm font-black flex items-center justify-center gap-3 ${releasable <= 0 || isInCliff? 'opacity-40' : ''}`}>
                                                    <Coins size={18} />{isInCliff? `Cliff until ${cliffEnd?.toLocaleDateString()}` : isClaiming? 'Claiming...' : `Claim ${releasable.toLocaleString()} HDFI`}
                                                </button>
                                            </section>

                                            {isInCliff && (
                                                <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] flex gap-3">
                                                    <Hourglass size={16} className="text-blue-400 mt-0.5" />
                                                    <p className="text- text-slate-400 leading-relaxed"><span className="text-white font-bold">Cliff active:</span> No tokens can be claimed until 6 months after your bridge. After cliff, 5.55% unlocks every 30 days for 18 months. Monthly rate is fixed at 555 BPS.</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* RIGHT - VESTING STATS */}
                                <aside className="lg:sticky lg:top-6 space-y-5">
                                    <div className="p-6 rounded- border border-white/10 bg-[#02050E]/90">
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-emerald-500/20 flex items-center justify-center"><Clock size={18} className="text-purple-400" /></div>
                                            <div><p className="text- font-black uppercase tracking-[0.2em] text-slate-600">Vesting Schedule</p><p className="text-sm font-black text-white">150M $HRT Pool</p></div>
                                        </div>
                                         <div  className="p-3 rounded-[16px] bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                Contract address
              </div>
              <div className="flex items-center justify-between">
                <code className="text-md font-mono text-slate-200 truncate">0.0.10881450</code>
                <div className="flex items-center">
                  <a 
                    href="https://hashscan.io/mainnet/contract/0.0.10881450"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
                                        <div className="space-y-4">
                                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                                <span className="text- font-black uppercase tracking-widest text-slate-500">Cliff</span>
                                                <p className="text-2xl font-black text-white mt-2">6 <span className="text-sm text-slate-400">Months</span></p>
                                                <p className="text- text-slate-600 mt-1">No claims before cliff</p>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                                <span className="text- font-black uppercase tracking-widest text-slate-500">Monthly Unlock</span>
                                                <p className="text-2xl font-black text-white mt-2">5.55% <span className="text-sm text-emerald-400">per month</span></p>
                                                <p className="text- text-slate-600 mt-1">For 18 months after cliff</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                                    <p className="text- font-black uppercase text-slate-600">Total Duration</p>
                                                    <p className="text-sm font-black text-white mt-1">24 Months</p>
                                                </div>
                                                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                                    <p className="text- font-black uppercase text-slate-600">Type</p>
                                                    <p className="text-sm font-black text-white mt-1">$HRT</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-5 p-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.04]">
                                            <p className="text- leading-relaxed text-slate-400"><span className="text-slate-200 font-bold">How it works:</span> After you buy from bonding curve, bridgeLegacy() locks your old token. Contract sets startTime = now, cliff = 180 days, duration = 18 months. You call userClaim() monthly to receive 5.55%.</p>
                                        </div>
                                    </div>
                                </aside>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default VestingPage;