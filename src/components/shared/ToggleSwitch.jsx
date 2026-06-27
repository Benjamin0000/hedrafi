const ToggleSwitch = ({ activeType, setActiveType }) => {
  return (
    <div className="flex p-1.5 rounded-full bg-[#0A0F1E]/80 backdrop-blur-xl border border-white/10 w-fit mx-auto shadow-2xl relative overflow-hidden">
      <button 
        onClick={() => setActiveType('rwa')}
        className={`relative z-10 px-6 sm:px-10 py-4 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-500 ${activeType === 'rwa' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
      >
        Real-World Assets
      </button>
      <button 
        onClick={() => setActiveType('nft')}
        className={`relative z-10 px-6 sm:px-10 py-4 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-500 ${activeType === 'nft' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
      >
        Digital Collectibles
      </button>
      
      {/* Sliding Background */}
      <div 
        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] rounded-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${activeType === 'rwa' ? 'left-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'left-[calc(50%+0.375rem)] bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]'}`}
      />
    </div>
  );
};

export default ToggleSwitch;
