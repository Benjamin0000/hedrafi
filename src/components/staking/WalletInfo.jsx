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

  if (!isConnected) {
    return (
      <div className="space-y-8 p-10">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-slate-700"></div>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase tracking-[0.1em]">Wallet Overview</h2>
        </div>
        <p className="text-md text-slate-400 leading-relaxed font-medium max-w-sm">
          Connect your wallet to monitor your HBAR portfolio and manage your staking positions across the HedraFi ecosystem.
        </p>
        <div className="pt-6">
          <WalletButton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 p-10">
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 rounded-full bg-cyber-blue shadow-[0_0_15px_rgba(0,240,255,0.6)] animate-pulse"></div>
        <h2 className="text-2xl font-black tracking-tight text-white uppercase tracking-[0.1em]">Wallet Status</h2>
      </div>

      <div className="space-y-8">
        {/* Account ID Section */}
        <div className="space-y-2">
          <div className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-500">Account Identity</div>
          <div className="text-xl font-mono font-bold text-cyber-blue flex items-center gap-3">
            {accountId || '---'}
            <span className="text-slate-700 text-[12px]">●</span>
          </div>
        </div>

        {/* Balance Section */}
        <div className="space-y-2">
          <div className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-500">HBAR Balance</div>
          <div className="text-4xl font-mono font-black text-white flex items-baseline gap-3">
            {Number(balanceData?.value.toFixed(2)).toLocaleString()} <span className="text-xl text-slate-500 font-black uppercase tracking-[0.2em]">ℏ</span>
          </div>
        </div>

        {/* HRT Balance Section */}
        <div className="space-y-3 p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 shadow-inner">
          <div className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">Yield Token (HRT)</div>
          <div className="text-3xl font-mono font-black text-blue-200">
            { Number((hrtBalance / 1e8).toFixed(2)).toLocaleString()} <span className="text-xs text-blue-500 font-black uppercase tracking-widest">$HRT</span>
          </div>
        </div>

        {/* --- NEW CONTRACT SECTION --- */}
        <div className="mt-10 space-y-4">
          {[
            { label: 'Staking Contract', id: '0.0.10299519', icon: <ShieldCheck className="w-5 h-5 text-cyber-blue"/>,  url: "https://hashscan.io/mainnet/contract/0.0.10299519" },
            { label: '$HRT Token', id: '0.0.10299453', icon: <Coins className="w-5 h-5 text-purple-400" />, url: "https://hashscan.io/mainnet/token/0.0.10299453" }
          ].map((contract) => (
            <div key={contract.id} className="p-5 rounded-[1.5rem] bg-white/[0.03] border border-white/[0.08] hover:border-cyber-blue/50 transition-all duration-300">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                {contract.icon}
                {contract.label}
              </div>
              <div className="flex items-center justify-between gap-4">
                <code className="text-md font-mono text-slate-200 truncate">{contract.id}</code>
                <div className="flex items-center gap-2">
                  <a 
                    href={contract.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* --- END CONTRACT SECTION --- */}

        <div className="pt-6">
          <WalletButton />
        </div>
        
      </div>
    </div>
  );
};

export default WalletInfo;