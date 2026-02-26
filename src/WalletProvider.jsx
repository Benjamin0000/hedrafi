// src/WalletProvider.jsx

import { HWBridgeProvider } from '@buidlerlabs/hashgraph-react-wallets';
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import { HederaTestnet, HederaMainnet } from '@buidlerlabs/hashgraph-react-wallets/chains';

import DAppLogo from './assets/logo.png';

const metadata = {
  name: 'HedraFi',
  description: 'Hedera yield farming dHedrafi | Staking & NFT platform on hederaApp',
  icons: [DAppLogo],
  url: window.location.href,
};

const WalletProvider = ({ children }) => {
  return (
    <HWBridgeProvider
      metadata={metadata}
      projectId={process.env.REACT_APP_WC_PROJECT_ID} 
      connectors={[HWCConnector]}
      chains={[HederaMainnet]}
    >
      {children}
    </HWBridgeProvider>
  );
};

export default WalletProvider;