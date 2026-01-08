# HedraFi Yield Farm

HedraFi is a decentralized staking and rewards platform built on the **Hedera network**, allowing users to stake HBAR and earn HRT tokens. The platform integrates HTS, real-time reward calculation, and a user-friendly interface for managing staked assets and token rewards.  

<!-- This project is being prepared for submission to the Hedera Builders Program, showcasing live TestNet deployment, staking, TVL tracking, and token reward mechanics.. -->

---

## 🚀 Features

- **HBAR Staking:** Users can stake HBAR directly from their wallets.
- **HRT Rewards:** Earn HTS-based HRT tokens in proportion to staked HBAR.
- **Pending & Claimed Rewards:** Real-time tracking of pending rewards and claimed balances.
- **Token Association:** Easy HTS token association with a single click.
- **Wallet Info:** Displays connected wallet balances, account IDs, and EVM addresses.
- **Staking Dashboard:** Shows total HBAR staked, total HRT locked, and total reward distributed.
- **Responsive UI:** Clean, modern interface compatible with desktop and mobile devices.
- **Future NFT & Marketplace:** Prepared for upcoming NFT minting, trading, and marketplace features.

---

## 📦 Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Toastify
- **Blockchain:** Hedera Hashgraph
  - HTS (Hedera Token Service)
  - Mirror Node Integration
- **Wallet Integration:** Hashpack via `@buidlerlabs/hashgraph-react-wallets`
- **Smart Contracts:** Solidity 0.8.x (Hedera-compatible)
- **Deployment:** Hedera TestNet / MainNet (planned)


## 💻 Getting Started

### **Prerequisites**
- Node.js ≥ 18.x
- Yarn or npm
- Hedera TestNet account
- Hashpack wallet

### **Installation**
```bash
# Clone the repo
git clone https://github.com/benjamin0000/hedrafi.git
cd hedrafi

# Install dependencies
npm install
# or
yarn install
