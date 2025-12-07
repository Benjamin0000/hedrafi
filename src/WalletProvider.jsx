import { HWBridgeProvider } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import { HederaTestnet } from '@buidlerlabs/hashgraph-react-wallets/chains';

import DAppLogo from './assets/logo.png';

const metadata = {
  name: 'HedraFi',
  description: 'Hedera yield farming dApp',
  icons: [DAppLogo],
  url: window.location.href,
};

const WalletProvider = ({ children }) => {
  return (
    <HWBridgeProvider
      metadata={metadata}
      projectId={process.env.REACT_APP_WC_PROJECT_ID} 
      connectors={[HWCConnector]}
      chains={[HederaTestnet]}
    >
      {children}
    </HWBridgeProvider>
  );
};

export default WalletProvider;