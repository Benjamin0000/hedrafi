// src/WalletProvider.jsx

import { HWBridgeProvider } from "@buidlerlabs/hashgraph-react-wallets";
import { HWCConnector } from "@buidlerlabs/hashgraph-react-wallets/connectors";
import {
  HederaTestnet,
  HederaMainnet,
} from "@buidlerlabs/hashgraph-react-wallets/chains";

import DAppLogo from "./assets/logo.png";

const metadata = {
  name: "HedraFi",
  description:
    "Hedera yield farming dHedrafi | Staking & NFT platform on hederaApp",
  icons: [DAppLogo],
  url: window.location.href,
};

const WalletProvider = ({ children }) => {
  const projectId = process.env.REACT_APP_WC_PROJECT_ID;

  // Error logging if projectId is missing
  if (!projectId) {
    console.warn(
      "Warning: REACT_APP_WC_PROJECT_ID is not set. Please add it to your .env file.",
    );
  }

  return (
    <HWBridgeProvider
      metadata={metadata}
      projectId={projectId || "fallback-project-id"}
      connectors={[HWCConnector]}
      chains={[HederaMainnet]}
    >
      {children}
    </HWBridgeProvider>
  );
};

export default WalletProvider;
