import WalletInfo from "./WalletInfo";
import StakePanel from "./StakePanel";
import StakingStats from "./StakingStats";
import PioneerCounter from "./PioneerCounter";
import PioneerHighlight from "./PioneerHighlight";
import WhyStakeGrid from "./WhyStakeGrid";
import SecuritySection from "./SecuritySection";
import EcosystemBenefits from "./EcosystemBenefits";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { Discord } from "../shared/Icons";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-[#040816] overflow-hidden text-slate-200">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-blue/5 rounded-full blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container-main">
          <div className="flex flex-col gap-16 md:gap-20">
            {/* SECTION 1: Hero / Header */}
            <div className="space-y-6 max-w-4xl">
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-6 animate-pulse"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
                Staking <span className="text-gradient">Infrastructure</span>
              </h1>
              <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed">
                Secure your assets within the HedraFi protocol. Monitor
                multi-layered yield streams and participate in ecosystem
                governance through a 100% non-custodial interface.
              </p>

              <div className="flex my-4">
                <div className="animate-pulse flex items-center gap-2 px-4 py-2 border-2 border-blue-500/50 bg-blue-50/10 rounded-full shadow-sm">
                  <b className="text-sm md:text-base text-gray-100">
                    Join our
                    <a
                      href="https://discord.gg/cDjN62RJKC"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:text-blue-300 inline-flex items-center mx-1 transition-colors"
                    >
                      Discord
                      <Discord size={18} />
                    </a>
                    for real-time updates and support!
                  </b>
                </div>
              </div>
            </div>

            {/* SECTION 2: Full-Width Stats */}
            <div className="w-full">
              <StakingStats />
            </div>

            {/* SECTION 3: Form + Wallet Overview Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-start">
              {/* Left: Staking Form */}
              <div className="lg:col-span-2 space-y-8">
                <StakePanel />
              </div>

              {/* Right: Wallet Overview + Pioneer Counter (Sticky on Desktop) */}
              <div className="lg:col-span-1 lg:sticky lg:top-40 space-y-6">
                <div className="glass-card p-4 rounded-[2.5rem] border-white/[0.05] shadow-2xl">
                  <WalletInfo />
                </div>
                <PioneerCounter currentPioneers={18} totalSlots={400} />
              </div>
            </div>

            {/* SECTION 3: Pioneer Highlight Block */}
            <div className="pt-8 border-t border-white/10">
              <PioneerHighlight />
            </div>

            {/* SECTION 4: Why Stake Grid */}
            <div className="pt-8">
              <WhyStakeGrid />
            </div>

            {/* SECTION 5: Security Section */}
            <div className="pt-8 border-t border-white/10">
              <SecuritySection />
            </div>

            {/* SECTION 6: Ecosystem Benefits */}
            <div className="pt-8 border-t border-white/10">
              <EcosystemBenefits />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
