import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { Link } from "react-router-dom";
import { Discord } from "../shared/Icons";

const PartnerPage = () => {
  return (
    <div className="min-h-screen bg-[#040816] text-slate-200">
      <Header />
        <br /> <br />
      <main className="container-main py-20 space-y-16">
        {/* Project Overview */}
        <section>
          <h1 className="text-5xl font-black text-white tracking-tight mb-6">
            HedraFi - Next-Gen DeFi on Hedera
          </h1>
          <p className="text-lg text-slate-400 mb-4">
            HedraFi is a Hedera-based DeFi ecosystem enabling:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>HBAR staking with instant rewards via our $HRT token</li>
            <li>Creator-powered NFT marketplace (launching soon)</li>
            <li>Tools for managing and launching digital assets</li>
            <li>Community-first governance and engagement</li>
            <li>Supported by <strong>Thrive Hedera</strong> and backed by the Hedera ecosystem</li>
          </ul>
        </section>

        {/* Team */}
        {/* <section>
          <h2 className="text-3xl font-bold text-white mb-4">Team</h2>
          <p className="text-slate-400 mb-2">
            HedraFi is built by a lean, highly-focused team:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>Founder & Blockchain Engineer: leads smart contracts & HBAR integration</li>
            <li>Software Engineer: backend and core infrastructure</li>
            <li>Frontend Engineer: UI/UX, staking interface, and NFT marketplace</li>
          </ul>
          <p className="text-slate-400 mt-2">
            We’re growing fast and looking to bring more contributors on board as we scale.
          </p>
        </section> */}

        {/* Tokenomics */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">$HRT Tokenomics</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>Total Supply: 1,000,000,000 HRT</li>
            <li>Ecosystem & Creator Incentives — 30% (300,000,000 HRT)</li>
            <li>Staking & Participation Rewards — 15% (150,000,000 HRT)</li>
            <li>Community & Early Users — 15% (150,000,000 HRT)</li>
            <li>Team & Contributors — 15% (150,000,000 HRT)</li>
            <li>Treasury / DAO Reserve — 15% (150,000,000 HRT)</li>
          </ul>
          <p className="text-slate-400 mt-2">
            Contract deployed on Hedera MainNet. Live staking link: 
            <Link to="/staking" className="text-blue-500 ml-1">hedrafi.xyz/staking</Link>
          </p>
        </section>

        {/* Differentiation */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">Why HedraFi?</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Fully live on Hedera MainNet with verified smart contracts</li>
            <li>Instant staking rewards, no waiting periods</li>
            <li>Creator-first approach for NFTs & asset management</li>
            <li>Transparency + community-focused growth</li>
            <li>Backed by Thrive Hedera for credibility and network support</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">Next Steps</h2>
          <p className="text-slate-400 mb-6">
            Want to collaborate or learn more? <a href="https://discord.gg/cDjN62RJKC" target="_blank" className="text-blue-500">Contact us on Discord</a>
          </p>
          {/* <Link to="/staking">
            <button className="btn-primary px-12 py-4 text-lg">View Live Staking</button>
          </Link> */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerPage;