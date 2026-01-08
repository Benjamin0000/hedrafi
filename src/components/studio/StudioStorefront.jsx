// src/components/StudioStorefront.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../shared/Header"

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
        if (type === 'banner') {
          setBannerPreview(reader.result);
        } else {
          setLogoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20 text-white font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

     <Header/>

      {/* Main Content */}
      <main className="relative max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link to="/studio" className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-2 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Studio
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
            Setup Your Storefront
          </h1>
          <p className="text-gray-400">Customize your creator profile and showcase your work</p>
        </div>

        <div className="space-y-6">
          {/* Banner Upload */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 shadow-xl">
            <label className="block text-sm font-semibold mb-3">Store Banner</label>
            <div 
              className="relative h-48 border-2 border-dashed border-purple-500/30 rounded-xl overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all group"
              onClick={() => document.getElementById('banner-upload').click()}
            >
              {bannerPreview ? (
                <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-900/30">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-gray-400">Upload banner (1500x500 recommended)</p>
                  </div>
                </div>
              )}
            </div>
            <input
              id="banner-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload('banner', e)}
            />
          </div>

          {/* Logo Upload */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 shadow-xl">
            <label className="block text-sm font-semibold mb-3">Store Logo</label>
            <div className="flex items-center gap-6">
              <div 
                className="w-32 h-32 border-2 border-dashed border-purple-500/30 rounded-xl overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all flex items-center justify-center bg-gray-900/30"
                onClick={() => document.getElementById('logo-upload').click()}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="text-3xl mb-1">🎨</div>
                    <p className="text-xs text-gray-400">Upload</p>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm">Recommended size: 400x400px</p>
                <p className="text-gray-500 text-xs mt-1">Square format works best</p>
              </div>
            </div>
            <input
              id="logo-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload('logo', e)}
            />
          </div>

          {/* Store Info */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 shadow-xl space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
                placeholder="e.g. Cosmic Creations"
                className="w-full bg-gray-900/50 border border-purple-500/20 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">About Your Store</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Tell collectors about your work, inspiration, and creative journey..."
                rows="5"
                className="w-full bg-gray-900/50 border border-purple-500/20 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Social Links */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 shadow-xl space-y-4">
            <h3 className="font-semibold mb-4">Social Links</h3>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Twitter / X</label>
              <div className="flex items-center gap-3">
                <span className="text-gray-400">@</span>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder="yourusername"
                  className="flex-1 bg-gray-900/50 border border-purple-500/20 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Instagram</label>
              <div className="flex items-center gap-3">
                <span className="text-gray-400">@</span>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="yourusername"
                  className="flex-1 bg-gray-900/50 border border-purple-500/20 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://yourwebsite.com"
                className="w-full bg-gray-900/50 border border-purple-500/20 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
              />
            </div>
          </div>

          {/* Theme Selector */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/20 shadow-xl">
            <label className="block text-sm font-semibold mb-4">Theme</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFormData(prev => ({ ...prev, theme: 'dark' }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.theme === 'dark'
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="w-full h-24 bg-gray-900 rounded-lg mb-3"></div>
                <div className="font-semibold">Dark Mode</div>
              </button>
              <button
                onClick={() => setFormData(prev => ({ ...prev, theme: 'light' }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.theme === 'light'
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="w-full h-24 bg-gray-200 rounded-lg mb-3"></div>
                <div className="font-semibold">Light Mode</div>
              </button>
            </div>
          </div>

          {/* Publish Button */}
          <button
            disabled
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg opacity-50 cursor-not-allowed"
          >
            Publish Storefront (Coming Soon)
          </button>
          <p className="text-xs text-gray-500 text-center">Backend integration in progress</p>
        </div>
      </main>
    </div>
  );
};

export default StudioStorefront;