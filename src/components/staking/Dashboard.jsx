import { useEffect, useState } from "react";
import WalletInfo from "./WalletInfo";
import StakePanel from "./StakePanel";
import StakingStats from "./StakingStats";
import WhyStakeGrid from "./WhyStakeGrid";
// import SecuritySection from "./SecuritySection";
// import EcosystemBenefits from "./EcosystemBenefits";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors';
import { useWallet, useAccountId} from '@buidlerlabs/hashgraph-react-wallets';


const Dashboard = () => {
  const { isConnected } = useWallet(HWCConnector);
  const { data: accountId } = useAccountId({ autoFetch: isConnected });
  const [stakers, setStakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [userPosition, setUserPosition] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const Loader = () => {
      return (
         <div className="flex items-center justify-center py-10">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
               <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
               <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
         </div>
      );
  }

  const Loader2 = () =>{
      return (
         <div className="flex items-center justify-center space-x-2 py-4">
            <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-blue-700"></div>
         </div>
      )
  }

   const fetchStakers = async () => {

      if(accountId && userPosition === null){
         setLoadingPosition(true);
      }

      try {

         const url = accountId
            ? `${API_URL}/api/stakers?account_id=${accountId}`
            : `${API_URL}/api/stakers`;


         const response = await axios.get(url);

         const data = response.data;

         setStakers(data.stakers);


         if(accountId && data.me?.position){
            setUserPosition(data.me.position);
         } else {
            setUserPosition(null);
         }


      } catch(error) {

         toast.error(
            "Failed to fetch stakers. Please refresh the page or try again later."
         );

      } finally {

         setLoading(false);
         setLoadingPosition(false);

      }
   };



   useEffect(() => {

      fetchStakers();

      const interval = setInterval(() => {
         fetchStakers();
      }, 5000);


      return () => clearInterval(interval);

   }, [accountId]);



  const scrollToForm = () => {
    const element = document.getElementById("stake-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-10 md:gap-14">
            
            {/* HERO SECTION - REPLICATING IMAGE 1 */}

<div className="glass-card relative w-full overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0A1128]/40 p-6 md:p-8 shadow-2xl">

   {/* Ambient Glow */}
   <div className="pointer-events-none absolute -right-40 -top-40 h-[400px] w-[400px] bg-blue-500/5 blur-[120px]" />

   <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 ">

      {/* Hero Content */}
      <div className="lg:col-span-7 space-y-5">
         <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5">
         
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />

            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
               Premium Staking Infrastructure
            </span>
         </div>
         <br />
            <br />
         <h1 className="max-w-3xl text-4xl font-black leading-tight text-white md:text-5xl">
            Stake & Earn $HRT
         </h1>


         <p className="max-w-xl text-base leading-7 text-slate-300 md:text-lg">
            Secure your assets within the HedraFi protocol. Monitor
            multi-layered yield streams and participate in ecosystem
            governance through a 100% non-custodial interface.
         </p>


         <button
            onClick={scrollToForm}
            className="rounded-2xl bg-blue-600 px-8 py-3 text-base font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-105 hover:bg-blue-500"
         >
            Start Staking Now
         </button>

      </div>


      {/* Leaderboard Preview */}
      {/* Leaderboard Preview */}
<div className="lg:col-span-5">

   <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5 backdrop-blur-xl">

   <div className="mb-5 flex items-center justify-between">
      <div>
         <h3 className="text-lg font-bold text-white">
            🏆 Top Stakers
         </h3>

         <p className="text-sm text-slate-400">
            Current staking leaderboard
         </p>
      </div>

      <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-right">
         <p className="text-[10px] uppercase tracking-widest text-cyan-300">
            Your Position
         </p>

         <p className="text-xl font-black text-white">
            {
               userPosition !== null ? 
               '#'+userPosition : loadingPosition ? <Loader2/> : <small style={{fontSize: '10px'}}>connect wallet</small>
            }
         </p>

         {/* <p className="text-xs text-cyan-200">
            Top 8%
         </p> */}
      </div>
   </div>


      {/* Scrollable Leaderboard */}
      <div className="max-h-[280px] space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">

         { loading ? <Loader />
            :
         stakers.map((user, index) => (

            <div
               key={index}
               className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3 transition hover:bg-white/[0.05]"
            >

               <div className="flex items-center gap-3">

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.05] text-xs font-bold text-slate-300">
                     {index + 1}
                  </span>


                  <span className="text-sm font-semibold text-white">
                     {user.account_id}
                  </span>
               </div>


               <span className="text-sm font-bold text-cyan-300">
                  {(user.balance / 100000000).toLocaleString(undefined, {
                     minimumFractionDigits: 2,
                     maximumFractionDigits: 2,
                  })} ℏ
               </span>
            </div>
         ))}

      </div>

   </div>

</div>

   </div>

</div>

            {/* SECTION 2: Layout - Stats on Top */}
            <div className="w-full">
               <StakingStats />
            </div>

            {/* SECTION 3: Layout - Wallet Info ON LEFT, Stake Panel ON RIGHT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start focus-within:scroll-mt-40">
               {/* Left column: Wallet Overview */}
               <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-40 order-2 lg:order-1">
                  <div className="glass-card p-6 rounded-[16px] border border-white/[0.05] bg-[#0A1024] shadow-2xl">
                     <WalletInfo />
                  </div>
               </div>

               {/* Right column: Staking Form */}
               <div className="lg:col-span-7 xl:col-span-8 space-y-10 order-1 lg:order-2">
                  <StakePanel />
               </div>
            </div>

            {/* SECTION 4: Why Stake Grid */}
            <div className="pt-12 w-full max-w-7xl mx-auto border-t border-white/10">
               <WhyStakeGrid />
            </div>

            {/* SECTION 5: Security Section */}
            {/* <div className="pt-12 w-full max-w-7xl mx-auto border-t border-white/10">
               <SecuritySection />
            </div> */}

            {/* SECTION 6: Ecosystem Benefits */}
            {/* <div className="pt-12 border-t border-white/10 w-full max-w-7xl mx-auto">
               <EcosystemBenefits />
            </div> */}
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
