// src/components/StakePanel.js
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWallet, useWriteContract, useReadContract, useAccountId, useBalance, useAssociateTokens, useEvmAddress } from '@buidlerlabs/hashgraph-react-wallets';
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import CONTRACT_ABI from '../ABIs/stakingABI.json';
import { ContractId } from '@hashgraph/sdk';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const REWARD_TOKEN_ID = process.env.REACT_APP_HTS_REWARD_TOKEN;

const StakePanel = () => {
  const { isConnected } = useWallet(HashpackConnector);
  const { writeContract } = useWriteContract({ connector: HashpackConnector });
  const { readContract } = useReadContract({ connector: HashpackConnector });
  const { data: accountId } = useAccountId({ autoFetch: isConnected });
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });
  const { data: hbarBalance, refetch: fetchHbarBalance } = useBalance({ autoFetch: isConnected });
  const { associateTokens } = useAssociateTokens({ connector: HashpackConnector });

  const [stakeAmount, setStakeAmount] = useState('');
  const [pendingReward, setPendingReward] = useState(0);
  const [claimedReward, setClaimedReward] = useState(0);
  const [userStake, setUserStake] = useState(0);
  const [isAssociated, setIsAssociated] = useState(true);

  // Fetch pending rewards, user stake & debt
  const fetchUserData = async () => {
    if (!isConnected || !evmAddress) return;
    try {
      await fetchHbarBalance();
      await checkAssociation();

      // Pending reward
      const reward = await readContract({
        address: `0x${ContractId.fromString(CONTRACT_ADDRESS).toEvmAddress()}`,
        abi: CONTRACT_ABI,
        functionName: 'pendingReward',
        args: [evmAddress],
      });
      setPendingReward(Number(reward) / 1e8);

      // User stake
      const stake = await readContract({
        address: `0x${ContractId.fromString(CONTRACT_ADDRESS).toEvmAddress()}`,
        abi: CONTRACT_ABI,
        functionName: 'userStake',
        args: [evmAddress],
      });
      setUserStake(Number(stake) / 1e8);

    } catch (e) {
      console.error(e);
      setPendingReward(0);
      setUserStake(0);
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
  }, [accountId, isConnected, evmAddress]);

  const checkAssociation = async () => {
    if (!evmAddress) return;
    try {
      const userDebt = await readContract({
        address: `0x${ContractId.fromString(CONTRACT_ADDRESS).toEvmAddress()}`,
        abi: CONTRACT_ABI,
        functionName: 'userRewardDebt',
        args: [evmAddress],
      });
      const claimed = Number(userDebt) / 1e8;
      if(claimed > 0){
        setIsAssociated(true);
      }else{
        setIsAssociated(false);
      }
      setClaimedReward(claimed);
    } catch (e) {
      setIsAssociated(false);
    }
  };

  const handleStake = async () => {
    if (!isConnected) return toast.error('Connect your wallet first');
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
      fetchUserData(); // Refresh stake & rewards immediately
    } catch (e) {
      console.error(e);
      toast.error('Staking failed');
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
      await fetchUserData(); // Update stake, pending & claimed reward
    } catch (e) {
      console.error(e);
      toast.error('Claim failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-2xl shadow-xl space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold text-center text-indigo-400">HedraFi Yield Farm</h2>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between bg-gray-700 p-3 rounded-lg">
          <span>HBAR Balance:</span>
          <span>{hbarBalance?.formatted || '0'}</span>
        </div>

        <div className="flex justify-between bg-gray-700 p-3 rounded-lg">
          <span>Your Staked HBAR:</span>
          <span>{userStake?.toFixed(4) || '0'} HBAR</span>
        </div>

        <div className="flex justify-between bg-gray-700 p-3 rounded-lg">
          <span>Pending HRT Reward:</span>
          <span>{pendingReward?.toFixed(4) || '0'} HRT</span>
        </div>

        <div className="flex justify-between bg-gray-700 p-3 rounded-lg">
          <span>Claimed HRT:</span>
          <span>{claimedReward?.toFixed(4) || '0'} HRT</span>
        </div>
      </div>

      <div className="flex gap-3">
        <input
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          placeholder="Amount to stake"
          className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 text-white"
        />
        <button
          onClick={handleStake}
          className="bg-indigo-500 hover:bg-indigo-600 px-5 py-3 rounded-lg font-semibold transition"
        >
          Stake
        </button>
      </div>

      <button
        onClick={handleClaim}
        className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold transition"
      >
        {isAssociated ? 'Claim HRT Rewards' : 'Associate HTS & Claim'}
      </button>
    </div>
  );
};

export default StakePanel;
