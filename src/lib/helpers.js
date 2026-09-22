import { ethers } from 'ethers';
import curveABI from "../ABIs/bondingCurveABI.json"
import vestingABI from "../ABIs/vestingABI.json"

const curveAddress = '0x334955f3462c46a533b7f28d1843617b3ed990fe'; 
const vestingAddress = '0x1c7aed522de0b237fc35bb6579714200e737d3e9'; 
const RPC_URL = "https://mainnet.hashio.io/api";

const provider = new ethers.JsonRpcProvider(RPC_URL);

export const curveRPC = new ethers.Contract(curveAddress, curveABI, provider); 

const vestingrpc = new ethers.Contract(vestingAddress, vestingABI, provider); 

export const vestingRPC = {
  getVesting: (accountId) => vestingrpc.vestings(accountId),
  releasable: (accountId) => vestingrpc.releasable(accountId),
}