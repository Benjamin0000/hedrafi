import { useWallet, useAccountId } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import { Zap, LogOut } from 'lucide-react';

const WalletButton = () => {
  const { isConnected, connect, disconnect, } = useWallet(HWCConnector);
  const { data: accountId } = useAccountId()

  return isConnected ? (
    <button
      onClick={disconnect}
      className="group relative flex flex-col items-center justify-center bg-brand-base border border-red-500/30 hover:border-red-500 text-white px-5 py-2 rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
    >
      <div className="flex items-center gap-2">
         <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Disconnect</span>
         <LogOut size={12} className="text-red-500 group-hover:translate-x-0.5 transition-transform" />
      </div>
      <div className="text-[9px] font-mono text-gray-400 group-hover:text-white transition-colors uppercase">{accountId}</div>
    </button>
  ) : (
    <button
      onClick={connect}
      className="btn-primary group relative overflow-hidden !py-3 !px-6"
    >
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      <span className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-widest font-black">
         <Zap size={16} className="fill-current text-white animate-pulse" /> 
         Connect Identity
      </span>
    </button>
  );
};

export default WalletButton;