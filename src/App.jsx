import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";

// Home
import Homepage from './components/home/Homepage';

// Staking
import Dashboard from './components/staking/Dashboard';

// Studio
import StudioHome from './components/studio/StudioHome';
import MintNFT from './components/studio/MintNFT';
import StudioCollections from './components/studio/StudioCollections';
import StudioStorefront from './components/studio/StudioStorefront';

// Marketplace
import MarketplaceHome from './components/marketplace/MarketplaceHome';
import NFTDetail from './components/marketplace/NFTDetail';
import CollectionDetail from './components/marketplace/CollectionDetail';

const App = () => {
  useEffect(() => {
    const loader = document.getElementById("startup-loader");
    if (loader) loader.style.display = "none";
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/staking" element={<Dashboard />} />
        <Route path="/studio" element={<StudioHome />} />
        <Route path="/studio/mint" element={<MintNFT />} />
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