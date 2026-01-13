import { useWallet, useAccountId } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';

const WalletButton = () => {
  const { isConnected, connect, disconnect, } = useWallet(HWCConnector);
  const { data: accountId } = useAccountId()

  return isConnected ? (
    <button
      onClick={disconnect}
      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105"
    >
      Disconnect
      <div style={{fontSize: '15px'}}>{accountId}</div>
    </button>
  ) : (
    <button
      onClick={connect}
      className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
    >
      Connect Wallet
    </button>
  );
};

export default WalletButton;