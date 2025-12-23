import { ethers } from 'ethers';
import CONTRACT_ABI from '../ABIs/stakingABI.json';
import { ContractId } from '@hashgraph/sdk';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS_EVM;
const REWARD_TOKEN_ID = process.env.REACT_APP_HTS_REWARD_TOKEN;
const rewardTokenAddress = `0x${ContractId.fromString(REWARD_TOKEN_ID).toEvmAddress()}`;
const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_RPC);


export const stakingContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          provider
        );

export const rewardToken = new ethers.Contract(
    rewardTokenAddress,
    [
      'function balanceOf(address account) view returns (uint256)'
    ],
    provider
  );       