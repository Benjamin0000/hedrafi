import { useWallet, useBalance, useAccountId, useEvmAddress, useTokensBalance } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'; 
import WalletButton from '../shared/WalletButton';
import { ExternalLink, Copy, ShieldCheck, Coins } from 'lucide-react'; // Added icons

const HRT_TOKEN_ID = process.env.REACT_APP_REWARD_TOKEN;

  // Helper for copying to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

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
          <div className="text-[20px] font-mono font-black text-white flex items-baseline gap-2">
            {Number(balanceData?.value.toFixed(2)).toLocaleString()} <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">ℏ</span>
          </div>
        </div>

        {/* HRT Balance Section */}
        <div className="space-y-1.5 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
          <div className="text-[10px] font-black uppercase tracking-widest text-blue-400">Yield Token (HRT)</div>
          <div className="text-xl font-mono font-bold text-blue-200">
            { Number((hrtBalance / 1e8).toFixed(2)).toLocaleString()} <span className="text-[10px] text-blue-500 font-black">$HRT</span>
          </div>
        </div>

  

              {/* --- NEW CONTRACT SECTION --- */}
              <div className=" mt-8">
                {[
                  { label: 'Staking Contract', id: '0.0.10299519', icon: <ShieldCheck className="w-4 h-4 text-cyber-blue"/>,  url: "https://hashscan.io/mainnet/contract/0.0.10299519" },
                  { label: '$HRT Token', id: '0.0.10299453', icon: <Coins className="w-4 h-4 text-purple-400" />, url: "https://hashscan.io/mainnet/token/0.0.10299453" }
                ].map((contract) => (
                  <div key={contract.id} className=" p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyber-blue/50 transition-all duration-300">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                      {contract.icon}
                      {contract.label}
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <code className="text-sm font-mono text-slate-200 truncate">{contract.id}</code>
                      <div className="flex items-center gap-2">
                        {/* <button 
                          onClick={() => copyToClipboard(contract.id)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                          title="Copy ID"
                        >
                          <Copy className="w-4 h-4" />
                        </button> */}
                        <a 
                          href={contract.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* --- END CONTRACT SECTION --- */}

        <div className="pt-4">
          <WalletButton />
        </div>
        
      </div>
    </div>
  );
};

export default WalletInfo;