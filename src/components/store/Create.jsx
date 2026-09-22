import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {
    ArrowLeft,
    Image as ImageIcon,
    User,
    X,
    Globe,
    Upload,
    Store,
    Info,
    ExternalLink,
    Sparkles
} from 'lucide-react';
import { SiDiscord } from 'react-icons/si';
import { toast } from 'react-toastify';

import Header from "../shared/Header";
import Footer from "../shared/Footer";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";



const CreateStorefront = () => {

    const { user, authLoading, isAuthenticated, setUser, hasStore } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        storeName: '',
        storeSlug: '',
        about: '',
        twitter: '',
        discord: '',
        website: '',
        storeEmail: '',
    });

    const [bannerPreview, setBannerPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const [bannerFile, setBannerFile] = useState(null);
    const [logoFile, setLogoFile] = useState(null);

    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const checkStore = () => {
            if(authLoading) { return ; }
            
            if (hasStore) {
                setTimeout(() => {
                    navigate('/store');
                }, 2000);
            }
        }
        checkStore();
    }, [authLoading, user, isAuthenticated]);


    const handleInputChange = (e) => {

        const { name, value } = e.target;

        if (name === 'storeSlug') {

            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, '');

            setFormData(prev => ({
                ...prev,
                storeSlug: slug
            }));

            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleStoreNameChange = (e) => {

        const value = e.target.value;

        setFormData(prev => ({
            ...prev,
            storeName: value,
            storeSlug: value
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '')
        }));
    };


    const handleFileUpload = (type, e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {

            if (type === 'banner') {

                setBannerFile(file);
                setBannerPreview(reader.result);

            } else {

                setLogoFile(file);
                setLogoPreview(reader.result);

            }

        };

        reader.readAsDataURL(file);
    };


    const isFormComplete =
        formData.storeName.trim() &&
        formData.storeSlug.trim() &&
        formData.about.trim() &&
        formData.storeEmail.trim() &&
        bannerFile &&
        logoFile;


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!isFormComplete) return;

        setError('');
        setSubmitting(true);

        try {

            const data = new FormData();

            /*
            |--------------------------------------------------------------------------
            | Store Details
            |--------------------------------------------------------------------------
            */

            data.append('name', formData.storeName);
            data.append('email', formData.storeEmail);
            data.append('bio', formData.about);

            /*
            |--------------------------------------------------------------------------
            | Social Links
            |--------------------------------------------------------------------------
            */

            data.append('x_account', formData.twitter);
            data.append('discord', formData.discord);
            data.append('website', formData.website);

            /*
            |--------------------------------------------------------------------------
            | Files
            |--------------------------------------------------------------------------
            */

            data.append('banner', bannerFile);
            data.append('logo', logoFile);

            /*
            |--------------------------------------------------------------------------
            | Send Request
            |--------------------------------------------------------------------------
            */
            await api.get("/sanctum/csrf-cookie");
            const response = await api.post(
                '/api/create-store',
                data
            );

            console.log('Store created:', response.data);

            setUser(response.data.store);
            toast.success('Store created');

        } catch (error) {

            console.error('Store creation failed:', error);

            if (error.response?.data?.error) {

                setError(error.response.data.error);

            } else {

                setError(
                    'Something went wrong while creating your storefront. Please try again.'
                );

            }

        } finally {

            setSubmitting(false);

        }
    };


    return (

        <div className="relative min-h-screen bg-[#030712] overflow-hidden text-slate-200 font-sans">

            {/* =====================================================
                AMBIENT BACKGROUND
            ===================================================== */}

            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

                {/* Main HedraFi Emerald Glow */}
                <div className="absolute top-[-15%] left-[10%] w-[55%] h-[55%] bg-emerald-500/[0.10] rounded-full blur-[160px]" />

                {/* Blue supporting glow */}
                <div className="absolute top-[15%] right-[-15%] w-[45%] h-[45%] bg-blue-600/[0.07] rounded-full blur-[160px]" />

                {/* Bottom emerald atmosphere */}
                <div className="absolute bottom-[-20%] left-[25%] w-[50%] h-[40%] bg-emerald-400/[0.05] rounded-full blur-[150px]" />

                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            'radial-gradient(#ffffff 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

            </div>


            <Header />


            <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">


                {/* =====================================================
                    BACK
                ===================================================== */}

                <Link
                    to="/store"
                    className="inline-flex items-center gap-3 text-slate-600 hover:text-emerald-400 transition-all group mb-12"
                >

                    <div className="w-10 h-10 rounded-2xl bg-white/[0.02] flex items-center justify-center border border-white/[0.06] group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">

                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-1 transition-transform"
                        />

                    </div>

                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                        Back
                    </span>

                </Link>


                {/* =====================================================
                    PAGE HEADER
                ===================================================== */}

                <div className="max-w-3xl mb-12">

                    <div className="flex items-center gap-3 mb-6">

                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20">

                            <Store
                                size={16}
                                className="text-emerald-400"
                            />

                        </div>

                        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-emerald-400">
                            Creator Store / Step 01
                        </span>

                    </div>


                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">

                        Create Your{' '}

                        <span className="animated-gradient-text text-transparent">
                            Storefront
                        </span>

                    </h1>


                    <p className="text-slate-500 max-w-2xl font-medium leading-relaxed text-base md:text-lg">

                        Your storefront is your home on HedraFi. Create it once,
                        establish your identity, and launch your NFT and
                        real-world asset collections from one place.

                    </p>

                </div>


                {/* =====================================================
                    STORE ARCHITECTURE NOTICE
                ===================================================== */}

                <div className="mb-10 rounded-2xl p-6 bg-emerald-500/[0.035] border border-emerald-500/[0.12]">

                    <div className="flex gap-4">

                        <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center">

                            <Info
                                size={18}
                                className="text-emerald-400"
                            />

                        </div>


                        <div>

                            <h3 className="text-sm font-black text-white mb-2">
                                One storefront. Multiple collections.
                            </h3>

                            <p className="text-sm text-slate-500 leading-relaxed">

                                Your storefront acts as the central identity for
                                your brand, project, or creative work. Every NFT
                                and RWA collection you create on HedraFi will be
                                associated with this storefront.

                            </p>

                        </div>

                    </div>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >


                    {/* =====================================================
                        BANNER
                    ===================================================== */}

                    <section className="rounded-[24px] border border-white/[0.06] bg-[#050A15] p-6 md:p-10">

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">

                            <div>

                                <div className="flex items-center gap-2 mb-3">

                                    <ImageIcon
                                        size={15}
                                        className="text-emerald-400"
                                    />

                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                                        Store Banner
                                    </span>

                                </div>

                                <h2 className="text-xl font-black text-white">
                                    Make your storefront recognizable
                                </h2>

                                <p className="text-sm text-slate-600 mt-2">
                                    Upload a banner that represents your brand,
                                    project, or creative identity.
                                </p>

                            </div>

                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">
                                1500 × 500 recommended
                            </span>

                        </div>


                        <div
                            className="relative h-52 md:h-64 border-2 border-dashed border-white/[0.08] rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/40 bg-white/[0.015] transition-all group/banner"
                            onClick={() =>
                                document
                                    .getElementById('banner-upload')
                                    ?.click()
                            }
                        >

                            {bannerPreview ? (

                                <>

                                    <img
                                        src={bannerPreview}
                                        alt="Store banner preview"
                                        className="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-[2s]"
                                    />

                                    <div className="absolute inset-0 bg-black/20 group-hover/banner:bg-black/5 transition-colors" />

                                    <div className="absolute bottom-5 right-5 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover/banner:opacity-100 transition-opacity">
                                        Change Banner
                                    </div>

                                </>

                            ) : (

                                <div className="flex items-center justify-center h-full">

                                    <div className="text-center space-y-4">

                                        <div className="w-16 h-16 bg-emerald-500/[0.06] rounded-2xl flex items-center justify-center mx-auto group-hover/banner:scale-110 transition-transform duration-500 border border-emerald-500/10">

                                            <Upload
                                                size={28}
                                                className="text-emerald-500/70"
                                            />

                                        </div>

                                        <div>

                                            <p className="text-sm font-bold text-slate-300">
                                                Upload Store Banner
                                            </p>

                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-700 mt-2">
                                                PNG, JPG or WEBP
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            )}

                        </div>


                        <input
                            id="banner-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) =>
                                handleFileUpload('banner', e)
                            }
                        />

                    </section>


                    {/* =====================================================
                        STORE IDENTITY
                    ===================================================== */}

                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">


                        {/* LOGO */}

                        <div className="lg:col-span-5 rounded-[24px] border border-white/[0.06] bg-[#050A15] p-8 md:p-10 flex flex-col items-center">

                            <div className="w-full flex items-center gap-2 mb-8">

                                <User
                                    size={15}
                                    className="text-emerald-400"
                                />

                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                                    Store Logo
                                </span>

                            </div>


                            <div
                                className="w-44 h-44 md:w-48 md:h-48 border-2 border-dashed border-white/[0.08] rounded-[32px] overflow-hidden cursor-pointer hover:border-emerald-500/40 bg-white/[0.015] transition-all flex items-center justify-center group relative shadow-2xl"
                                onClick={() =>
                                    document
                                        .getElementById('logo-upload')
                                        ?.click()
                                }
                            >

                                {logoPreview ? (

                                    <>

                                        <img
                                            src={logoPreview}
                                            alt="Store logo preview"
                                            className="w-full h-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">

                                            <span className="text-[10px] font-black uppercase tracking-widest text-white">
                                                Change
                                            </span>

                                        </div>

                                    </>

                                ) : (

                                    <div className="text-center space-y-4">

                                        <div className="w-14 h-14 bg-emerald-500/[0.06] rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-6 transition-transform border border-emerald-500/10">

                                            <User
                                                size={25}
                                                className="text-emerald-500/70"
                                            />

                                        </div>

                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                                            Upload Logo
                                        </p>

                                    </div>

                                )}

                            </div>


                            <div className="text-center mt-7">

                                <p className="text-sm font-black text-white">
                                    Your Store Identity
                                </p>

                                <p className="text-xs text-slate-700 mt-2">
                                    A square image or logo works best.
                                </p>

                            </div>


                            <input
                                id="logo-upload"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) =>
                                    handleFileUpload('logo', e)
                                }
                            />

                        </div>


                        {/* DETAILS */}

                        <div className="lg:col-span-7 rounded-[24px] border border-white/[0.06] bg-[#050A15] p-8 md:p-10 space-y-8">


                            {/* STORE NAME */}

                            <div>

                                <div className="flex items-center justify-between mb-4">

                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                                        Store Name
                                    </label>

                                    <span className="text-[10px] text-slate-700">
                                        Required
                                    </span>

                                </div>


                                <input
                                    type="text"
                                    name="storeName"
                                    value={formData.storeName}
                                    onChange={handleStoreNameChange}
                                    placeholder="Enter your store name"
                                    className="w-full bg-[#02050E] border border-white/[0.08] rounded-2xl px-6 py-5 text-white text-lg font-bold outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all shadow-inner placeholder:text-slate-700"
                                />

                            </div>


                            {/* EMAIL */}

                            <div>

                                <div className="flex items-center justify-between mb-4">

                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                                        Store Email
                                    </label>

                                    <span className="text-[10px] text-slate-700">
                                        Required
                                    </span>

                                </div>


                                <input
                                    type="email"
                                    name="storeEmail"
                                    value={formData.storeEmail}
                                    onChange={handleInputChange}
                                    placeholder="Enter your store email"
                                    className="w-full bg-[#02050E] border border-white/[0.08] rounded-2xl px-6 py-5 text-white text-lg font-bold outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all shadow-inner placeholder:text-slate-700"
                                />

                                <small className="text-slate-600 block mt-2">
                                    We'll use this to contact you about your store. It will not be visible to the public.
                                </small>

                            </div>


                            {/* ABOUT */}

                            <div>

                                <div className="flex items-center justify-between mb-4">

                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                                        About Your Store
                                    </label>

                                    <span className="text-[10px] text-slate-700">
                                        Required
                                    </span>

                                </div>


                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleInputChange}
                                    placeholder="Tell people about your brand, project, or creative work..."
                                    rows="5"
                                    className="w-full bg-[#02050E] border border-white/[0.08] rounded-2xl px-6 py-5 font-medium text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none leading-relaxed shadow-inner placeholder:text-slate-700"
                                />

                            </div>

                        </div>

                    </section>


                    {/* =====================================================
                        SOCIAL LINKS
                    ===================================================== */}

                    <section className="rounded-[24px] border border-white/[0.06] bg-[#050A15] p-8 md:p-10">

                        <div className="mb-8">

                            <div className="flex items-center gap-2 mb-3">

                                <Sparkles
                                    size={15}
                                    className="text-emerald-400"
                                />

                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                                    Social Links
                                </span>

                            </div>

                            <h2 className="text-xl font-black text-white">
                                Connect your community
                            </h2>

                            <p className="text-sm text-slate-600 mt-2">
                                Help collectors and community members discover
                                your official channels.
                            </p>

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


                            {/* X */}

                            <div className="space-y-3">

                                <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                                    X / Twitter
                                </label>

                                <div className="relative group/social">

                                    <input
                                        type="text"
                                        name="twitter"
                                        value={formData.twitter}
                                        onChange={handleInputChange}
                                        placeholder="x account link"
                                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-5 py-4 pr-12 text-sm font-medium transition-all outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/10 group-hover/social:bg-white/[0.04] text-white placeholder:text-slate-700"
                                    />

                                    <X
                                        size={17}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-700 group-hover/social:text-emerald-400 transition-colors"
                                    />

                                </div>

                            </div>


                            {/* DISCORD */}

                            <div className="space-y-3">

                                <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                                    Discord
                                </label>

                                <div className="relative group/social">

                                    <input
                                        type="text"
                                        name="discord"
                                        value={formData.discord}
                                        onChange={handleInputChange}
                                        placeholder="Discord server link"
                                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-5 py-4 pr-12 text-sm font-medium transition-all outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/10 group-hover/social:bg-white/[0.04] text-white placeholder:text-slate-700"
                                    />

                                    <SiDiscord
                                        size={17}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-700 group-hover/social:text-emerald-400 transition-colors"
                                    />

                                </div>

                            </div>


                            {/* WEBSITE */}

                            <div className="space-y-3">

                                <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                                    Website
                                </label>

                                <div className="relative group/social">

                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        placeholder="https://yourwebsite.com"
                                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-5 py-4 pr-12 text-sm font-medium transition-all outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/10 group-hover/social:bg-white/[0.04] text-white placeholder:text-slate-700"
                                    />

                                    <Globe
                                        size={17}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-700 group-hover/social:text-emerald-400 transition-colors"
                                    />

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =====================================================
                        SUMMARY
                    ===================================================== */}

                    <section className="bg-emerald-500/[0.025] border border-emerald-500/[0.10] rounded-2xl p-6 md:p-8">

                        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">

                            <div className="flex gap-4">

                                <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center">

                                    <Store
                                        size={19}
                                        className="text-emerald-400"
                                    />

                                </div>

                                <div>

                                    <h3 className="font-black text-white">
                                        Your HedraFi storefront
                                    </h3>

                                    <p className="text-sm text-slate-600 mt-1 max-w-xl">
                                        Once created, your storefront becomes the
                                        home for every collection you launch on
                                        HedraFi.
                                    </p>

                                </div>

                            </div>


                            {formData.storeSlug && (

                                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">

                                    <span className="max-w-[180px]">
                                        hedrafi.com/@{formData.storeSlug}
                                    </span>

                                    <ExternalLink size={14} />

                                </div>

                            )}

                        </div>

                    </section>


                    {/* =====================================================
                        SUBMIT
                    ===================================================== */}


                    {error && (
                        <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-5 py-4">

                            <div className="flex items-start gap-3">

                                <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />

                                <p className="text-sm font-medium text-red-300">
                                    {error}
                                </p>

                            </div>

                        </div>
                    )}
                    <section className="pt-4 pb-8">

                        

                    { authLoading == false && hasStore == true ?
                        <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.06] px-5 py-4">

                            <div className="flex items-start gap-3">

                                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0" />

                                <p className="text-sm font-medium text-yellow-300">
                                    You already have a storefront. Redirecting to your store...
                                </p>

                            </div>

                        </div>

                        : 

                        isAuthenticated ?
                            <button
                                type="submit"
                                disabled={!isFormComplete || submitting}
                                className={`btn-primary w-full !py-6 md:!py-7 text-lg md:text-xl flex items-center justify-center gap-4 transition-all ${
                                    !isFormComplete || submitting
                                        ? 'opacity-40 cursor-not-allowed'
                                        : 'hover:scale-[1.01]'
                                }`}
                            >
                                <Store size={22} />

                                <span className="font-black tracking-tight">
                                    {submitting
                                        ? 'Creating Storefront...'
                                        : isFormComplete
                                            ? 'Create Storefront'
                                            : 'Complete Store Details to Continue'}
                                </span>
                            </button>

                        : <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.06] px-5 py-4">

                            <div className="flex items-start gap-3">

                                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0" />

                                <p className="text-sm font-medium text-yellow-300">
                                    Please connect your wallet to create a storefront.
                                </p>

                            </div>

                        </div>
                        
                    }




                        <div className="flex items-start justify-center gap-3 mt-6 max-w-2xl mx-auto text-center">

                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mt-1.5 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />

                            <p className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.18em] leading-relaxed">

                                Creating a storefront establishes your identity
                                on HedraFi. All NFTs you create will belong to this
                                storefront.

                            </p>

                        </div>

                    </section>

                </form>

            </main>


            <Footer />

        </div>
    );
};


export default CreateStorefront;