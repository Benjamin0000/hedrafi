import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Homepage from "./components/home/Homepage";
import Dashboard from "./components/staking/Dashboard";
import StudioHome from "./components/studio/StudioHome";
import MintNFT from "./components/studio/MintNFT";
import StudioCollections from "./components/studio/StudioCollections";

import ProfileRouteGuard from "./components/routegaurd/ProfileRouteGuard";
 

import MarketplaceHome from "./components/marketplace/MarketplaceHome";
import NFTDetail from "./components/marketplace/NFTDetail";
import CollectionDetail from "./components/marketplace/CollectionDetail";
import MyNFTs from "./components/studio/MyNFT";
import PartnerPage from "./components/home/PartnerPage";
import AssetsHome from "./components/rwa/Home";
import AssetDetailReady from "./components/rwa/AssetDetailReady";
import PioneerCouncilPass from "./components/pioneerPass/Index";


// Profile
import ProfileIntro from "./components/profile/Intro";
import ProfileHome from "./components/profile/Index";
import CreateProfile from "./components/profile/Create";
import EditProfile from "./components/profile/Edit";

// collection
import CreateCollection from "./components/profile/collections/Create";

import CollectionPage from "./components/collection/Index"; 
import LaunchpadPage from "./components/launchpads/Index"; 

//bonding curve
import Curve from "./components/curve/Index"; 
import Vesting from "./components/vesting/Index"; 




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
        promise: event.promise,
      });
    };

    window.addEventListener("unhandledrejection", handleRejection);
    return () =>
      window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  return (
      <BrowserRouter>
        <ScrollToTop />
        <Routes> 
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<PartnerPage />} />
          <Route path="/staking" element={<Dashboard />} />


        


          <Route path="/studio" element={<StudioHome />} />
          <Route path="/studio/mint" element={<MintNFT />} />
          <Route path="/studio/mynfts" element={<MyNFTs />} />


          {/* <Route path="/studio/create-collection" element={<CreateCollection />} /> */}

          {/* temporary */}
          <Route path="/studio/my-collections" element={<StudioCollections />} />

       

          
         
          

      




          <Route path="/marketplace" element={<MarketplaceHome />} />
          <Route
            path="/marketplace/nft/:tokenId/:serialNumber"
            element={<NFTDetail />}
          />
          <Route
            path="/marketplace/collection/:id"
            element={<CollectionDetail />}
          />
          <Route path="/rwa" element={<AssetsHome />} />
          {/* <Route path="/rwa/:id" element={<AssetDetailReady />} /> */}
          <Route path="/pioneer-pass" element={<PioneerCouncilPass />} />






          <Route path="/profile/intro" element={<ProfileIntro />} />
          <Route path="/profile/create" element={<CreateProfile />} />

          <Route element={<ProfileRouteGuard />}>
              <Route path="/profile" element={<ProfileHome />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/create-collection" element={<CreateCollection/>} />
          </Route>

          <Route path="/curve" element={<Curve/>}/>
          <Route path="/vesting" element={<Vesting/>}/>

          <Route path='/collections' element={<CollectionPage/>}/>
          <Route path='/launchpads' element={<LaunchpadPage/>}/>

        </Routes>
      </BrowserRouter>
  );
};

export default App;
