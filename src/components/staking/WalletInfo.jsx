import { useWallet, useBalance, useAccountId, useEvmAddress, useTokensBalance } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'; 
import WalletButton from '../shared/WalletButton';
import { Copy } from 'lucide-react';

const HRT_TOKEN_ID = process.env.REACT_APP_REWARD_TOKEN;

const WalletInfo = () => {
  const { isConnected } = useWallet(HWCConnector);
  const { data: balanceData } = useBalance({ autoFetch: isConnected });
  const { data: accountId } = useAccountId({ autoFetch: isConnected });
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });
  const { data: tokensBalance } = useTokensBalance({
    tokens: [HRT_TOKEN_ID],
    autoFetch: isConnected
  });
 
  const hrtBalance = tokensBalance?.find(t => t.token_id === HRT_TOKEN_ID)?.balance ?? 0;
  const hbarBalance = balanceData?.formatted || '0.00';

  if (!isConnected) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <h2 className="text-xl font-bold tracking-tight text-white">Wallet Overview</h2>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed font-medium">
          Connect your wallet to monitor your HBAR portfolio and manage your staking positions.
        </p>
        <div className="pt-4">
          <WalletButton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-cyber-blue shadow-[0_0_10px_rgba(0,240,255,0.5)] animate-pulse"></div>
        <h2 className="text-xl font-bold tracking-tight text-white">Wallet Status</h2>
      </div>

      <div className="space-y-6">
        {/* Account ID Section */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Account Identity</div>
          <div className="text-lg font-mono font-bold text-cyber-blue flex items-center gap-2">
            {accountId || '---'}
            <span className="text-gray-600 text-[10px]">●</span>
          </div>
        </div>

        {/* Balance Section */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">HBAR Balance</div>
          <div className="text-3xl font-mono font-black text-white flex items-baseline gap-2">
            {hbarBalance.split(' ')[0]} <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">HBAR</span>
          </div>
        </div>

        {/* HRT Balance Section */}
        <div className="space-y-1.5 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
          <div className="text-[10px] font-black uppercase tracking-widest text-blue-400">Yield Token (HRT)</div>
          <div className="text-xl font-mono font-bold text-blue-200">
            {(Number(hrtBalance) / 1e8).toFixed(4).toLocaleString()} <span className="text-[10px] text-blue-500 font-black">HRT</span>
          </div>
        </div>

        {/* EVM Address Section */}
        <div className="space-y-1.5 pt-4 border-t border-white/5">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">EVM Address</div>
          <div className="bg-white/5 px-4 py-3 rounded-xl border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
            <div className="text-[10px] font-mono text-gray-400 truncate max-w-[200px]">{evmAddress || '---'}</div>
            <Copy size={12} className="text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="pt-4">
          <WalletButton />
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;