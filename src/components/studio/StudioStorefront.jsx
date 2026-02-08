import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import { ArrowLeft, Image as ImageIcon, User, Twitter, Instagram, Globe, Sparkles, Upload } from 'lucide-react';

const StudioStorefront = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    about: '',
    twitter: '',
    instagram: '',
    website: '',
    theme: 'dark'
  });
  const [bannerPreview, setBannerPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'banner') setBannerPreview(reader.result);
        else setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[100%] bg-indigo-600/5 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <Header />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-12">
           {/* Header Area */}
           <div className="space-y-4">
              <Link to="/studio" className="inline-flex items-center gap-3 text-slate-500 hover:text-white transition-all group">
                 <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-blue-600/20 transition-all">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Studio</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                 Identity <span className="text-gradient">Architect</span>
              </h1>
              <p className="text-slate-400 max-w-xl font-medium leading-relaxed">
                 Configure your personal digital storefront. Customize your aesthetic, social links, and narrative for the decentralized economy.
              </p>
           </div>

           <div className="space-y-8">
              {/* Asset Management Suite */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                 {/* Banner Console */}
                 <div className="lg:col-span-12 glass-card p-10 rounded-[3rem] border-white/10 relative group bg-[#02050E]">
                    <div className="flex items-center gap-2 mb-6">
                       <ImageIcon size={14} className="text-blue-500" />
                       <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 block">Environment Banner</label>
                    </div>
                    <div 
                      className="relative h-64 border-2 border-dashed border-white/10 rounded-[2.5rem] overflow-hidden cursor-pointer hover:border-blue-500/40 bg-white/5 transition-all group/banner"
                      onClick={() => document.getElementById('banner-upload').click()}
                    >
                      {bannerPreview ? (
                        <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-[2s]" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                           <div className="text-center space-y-4">
                              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto group-hover/banner:scale-110 transition-transform duration-500 border border-white/5">
                                 <Upload size={32} className="text-slate-600" />
                              </div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">1500 x 500 PX RECOMMENDED</p>
                           </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-[#040816]/20 group-hover/banner:bg-transparent transition-colors"></div>
                    </div>
                    <input id="banner-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload('banner', e)} />
                 </div>

                 {/* Identity Console */}
                 <div className="lg:col-span-12 md:col-span-12 lg:col-span-5 glass-card p-10 rounded-[3.5rem] border-white/10 flex flex-col items-center text-center bg-[#02050E]">
                    <div className="flex items-center gap-2 mb-8 w-full">
                       <User size={14} className="text-blue-500" />
                       <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 block">Primary Identity</label>
                    </div>
                    <div 
                      className="w-48 h-48 border-2 border-dashed border-white/10 rounded-[3.5rem] overflow-hidden cursor-pointer hover:border-blue-500/40 bg-white/5 transition-all flex items-center justify-center group relative mb-8 shadow-2xl"
                      onClick={() => document.getElementById('logo-upload').click()}
                    >
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center space-y-4">
                           <div className="w-12 h-12 bg-white/5 rounded-[1.5rem] flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform border border-white/5">
                              <User size={24} className="text-slate-600" />
                           </div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-none">UPLOAD</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                       <p className="text-white font-black text-xs uppercase tracking-[0.3em]">Profile Signature</p>
                       <p className="text-[9px] text-slate-600 font-bold tracking-widest">ALPHA-CHANNEL PNG RECOMMENDED</p>
                    </div>
                    <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload('logo', e)} />
                 </div>

                 {/* Narrative Console */}
                 <div className="lg:col-span-12 md:col-span-12 lg:col-span-7 glass-card p-10 md:p-14 rounded-[3.5rem] border-white/10 space-y-10 bg-[#040A1A]">
                    <div className="space-y-4">
                       <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 block">Display Nomenclature</label>
                       <input
                         type="text"
                         name="storeName"
                         value={formData.storeName}
                         onChange={handleInputChange}
                         placeholder="IDENTIFIER..."
                         className="w-full bg-[#02050E] border border-white/10 rounded-2xl px-8 py-5 font-mono text-white text-2xl outline-none focus:border-blue-500 transition-all shadow-inner"
                       />
                    </div>

                    <div className="space-y-4">
                       <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 block">Creator Bio / Narrative</label>
                       <textarea
                         name="about"
                         value={formData.about}
                         onChange={handleInputChange}
                         placeholder="THE ORIGIN STORY..."
                         rows="5"
                         className="w-full bg-[#02050E] border border-white/10 rounded-2xl px-8 py-5 font-medium text-white outline-none focus:border-blue-500 transition-all resize-none leading-relaxed shadow-inner"
                       ></textarea>
                    </div>
                 </div>

                 {/* Social Integration */}
                 <div className="lg:col-span-12 glass-card p-10 rounded-[3.5rem] border-white/10 grid grid-cols-1 md:grid-cols-3 gap-10 bg-[#02050E]">
                    <div className="space-y-4">
                       <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 block">X Protocol</label>
                       <div className="relative group/social">
                          <input
                            type="text"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleInputChange}
                            placeholder="@USERNAME"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 font-black transition-all outline-none focus:border-blue-400 group-hover/social:bg-white/[0.08] text-white"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 group-hover/social:text-blue-400 transition-colors">
                             <Twitter size={18} />
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 block">Instagram Feed</label>
                       <div className="relative group/social">
                          <input
                            type="text"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleInputChange}
                            placeholder="@USERNAME"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 font-black transition-all outline-none focus:border-pink-400 group-hover/social:bg-white/[0.08] text-white"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 group-hover/social:text-pink-400 transition-colors">
                             <Instagram size={18} />
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 block">Ecosystem Web</label>
                       <div className="relative group/social">
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="HTTPS://"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 font-black transition-all outline-none focus:border-cyan-400 group-hover/social:bg-white/[0.08] text-white"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 group-hover/social:text-cyan-400 transition-colors">
                             <Globe size={18} />
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Global Theme Selector */}
                 <div className="lg:col-span-12 glass-card p-10 md:p-14 rounded-[3.5rem] border-white/10 bg-[#040A1A]">
                    <div className="flex items-center gap-2 mb-10">
                       <Sparkles size={14} className="text-blue-500" />
                       <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 block">Environment Primary Theme</label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <button
                         onClick={() => setFormData(prev => ({ ...prev, theme: 'dark' }))}
                         className={`p-10 rounded-[3rem] border-2 transition-all group text-left relative overflow-hidden ${
                           formData.theme === 'dark' ? 'border-blue-500 bg-blue-500/5' : 'border-white/5 hover:border-white/10 bg-[#02050E]'
                         }`}
                       >
                         <div className="w-full h-32 bg-[#040816] rounded-2xl mb-6 shadow-2xl border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
                         </div>
                         <div className="text-xl font-black text-white tracking-tight">DEFI NOIR</div>
                         <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">CURRENT STANDARD</div>
                       </button>
                       <button
                         onClick={() => setFormData(prev => ({ ...prev, theme: 'light' }))}
                         className={`p-10 rounded-[3rem] border-2 transition-all group opacity-30 text-left relative overflow-hidden bg-white/5 ${
                           formData.theme === 'light' ? 'border-blue-500 bg-blue-500/5' : 'border-white/5'
                         }`}
                       >
                         <div className="w-full h-32 bg-slate-100 rounded-2xl mb-6 shadow-2xl border border-black/10"></div>
                         <div className="text-xl font-black text-white tracking-tight italic">LUCID (V2)</div>
                         <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">PROTOCOL SYNCING...</div>
                       </button>
                    </div>
                 </div>

                 {/* Command Execution */}
                 <div className="lg:col-span-12 space-y-6 pt-10">
                    <button
                      disabled
                      className="btn-primary w-full !py-7 text-2xl opacity-50 cursor-not-allowed flex items-center justify-center gap-4 relative overflow-hidden group/btn"
                    >
                       <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                       <span className="font-black tracking-tight">INITIALIZE STOREFRONT SEQUENCE</span>
                    </button>
                    <div className="flex items-center justify-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                       <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">TECHNICAL DEPLOYMENT LOCKED BY PROTOCOL</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudioStorefront;