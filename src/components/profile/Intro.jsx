import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    User2,
    ShieldCheck,
    Layers3,
    Sparkles,
    BarChart3,
    Globe2,
    BadgeCheck,
    Zap,
    Plus
} from 'lucide-react';

import Footer from "../shared/Footer";
import MarketplaceSidebar from "../shared/MarketplaceSidebar";
import MobileTopBar from "../shared/MobileTopBar";
import AmbientBackground from "../shared/AmbientBackground";


/* =========================================================
   DEMO DATA
========================================================= */



const ProfileIntro = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        const loader = document.getElementById("startup-loader");
        if (loader) {
            loader.style.display = "none";
        }
    }, []);



    return (
        <div className="relative min-h-screen bg-[#030712] overflow-hidden text-slate-200 font-sans">

            {/* =====================================================
                AMBIENT BACKGROUND
            ===================================================== */}

            <AmbientBackground />


            {/* =====================================================
                MOBILE TOP BAR
            ===================================================== */}

            <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />


            {/* =====================================================
                BODY — sidebar + intro content
            ===================================================== */}

            <div className="relative z-10 flex items-start">

                {/* <MarketplaceSidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                /> */}


                <main className="flex-1 min-w-0">



                    {/* =====================================================
                        HERO
                    ===================================================== */}

                    <section className="px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-20 md:pb-24">

                        <div className="container-main">

                            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                                {/* LEFT */}

                                <div className="max-w-2xl">

                                    {/* Eyebrow */}

                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/[0.15] mb-7">

                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.7)]" />

                                        <span className="text-[9px] font-black uppercase tracking-[0.22em] text-emerald-400">
                                            HedraFi Profile
                                        </span>

                                    </div>



                                    <h1 className="text-5xl md:text-6xl lg:text-[4.2rem] font-black tracking-tighter leading-[0.95] text-white">

                                        Your identity.

                                        <br />

                                        <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                            Your <span className='animated-gradient-text'>profile.</span>
                                        </span>

                                    </h1>



                                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed mt-7 max-w-xl">

                                        Set up your profile on HedraFi to showcase your
                                        collections, track your activity, and give collectors
                                        one place to find everything you create.

                                    </p>



                                    {/* Primary CTA */}

                                    <div className="flex flex-col sm:flex-row gap-4 mt-9">

                                        <Link to="/profile/create">

                                            <button className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#02120b] font-black text-sm uppercase tracking-[0.12em] shadow-[0_0_40px_rgba(16,185,129,0.18)] hover:shadow-[0_0_50px_rgba(16,185,129,0.28)] transition-all">

                                                <Plus size={17} />

                                                Create Profile

                                                <ArrowRight
                                                    size={16}
                                                    className="group-hover:translate-x-1 transition-transform"
                                                />

                                            </button>

                                        </Link>

                                        <Link to="/marketplace">

                                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.08] text-white font-black text-sm uppercase tracking-[0.12em] transition-all">

                                                Explore Marketplace

                                            </button>

                                        </Link>

                                    </div>



                                    {/* Trust indicators */}

                                    <div className="flex flex-wrap items-center gap-6 mt-9 pt-7 border-t border-white/[0.05]">

                                        <div className="flex items-center gap-2">

                                            <ShieldCheck
                                                size={15}
                                                className="text-emerald-400"
                                            />

                                            <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                                                Built on Hedera
                                            </span>

                                        </div>

                                        <div className="flex items-center gap-2">

                                            <Globe2
                                                size={15}
                                                className="text-cyan-400"
                                            />

                                            <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                                                Global Marketplace
                                            </span>

                                        </div>

                                        <div className="flex items-center gap-2">

                                            <Zap
                                                size={15}
                                                className="text-emerald-400"
                                            />

                                            <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                                                Fast & Low Cost
                                            </span>

                                        </div>

                                    </div>

                                </div>



                                {/* RIGHT — PROFILE PREVIEW */}

                                <div className="relative">

                                    {/* Glow */}

                                    <div className="absolute inset-0 bg-emerald-500/[0.08] rounded-full blur-[100px]" />

                                    <div className="relative">

                                        {/* Floating top badge */}

                                        <div className="absolute -top-5 right-3 md:-right-8 z-20 px-5 py-3 rounded-xl bg-[#07120F]/90 backdrop-blur-xl border border-emerald-500/[0.18] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                                            <div className="flex items-center gap-2">

                                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                                                <span className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300">
                                                    Profile Live
                                                </span>

                                            </div>

                                        </div>



                                        {/* Browser / Profile Mockup */}

                                        <div className="rounded-[24px] overflow-hidden border border-white/[0.08] bg-[#050A15] shadow-[0_40px_100px_rgba(0,0,0,0.65)]">

                                            {/* Browser header */}

                                            <div className="h-12 px-5 flex items-center gap-2 border-b border-white/[0.05] bg-white/[0.015]">

                                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />

                                                <div className="ml-4 flex-1 h-6 rounded-md bg-white/[0.03] border border-white/[0.04]" />

                                            </div>



                                            {/* Profile header */}

                                            <div className="relative px-6 pt-7 pb-6 border-b border-white/[0.05]">

                                                <div className="flex items-center gap-4">

                                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">

                                                        <User2
                                                            size={25}
                                                            className="text-[#02120b]"
                                                        />

                                                    </div>

                                                    <div>

                                                        <div className="flex items-center gap-2">

                                                            <h3 className="text-lg font-black text-white">
                                                                Nebula Studios
                                                            </h3>

                                                            <BadgeCheck
                                                                size={14}
                                                                className="text-emerald-400"
                                                            />

                                                        </div>

                                                        <p className="text-[10px] text-slate-500 mt-1">
                                                            Digital Creator • Collector
                                                        </p>

                                                    </div>

                                                </div>

                                                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

                                            </div>



                                            {/* Asset preview */}

                                            <div className="p-6">

                                                <div className="flex items-center justify-between mb-5">

                                                    <div>

                                                        <p className="text-[8px] uppercase tracking-[0.2em] font-black text-emerald-400">
                                                            Top Collection
                                                        </p>

                                                        <h4 className="text-xl font-black text-white mt-1">
                                                            Digital Horizons
                                                        </h4>

                                                    </div>

                                                    <Layers3
                                                        size={18}
                                                        className="text-slate-600"
                                                    />

                                                </div>



                                                <div className="grid grid-cols-2 gap-3">

                                                    <AssetPreviewCard
                                                        image="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=1200"
                                                        title="Cosmic Dragon"
                                                        price="150 ℏ"
                                                    />

                                                    <AssetPreviewCard
                                                        image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600"
                                                        title="Ethereal Horizon"
                                                        price="245 ℏ"
                                                    />

                                                </div>



                                                <div className="mt-4 flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/[0.10]">

                                                    <div className="flex items-center gap-2">

                                                        <BarChart3
                                                            size={14}
                                                            className="text-emerald-400"
                                                        />

                                                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">
                                                            Profile Activity
                                                        </span>

                                                    </div>

                                                    <span className="text-xs font-black text-emerald-400">
                                                        +24.8%
                                                    </span>

                                                </div>

                                            </div>

                                        </div>



                                        {/* Bottom floating card */}

                                        <div className="absolute -bottom-6 -left-3 md:-left-10 px-5 py-4 rounded-xl bg-[#07120F]/95 backdrop-blur-xl border border-white/[0.07] shadow-[0_20px_50px_rgba(0,0,0,0.55)]">

                                            <div className="flex items-center gap-3">

                                                <div className="w-9 h-9 rounded-lg bg-emerald-500/[0.10] border border-emerald-500/[0.15] flex items-center justify-center">

                                                    <Sparkles
                                                        size={16}
                                                        className="text-emerald-400"
                                                    />

                                                </div>

                                                <div>

                                                    <p className="text-[8px] uppercase tracking-[0.16em] font-black text-slate-600">
                                                        Your Profile
                                                    </p>

                                                    <p className="text-sm font-black text-white">
                                                        Ready to grow

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>



                    {/* =====================================================
                        WHY A PROFILE
                    ===================================================== */}

                    <section className="px-4 sm:px-6 lg:px-8 py-24 border-y border-white/[0.04] bg-white/[0.008]">

                        <div className="container-main">

                            <div className="max-w-2xl mb-14">

                                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-emerald-400 mb-3">
                                    Not just a wallet address
                                </p>

                                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
                                    A home for everything you build.
                                </h2>

                                <p className="text-slate-500 mt-4 leading-relaxed">
                                    Your profile gives your identity a dedicated presence
                                    inside the HedraFi ecosystem instead of leaving your
                                    activity scattered across the marketplace.
                                </p>

                            </div>



                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                                <FeatureCard
                                    icon={User2}
                                    title="Your Own Profile"
                                    description="Create a dedicated destination where collectors can discover your identity, collections, and activity."
                                />

                                <FeatureCard
                                    icon={Layers3}
                                    title="Showcase Assets"
                                    description="Bring your NFTs, digital collectibles, and tokenized opportunities together in one place."
                                />

                                <FeatureCard
                                    icon={BarChart3}
                                    title="Build Visibility"
                                    description="Give your work a stronger presence within the HedraFi marketplace ecosystem."
                                />

                                <FeatureCard
                                    icon={Globe2}
                                    title="Reach Collectors"
                                    description="Make it easier for buyers and collectors to discover what you're building."
                                />

                            </div>

                        </div>

                    </section>



                    {/* =====================================================
                        HOW IT WORKS
                    ===================================================== */}

                    <section className="px-4 sm:px-6 lg:px-8 py-24">

                        <div className="container-main">

                            <div className="text-center max-w-2xl mx-auto mb-14">

                                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-emerald-400 mb-3">
                                    Simple by design
                                </p>

                                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
                                    Start building your presence.
                                </h2>

                                <p className="text-slate-500 mt-4">
                                    Your profile is the starting point for turning
                                    individual assets into a recognizable presence.
                                </p>

                            </div>



                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                                <StepCard
                                    number="01"
                                    title="Create your profile"
                                    description="Choose your name, avatar, and basic identity details."
                                />

                                <StepCard
                                    number="02"
                                    title="Add your assets"
                                    description="Showcase collections, NFTs, and eligible tokenized assets."
                                />

                                <StepCard
                                    number="03"
                                    title="Share your profile"
                                    description="Give collectors one place to discover everything you offer."
                                />

                            </div>

                        </div>

                    </section>



                    {/* =====================================================
                        CTA
                    ===================================================== */}

                    <section className="px-4 sm:px-6 lg:px-8 pb-28">

                        <div className="container-main">

                            <div className="relative overflow-hidden rounded-[28px] border border-emerald-500/[0.15] bg-[#030712] px-7 py-16 md:px-16 md:py-20 text-center">

                                <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/[0.08] rounded-full blur-[120px]" />

                                <div className="relative z-10">

                                    <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/[0.10] border border-emerald-500/[0.20] flex items-center justify-center mb-7">

                                        <Sparkles
                                            size={25}
                                            className="text-emerald-400"
                                        />

                                    </div>



                                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                                        Build your presence on HedraFi.
                                    </h2>



                                    <p className="text-slate-400 max-w-xl mx-auto mt-5 leading-relaxed">
                                        Create your profile and give your identity a
                                        dedicated home within the HedraFi ecosystem.
                                    </p>



                                    <Link to="/profile/create">

                                        <button className="group mt-9 inline-flex items-center gap-3 px-9 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#02120b] font-black text-sm uppercase tracking-[0.12em] shadow-[0_0_40px_rgba(16,185,129,0.18)] transition-all">

                                            Create Your Profile

                                            <ArrowRight
                                                size={17}
                                                className="group-hover:translate-x-1 transition-transform"
                                            />

                                        </button>

                                    </Link>

                                </div>

                            </div>

                        </div>

                    </section>

                    <Footer />

                </main>

            </div>

        </div>
    );
};



/* =========================================================
   ASSET PREVIEW CARD
========================================================= */

const AssetPreviewCard = ({ image, title, price }) => {

    return (

        <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#030712]">

            <div className="h-28 overflow-hidden">

                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover opacity-70"
                />

            </div>

            <div className="p-3">

                <p className="text-[10px] font-black text-white truncate">
                    {title}
                </p>

                <p className="text-[10px] font-black text-emerald-400 mt-1">
                    {price}
                </p>

            </div>

        </div>

    );
};



/* =========================================================
   FEATURE CARD
========================================================= */

const FeatureCard = ({
    icon: Icon,
    title,
    description
}) => {

    return (

        <div className="group rounded-2xl border border-white/[0.06] bg-[#050A15] p-6 hover:border-emerald-500/[0.20] hover:-translate-y-1 transition-all duration-500">

            <div className="w-11 h-11 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/[0.12] flex items-center justify-center mb-5">

                <Icon
                    size={19}
                    className="text-emerald-400"
                />

            </div>

            <h3 className="text-lg font-black text-white">
                {title}
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed mt-2">
                {description}
            </p>

        </div>

    );
};



/* =========================================================
   STEP CARD
========================================================= */

const StepCard = ({
    number,
    title,
    description
}) => {

    return (

        <div className="relative rounded-2xl border border-white/[0.06] bg-[#050A15] p-7 overflow-hidden">

            <div className="absolute top-0 right-0 text-[70px] font-black text-white/[0.025] leading-none">
                {number}
            </div>

            <div className="relative z-10">

                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                    Step {number}
                </div>

                <h3 className="text-xl font-black text-white mt-4">
                    {title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed mt-2 max-w-sm">
                    {description}
                </p>

            </div>

        </div>

    );
};



export default ProfileIntro;