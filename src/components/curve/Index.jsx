import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContractId } from "@hashgraph/sdk";
import {
  useWriteContract,
  useAssociateTokens,
  useAccountId,
  useWatchTransactionReceipt,
  useBalance
} from '@buidlerlabs/hashgraph-react-wallets';

import {
    AlertCircle, ArrowLeft, ArrowRight, Check, Coins, Info, TrendingUp,
    Wallet, Zap, ShieldCheck, Activity, Droplets, BarChart3,  ExternalLink
} from 'lucide-react';


import MarketplaceSidebar from "../shared/MarketplaceSidebar";
import MobileTopBar from "../shared/MobileTopBar";
import AmbientBackground from "../shared/AmbientBackground";
import { checkTokenAssociation } from '../../helpers';
import bondingCurveABI  from '../../ABIs/bondingCurveABI.json';
import { curveRPC } from "../../lib/helpers"
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';

// ===== CONFIG - replace with your deployed =====
const BONDING_CURVE_ID = "0.0.10881448";
const HDFI_TOKEN_ID = "0.0.10881443"; // your mainnet HDFI
const HBAR_DECIMALS = 8;


const useHbarPrice = () => {
  const [hbarUsd, setHbarUsd] = useState(() => {
    const cached = localStorage.getItem('hbarUsd');
    const cachedTime = localStorage.getItem('hbarUsd_time');
    // use cache if < 5 min old
    if (cached && cachedTime && Date.now() - Number(cachedTime) < 5 * 60 * 1000) {
      return Number(cached);
    }
    return null;
  });

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        // Option A: Direct CoinGecko (free, no key)
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd');
        const data = await res.json();
        const price = data['hedera-hashgraph']?.usd;
        if (price) {
          setHbarUsd(price);
          localStorage.setItem('hbarUsd', price);
          localStorage.setItem('hbarUsd_time', Date.now().toString());
        }
      } catch (e) {
        console.log('price fetch failed', e);
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  return hbarUsd;
};

/* =========================================================
   VALIDATION
   ========================================================= */
const InputLabel = ({ label, hint }) => (
    <div className="mb-2">
        <label className="text- font-black uppercase tracking-[0.18em] text-slate-500">{label}</label>
        {hint && <p className="text-xs text-slate-600 mt-1">{hint}</p>}
    </div>
);
const FieldError = ({ message }) =>!message? null : (
    <p className="mt-2 flex items-start gap-1.5 text- font-bold text-red-400"><AlertCircle size={13} className="shrink-0 mt-" />{message}</p>
);

const ReviewRow = ({ label, value, usdValue }) => (
  <div className="flex items-center justify-between gap-6 p-4 rounded-xl bg-white/[0.015] border border-white/5">
    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">{label}</span>
    <div className="text-right">
      <span className="text-sm font-bold text-white">{value}</span>
      {usdValue && <p className="text-[11px] text-slate-500">~{usdValue}</p>}
    </div>
  </div>
);


const inputClass = (invalid) => `
    w-full h-13 px-4 rounded-xl bg-white/[0.025] border outline-none text-sm text-white placeholder:text-slate-700
    ${invalid? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/40 focus:ring-4 focus:ring-purple-500/5'}
`;

const BondingCurveBuy = () => {
    const hbarUsd = useHbarPrice();
    const { data: balanceData } = useBalance();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('amount');
    const [formData, setFormData] = useState({ hbarAmount: '' });
    const [pool, setPool] = useState({ hbarBalance: 0, hdfiBalance: 0, totalSold: 0, price: 0 });
    const [isAssociated, setIsAssociated] = useState(true);
    const [lastTxId, setLastTxId] = useState(null);
    const [isBuying, setIsBuying] = useState(false); 
    const [isAssociating, setIsAssociating] = useState(false); 

    const { data: accountId } = useAccountId();
    const { writeContract } = useWriteContract();
    const { associateTokens } = useAssociateTokens();

    const { user, authLoading, isAuthenticated, setUser, hasProfile } = useAuth();

    const validateAmount = (data) => {
        const errors = {};
        const amount = data.hbarAmount.trim();
        if (!amount) errors.hbarAmount = 'Enter HBAR amount.';
        else if (Number.isNaN(Number(amount))) errors.hbarAmount = 'Enter a valid number.';
        else if (Number(amount) <= 0) errors.hbarAmount = 'Amount must be > 0.';
        else if (Number(amount) < 1) errors.hbarAmount = 'Minimum 1 HBAR.';
        else if (balanceData?.value < formData.hbarAmount) errors.hbarAmount = 'Insufficient HBAR from your wallet'; 
        return errors;
    };

    // Watch tx
    const { watch } = useWatchTransactionReceipt() 

    const fetchPool = async () => {

        try{

            const res = await fetch(`https://mainnet.mirrornode.hedera.com/api/v1/accounts/${BONDING_CURVE_ID}`);
            const data = await res.json();

            console.log(data);

            const sold = await curveRPC.totalMinted(); 
            const price = await curveRPC.calculateCost(1e8);
                    
            const tokenEntry = data.balance.tokens.find(t => t.token_id === HDFI_TOKEN_ID);
            const tokenBalance = tokenEntry ? tokenEntry.balance / 1e8 : 0;

            setPool({
                hbarBalance: data.balance? data.balance.balance / 1e8 : 0,
                hdfiBalance: tokenBalance,
                totalSold: sold ?  Number(sold) / 1e8 : 0,
                price: price ? Number(price) / 1e8 : 0 // HBAR per HDFI
            });
        }catch(e){

        }
    };


    // Fetch pool balances + association
    useEffect(() => {
        const checkAccountAssoc = async () => {
           
            if (!isAuthenticated) return;
            try {
                // 1. Check association
                const associated = await checkTokenAssociation(accountId, HDFI_TOKEN_ID);
                setIsAssociated(associated);
            } catch (e) { 
                console.log("something went wrong while checking assos.")
                console.error(e);
             }
        };
        checkAccountAssoc();
    }, [user, accountId, authLoading, isAuthenticated]);

    useEffect(() => {
        let interval; 
        fetchPool();
        interval = setInterval(() => fetchPool(), 10000);
        return () => clearInterval(interval);
    }, [])

    const quote = useMemo(() => {
        const hbar = Number(formData.hbarAmount) || 0;
        const rate = pool.price ? 1 / pool.price : 0; // 1 HBAR = 1000 HDFI - replace with contract.getAmountOut()
        const gross = hbar * rate;
        return {
            tokensOut: gross,
            pricePerToken: hbar > 0? (hbar / (gross || 1)).toFixed(8) : '0',
            rate
        };
    }, [formData.hbarAmount, pool]);

    const amountErrors = useMemo(() => validateAmount(formData), [formData]);
    const isValid = Object.keys(amountErrors).length === 0;

    const handleAssociate = async () => {
        try {
            setIsAssociating(true); 
            const txId = await associateTokens([HDFI_TOKEN_ID]);
            setLastTxId(txId);

            watch(txId, {
                onSuccess: (transaction) => {
                    toast.success('Token Association successful');
                    setIsAssociated(true);
                    return transaction
                },
                onError: (transaction, error) => {
                    setIsAssociated(false);
                    toast.error('Token Association faild');
                    return transaction
                },
            })

        } catch (e) {
             console.error(e); 
        } finally{
            setIsAssociating(false); 
        }
    };

    const handleBuy = async () => {
        if (!isValid ||!formData.hbarAmount) return;
        try {
            // HBAR is sent as payable value in metaArgs
            const hdfiTinybar = Math.floor(quote.tokensOut * 1e8);
            setIsBuying(true)
            console.log("pool price" + pool.price)
            console.log("token out"+ quote.tokensOut)
            console.log("hbar amount" + (pool.price * quote.tokensOut).toFixed(8) )

            const cost = await curveRPC.calculateCost( Number(quote.tokensOut * 1e8).toFixed() );

            console.log('hbar cost' + cost);
            
            const txId = await writeContract({
                contractId: ContractId.fromString(BONDING_CURVE_ID),
                abi: bondingCurveABI,
                functionName: 'buyTokens',
                args: [ hdfiTinybar ],
                metaArgs: {
                    gas: 300_000,
                    amount: Number( cost  ) / 1e8 
                },
            });
            setLastTxId(txId);

            watch(txId, {
                onSuccess: (transaction) => {
                    toast.success('Token purchase successful');
                    return transaction
                },
                onError: (transaction, error) => {
                    toast.error('Token purchase faild');
                    return transaction
                },
            }); 
        } catch (e) {
            console.error(e);
             setIsBuying(false)
        } finally{
            setIsBuying(false)
        }
    };

    const sections = [
        { id: 'amount', label: 'Amount' },
        { id: 'review', label: 'Review' },
    ];

    const current_usd_price = Number(hbarUsd * pool.price).toFixed(5);

    return (
        <div className="relative min-h-screen bg-[#030712] text-slate-200 font-sans">
            <AmbientBackground />
            <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />
            <div className="relative z-10 flex items-start">
                <MarketplaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onDisconnect={() => {}} />

                <main className="flex-1 min-w-0">
                    <div className="pt-10 md:pt-14 pb-24 px-4 sm:px-6 lg:px-10">
                        <div className="max-w-6xl mx-auto">

                            {/* <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500 hover:text-white mb-10">
                                <ArrowLeft size={15} /> Back to Market
                            </Link> */}

                            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="flex gap-1"><span className="w-1.5 h-6 rounded-full bg-blue-500" /><span className="w-1.5 h-6 rounded-full bg-purple-500" /><span className="w-1.5 h-6 rounded-full bg-emerald-400" /></div>
                                        <span className="text- font-black uppercase tracking-[0.3em] text-slate-500">HedraFi Protocol</span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-black text-white">Buy from <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Bonding Curve.</span></h1>
                                    <p className="text-slate-400 mt-4">Support curve to unlock legacy vesting. <span className="text-white font-bold">hasBoughtFromCurve</span> required for bridgeLegacy().</p>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/[0.025] border border-white/5">
                                    <ShieldCheck size={18} className="text-emerald-400" />
                                    <div><p className="text- font-black uppercase tracking-[0.2em] text-slate-600">Network</p><p className="text-xs font-black text-white mt-1">Hedera Mainnet</p></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

                                {/* LEFT */}
                                <div className="space-y-6">
                                    <section className="rounded- border border-white/10 bg-[#02050E]/90 p-6 md:p-8">
                                        <div className="flex items-start gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center"><Wallet size={21} className="text-blue-400" /></div>
                                            <div><h2 className="text-xl font-black text-white">Purchase Amount</h2><p className="text-sm text-slate-500 mt-2">Enter HBAR to spend. You'll receive HDFI instantly.</p></div>
                                        </div>

                                        {!isAssociated && accountId && (
                                            <div className="mb-6 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] flex items-center justify-between">
                                                <div className="flex gap-3"><AlertCircle size={16} className="text-amber-400 mt-0.5" /><div><p className="text-xs font-black text-amber-300">Token not associated</p><p className="text- text-amber-200/60 mt-1">Associate HDFI to receive it.</p></div></div>
                                                <button onClick={handleAssociate} disabled={isAssociating} className="h-10 px-5 rounded-xl bg-amber-500 text-black text-xs font-black">{isAssociating? 'Associating...' : 'Associate'}</button>
                                            </div>
                                        )}

                                        <div>
                                  
                                            <InputLabel label="HBAR Amount" hint="Quote based on current curve price." />
                                            <div className="relative">
                                                <input value={formData.hbarAmount} onChange={(e) => setFormData({ hbarAmount: e.target.value })} placeholder="e.g. 100" className={inputClass(!!amountErrors.hbarAmount)} />
                                                <span className="absolute right-5 top-1/2 -translate-y-1/2 text- font-black text-slate-500">HBAR</span>
                                            </div>
                                            <FieldError message={amountErrors.hbarAmount} />
                                        </div>

                                        {Number(formData.hbarAmount) > 0 && (
                                            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-blue-500/[0.06] to-emerald-500/[0.05] border border-white/5">
                                                <div className="flex items-center gap-2 mb-3"><TrendingUp size={16} className="text-emerald-400" /><p className="text- font-black uppercase tracking-[0.2em] text-slate-400">You will receive</p></div>
                                                <p className="text-3xl font-black text-white">{quote.tokensOut.toLocaleString()} <span className="text-emerald-400">HDFI</span></p>
                                                <p className="text-xs text-slate-500 mt-2">Price: {quote.pricePerToken} HBAR / HDFI </p>
                                            </div>
                                        )}
                                    </section>

                                    <section className="rounded- border border-white/10 bg-[#02050E]/90 p-6 md:p-8">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center"><Check size={22} className="text-emerald-400" /></div>
                                            <div><h2 className="text-xl font-black text-white">Ready to Buy</h2><p className="text-sm text-slate-500 mt-2">This will set hasBoughtFromCurve = true for vesting.</p></div>
                                        </div>
                                        <div className="space-y-3">
                                            <ReviewRow 
                                                label="You Pay" 
                                                value={`${formData.hbarAmount || '0'} HBAR`} 
                                                usdValue={hbarUsd && formData.hbarAmount? `$${(Number(formData.hbarAmount) * hbarUsd).toFixed(2)}` : null}

                                            />
                                            <ReviewRow label="You Get" value={`${quote.tokensOut.toLocaleString()} HDFI`} />
                                            <ReviewRow label="Unlocks Bridge" value="Yes ✅" />
                                        </div>
                                        <button onClick={handleBuy} disabled={!isValid || isBuying || !isAssociated || !isAuthenticated} className={`mt-6 w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 text-white text-sm font-black flex items-center justify-center gap-3 ${!isValid ||!isAssociated? 'opacity-40' : 'hover:scale-[1.01]'}`}>
                                            <Zap size={18} /> { !isAuthenticated? 'Connect wallet to buy' : isBuying? 'Buying...' : !isAssociated? 'Associate HDFI first' : `Buy HDFI`}
                                        </button>
                                        {/* {lastTxId && <p className="text- text-slate-500 mt-3 text-center">Tx: {lastTxId} • Status: {receipt?.status || 'Pending...'}</p>} */}
                                    </section>
                                </div>

                                {/* RIGHT - POOL STATS */}
                                <aside className="lg:sticky lg:top-6 space-y-5">

                                    <div className="p-6 rounded- border border-white/10 bg-[#02050E]/90">
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center"><Droplets size={18} className="text-blue-400" /></div>
                                            <div><p className="text- font-black uppercase tracking-[0.2em] text-slate-600">Pool Reserves</p><p className="text-sm font-black text-white">Bonding Curve</p></div>
                                        </div>

                                        <div className="space-y-4">



                                            <div  className="p-3 rounded-[16px] bg-white/[0.03] border border-white/[0.08]">
                                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                                                    Contract address
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <code className="text-md font-mono text-slate-200 truncate">0.0.10881448</code>
                                                    <div className="flex items-center">
                                                        <a 
                                                            href="https://hashscan.io/mainnet/contract/0.0.10881448"
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="p-2.5 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white"
                                                        >
                                                            <ExternalLink className="w-5 h-5" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
  <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase tracking-widest text-slate-500">HBAR in Pool</span><Activity size={14} className="text-slate-600" /></div>
  <p className="text-2xl font-black text-white mt-2">{pool.hbarBalance.toLocaleString()} <span className="text-sm font-bold text-slate-400">HBAR</span></p>
  {/* {hbarUsd && <p className="text-xs text-slate-500 mt-1">~${(pool.hbarBalance * hbarUsd).toLocaleString(undefined, {maximumFractionDigits:2})} locked</p>} */}
</div>

                                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                                <div className="flex justify-between items-center"><span className="text- font-black uppercase tracking-widest text-slate-500">HDFI in Pool</span><Coins size={14} className="text-slate-600" /></div>
                                                <p className="text-2xl font-black text-white mt-2">{pool.hdfiBalance.toLocaleString()} <span className="text-sm font-bold text-emerald-400">HDFI</span></p>
                                                    {/* <small> ~ ${ (current_usd_price * pool.hdfiBalance).toLocaleString() }</small> */}
                                                <p className="text- text-slate-600 mt-1">Remaining for sale</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                                    <p className="text- font-black uppercase text-slate-600">Total Sold</p>
                                                    <p className="text-sm font-black text-white mt-1">{pool.totalSold.toLocaleString()}  <sub>HDFI</sub></p>
                                                </div>
                                                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                                    <p className="text- font-black uppercase text-slate-600">Current Price</p>
                                                    <p className="text-sm font-black text-white mt-1">{pool.price} <sub>HBAR</sub></p>
                                                    <small> ~${ (hbarUsd * pool.price).toFixed(6) } per HDFI </small>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-5 p-4 rounded-2xl border border-blue-500/10 bg-blue-500/[0.04]">
                                            <div className="flex gap-2"><BarChart3 size={14} className="text-blue-400 mt-0.5" /><p className="text- leading-relaxed text-slate-400">
                                                <span className="text-slate-200 font-bold">Bonding curve: </span> 
                                                Price increases as more HDFI is bought. Early buyers get the lowest price and unlock the 150M legacy bridge (6-month cliff, 5.55% monthly over 18 months).
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                                        <p className="text- font-black uppercase tracking-[0.2em] text-slate-600">Progress</p>
                                        <div className="mt-4">
                                            <div className="flex justify-between text- mb-2"><span className="text-slate-500">Sold</span><span className="font-black text-white">{((pool.totalSold/100000000)*100).toFixed(2)}%</span></div>
                                            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400" style={{width: `${(pool.totalSold/100000000)*100}%`}} /></div>
                                        </div>
                                    </div> */}

                                </aside>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BondingCurveBuy;