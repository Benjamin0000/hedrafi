import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    User2,
    Settings,
    Plus,
    Image,
    Rocket,
    Layers,
    TrendingUp,
    Eye,
    MoreHorizontal,
    ArrowUpRight,
    ExternalLink,
    Edit3,
    Package,
    Sparkles,
    Clock,
    Activity,
    ChevronRight,
    Wallet,
    BadgeCheck,
    Boxes,
    CircleDollarSign,
    BarChart3,
    Play,
    Pause,
    Gem
} from 'lucide-react';

import Header from "../shared/Header";
import Footer from "../shared/Footer";

const ProfileHome = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Temporary Profile front data.
    // Replace with API / smart contract data later.
    const profile = {
        name: 'Nebula Studios',
        username: 'nebulastudios',
        bio:
            'A digital studio exploring art, collectibles, culture, and tokenized real-world experiences.',
        followers: '1.2K',
        totalCollections: 4,
        totalItems: '2,840',
        volume: '12,480 HBAR',
        views: '8.4K',
        earnings: '3,840 HBAR',
        logo: null,
        banner: null,
    };

    const collections = [
        {
            id: 1,
            name: 'Genesis Collection',
            items: '250 / 250',
            status: 'Live',
            type: 'NFT',
            volume: '4,820 HBAR',
        },
        {
            id: 2,
            name: 'Digital Horizons',
            items: '184 / 500',
            status: 'Live',
            type: 'NFT',
            volume: '2,140 HBAR',
        },
        {
            id: 3,
            name: 'Future Assets',
            items: '0 / 1,000',
            status: 'Draft',
            type: 'RWA',
            volume: '—',
        },
    ];

    const assets = [
        {
            id: 1,
            name: 'Nebula #001',
            collection: 'Genesis Collection',
            status: 'Listed',
            type: 'NFT',
        },
        {
            id: 2,
            name: 'Nebula #002',
            collection: 'Genesis Collection',
            status: 'Owned',
            type: 'NFT',
        },
        {
            id: 3,
            name: 'Horizon #042',
            collection: 'Digital Horizons',
            status: 'Listed',
            type: 'NFT',
        },
        {
            id: 4,
            name: 'Future Asset #001',
            collection: 'Future Assets',
            status: 'Draft',
            type: 'RWA',
        },
    ];

    const launchpads = [
        {
            id: 1,
            name: 'Genesis Public Mint',
            collection: 'Genesis Collection',
            status: 'Live',
            progress: 84,
            minted: '210 / 250',
        },
        {
            id: 2,
            name: 'Digital Horizons Drop',
            collection: 'Digital Horizons',
            status: 'Scheduled',
            progress: 0,
            minted: '0 / 500',
        },
    ];

    const activities = [
        {
            title: 'Genesis Collection',
            action: 'received a new mint',
            time: '2 minutes ago',
            icon: Sparkles,
            accent: 'purple',
        },
        {
            title: 'Digital Horizons',
            action: 'received a new bid',
            time: '1 hour ago',
            icon: TrendingUp,
            accent: 'green',
        },
        {
            title: 'Future Assets',
            action: 'was saved as a draft',
            time: 'Yesterday',
            icon: Edit3,
            accent: 'blue',
        },
    ];

    const quickActions = [
        {
            title: 'Create Collection',
            description: 'Launch a new NFT collection.',
            icon: Layers,
            link: '/create-collection',
            accent: 'blue-green',
        },
        {
            title: 'Mint Asset',
            description: 'Create and add assets to your collection.',
            icon: Sparkles,
            link: '/mint',
            accent: 'green-purple',
        },
        { 
            title: 'Create Launchpad',
            description: 'Prepare your next public mint or drop.',
            icon: Rocket,
            link: '/create-launchpad',
            accent: 'green-blue',
        },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'collections', label: 'Collections', icon: Layers },
        { id: 'assets', label: 'Assets', icon: Boxes },
        { id: 'launchpads', label: 'Launchpads', icon: Rocket },
        { id: 'activity', label: 'Activity', icon: Activity },
    ];

    const accentStyles = {
        blue: {
            icon: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            dot: 'bg-blue-400',
        },
        purple: {
            icon: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
            dot: 'bg-purple-400',
        },
        green: {
            icon: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            dot: 'bg-emerald-400',
        },
    };

    return (
        <div className="relative min-h-screen bg-[#030712] overflow-hidden text-slate-200">

            {/* =====================================================
                AMBIENT BACKGROUND
                Homepage-inspired emerald atmosphere
            ===================================================== */}

            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

                {/* Primary Emerald Atmosphere */}
                <div className="absolute top-[-15%] left-[20%] w-[55%] h-[45%] bg-emerald-500/[0.09] rounded-full blur-[150px]" />

                {/* Secondary Blue Atmosphere */}
                <div className="absolute top-[15%] right-[-15%] w-[40%] h-[45%] bg-blue-600/[0.07] rounded-full blur-[150px]" />

                {/* Restrained Purple Atmosphere */}
                <div className="absolute bottom-[5%] left-[-15%] w-[35%] h-[40%] bg-purple-600/[0.045] rounded-full blur-[150px]" />

                {/* Emerald Bottom Glow */}
                <div className="absolute bottom-[-25%] right-[15%] w-[45%] h-[45%] bg-emerald-500/[0.055] rounded-full blur-[150px]" />

                {/* Homepage-style top radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.10)_0%,transparent_48%)]" />

                {/* Subtle dotted grid */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            'radial-gradient(#ffffff 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Dark vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_78%)]" />

            </div>

            <Header />

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-14">

                {/* ================= Profile BANNER ================= */}

                <section className="relative h-[280px] md:h-[360px] rounded-[32px] overflow-hidden border border-white/[0.08] bg-[#02050E]">

                    {profile.banner ? (
                        <img
                            src={profile.banner}
                            alt={profile.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <>
                            {/* Homepage-inspired emerald/blue atmosphere */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(16,185,129,0.28),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(37,99,235,0.20),transparent_42%),linear-gradient(135deg,#07150F,#06101A_55%,#02050E)]" />

                            {/* Emerald light source */}
                            <div className="absolute top-[-35%] left-[8%] w-[420px] h-[420px] bg-emerald-500/20 rounded-full blur-[120px]" />

                            {/* Blue secondary light */}
                            <div className="absolute top-[-20%] right-[5%] w-[350px] h-[350px] bg-blue-500/15 rounded-full blur-[120px]" />

                            {/* Small purple trace */}
                            <div className="absolute bottom-[-35%] right-[35%] w-[300px] h-[300px] bg-purple-500/[0.07] rounded-full blur-[110px]" />

                            {/* Subtle grid */}
                            <div
                                className="absolute inset-0 opacity-[0.035]"
                                style={{
                                    backgroundImage:
                                        'radial-gradient(#ffffff 1px, transparent 1px)',
                                    backgroundSize: '40px 40px',
                                }}
                            />
                        </>
                    )}

                    {/* Banner depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02050E] via-[#02050E]/15 to-transparent" />

                    {/* Banner Top */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-4">

                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-black/20 backdrop-blur-xl border border-white/[0.08]">

                            <div className="flex -space-x-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                                <span className="w-2 h-2 rounded-full bg-blue-400" />
                                <span className="w-2 h-2 rounded-full bg-purple-400" />
                            </div>

                            <span className="text-[9px] font-black uppercase tracking-[0.22em] text-slate-400">
                                Creator Workspace
                            </span>

                        </div>

                        <div className="flex gap-3 ml-auto">

                            {/* <Link
                                to="/profile/settings"
                                className="w-11 h-11 rounded-xl bg-black/25 backdrop-blur-xl border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-emerald-400/30 hover:bg-emerald-500/10 transition-all"
                            >
                                <Settings size={18} />
                            </Link> */}

                            <Link
                                to={`/@${profile.username}`}
                                className="h-11 px-5 rounded-xl bg-white text-[#02050E] flex items-center gap-2 text-xs font-black hover:scale-[1.03] transition-all"
                            >
                                <ExternalLink size={15} />
                                View Profile
                            </Link>

                        </div>

                    </div>

                </section>


                {/* ================= Profile IDENTITY ================= */}

                <section className="relative px-2 md:px-8">

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 -mt-16 md:-mt-20 relative z-10">

                        <div className="flex flex-col sm:flex-row sm:items-end gap-6">

                            {/* Logo */}

                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[32px] p-[2px] bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-500 shadow-[0_20px_60px_rgba(16,185,129,0.15)]">

                                <div className="w-full h-full rounded-[30px] bg-[#07110F] overflow-hidden flex items-center justify-center">

                                    {profile.logo ? (
                                        <img
                                            src={profile.logo}
                                            alt={profile.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User2
                                            size={44}
                                            className="text-emerald-300"
                                        />
                                    )}

                                </div>

                            </div>


                            {/* Profile Info */}

                            <div className="pb-1">

                                <div className="flex items-center gap-3 mb-2">

                                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                                        {profile.name}
                                    </h1>

                                    <BadgeCheck
                                        size={21}
                                        className="text-emerald-400"
                                    />

                                </div>

                                <div className="flex flex-wrap items-center gap-3 text-sm">

                                    <span className="text-slate-500">
                                        @{profile.username}
                                    </span>

                                    <span className="w-1 h-1 rounded-full bg-slate-600" />

                                    <span className="text-emerald-400 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">

                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.7)]" />

                                        Active

                                    </span>

                                </div>

                            </div>

                        </div>


                        <Link
                            to="/profile/edit"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-black text-slate-300 hover:text-white hover:bg-emerald-500/10 hover:border-emerald-400/20 transition-all"
                        >
                            <Edit3 size={15} />
                            Edit Profile
                        </Link>

                    </div>


                    <p className="max-w-3xl text-slate-400 leading-relaxed mt-8 text-sm md:text-base">
                        {profile.bio}
                    </p>

                </section>


                {/* ================= NAVIGATION ================= */}

                <section className="mt-12 border-b border-white/5">

                    <div className="flex gap-7 md:gap-9 overflow-x-auto">

                        {tabs.map((tab) => {

                            const Icon = tab.icon;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex items-center gap-2 pb-5 text-[10px] font-black uppercase tracking-[0.18em] whitespace-nowrap transition-colors ${
                                        activeTab === tab.id
                                            ? 'text-white'
                                            : 'text-slate-600 hover:text-slate-400'
                                    }`}
                                >

                                    <Icon size={14} />

                                    {tab.label}

                                    {activeTab === tab.id && (
                                        <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 shadow-[0_0_12px_rgba(52,211,153,0.35)]" />
                                    )}

                                </button>
                            );

                        })}

                    </div>

                </section>


                {/* ================= OVERVIEW ================= */}

                {activeTab === 'overview' && (

                    <div className="space-y-10 py-10">

                        {/* Stats */}

                        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                            <StatCard
                                icon={Layers}
                                label="Collections"
                                value={profile.totalCollections}
                                accent="blue"
                            />

                            <StatCard
                                icon={Package}
                                label="Total Assets"
                                value={profile.totalItems}
                                accent="green"
                            />

                            <StatCard
                                icon={TrendingUp}
                                label="Volume"
                                value={profile.volume}
                                accent="green"
                            />

                            <StatCard
                                icon={Eye}
                                label="Profile Views"
                                value={profile.views}
                                accent="blue"
                            />

                        </section>


                        {/* Creator Tools */}

                        <section>

                            <div className="flex items-end justify-between mb-6">

                                <div>

                                    <div className="flex items-center gap-3 mb-3">

                                        <div className="flex gap-1">

                                            <span className="w-1.5 h-5 rounded-full bg-emerald-400" />
                                            <span className="w-1.5 h-5 rounded-full bg-blue-500" />
                                            <span className="w-1.5 h-5 rounded-full bg-purple-500" />

                                        </div>

                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                            Create & Manage
                                        </p>

                                    </div>

                                    <h2 className="text-2xl md:text-3xl font-black text-white">
                                        Build something new.
                                    </h2>

                                </div>

                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                                {quickActions.map((action) => {

                                    const Icon = action.icon;

                                    const actionStyle = {
                                        'blue-green': {
                                            border: 'hover:border-emerald-400/30',
                                            glow: 'bg-gradient-to-br from-blue-500/10 to-emerald-500/15',
                                            icon: 'bg-gradient-to-br from-blue-500/15 to-emerald-500/20 text-emerald-300',
                                            text: 'text-emerald-400',
                                        },

                                        'green-purple': {
                                            border: 'hover:border-emerald-400/30',
                                            glow: 'bg-gradient-to-br from-emerald-500/15 to-purple-500/10',
                                            icon: 'bg-gradient-to-br from-emerald-500/20 to-purple-500/15 text-emerald-300',
                                            text: 'text-emerald-400',
                                        },

                                        'green-blue': {
                                            border: 'hover:border-emerald-400/30',
                                            glow: 'bg-gradient-to-br from-emerald-500/15 to-blue-500/10',
                                            icon: 'bg-gradient-to-br from-emerald-500/20 to-blue-500/15 text-emerald-300',
                                            text: 'text-emerald-400',
                                        },

                                    }[action.accent];

                                    return (

                                        <Link
                                            key={action.title}
                                            to={action.link}
                                            className={`group relative p-7 rounded-[24px] border border-white/5 bg-[#02050E]/80 overflow-hidden transition-all duration-500 hover:-translate-y-1 ${actionStyle.border}`}
                                        >

                                            <div
                                                className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px] opacity-70 ${actionStyle.glow}`}
                                            />

                                            <div className="relative">

                                                <div
                                                    className={`w-13 h-13 rounded-2xl flex items-center justify-center mb-6 border border-white/5 ${actionStyle.icon}`}
                                                >
                                                    <Icon size={22} />
                                                </div>

                                                <h3 className="font-black text-white text-lg">
                                                    {action.title}
                                                </h3>

                                                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                                    {action.description}
                                                </p>

                                                <div
                                                    className={`flex items-center gap-2 text-xs font-black mt-6 ${actionStyle.text}`}
                                                >
                                                    Get Started

                                                    <ArrowUpRight
                                                        size={15}
                                                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                                    />
                                                </div>

                                            </div>

                                        </Link>

                                    );

                                })}

                            </div>

                        </section>


                        {/* Collections + Activity */}

                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Intentionally preserved as hidden for now */}

                        </section>

                    </div>

                )}


                {/* ================= COLLECTIONS ================= */}

                {activeTab === 'collections' && (

                    <div className="py-10">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

                            <div>

                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-3">
                                    Collection Manager
                                </p>

                                <h2 className="text-3xl font-black text-white">
                                    Your Collections
                                </h2>

                            </div>

                            <Link
                                to="/create-collection"
                                className="px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 hover:opacity-90 text-white inline-flex items-center justify-center gap-2 text-sm font-black transition-all shadow-[0_0_30px_rgba(16,185,129,0.12)]"
                            >
                                <Plus size={18} />
                                Create Collection
                            </Link>

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {collections.map((collection, index) => {

                                const gradients = [
                                    'from-emerald-500/20 via-blue-500/10 to-transparent',
                                    'from-blue-500/15 via-emerald-500/15 to-transparent',
                                    'from-emerald-500/15 via-purple-500/10 to-transparent',
                                ];

                                return (

                                    <div
                                        key={collection.id}
                                        className="rounded-[28px] overflow-hidden border border-white/10 bg-[#02050E] group hover:border-emerald-400/25 transition-all"
                                    >

                                        <div
                                            className={`h-44 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center relative`}
                                        >

                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.10),transparent_60%)]" />

                                            <Image
                                                size={38}
                                                className="relative text-emerald-300/60"
                                            />

                                            <span
                                                className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                                    collection.status === 'Live'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
                                                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/10'
                                                }`}
                                            >
                                                {collection.status}
                                            </span>

                                        </div>


                                        <div className="p-6">

                                            <div className="flex items-start justify-between gap-4">

                                                <div>

                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">
                                                        {collection.type}
                                                    </span>

                                                    <h3 className="text-lg font-black text-white mt-2">
                                                        {collection.name}
                                                    </h3>

                                                </div>

                                                <MoreHorizontal
                                                    size={20}
                                                    className="text-slate-600"
                                                />

                                            </div>


                                            <div className="flex items-center justify-between mt-7 pt-5 border-t border-white/5">

                                                <div>

                                                    <p className="text-[10px] uppercase tracking-widest text-slate-600">
                                                        Assets
                                                    </p>

                                                    <p className="text-sm font-bold text-white mt-1">
                                                        {collection.items}
                                                    </p>

                                                </div>

                                                <Link
                                                    to={`/collection/${collection.id}`}
                                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all"
                                                >
                                                    <ArrowUpRight size={17} />
                                                </Link>

                                            </div>

                                        </div>

                                    </div>

                                );

                            })}


                            <Link
                                to="/create-collection"
                                className="min-h-[300px] rounded-[28px] border border-dashed border-emerald-500/20 hover:border-emerald-400/50 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-blue-500/[0.03] flex flex-col items-center justify-center text-center p-8 group transition-all"
                            >

                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/5 group-hover:bg-emerald-500/10 flex items-center justify-center mb-6 transition-colors border border-emerald-500/10">

                                    <Plus
                                        size={26}
                                        className="text-emerald-400"
                                    />

                                </div>

                                <h3 className="font-black text-white">
                                    Create New Collection
                                </h3>

                                <p className="text-sm text-slate-600 mt-2 max-w-[220px]">
                                    Launch another NFT collection.
                                </p>

                            </Link>

                        </div>

                    </div>

                )}


                {/* ================= ASSETS ================= */}

                {activeTab === 'assets' && (

                    <div className="py-10">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

                            <div>

                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-3">
                                    Asset Manager
                                </p>

                                <h2 className="text-3xl font-black text-white">
                                    Your Assets
                                </h2>

                                <p className="text-sm text-slate-500 mt-3">
                                    Manage your assets.
                                </p>

                            </div>

                            <Link
                                to="/mint"
                                className="px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 hover:opacity-90 text-white inline-flex items-center justify-center gap-2 text-sm font-black transition-all shadow-[0_0_30px_rgba(16,185,129,0.12)]"
                            >
                                <Sparkles size={18} />
                                Mint Asset
                            </Link>

                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                            {assets.map((asset, index) => {

                                const gradients = [
                                    'from-emerald-500/20 to-blue-500/10',
                                    'from-blue-500/15 to-emerald-500/15',
                                    'from-emerald-500/20 to-purple-500/10',
                                    'from-blue-500/15 to-emerald-500/10',
                                ];

                                return (

                                    <div
                                        key={asset.id}
                                        className="rounded-[24px] overflow-hidden border border-white/10 bg-[#02050E] hover:-translate-y-1 hover:border-emerald-400/20 transition-all duration-300"
                                    >

                                        <div
                                            className={`aspect-square bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center relative`}
                                        >

                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_60%)]" />

                                            <Gem
                                                size={34}
                                                className="relative text-emerald-300/60"
                                            />

                                            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/30 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-slate-300 border border-white/5">
                                                {asset.type}
                                            </span>

                                        </div>


                                        <div className="p-5">

                                            <h3 className="font-bold text-white truncate">
                                                {asset.name}
                                            </h3>

                                            <p className="text-xs text-slate-600 mt-1 truncate">
                                                {asset.collection}
                                            </p>

                                            <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">

                                                <span
                                                    className={`text-[9px] font-black uppercase tracking-widest ${
                                                        asset.status === 'Listed'
                                                            ? 'text-emerald-400'
                                                            : asset.status === 'Draft'
                                                                ? 'text-purple-400'
                                                                : 'text-blue-400'
                                                    }`}
                                                >
                                                    {asset.status}
                                                </span>

                                                <ArrowUpRight
                                                    size={16}
                                                    className="text-slate-600"
                                                />

                                            </div>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    </div>

                )}


                {/* ================= LAUNCHPADS ================= */}

                {activeTab === 'launchpads' && (

                    <div className="py-10">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

                            <div>

                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-3">
                                    Drop Manager
                                </p>

                                <h2 className="text-3xl font-black text-white">
                                    Launchpads
                                </h2>

                                <p className="text-sm text-slate-500 mt-3">
                                    Create and manage public mints, drops, and collection launches.
                                </p>

                            </div>

                            <Link
                                to="/create-launchpad"
                                className="px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 hover:opacity-90 text-white inline-flex items-center justify-center gap-2 text-sm font-black transition-all shadow-[0_0_30px_rgba(16,185,129,0.12)]"
                            >
                                <Rocket size={18} />
                                Create Launchpad
                            </Link>

                        </div>


                        <div className="space-y-5 max-w-5xl">

                            {launchpads.map((launchpad, index) => (

                                <div
                                    key={launchpad.id}
                                    className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#02050E] p-6 md:p-8 hover:border-emerald-500/15 transition-all"
                                >

                                    <div
                                        className={`absolute top-0 right-0 w-72 h-72 blur-[100px] rounded-full ${
                                            index === 0
                                                ? 'bg-emerald-500/12'
                                                : 'bg-blue-500/10'
                                        }`}
                                    />

                                    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">

                                        <div className="flex gap-5">

                                            <div
                                                className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center border ${
                                                    index === 0
                                                        ? 'bg-gradient-to-br from-emerald-500/15 to-blue-500/10 border-emerald-500/10'
                                                        : 'bg-gradient-to-br from-blue-500/15 to-emerald-500/10 border-blue-500/10'
                                                }`}
                                            >

                                                <Rocket
                                                    size={25}
                                                    className={
                                                        index === 0
                                                            ? 'text-emerald-400'
                                                            : 'text-blue-400'
                                                    }
                                                />

                                            </div>


                                            <div>

                                                <div className="flex flex-wrap items-center gap-3">

                                                    <h3 className="text-xl font-black text-white">
                                                        {launchpad.name}
                                                    </h3>

                                                    <span
                                                        className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                                            launchpad.status === 'Live'
                                                                ? 'bg-emerald-500/10 text-emerald-400'
                                                                : 'bg-purple-500/10 text-purple-400'
                                                        }`}
                                                    >
                                                        {launchpad.status}
                                                    </span>

                                                </div>

                                                <p className="text-sm text-slate-500 mt-2">
                                                    {launchpad.collection}
                                                </p>


                                                <div className="mt-5">

                                                    <div className="flex justify-between text-xs mb-2">

                                                        <span className="text-slate-600">
                                                            Mint Progress
                                                        </span>

                                                        <span className="font-bold text-white">
                                                            {launchpad.minted}
                                                        </span>

                                                    </div>

                                                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">

                                                        <div
                                                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-blue-500"
                                                            style={{
                                                                width: `${launchpad.progress}%`
                                                            }}
                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>


                                        <div className="flex gap-3">

                                            <button className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-emerald-300 hover:border-emerald-500/20 transition-all">

                                                {launchpad.status === 'Live' ? (
                                                    <Pause size={17} />
                                                ) : (
                                                    <Play size={17} />
                                                )}

                                            </button>

                                            <button className="px-5 h-11 rounded-xl bg-white/5 border border-white/10 text-xs font-black text-slate-300 hover:text-white hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all">
                                                Manage
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}


                            <Link
                                to="/create-launchpad"
                                className="min-h-[180px] rounded-[28px] border border-dashed border-emerald-500/20 hover:border-emerald-400/40 bg-gradient-to-r from-emerald-500/[0.04] via-transparent to-blue-500/[0.03] flex flex-col items-center justify-center text-center p-8 group transition-all"
                            >

                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center mb-5">

                                    <Plus
                                        size={24}
                                        className="text-emerald-400"
                                    />

                                </div>

                                <h3 className="font-black text-white">
                                    Launch Something New
                                </h3>

                                <p className="text-sm text-slate-600 mt-2">
                                    Create a new public mint or collection launch.
                                </p>

                            </Link>

                        </div>

                    </div>

                )}


                {/* ================= ACTIVITY ================= */}

                {activeTab === 'activity' && (

                    <div className="py-10 max-w-3xl">

                        <div className="mb-10">

                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-3">
                                 History
                            </p>

                            <h2 className="text-3xl font-black text-white">
                                Activity
                            </h2>

                            <p className="text-slate-500 text-sm mt-3">
                                Track important events happening across your collections, and assets.
                            </p>

                        </div>


                        <div className="space-y-4">

                            {activities.map((activity, index) => {

                                const Icon = activity.icon;
                                const style = accentStyles[activity.accent];

                                return (

                                    <div
                                        key={index}
                                        className="rounded-2xl border border-white/10 bg-[#02050E] p-6 flex gap-5 hover:border-emerald-500/15 transition-all"
                                    >

                                        <div
                                            className={`w-12 h-12 shrink-0 rounded-2xl ${style.bg} ${style.border} border flex items-center justify-center`}
                                        >

                                            <Icon
                                                size={19}
                                                className={style.icon}
                                            />

                                        </div>


                                        <div className="flex-1">

                                            <p className="text-slate-400">

                                                <span className="font-bold text-white">
                                                    {activity.title}
                                                </span>{' '}

                                                {activity.action}

                                            </p>

                                            <div className="flex items-center gap-2 text-xs text-slate-600 mt-3">

                                                <Clock size={13} />

                                                {activity.time}

                                            </div>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    </div>

                )}

            </main>

            <Footer />

        </div>
    );
};


const StatCard = ({
    icon: Icon,
    label,
    value,
    accent = 'blue'
}) => {

    const styles = {

        blue: {
            icon: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/10',
            dot: 'bg-blue-400',
        },

        purple: {
            icon: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/10',
            dot: 'bg-purple-400',
        },

        green: {
            icon: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/10',
            dot: 'bg-emerald-400',
        },

    };

    const style = styles[accent];

    return (

        <div className="group relative overflow-hidden p-5 md:p-6 rounded-2xl border border-white/10 bg-[#02050E]/90 hover:border-emerald-500/20 transition-all">

            <div
                className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[50px] opacity-40 ${style.bg}`}
            />

            <div className="relative">

                <div className="flex items-center justify-between mb-5">

                    <div
                        className={`w-10 h-10 rounded-xl ${style.bg} ${style.border} border flex items-center justify-center`}
                    >

                        <Icon
                            size={17}
                            className={style.icon}
                        />

                    </div>

                    <div
                        className={`w-1.5 h-1.5 rounded-full ${style.dot}`}
                    />

                </div>

                <p className="text-xl md:text-2xl font-black text-white">
                    {value}
                </p>

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mt-2">
                    {label}
                </p>

            </div>

        </div>

    );
};


export default ProfileHome;
