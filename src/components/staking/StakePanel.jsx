import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useWallet, useWriteContract, useReadContract, useAccountId, useBalance, useAssociateTokens, useEvmAddress } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import CONTRACT_ABI from '../../ABIs/stakingABI.json';
import { ContractId } from '@hashgraph/sdk';
import { checkTokenAssociation } from '../../helpers';

import { stakingContract, rewardToken } from '../../lib/staking'

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const REWARD_TOKEN_ID = process.env.REACT_APP_HTS_REWARD_TOKEN;

const StakePanel = () => {
  const { isConnected } = useWallet(HWCConnector);
  const { writeContract } = useWriteContract({ connector: HWCConnector });
  // const { readContract } = useReadContract({ connector: HWCConnector });
  const { data: accountId } = useAccountId({ autoFetch: isConnected });
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });
  const { refetch: fetchHbarBalance } = useBalance({ autoFetch: isConnected });
  const { associateTokens } = useAssociateTokens({ connector: HWCConnector });

  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [pendingReward, setPendingReward] = useState(0);
  const [claimedReward, setClaimedReward] = useState(0);
  const [userStake, setUserStake] = useState(0);
  const [isAssociated, setIsAssociated] = useState(true);

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
      const stake = await stakingContract.userStake(evmAddress)
      setUserStake( Number(stake) / 1e8 );

    } catch (e) {
      console.error(e);
      setPendingReward(0);
      setUserStake(0);
      setIsAssociated(false);
    }
  };

  // Periodically update user data
  useEffect(() => {
    let interval;
    if (accountId && isConnected && evmAddress) {
      fetchUserData();
      interval = setInterval(() => fetchUserData(), 10000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, isConnected, evmAddress]);

  const getUserClaimed = async () => {
    if (!evmAddress) return;
    try {
      const userDebt = await stakingContract.userRewardDebt(evmAddress)
      const claimed = Number(userDebt) / 1e8;
      setClaimedReward(claimed);
    } catch (e) {}
  };

  const handleStake = async () => {
    if (!isConnected) return toast.error('Connect your wallet first');
    if (!stakingContract) return toast.error('Contract not initialized');
    if (!stakeAmount || stakeAmount <= 0) return toast.error('Enter a valid amount');

    try {
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
    }
  };

  const handleUnstake = async () => {
    if (!isConnected) return toast.error('Connect your wallet first');
    if (!stakingContract) return toast.error('Contract not initialized');
    if (!unstakeAmount || unstakeAmount <= 0) return toast.error('Enter a valid amount');
    if (Number(unstakeAmount) > userStake) return toast.error('Amount exceeds your staked balance');

    try {
      // Convert to tinybar (multiply by 1e8)
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
    }
  };

  const handleClaim = async () => {
    if (!isConnected) return toast.error('Connect your wallet first');

    if (!isAssociated) {
      try {
        await associateTokens([REWARD_TOKEN_ID]);
        toast.success('HTS token associated! You can now claim rewards.');
        setIsAssociated(true);
        return;
      } catch (e) {
        console.error(e);
        return toast.error('Failed to associate HTS token');
      }
    }

    try {
      await writeContract({
        contractId: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'claimReward',
        args: [],
        metaArgs: { gas: 120_000 },
      });
      toast.success('Rewards claimed!');
      await fetchUserData();
    } catch (e) {
      console.error(e);
      toast.error('Claim failed');
    }
  };

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
            Yield Farm
          </h2>
          <p className="text-sm sm:text-base text-gray-400">Stake HBAR • Earn HRT Rewards</p>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-xs sm:text-sm text-gray-400">APY</div>
          <div className="text-2xl sm:text-3xl font-bold text-green-400">24.5%</div>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-gray-900/50 p-3 sm:p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
          <div className="text-xs text-gray-400 mb-1">Your Staked HBAR</div>
          <div className="text-xl sm:text-2xl font-bold font-mono break-all">{userStake?.toFixed(4).toLocaleString() || '0'} ℏ</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 sm:p-4 rounded-xl border border-green-500/30">
          <div className="text-xs text-green-300 mb-1">Pending HRT Reward</div>
          <div className="text-xl sm:text-2xl font-bold text-green-200 font-mono break-all">{pendingReward?.toFixed(4).toLocaleString() || '0'}</div>
        </div>
        
        <div className="bg-gray-900/50 p-3 sm:p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
          <div className="text-xs text-gray-400 mb-1">Claimed HRT</div>
          <div className="text-xl sm:text-2xl font-bold font-mono break-all">{claimedReward?.toFixed(4).toLocaleString() || '0'}</div>
        </div>
      </div>

      {/* Stake Input */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="Amount to stake"
            className="flex-1 bg-gray-900/50 border border-purple-500/20 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
          />
          <button
            onClick={handleStake}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 active:scale-95 sm:hover:scale-105"
          >
            Stake
          </button>
        </div>

        {/* Unstake Input */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            value={unstakeAmount}
            onChange={(e) => setUnstakeAmount(e.target.value)}
            placeholder="Amount to unstake"
            max={userStake}
            className="flex-1 bg-gray-900/50 border border-red-500/20 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all placeholder-gray-500"
          />
          <button
            onClick={handleUnstake}
            className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 active:scale-95 sm:hover:scale-105"
          >
            Unstake
          </button>
        </div>

        <button
          onClick={handleClaim}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 active:scale-95 sm:hover:scale-105"
        >
          {isAssociated ? 'Claim HRT Rewards' : 'Associate HRT & Claim'}
        </button>
      </div>
    </div>
  );
};

export default StakePanel;