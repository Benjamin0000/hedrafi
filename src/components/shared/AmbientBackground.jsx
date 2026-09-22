const AmbientBackground = () => {

    return (

        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">


            {/* Single soft top glow — the only strong light source on the page */}

            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.07)_0%,transparent_60%)]" />


            {/* One faint secondary accent, far corner, low opacity so it never competes with the top glow */}

            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/[0.025] rounded-full blur-[160px]" />


            {/* Very faint texture — barely perceptible, adds depth without visual noise */}

            <div
                className="absolute inset-0 opacity-[0.012]"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            />


            {/* Gentle edge vignette to keep focus toward the center/content column */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#030712_85%)]" />

        </div>

    );

};


export default AmbientBackground;