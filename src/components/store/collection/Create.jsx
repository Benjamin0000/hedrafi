import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    Check,
    Coins,
    Crown,
    Image,
    Info,
    Layers,
    ShieldCheck,
    Upload,
    X,
    Zap
} from 'lucide-react';

import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import api from "../../../lib/api";


/* =========================================================
   VALIDATION
   One validator per section. Each returns { field: message }.
   An empty object means the section is complete.
   ========================================================= */

const validateBasics = (data) => {
    const errors = {};

    const name = data.name.trim();
    if (!name) {
        errors.name = 'Enter a collection name.';
    } else if (name.length < 3) {
        errors.name = 'Use at least 3 characters.';
    } else if (name.length > 100) {
        errors.name = 'Keep the name under 100 characters.';
    }

    const symbol = data.symbol.trim();
    if (!symbol) {
        errors.symbol = 'Enter a token symbol.';
    } else if (symbol.length < 2) {
        errors.symbol = 'Use at least 2 characters.';
    } else if (!/^[A-Z0-9]+$/.test(symbol)) {
        errors.symbol = 'Use letters and numbers only, no spaces.';
    }

    const description = data.description.trim();
    if (!description) {
        errors.description = 'Describe what this collection represents.';
    } else if (description.length < 20) {
        errors.description = 'Write at least 20 characters.';
    }

    if (!data.bannerImage) {
        errors.bannerImage = 'Upload a banner image for the collection.';
    }

    if (data.supplyType === 'FINITE') {
        const supply = data.maxSupply.trim();

        if (!supply) {
            errors.maxSupply = 'Enter a maximum supply.';
        } else if (!/^\d+$/.test(supply)) {
            errors.maxSupply = 'Use a whole number.';
        } else if (Number(supply) < 1) {
            errors.maxSupply = 'Supply must be at least 1.';
        }
    }

    return errors;
};


const validateEconomics = (data) => {
    const errors = {};

    if (data.royaltiesEnabled) {
        const percentage = data.royaltyPercentage.trim();

        if (percentage === '') {
            errors.royaltyPercentage = 'Enter a royalty percentage.';
        } else if (Number.isNaN(Number(percentage))) {
            errors.royaltyPercentage = 'Enter a number.';
        } else if (Number(percentage) <= 0) {
            errors.royaltyPercentage = 'Royalties must be greater than 0%.';
        } else if (Number(percentage) > 100) {
            errors.royaltyPercentage = 'Royalties cannot exceed 100%.';
        }

        if (data.fallbackEnabled) {
            const amount = data.fallbackAmount.trim();

            if (amount === '') {
                errors.fallbackAmount = 'Enter a fallback amount.';
            } else if (Number.isNaN(Number(amount))) {
                errors.fallbackAmount = 'Enter a number.';
            } else if (Number(amount) <= 0) {
                errors.fallbackAmount = 'Amount must be greater than 0.';
            }

            if (!data.fallbackCurrency) {
                errors.fallbackCurrency = 'Choose a currency.';
            }
        }
    }

    return errors;
};


const VALIDATORS = {
    basics: validateBasics,
    economics: validateEconomics,
    review: () => ({})
};


/* =========================================================
   SMALL PRESENTATIONAL PIECES
   Defined outside the page component so React keeps the same
   element type between renders (otherwise inputs lose focus).
   ========================================================= */

const Toggle = ({ enabled, onChange, disabled = false }) => (
    <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
            enabled
                ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500'
                : 'bg-white/10'
        } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
        <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg transition-all duration-300 ${
                enabled ? 'left-6' : 'left-1'
            }`}
        />
    </button>
);


const InputLabel = ({ label, hint }) => (
    <div className="mb-2">
        <label className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
            {label}
        </label>

        {hint && (
            <p className="text-xs text-slate-600 mt-1">
                {hint}
            </p>
        )}
    </div>
);


const FieldError = ({ message }) => {
    if (!message) {
        return null;
    }

    return (
        <p className="mt-2 flex items-start gap-1.5 text-[11px] font-bold text-red-400">
            <AlertCircle size={13} className="shrink-0 mt-[1px]" />
            {message}
        </p>
    );
};


const ErrorSummary = ({ errors }) => {
    const messages = Object.values(errors);

    if (messages.length === 0) {
        return null;
    }

    return (
        <div className="flex gap-3 p-4 rounded-2xl border border-red-500/20 bg-red-500/[0.05]">

            <AlertCircle size={17} className="text-red-400 shrink-0 mt-0.5" />

            <div>
                <p className="text-xs font-black text-red-300">
                    {messages.length === 1
                        ? 'One field still needs attention'
                        : `${messages.length} fields still need attention`}
                </p>

                <ul className="mt-2 space-y-1">
                    {messages.map((message) => (
                        <li key={message} className="text-[11px] text-red-300/70">
                            {message}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};


const ReviewRow = ({ label, value }) => (
    <div className="flex items-center justify-between gap-6 p-4 rounded-xl bg-white/[0.015] border border-white/5">

        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">
            {label}
        </span>

        <span className="text-sm font-bold text-white text-right">
            {value}
        </span>

    </div>
);


/* Shared input styling, swapped to a red border when the field is invalid. */
const inputClass = (invalid, accent = 'purple') => `
    w-full h-13 px-4 rounded-xl bg-white/[0.025] border outline-none text-sm text-white
    placeholder:text-slate-700 transition-all
    ${invalid
        ? 'border-red-500/50 focus:border-red-500/60 focus:ring-4 focus:ring-red-500/5'
        : `border-white/10 focus:border-${accent}-500/40 focus:ring-4 focus:ring-${accent}-500/5`}
`;


const CreateCollection = () => {
    const [activeSection, setActiveSection] = useState('basics');

    const [formData, setFormData] = useState({
        name: '',
        symbol: '',
        description: '',

        // Collection metadata
        bannerImage: null,
        bannerPreview: '',

        collectionType: 'NFT',
        supplyType: 'FINITE',
        maxSupply: '',
        initialSupply: '0',

        royaltiesEnabled: true,
        royaltyPercentage: '5',
        fallbackEnabled: true,
        fallbackAmount: '1',
        fallbackCurrency: 'HBAR',

        supplyKey: true,
        feeScheduleKey: true,
        adminKey: true,
        pauseKey: false,
        freezeKey: false,
        kycKey: false,
        wipeKey: false,

        publicMint: false,
        mintPrice: '',
        mintCurrency: 'HBAR'
    });

    // Which sections the user has tried to leave. Errors only surface after
    // a first attempt, so the form doesn't shout at someone who just arrived.
    const [attempted, setAttempted] = useState({
        basics: false,
        economics: false
    });

    // Fields the user has finished editing, so a single field can surface its
    // error early without turning the whole section red.
    const [touched, setTouched] = useState({});

    const basicsErrors = useMemo(() => validateBasics(formData), [formData]);
    const economicsErrors = useMemo(() => validateEconomics(formData), [formData]);

    const sectionErrors = {
        basics: basicsErrors,
        economics: economicsErrors,
        review: {}
    };

    const isSectionValid = (id) => Object.keys(sectionErrors[id]).length === 0;
    const isFormValid = isSectionValid('basics') && isSectionValid('economics');

    // An error is shown once its field was touched, or once the user tried to
    // move past the section it belongs to.
    const errorFor = (section, field) => {
        const message = sectionErrors[section][field];

        if (!message) {
            return '';
        }

        return attempted[section] || touched[field] ? message : '';
    };

    const visibleErrors = (section) =>
        attempted[section] ? sectionErrors[section] : {};


    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const markTouched = (field) => {
        setTouched((prev) => ({
            ...prev,
            [field]: true
        }));
    };


    // Gate for every forward move. Backwards navigation is never blocked.
    const goToSection = (target, from) => {
        if (!from) {
            setActiveSection(target);
            return;
        }

        setAttempted((prev) => ({
            ...prev,
            [from]: true
        }));

        if (!isSectionValid(from)) {
            return;
        }

        setActiveSection(target);
    };

    // Tab navigation: you can always go back, but you can only jump forward
    // through sections that are already complete.
    const handleTabClick = (targetId) => {
        const order = ['basics', 'economics', 'review'];
        const currentIndex = order.indexOf(activeSection);
        const targetIndex = order.indexOf(targetId);

        if (targetIndex <= currentIndex) {
            setActiveSection(targetId);
            return;
        }

        const blocking = order
            .slice(0, targetIndex)
            .find((id) => !isSectionValid(id));

        if (blocking) {
            setAttempted((prev) => ({
                ...prev,
                [blocking]: true
            }));
            setActiveSection(blocking);
            return;
        }

        setActiveSection(targetId);
    };


    const handleCreateCollection = () => {
        setAttempted({ basics: true, economics: true });

        if (!isFormValid) {
            const order = ['basics', 'economics'];
            const blocking = order.find((id) => !isSectionValid(id));

            if (blocking) {
                setActiveSection(blocking);
            }

            return;
        }

        // TODO: deploy through the Hedera Token Service.
        console.log('Creating collection', formData);




    };


    const handleBannerChange = (event) => {
        const file = event.target.files?.[0];

        markTouched('bannerImage');

        if (!file) {
            return;
        }

        // Only allow images
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        // 2 MB maximum
        const maxSize = 2 * 1024 * 1024;

        if (file.size > maxSize) {
            alert('Banner image must be 2MB or smaller.');
            return;
        }

        const previewUrl = URL.createObjectURL(file);

        setFormData((prev) => {
            if (prev.bannerPreview) {
                URL.revokeObjectURL(prev.bannerPreview);
            }

            return {
                ...prev,
                bannerImage: file,
                bannerPreview: previewUrl
            };
        });
    };


    const removeBanner = () => {
        markTouched('bannerImage');

        setFormData((prev) => {
            if (prev.bannerPreview) {
                URL.revokeObjectURL(prev.bannerPreview);
            }

            return {
                ...prev,
                bannerImage: null,
                bannerPreview: ''
            };
        });
    };


    const sections = [
        {
            id: 'basics',
            label: 'Collection'
        },
        {
            id: 'economics',
            label: 'Economics'
        },
        {
            id: 'review',
            label: 'Review'
        }
    ];


    return (

        <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-blue-600/[0.08] rounded-full blur-[140px]" />
                <div className="absolute top-[30%] left-[-20%] w-[40%] h-[50%] bg-purple-600/[0.07] rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[10%] w-[45%] h-[45%] bg-emerald-500/[0.05] rounded-full blur-[150px]" />
            </div>

            <Header />

            <main className="relative z-10 pt-28 pb-24 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Back Navigation */}
                    <Link
                        to="/store"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500 hover:text-white transition-colors mb-10"
                    >
                        <ArrowLeft size={15} />
                        Back to Store
                    </Link>

                    {/* Page Heading */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">

                        <div className="max-w-2xl">

                            <div className="flex items-center gap-3 mb-5">

                                <div className="flex gap-1">
                                    <span className="w-1.5 h-6 rounded-full bg-blue-500" />
                                    <span className="w-1.5 h-6 rounded-full bg-purple-500" />
                                    <span className="w-1.5 h-6 rounded-full bg-emerald-400" />
                                </div>

                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                    HedraFi Studio
                                </span>

                            </div>

                            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                                Create a{' '}
                                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                                    Collection.
                                </span>
                            </h1>

                            <p className="text-slate-400 text-base md:text-lg leading-relaxed mt-6">
                                Deploy a new collection to Hedera and define how your
                                assets are created, managed, and monetized.
                            </p>

                        </div>


                        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/[0.025] border border-white/5">

                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-emerald-500/15 border border-white/5 flex items-center justify-center">
                                <ShieldCheck size={18} className="text-emerald-400" />
                            </div>

                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                                    Network
                                </p>

                                <p className="text-xs font-black text-white mt-1">
                                    Hedera Mainnet
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* Progress Navigation */}
                    <div className="mb-10 border-b border-white/5 overflow-x-auto">

                        <div className="flex gap-8 min-w-max">

                            {sections.map((section, index) => {
                                const isActive = activeSection === section.id;
                                const isComplete = isSectionValid(section.id);
                                const showIncomplete =
                                    !isActive && attempted[section.id] && !isComplete;

                                return (
                                    <button
                                        key={section.id}
                                        type="button"
                                        onClick={() => handleTabClick(section.id)}
                                        className={`relative pb-5 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                                            isActive
                                                ? 'text-white'
                                                : showIncomplete
                                                    ? 'text-red-400/80 hover:text-red-300'
                                                    : 'text-slate-600 hover:text-slate-400'
                                        }`}
                                    >

                                        <span className="mr-2 text-slate-700">
                                            0{index + 1}
                                        </span>

                                        {section.label}

                                        {showIncomplete && (
                                            <AlertCircle
                                                size={12}
                                                className="inline-block ml-2 -mt-0.5"
                                            />
                                        )}

                                        {isActive && (
                                            <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400" />
                                        )}

                                    </button>
                                );
                            })}

                        </div>

                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">


                        {/* ========================= */}
                        {/* FORM AREA */}
                        {/* ========================= */}

                        <div className="space-y-6">


                            {/* COLLECTION BASICS */}
                            {activeSection === 'basics' && (

                                <>
                                    <section className="rounded-[28px] border border-white/10 bg-[#02050E]/90 p-6 md:p-8">

                                        <div className="flex items-start gap-4 mb-8">

                                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center">
                                                <Layers size={21} className="text-blue-400" />
                                            </div>

                                            <div>

                                                <h2 className="text-xl font-black text-white">
                                                    Collection Details
                                                </h2>

                                                <p className="text-sm text-slate-500 mt-2">
                                                    Define the identity of your collection on HedraFi.
                                                </p>

                                            </div>

                                        </div>


                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                            <div>

                                                <InputLabel
                                                    label="Collection Name"
                                                    hint="This will appear across HedraFi and on-chain."
                                                />

                                                <input
                                                    value={formData.name}
                                                    onChange={(e) => updateField('name', e.target.value)}
                                                    onBlur={() => markTouched('name')}
                                                    placeholder="e.g. Digital Horizons"
                                                    aria-invalid={Boolean(errorFor('basics', 'name'))}
                                                    className={inputClass(
                                                        Boolean(errorFor('basics', 'name')),
                                                        'blue'
                                                    )}
                                                />

                                                <FieldError message={errorFor('basics', 'name')} />

                                            </div>


                                            <div>

                                                <InputLabel
                                                    label="Token Symbol"
                                                    hint="A short identifier for the collection."
                                                />

                                                <input
                                                    value={formData.symbol}
                                                    onChange={(e) => updateField('symbol', e.target.value.toUpperCase())}
                                                    onBlur={() => markTouched('symbol')}
                                                    placeholder="e.g. HORIZON"
                                                    maxLength={12}
                                                    aria-invalid={Boolean(errorFor('basics', 'symbol'))}
                                                    className={`${inputClass(
                                                        Boolean(errorFor('basics', 'symbol'))
                                                    )} font-mono uppercase`}
                                                />

                                                <FieldError message={errorFor('basics', 'symbol')} />

                                            </div>

                                        </div>


                                        <div className="mt-6">

                                            <InputLabel
                                                label="Description"
                                                hint="Tell collectors what this collection represents."
                                            />

                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => updateField('description', e.target.value)}
                                                onBlur={() => markTouched('description')}
                                                rows={5}
                                                placeholder="Describe your collection..."
                                                aria-invalid={Boolean(errorFor('basics', 'description'))}
                                                className={`w-full p-4 rounded-xl bg-white/[0.025] border outline-none text-sm text-white placeholder:text-slate-700 transition-all resize-none ${
                                                    errorFor('basics', 'description')
                                                        ? 'border-red-500/50 focus:border-red-500/60 focus:ring-4 focus:ring-red-500/5'
                                                        : 'border-white/10 focus:border-purple-500/40 focus:ring-4 focus:ring-purple-500/5'
                                                }`}
                                            />

                                            <FieldError message={errorFor('basics', 'description')} />

                                        </div>


                                        {/* COLLECTION BANNER */}
                                        <div className="mt-7">

                                            <InputLabel
                                                label="Collection Banner"
                                                hint="A wide image used to represent your collection across HedraFi."
                                            />

                                            {formData.bannerPreview ? (

                                                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">

                                                    <img
                                                        src={formData.bannerPreview}
                                                        alt="Collection banner preview"
                                                        className="w-full h-48 md:h-64 object-cover"
                                                    />

                                                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-between gap-4">

                                                        <div className="min-w-0">
                                                            <p className="text-xs font-black text-white truncate">
                                                                {formData.bannerImage?.name}
                                                            </p>

                                                            <p className="text-[10px] text-slate-400 mt-1">
                                                                {formData.bannerImage
                                                                    ? `${(formData.bannerImage.size / 1024 / 1024).toFixed(2)} MB`
                                                                    : ''
                                                                }
                                                            </p>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={removeBanner}
                                                            className="shrink-0 w-9 h-9 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-500/20 hover:border-red-500/20 transition-all"
                                                            title="Remove banner"
                                                        >
                                                            <X size={16} />
                                                        </button>

                                                    </div>

                                                </div>

                                            ) : (

                                                <label
                                                    htmlFor="collection-banner"
                                                    className="group block cursor-pointer"
                                                >

                                                    <div className={`relative flex flex-col items-center justify-center h-48 md:h-56 rounded-2xl border border-dashed bg-white/[0.015] hover:bg-white/[0.025] transition-all ${
                                                        errorFor('basics', 'bannerImage')
                                                            ? 'border-red-500/40 hover:border-red-500/50'
                                                            : 'border-white/10 hover:border-purple-500/30'
                                                    }`}>

                                                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                                            <Image
                                                                size={21}
                                                                className="text-purple-400"
                                                            />
                                                        </div>

                                                        <p className="text-sm font-black text-white">
                                                            Upload Collection Banner
                                                        </p>

                                                        <p className="text-xs text-slate-600 mt-2">
                                                            PNG, JPG, WEBP · Maximum 1MB
                                                        </p>

                                                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                                                            <Upload size={13} />
                                                            Choose Image
                                                        </div>

                                                    </div>

                                                    <input
                                                        id="collection-banner"
                                                        type="file"
                                                        accept="image/png,image/jpeg,image/webp"
                                                        onChange={handleBannerChange}
                                                        className="hidden"
                                                    />

                                                </label>

                                            )}

                                            <FieldError message={errorFor('basics', 'bannerImage')} />

                                        </div>

                                    </section>


                                    {/* SUPPLY */}
                                    <section className="rounded-[28px] border border-white/10 bg-[#02050E]/90 p-6 md:p-8">

                                        <div className="flex items-start gap-4 mb-8">

                                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center">
                                                <Coins size={21} className="text-purple-400" />
                                            </div>

                                            <div>

                                                <h2 className="text-xl font-black text-white">
                                                    Supply Configuration
                                                </h2>

                                                <p className="text-sm text-slate-500 mt-2">
                                                    Define how many unique assets can exist in this collection.
                                                </p>

                                            </div>

                                        </div>


                                        <div className="mt-6">

                                            <InputLabel
                                                label="Maximum Supply"
                                                hint="The maximum number of NFTs that can ever be minted."
                                            />

                                            <input
                                                type="number"
                                                min="1"
                                                step="1"
                                                value={formData.maxSupply}
                                                onChange={(e) => updateField('maxSupply', e.target.value)}
                                                onBlur={() => markTouched('maxSupply')}
                                                placeholder="e.g. 1000"
                                                aria-invalid={Boolean(errorFor('basics', 'maxSupply'))}
                                                className={inputClass(
                                                    Boolean(errorFor('basics', 'maxSupply'))
                                                )}
                                            />

                                            <FieldError message={errorFor('basics', 'maxSupply')} />

                                        </div>

                                    </section>


                                    <ErrorSummary errors={visibleErrors('basics')} />


                                    <div className="flex justify-end">

                                        <button
                                            type="button"
                                            onClick={() => goToSection('economics', 'basics')}
                                            aria-disabled={!isSectionValid('basics')}
                                            className={`h-13 px-7 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-black flex items-center gap-3 transition-all ${
                                                isSectionValid('basics')
                                                    ? 'hover:opacity-90'
                                                    : 'opacity-40'
                                            }`}
                                        >
                                            Continue to Economics
                                            <ArrowRight size={16} />
                                        </button>

                                    </div>

                                </>
                            )}


                            {/* ================= ECONOMICS ================= */}

                            {activeSection === 'economics' && (

                                <>
                                    <section className="rounded-[28px] border border-white/10 bg-[#02050E]/90 p-6 md:p-8">

                                        <div className="flex items-start justify-between gap-5 mb-8">

                                            <div className="flex items-start gap-4">

                                                <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-purple-500/15 to-emerald-500/10 border border-purple-500/10 flex items-center justify-center">
                                                    <Crown size={21} className="text-purple-400" />
                                                </div>

                                                <div>

                                                    <h2 className="text-xl font-black text-white">
                                                        Royalty Configuration
                                                    </h2>

                                                    <p className="text-sm text-slate-500 mt-2">
                                                        Earn a percentage when NFTs from this collection are transferred with value.
                                                    </p>

                                                </div>

                                            </div>


                                            <Toggle
                                                enabled={formData.royaltiesEnabled}
                                                onChange={(value) => {
                                                    updateField('royaltiesEnabled', value);

                                                    if (value) {
                                                        updateField('feeScheduleKey', true);
                                                    }
                                                }}
                                            />

                                        </div>


                                        {formData.royaltiesEnabled && (

                                            <div className="space-y-6">

                                                <div>

                                                    <InputLabel
                                                        label="Royalty Percentage"
                                                        hint="The percentage collected from qualifying secondary sales."
                                                    />

                                                    <div className="relative">

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            step="0.1"
                                                            value={formData.royaltyPercentage}
                                                            onChange={(e) => updateField('royaltyPercentage', e.target.value)}
                                                            onBlur={() => markTouched('royaltyPercentage')}
                                                            aria-invalid={Boolean(errorFor('economics', 'royaltyPercentage'))}
                                                            className={`w-full h-14 px-4 pr-14 rounded-xl bg-white/[0.025] border outline-none text-white transition-all ${
                                                                errorFor('economics', 'royaltyPercentage')
                                                                    ? 'border-red-500/50 focus:border-red-500/60'
                                                                    : 'border-white/10 focus:border-purple-500/40'
                                                            }`}
                                                        />

                                                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 font-black">
                                                            %
                                                        </span>

                                                    </div>

                                                    <FieldError message={errorFor('economics', 'royaltyPercentage')} />

                                                </div>


                                                {/* Fallback Fee */}
                                                <div className="p-5 rounded-2xl bg-white/[0.015] border border-white/5">

                                                    <div className="flex items-start justify-between gap-5">

                                                        <div>

                                                            <div className="flex items-center gap-2">

                                                                <h4 className="text-sm font-black text-white">
                                                                    Fallback Fee
                                                                </h4>

                                                                <Info
                                                                    size={14}
                                                                    className="text-slate-600"
                                                                />

                                                            </div>

                                                            <p className="text-xs text-slate-600 leading-relaxed mt-2 max-w-xl">
                                                                Charge a fixed fee when an NFT is transferred without a fungible value exchange.
                                                            </p>

                                                        </div>

                                                        <Toggle
                                                            enabled={formData.fallbackEnabled}
                                                            onChange={(value) => updateField('fallbackEnabled', value)}
                                                        />

                                                    </div>


                                                    {formData.fallbackEnabled && (

                                                        <>
                                                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-4 mt-5">

                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    step="0.1"
                                                                    value={formData.fallbackAmount}
                                                                    onChange={(e) => updateField('fallbackAmount', e.target.value)}
                                                                    onBlur={() => markTouched('fallbackAmount')}
                                                                    placeholder="Amount"
                                                                    aria-invalid={Boolean(errorFor('economics', 'fallbackAmount'))}
                                                                    className={`h-13 px-4 rounded-xl bg-black/20 border outline-none text-sm text-white transition-all ${
                                                                        errorFor('economics', 'fallbackAmount')
                                                                            ? 'border-red-500/50 focus:border-red-500/60'
                                                                            : 'border-white/10 focus:border-emerald-500/40'
                                                                    }`}
                                                                />

                                                                <select
                                                                    value={formData.fallbackCurrency}
                                                                    onChange={(e) => updateField('fallbackCurrency', e.target.value)}
                                                                    className="h-13 px-4 rounded-xl bg-black/20 border border-white/10 outline-none text-sm text-white focus:border-emerald-500/40 transition-all"
                                                                >
                                                                    <option value="HBAR">
                                                                        HBAR
                                                                    </option>
                                                                </select>

                                                            </div>

                                                            <FieldError message={errorFor('economics', 'fallbackAmount')} />
                                                        </>

                                                    )}

                                                </div>
                                            </div>

                                        )}

                                    </section>


                                    <ErrorSummary errors={visibleErrors('economics')} />


                                    <div className="flex justify-between gap-4">

                                        <button
                                            type="button"
                                            onClick={() => setActiveSection('basics')}
                                            className="h-13 px-6 rounded-xl border border-white/10 text-xs font-black text-slate-400 hover:text-white transition-all"
                                        >
                                            Back
                                        </button>


                                        <button
                                            type="button"
                                            onClick={() => goToSection('review', 'economics')}
                                            aria-disabled={!isSectionValid('economics')}
                                            className={`h-13 px-8 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 text-white text-xs font-black flex items-center gap-3 shadow-lg shadow-purple-500/10 transition-all ${
                                                isSectionValid('economics')
                                                    ? 'hover:scale-[1.01]'
                                                    : 'opacity-40'
                                            }`}
                                        >
                                            <Zap size={16} />
                                            Continue to Review
                                        </button>

                                    </div>

                                </>
                            )}


                            {/* ================= REVIEW ================= */}

                            {activeSection === 'review' && (

                                <>
                                    <section className="rounded-[28px] border border-white/10 bg-[#02050E]/90 p-6 md:p-8">

                                        <div className="flex items-start gap-4 mb-8">

                                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center">
                                                <Check size={22} className="text-emerald-400" />
                                            </div>

                                            <div>

                                                <h2 className="text-xl font-black text-white">
                                                    Ready to Deploy
                                                </h2>

                                                <p className="text-sm text-slate-500 mt-2">
                                                    Review your configuration before creating the collection.
                                                </p>

                                            </div>

                                        </div>


                                        <div className="space-y-3">

                                            <ReviewRow
                                                label="Collection"
                                                value={formData.name || 'Untitled Collection'}
                                            />

                                            <ReviewRow
                                                label="Symbol"
                                                value={formData.symbol || '—'}
                                            />

                                            <ReviewRow
                                                label="Banner"
                                                value={formData.bannerImage ? formData.bannerImage.name : 'Not provided'}
                                            />

                                            <ReviewRow
                                                label="Supply"
                                                value={
                                                    formData.supplyType === 'FINITE'
                                                        ? `${formData.maxSupply || 0} maximum NFTs`
                                                        : 'Flexible supply'
                                                }
                                            />

                                            <ReviewRow
                                                label="Royalties"
                                                value={
                                                    formData.royaltiesEnabled
                                                        ? `${formData.royaltyPercentage}%`
                                                        : 'Disabled'
                                                }
                                            />

                                            <ReviewRow
                                                label="Fallback Fee"
                                                value={
                                                    formData.royaltiesEnabled &&
                                                    formData.fallbackEnabled
                                                        ? `${formData.fallbackAmount} ${formData.fallbackCurrency}`
                                                        : 'Disabled'
                                                }
                                            />

                                        </div>

                                    </section>


                                    <ErrorSummary
                                        errors={{ ...visibleErrors('basics'), ...visibleErrors('economics') }}
                                    />


                                    <div className="flex justify-between gap-4">

                                        <button
                                            type="button"
                                            onClick={() => setActiveSection('economics')}
                                            className="h-13 px-6 rounded-xl border border-white/10 text-xs font-black text-slate-400 hover:text-white"
                                        >
                                            Back
                                        </button>


                                        <button
                                            type="button"
                                            onClick={handleCreateCollection}
                                            aria-disabled={!isFormValid}
                                            className={`h-13 px-8 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 text-white text-xs font-black flex items-center gap-3 shadow-lg shadow-purple-500/10 transition-all ${
                                                isFormValid ? 'hover:scale-[1.01]' : 'opacity-40'
                                            }`}
                                        >
                                            <Zap size={16} />
                                            Create Collection
                                        </button>

                                    </div>

                                </>
                            )}

                        </div>


                        {/* ========================= */}
                        {/* SIDE PANEL */}
                        {/* ========================= */}

                        <aside className="lg:sticky lg:top-28 space-y-5">

                            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">

                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                                    Progress
                                </p>

                                <div className="mt-4 space-y-3">

                                    {['basics', 'economics'].map((id) => {
                                        const complete = isSectionValid(id);
                                        const missing = Object.keys(sectionErrors[id]).length;

                                        return (
                                            <div key={id} className="flex items-center justify-between gap-3">

                                                <span className="text-xs font-bold text-slate-400 capitalize">
                                                    {id === 'basics' ? 'Collection' : 'Economics'}
                                                </span>

                                                <span className={`text-[11px] font-black ${
                                                    complete ? 'text-emerald-400' : 'text-slate-600'
                                                }`}>
                                                    {complete
                                                        ? 'Complete'
                                                        : `${missing} left`}
                                                </span>

                                            </div>
                                        );
                                    })}

                                </div>

                            </div>


                            <div className="p-5 rounded-2xl border border-blue-500/10 bg-gradient-to-br from-blue-500/[0.04] via-purple-500/[0.025] to-emerald-500/[0.03]">

                                <div className="flex gap-3">

                                    <Info
                                        size={17}
                                        className="text-blue-400 shrink-0 mt-0.5"
                                    />

                                    <div>

                                        <p className="text-xs font-black text-slate-300">
                                            HedraFi Protocol
                                        </p>

                                        <p className="text-[11px] leading-relaxed text-slate-600 mt-2">
                                            Your collection will be linked to your HedraFi storefront and deployed through the Hedera Token Service.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>

            </main>


            <Footer />

        </div>
    );
};


export default CreateCollection;