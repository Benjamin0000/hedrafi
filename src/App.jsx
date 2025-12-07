import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/staking" element={<Dashboard />} />
        <Route path="/studio" element={<ComingSoon title="NFT Studio" />} />
        <Route path="/marketplace" element={<ComingSoon title="Marketplace" />} />
      </Routes>
    </BrowserRouter>
  );
};

// Coming Soon placeholder component
const ComingSoon = ({ title }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-white flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-xl text-gray-400">Coming Soon...</p>
    </div>
  </div>
);

export default App;
