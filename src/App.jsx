import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import Homepage from './components/home/Homepage';
import Dashboard from './components/staking/Dashboard';
import Profit from './components/profit/Profit';
import StudioHome from './components/studio/StudioHome';
import MintNFT from './components/studio/MintNFT';
import StudioCollections from './components/studio/StudioCollections';
import StudioStorefront from './components/studio/StudioStorefront';
import MarketplaceHome from './components/marketplace/MarketplaceHome';
import NFTDetail from './components/marketplace/NFTDetail';
import CollectionDetail from './components/marketplace/CollectionDetail';
import MyNFTs from './components/studio/MyNFT'

const App = () => {
  useEffect(() => {
    const loader = document.getElementById("startup-loader");
    if (loader) loader.style.display = "none";

    const handleRejection = (event) => {
      // Prevents the CRA error overlay from popping up for unhandled rejections
      event.preventDefault();
      
      const reason = event.reason;
      console.warn("Caught Unhandled Promise Rejection:", {
        reason: reason,
        message: reason?.message || "No message provided",
        stack: reason?.stack || "No stack trace",
        promise: event.promise
      });
    };

    window.addEventListener('unhandledrejection', handleRejection);
    return () => window.removeEventListener('unhandledrejection', handleRejection);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/staking" element={<Dashboard />} />
        <Route path="/profit" element={<Profit />} />
        <Route path="/studio" element={<StudioHome />} />
        <Route path="/studio/mint" element={<MintNFT />} />
        <Route path='/studio/mynfts' element={<MyNFTs />}/>
        <Route path="/studio/collections" element={<StudioCollections />} />
        <Route path="/studio/storefront" element={<StudioStorefront />} />
        <Route path="/marketplace" element={<MarketplaceHome />} />
        <Route path="/marketplace/nft/:id" element={<NFTDetail />} />
        <Route path="/marketplace/collection/:id" element={<CollectionDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;