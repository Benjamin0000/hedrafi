// src/components/WalletInfo.jsx

import { useWallet, useBalance, useAccountId, useEvmAddress, useTokensBalance } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'; 
import { truncateAddress } from "../../helpers";

const HRT_TOKEN_ID = process.env.REACT_APP_HTS_REWARD_TOKEN;

const WalletInfo = () => {
  const { isConnected } = useWallet(HWCConnector);
  const { data: balance } = useBalance({ autoFetch: isConnected });
  const { data: accountId } = useAccountId({ autoFetch: isConnected });
  const { data: evmAddress } = useEvmAddress({ autoFetch: isConnected });
  const { data: tokensBalance } = useTokensBalance({
    tokens: [HRT_TOKEN_ID],
    autoFetch: isConnected
  });

  const hrtBalance = tokensBalance?.find(t => t.token_id === HRT_TOKEN_ID)?.balance ?? 0;

  if (!isConnected)
    return (
      <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 shadow-2xl shadow-purple-500/10 lg:sticky lg:top-24">
        <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Wallet Overview
        </h3>
        <div className="text-center py-8 text-gray-400">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-sm">Connect wallet to view details</p>
        </div>
      </div>
    );

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 shadow-2xl shadow-purple-500/10 lg:sticky lg:top-24">
      <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
        Wallet Overview
      </h3>

      <div className="space-y-4">
        <div className="bg-gray-900/50 p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
          <div className="text-xs text-gray-400 mb-1">HBAR Balance</div>
          <div className="text-xl font-bold font-mono">{balance?.formatted || '0 ℏ'}</div>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
          <div className="text-xs text-gray-400 mb-1">Account ID</div>
          <div className="text-sm font-mono break-all">{accountId ?? '-'}</div>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
          <div className="text-xs text-gray-400 mb-1">EVM Address</div>
          <div className="text-sm font-mono break-all">{truncateAddress(evmAddress) ?? '-'}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 p-4 rounded-xl border border-purple-500/30">
          <div className="text-xs text-purple-300 mb-1">HRT Balance</div>
          <div className="text-xl font-bold text-purple-200 font-mono">{(hrtBalance / 1e8).toFixed(4)}</div>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
          <div className="text-xs text-gray-400 mb-1">NFTs Owned</div>
          <div className="text-xl font-bold font-mono">0</div>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;