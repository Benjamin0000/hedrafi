import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useWallet, useWriteContract, useAccountId, useBalance, useAssociateTokens, useEvmAddress } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import CONTRACT_ABI from '../../ABIs/stakingABI.json';
import { checkTokenAssociation } from '../../helpers';
import { Lock, Unlock, History, Sparkles, Info} from 'lucide-react';

import { stakingContract } from '../../lib/staking'

const CONTRACT_ADDRESS = process.env.REACT_APP_STAKING_ADDRESS;
const REWARD_TOKEN_ID = process.env.REACT_APP_REWARD_TOKEN;

const StakePanel = () => {
  const { isConnected } = useWallet(HWCConnector);
  const { writeContract } = useWriteContract({ connector: HWCConnector });
  const { data: accountId } = useAccountId({ autoFetch: isConnected });
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });
  const { data: balance, refetch: fetchHbarBalance } = useBalance({ autoFetch: isConnected });
  const hbarBalance = balance?.formatted || 0;
  const { associateTokens } = useAssociateTokens({ connector: HWCConnector });

  const [activeTab, setActiveTab] = useState('stake');
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [pendingReward, setPendingReward] = useState(0);
  const [claimedReward, setClaimedReward] = useState(0);
  const [userStake, setUserStake] = useState(0);
  const [isAssociated, setIsAssociated] = useState(true);
  
  const [staking, setStaking] = useState(false);
  const [unstaking, setUnstaking] = useState(false);
  const [claiming, setClaiming] = useState(false);
  // ... rest of the functions same ... (I will keep them as they are in the actual replacement)
  
  // Fetch pending rewards, user stake & debt
  const fetchUserData = async () => {
    if (!isConnected || !evmAddress || !stakingContract) return;
    try {
      await fetchHbarBalance();
      await getUserClaimed();
      const associated = await checkTokenAssociation(accountId, REWARD_TOKEN_ID);
      setIsAssociated(associated);
      // Pending reward
      const reward = await stakingContract.pendingReward(evmAddress)
      setPendingReward( Number(reward) / 1e8);
      // User stake
      const stake = await stakingContract.users(evmAddress);
      setUserStake( Number(stake[0]) / 1e8 );


    } catch (e) {
      console.error(e);
      setPendingReward(0);
      setUserStake(0);
      setIsAssociated(false);
    }
  };

  const getUserClaimed = async () => {
    if (!evmAddress) return;
    try {
      const userDebt = await stakingContract.claimedReward(evmAddress)
      const claimed = Number(userDebt) / 1e8;
      setClaimedReward(claimed);
    } catch (e) {}
  };

  const handleStake = async () => {
    if (!isConnected) return toast.error('Connect your wallet first');
    if (!stakingContract) return toast.error('Contract not initialized');
    if (!stakeAmount || stakeAmount <= 0) return toast.error('Enter a valid amount');

    if(stakeAmount > balance.value) return toast.error('Insufficient HBAR for staking');

    try {
      setStaking(true);
      await writeContract({
        contractId: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'stake',
        args: [],
        metaArgs: { gas: 220_000, amount: stakeAmount },
      });
      toast.success('Stake successful!');
      setStakeAmount('');
      fetchUserData();
    } catch (e) {
      console.error(e);
      toast.error('Staking failed');
    } finally {
      setStaking(false);
    }
  };

  const handleUnstake = async () => {
    if (!isConnected) return toast.error('Connect your wallet first');
    if (!stakingContract) return toast.error('Contract not initialized');
    if (!unstakeAmount || unstakeAmount <= 0) return toast.error('Enter a valid amount');
    if (Number(unstakeAmount) > userStake) return toast.error('Amount exceeds your staked balance');

    try {
      setUnstaking(true);
      const amountInTinybar = Math.floor(Number(unstakeAmount) * 1e8);
      
      await writeContract({
        contractId: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'unstake',
        args: [amountInTinybar],
        metaArgs: { gas: 220_000 },
      });
      toast.success('Unstake successful!');
      setUnstakeAmount('');
      fetchUserData();
    } catch (e) {
      console.error(e);
      toast.error('Unstaking failed');
    } finally {
      setUnstaking(false);
    }
  };

  const handleClaim = async () => {
    if (!isConnected) return toast.error('Connect your wallet first');
    if (!isAssociated) {
      try {
        await associateTokens([REWARD_TOKEN_ID]);
        toast.success('HRT token associated!');
        setIsAssociated(true);
        return;
      } catch (e) {
        return toast.error('Failed to associate HTS token');
      }
    }
    try {
      setClaiming(true);
      await writeContract({
        contractId: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'claim',
        args: [],
        metaArgs: { gas: 320_000 },
      });
      toast.success('Rewards claimed!');
      await fetchUserData();
    } catch (e) {
      console.error(e);
      toast.error('Claim failed');
    } finally {
      setClaiming(false);
    }
  };

  useEffect(() => {
    let interval;
    if (accountId && isConnected && evmAddress) {
      fetchUserData();
      interval = setInterval(() => fetchUserData(), 10000);
    }
    return () => clearInterval(interval);
  }, [accountId, isConnected, evmAddress]);

   return (
    <div className="w-full space-y-8 md:space-y-10 animate-fade-in-up">
      {/* Tabs Layout */}
      <div className="glass p-2 rounded-[2.5rem] border-white/5 flex gap-2">
        {['stake', 'unstake'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-5 md:py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all duration-500 flex items-center justify-center gap-2 ${
              activeTab === tab 
              ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/20' 
              : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]'
            }`}
          >
            {tab === 'stake' ? <Lock size={14} /> : <Unlock size={14} />}
            {tab} HBAR
          </button>
        ))}
      </div>

      {activeTab === 'stake' ? (
        <div className="glass-card p-8 md:p-12 rounded-[3rem] space-y-10 border-white/[0.05] relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 blur-[120px] -mr-40 -mt-40"></div>
           
           <div className="space-y-8">
              <div className="flex justify-between items-end px-2">
                 <div className="space-y-2">
                    <div className="text-[12px] font-black uppercase tracking-[0.3em] text-cyber-blue">Staking Amount</div>
                    <div className="text-sm font-bold text-slate-500">Inventory Liquidity</div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Available ℏ</div>
                    <div className="text-lg font-mono font-black text-white">{ hbarBalance }</div>
                 </div>
              </div>

              <div className="relative group/input">
                 <input
                   type="number"
                   value={stakeAmount}
                   onChange={(e) => setStakeAmount(e.target.value)}
                   className="w-full bg-[#040A1A] border border-white/10 group-hover/input:border-blue-500/40 focus:border-blue-500 p-8 md:p-10 rounded-[2.5rem] text-4xl md:text-5xl font-mono font-black text-white outline-none transition-all placeholder:text-slate-800"
                   placeholder="0.00"
                 />
                 <button 
                   onClick={() => setStakeAmount(balance.value) }
                   className="absolute right-6 top-1/2 -translate-y-1/2 px-6 py-3 bg-blue-500/10 text-cyber-blue rounded-2xl text-[10px] font-black uppercase tracking-widest border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                 >
                    MAX
                 </button>
              </div>
           </div>

           <div className="space-y-4 pt-4 px-2">
              <button 
                onClick={handleStake}
                disabled={staking}
                className="btn-primary w-full !py-8 text-2xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {staking ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : <><Lock size={24} /> Stake Assets</>}
                </span>
              </button>
           </div>
        </div>
      ) : (
        <div className="glass-card p-8 md:p-12 rounded-[3rem] space-y-10 border-white/[0.05] relative overflow-hidden group">
           <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/5 blur-[120px] -ml-40 -mb-40"></div>

           <div className="space-y-8">
              <div className="flex justify-between items-end px-2">
                 <div className="space-y-2">
                    <div className="text-[12px] font-black uppercase tracking-[0.3em] text-red-500">Withdraw Amount</div>
                    <div className="text-sm font-bold text-slate-500">Release Liquidity</div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Your Stake ℏ</div>
                    <div className="text-lg font-mono font-black text-white">{userStake.toFixed(2)}</div>
                 </div>
              </div>

              <div className="relative group/input">
                 <input
                   type="number"
                   value={unstakeAmount}
                   onChange={(e) => setUnstakeAmount(e.target.value)}
                   className="w-full bg-[#040A1A] border border-white/10 group-hover/input:border-red-500/40 focus:border-red-500 p-8 md:p-10 rounded-[2.5rem] text-4xl md:text-5xl font-mono font-black text-white outline-none transition-all placeholder:text-slate-800"
                   placeholder="0.00"
                   
                 />
                 <button 
                   onClick={() => setUnstakeAmount(userStake)}
                   className="absolute right-6 top-1/2 -translate-y-1/2 px-6 py-3 bg-red-500/10 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                 >
                    MAX
                 </button>
              </div>
           </div>

           <div className="space-y-4 pt-4 px-2">
              <button 
                onClick={handleUnstake}
                disabled={unstaking}
                className="w-full py-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 text-2xl font-black text-white hover:bg-red-500/20 hover:border-red-500 transition-all flex items-center justify-center gap-3"
              >
                {unstaking ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Withdrawing...
                  </>
                ) : <><Unlock size={24} /> Unstake Assets</>}
              </button>
           </div>
        </div>
      )}

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
         <div className="glass-card p-10 rounded-[3rem] border-white/5 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyber-blue/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 space-y-10">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Sparkles size={20} className="text-cyber-blue" />
                    <div className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-500">Unclaimed Rewards</div>
                  </div>
                  <div className="px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-green-500/20">Accruing</div>
               </div>
               <div className="text-5xl md:text-6xl font-mono font-black text-white tracking-tighter">
                  {pendingReward.toFixed(4)} <span className="text-sm text-slate-600 uppercase font-black tracking-widest">$HRT</span>
               </div>
               <button 
                 onClick={handleClaim}
                 disabled={claiming}
                 className="w-full !py-6 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/30 transition-all text-white"
               >
                 {claiming ? 'Transmitting...' : (isAssociated ? 'Harvest Yield' : 'Associate & Harvest')}
               </button>
            </div>
         </div>

         <div className="glass-card p-10 rounded-[3rem] border-white/5 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 space-y-10">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <History size={20} className="text-indigo-400" />
                    <div className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-500">Lifetime Earnings</div>
                  </div>
               </div>
               <div className="text-5xl md:text-6xl font-mono font-black text-white tracking-tighter">
                  {claimedReward.toFixed(2)} <span className="text-sm text-slate-600 uppercase font-black tracking-widest">$HRT</span>
               </div>
               <div className="flex items-center gap-3 text-[12px] font-black text-slate-600 pt-2 uppercase tracking-widest">
                  <Info size={16} className="text-indigo-500" />
                  Total assets harvested to date
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StakePanel;