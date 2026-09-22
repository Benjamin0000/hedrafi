import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
    ArrowLeft,
    Image as ImageIcon,
    User,
    User2,
    X,
    Globe,
    Upload,
    Info,
    Sparkles
} from 'lucide-react';
import { SiDiscord } from 'react-icons/si';
import { toast } from 'react-toastify';

import MarketplaceSidebar from "../shared/MarketplaceSidebar";
import MobileTopBar from "../shared/MobileTopBar";
import AmbientBackground from "../shared/AmbientBackground";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { convertIpfsToPinata } from "../../lib/marketplace"

const EditProfile = () => {

    const { user, authLoading, isAuthenticated, setUser, hasProfile } = useAuth();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [formData, setFormData] = useState({
        profileName: '',
        about: '',
        twitter: '',
        discord: '',
        website: '',
        profileEmail: '',
    });

    const [bannerPreview, setBannerPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const [bannerFile, setBannerFile] = useState(null);
    const [logoFile, setLogoFile] = useState(null);

    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);


    /* =====================================================
       REDIRECT IF THERE'S NO PROFILE TO EDIT YET
    ===================================================== */

    useEffect(() => {
        if (authLoading) { return; }

        if (!hasProfile) {
            setTimeout(() => {
                navigate('/profile/create');
            }, 2000);
        }
    }, [authLoading, hasProfile]);


    /* =====================================================
       PREFILL FORM FROM THE USER'S EXISTING PROFILE
    ===================================================== */

    useEffect(() => {

        if (!user) return;

        setFormData({
            profileName: user.name || '',
            about: user.bio || '',
            twitter: user.x_account || '',
            discord: user.discord || '',
            website: user.website || '',
            profileEmail: user.email || '',
        });

        setBannerPreview( convertIpfsToPinata(user.banner) || null);
        setLogoPreview( convertIpfsToPinata(user.logo) || null);

    }, [user]);


    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleProfileNameChange = (e) => {

        const value = e.target.value;

        setFormData(prev => ({
            ...prev,
            profileName: value,
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


    /* Banner/logo already exist from the current profile, so a fresh
       upload isn't required to save — only the text fields are. */

    const isFormComplete =
        formData.profileName.trim() &&
        formData.about.trim() &&
        formData.profileEmail.trim() &&
        bannerPreview &&
        logoPreview;


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!isFormComplete) return;

        setError('');
        setSubmitting(true);

        try {

            const data = new FormData();

            /*
            |--------------------------------------------------------------------------
            | Profile Details
            |--------------------------------------------------------------------------
            */

            data.append('name', formData.profileName);
            data.append('email', formData.profileEmail);
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
            | Files — only sent when the user actually picked a new one
            |--------------------------------------------------------------------------
            */

            if (bannerFile) data.append('banner', bannerFile);
            if (logoFile) data.append('logo', logoFile);

            /*
            |--------------------------------------------------------------------------
            | Send Request
            |--------------------------------------------------------------------------
            */
            await api.get("/sanctum/csrf-cookie");

            // Laravel-style method override so file uploads can ride a PUT/PATCH via POST
            data.append('_method', 'PUT');

            const response = await api.post(
                '/api/update-profile',
                data
            );

            console.log('Profile updated:', response.data);

            setUser(response.data.profile);
            toast.success('Profile updated');

        } catch (error) {

            console.error('Profile update failed:', error);

            if (error.response?.data?.error) {

                setError(error.response.data.error);

            } else {

                setError(
                    'Something went wrong while updating your profile. Please try again.'
                );

            }

        } finally {

            setSubmitting(false);

        }
    };


    return (

        <div className="relative min-h-screen bg-[#030712] text-slate-200 font-sans">

            {/* =====================================================
                AMBIENT BACKGROUND
            ===================================================== */}

            <AmbientBackground />


            {/* =====================================================
                MOBILE TOP BAR
            ===================================================== */}

            <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />


            {/* =====================================================
                BODY — sticky sidebar + form
            ===================================================== */}

            <div className="relative z-10 flex items-start">

                <MarketplaceSidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    onDisconnect={() => {}}
                />


                <main className="flex-1 min-w-0">

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 md:pt-14 pb-20">


                        {/* =====================================================
                            BACK
                        ===================================================== */}

                        <Link
                            to="/profile"
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
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-6">
                                Edit Your{' '}
                                <span className="animated-gradient-text text-transparent">
                                    Profile
                                </span>
                            </h1>
                        </div>


                        {/* =====================================================
                            PROFILE ARCHITECTURE NOTICE
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
                                        Changes apply everywhere at once.
                                    </h3>

                                    <p className="text-sm text-slate-500 leading-relaxed">

                                        Your profile is the central identity behind
                                        every NFT and RWA collection you've launched
                                        on HedraFi — updates here carry through to all
                                        of them automatically.

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
                                                Profile Banner
                                            </span>

                                        </div>

                                        <h2 className="text-xl font-black text-white">
                                            Make your profile recognizable
                                        </h2>

                                        <p className="text-sm text-slate-600 mt-2">
                                            Upload a new banner, or leave this as-is
                                            to keep your current one.
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
                                                alt="Profile banner preview"
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
                                                        Upload Profile Banner
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
                                PROFILE IDENTITY
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
                                            Profile Logo
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
                                                    alt="Profile logo preview"
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
                                            Your Profile Identity
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


                                    {/* PROFILE NAME */}

                                    <div>

                                        <div className="flex items-center justify-between mb-4">

                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                                                Profile Name
                                            </label>

                                            <span className="text-[10px] text-slate-700">
                                                Required
                                            </span>

                                        </div>


                                        <input
                                            type="text"
                                            name="profileName"
                                            value={formData.profileName}
                                            onChange={handleProfileNameChange}
                                            placeholder="Enter your profile name"
                                            className="w-full bg-[#02050E] border border-white/[0.08] rounded-2xl px-6 py-5 text-white text-lg font-bold outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all shadow-inner placeholder:text-slate-700"
                                        />

                                    </div>


                                    {/* EMAIL */}

                                    <div>

                                        <div className="flex items-center justify-between mb-4">

                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                                                Profile Email
                                            </label>

                                            <span className="text-[10px] text-slate-700">
                                                Required
                                            </span>

                                        </div>


                                        <input
                                            type="email"
                                            name="profileEmail"
                                            value={formData.profileEmail}
                                            onChange={handleInputChange}
                                            placeholder="Enter your profile email"
                                            className="w-full bg-[#02050E] border border-white/[0.08] rounded-2xl px-6 py-5 text-white text-lg font-bold outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all shadow-inner placeholder:text-slate-700"
                                        />

                                        <small className="text-slate-600 block mt-2">
                                            We'll use this to contact you about your profile. It will not be visible to the public.
                                        </small>

                                    </div>


                                    {/* ABOUT */}

                                    <div>

                                        <div className="flex items-center justify-between mb-4">

                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                                                About Your Profile
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



                                {authLoading == false && hasProfile == false ?
                                    <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.06] px-5 py-4">

                                        <div className="flex items-start gap-3">

                                            <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0" />

                                            <p className="text-sm font-medium text-yellow-300">
                                                You don't have a profile yet. Redirecting you to create one...
                                            </p>

                                        </div>

                                    </div>

                                    :

                                    isAuthenticated ?
                                        <div className="flex flex-col sm:flex-row gap-4">

                                            <button
                                                type="submit"
                                                disabled={!isFormComplete || submitting}
                                                className={`btn-primary flex-1 !py-6 md:!py-7 text-lg md:text-xl flex items-center justify-center gap-4 transition-all ${
                                                    !isFormComplete || submitting
                                                        ? 'opacity-40 cursor-not-allowed'
                                                        : 'hover:scale-[1.01]'
                                                }`}
                                            >
                                                <User2 size={22} />

                                                <span className="font-black tracking-tight">
                                                    {submitting
                                                        ? 'Saving Changes...'
                                                        : isFormComplete
                                                            ? 'Save Changes'
                                                            : 'Complete Profile Details to Continue'}
                                                </span>
                                            </button>

                                            <Link
                                                to="/profile"
                                                className="flex items-center justify-center gap-2 px-8 py-6 md:py-7 rounded-xl bg-white/[0.03] border border-white/10 text-sm font-black text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all"
                                            >
                                                Cancel
                                            </Link>

                                        </div>

                                        : <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.06] px-5 py-4">

                                            <div className="flex items-start gap-3">

                                                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0" />

                                                <p className="text-sm font-medium text-yellow-300">
                                                    Please connect your wallet to edit your profile.
                                                </p>

                                            </div>

                                        </div>

                                }

                            </section>

                        </form>

                    </div>
                </main>

            </div>

        </div>
    );
};


export default EditProfile;