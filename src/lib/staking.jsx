import { ethers } from 'ethers';
import CONTRACT_ABI from '../ABIs/stakingABI.json';
import { ContractId } from '@hashgraph/sdk';

const CONTRACT_ID = process.env.REACT_APP_CONTRACT_ADDRESS;
const REWARD_TOKEN_ID = process.env.REACT_APP_HTS_REWARD_TOKEN;
const RPC_URL = process.env.REACT_APP_RPC || "https://testnet.hashio.io/v1/testnet";

// Safe EVM address conversion
const getEvmAddress = (id) => {
    if (!id) return null;
    try {
        return `0x${ContractId.fromString(id).toEvmAddress()}`;
    } catch (e) {
        console.error(`Error converting ${id} to EVM address:`, e);
        return null;
    }
};

const contractAddress = getEvmAddress(CONTRACT_ID);
const rewardTokenAddress = getEvmAddress(REWARD_TOKEN_ID);

const provider = new ethers.JsonRpcProvider(RPC_URL);

export const stakingContract = contractAddress 
    ? new ethers.Contract(contractAddress, CONTRACT_ABI, provider)
    : null;

export const rewardToken = rewardTokenAddress
    ? new ethers.Contract(
        rewardTokenAddress,
        ['function balanceOf(address account) view returns (uint256)'],
        provider
      )
    : null;
