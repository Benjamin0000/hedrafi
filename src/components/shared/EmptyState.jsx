import { Inbox } from 'lucide-react';

const EmptyState = ({ icon: Icon = Inbox, title, description, action }) => {
  return (
    <div className="glass-card p-12 md:p-20 rounded-[4rem] border-white/5 text-center space-y-8 bg-[#02050E] relative overflow-hidden group">
      {/* Visual Depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 space-y-8">
        <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
           <Icon size={40} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-3xl font-black text-white tracking-tight">{title}</h3>
          <p className="text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">{description}</p>
        </div>

        {action && (
          <div className="pt-4">
            <button 
              onClick={action.onClick}
              className="btn-primary !px-10 !py-5 text-lg group-hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] transition-all"
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;