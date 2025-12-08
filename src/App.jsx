import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';

// Studio Pages
import StudioHome from './components/StudioHome';
import MintNFT from './components/MintNFT';
import StudioCollections from './components/StudioCollections';
import StudioStorefront from './components/StudioStorefront';

// Marketplace Pages
import MarketplaceHome from './components/MarketplaceHome';
import NFTDetail from './components/NFTDetail';
import CollectionDetail from './components/CollectionDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/staking" element={<Dashboard />} />
        
        {/* Studio Routes */}
        <Route path="/studio" element={<StudioHome />} />
        <Route path="/studio/mint" element={<MintNFT />} />
        <Route path="/studio/collections" element={<StudioCollections />} />
        <Route path="/studio/storefront" element={<StudioStorefront />} />
        
        {/* Marketplace Routes */}
        <Route path="/marketplace" element={<MarketplaceHome />} />
        <Route path="/marketplace/nft/:id" element={<NFTDetail />} />
        <Route path="/marketplace/collection/:id" element={<CollectionDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;