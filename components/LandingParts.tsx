import React from 'react';

export const Navbar = () => (
  <nav className="flex items-center justify-between py-6 px-4 md:px-8 border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50 bg-[#050b14]/80 animate-fade-in">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
         <span className="font-bold text-white text-sm">Q</span>
      </div>
      <span className="text-xl font-bold text-white tracking-tight">Qubic MarketView</span>
    </div>
    
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
      <a href="#" className="hover:text-cyan-400 transition-colors">Features</a>
      <a href="#" className="hover:text-cyan-400 transition-colors">Technology</a>
      <a href="#" className="hover:text-cyan-400 transition-colors">Docs</a>
    </div>

    <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-cyan-900/20 transition-all transform hover:-translate-y-0.5 active:scale-95">
      Launch App
    </button>
  </nav>
);

export const Hero = () => (
  <div className="relative pt-20 pb-16 px-4 text-center z-10 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
    
    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-2xl animate-fade-in-up">
      Qubic MarketView
    </h1>
    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
      The native analytics platform powering the Qubic ecosystem. Trade, earn, and build on the next generation of DeFi.
    </p>
    
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
      <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-1">
        Launch App
      </button>
      <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 font-semibold hover:bg-slate-800 transition-all hover:border-slate-600">
        View Docs
      </button>
    </div>
  </div>
);

export const EcosystemCard = ({ icon, title, desc, linkText, delay }: { icon: React.ReactNode, title: string, desc: string, linkText: string, delay: string }) => (
  <div className={`bg-[#0f172a] border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors group animate-fade-in-up ${delay}`}>
    <div className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-900/10">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm mb-6 leading-relaxed min-h-[60px]">{desc}</p>
    <a href="#" className="text-cyan-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
      {linkText} <span>→</span>
    </a>
  </div>
);

export const FeaturesSection = () => (
  <section className="py-20 px-4 max-w-7xl mx-auto">
    <div className="text-center mb-16 animate-fade-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore the Ecosystem</h2>
      <p className="text-slate-400">Discover the powerful applications and utilities built around Qubic.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <EcosystemCard 
        delay="delay-100"
        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
        title="DEX Trading Module"
        desc="Execute high-speed, low-slippage trades with deep liquidity across major asset pairs."
        linkText="Explore Markets"
      />
      <EcosystemCard 
        delay="delay-200"
        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        title="Yield Optimizer"
        desc="Automatically compound and rebalance your assets across multiple strategies for maximum returns."
        linkText="Optimize Now"
      />
      <EcosystemCard 
        delay="delay-300"
        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
        title="Derivatives Engine"
        desc="Hedge, speculate, and manage risk with on-chain perpetuals and options, priced in real-time."
        linkText="View Contracts"
      />
      <EcosystemCard 
        delay="delay-500"
        icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
        title="Oracle Integration"
        desc="Access high-fidelity, tamper-proof price feeds verified by Qubic's distributed computation."
        linkText="Explore Feeds"
      />
    </div>
  </section>
);

export const ComputationSection = () => (
  <section className="py-20 bg-slate-900/20 border-y border-slate-800/50">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in-up">Powered by Qubic Computation</h2>
      <p className="text-slate-400 max-w-2xl mx-auto mb-16 animate-fade-in-up delay-100">
        Our platform offloads complex calculations to Qubic's decentralized network, enabling sophisticated DeFi operations without congesting the main chain.
      </p>

      <div className="grid md:grid-cols-3 gap-8 relative">
        <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 z-10 animate-fade-in-up delay-200">
          <h3 className="text-white font-bold text-lg mb-2">Smart Contracts</h3>
          <p className="text-slate-400 text-sm">Initiate operations and manage assets on-chain.</p>
        </div>
        
        {/* Connector Lines (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-[30%] right-[30%] h-px bg-gradient-to-r from-blue-500/50 to-cyan-500/50 border-t border-dashed border-slate-600 -z-0"></div>

        <div className="p-6 rounded-2xl bg-[#0f172a] border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)] z-10 animate-fade-in-up delay-300">
          <h3 className="text-white font-bold text-lg mb-2">Qubic Network</h3>
          <p className="text-slate-400 text-sm">Executes complex risk, yield, and pricing models off-chain.</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 z-10 animate-fade-in-up delay-500">
          <h3 className="text-white font-bold text-lg mb-2">DeFi Frontend</h3>
          <p className="text-slate-400 text-sm">Displays real-time data and enables user interaction.</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mt-12 text-sm text-cyan-400 font-mono animate-fade-in-up delay-700">
         <p>Advanced Risk Evaluation</p>
         <p>Dynamic Yield Optimization</p>
         <p>Complex Derivatives Pricing</p>
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="py-12 border-t border-slate-800/50 bg-[#050b14]">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-12">
      <div className="col-span-1">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white">Q</span>
          <span className="font-bold text-white">Qubic MarketView</span>
        </div>
        <p className="text-slate-500 text-sm">Next-generation decentralized finance.</p>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Protocol</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li><a href="#" className="hover:text-cyan-400">Markets</a></li>
          <li><a href="#" className="hover:text-cyan-400">Yield</a></li>
          <li><a href="#" className="hover:text-cyan-400">Derivatives</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Resources</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li><a href="#" className="hover:text-cyan-400">Documentation</a></li>
          <li><a href="#" className="hover:text-cyan-400">Whitepaper</a></li>
          <li><a href="#" className="hover:text-cyan-400">Blog</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Community</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li><a href="#" className="hover:text-cyan-400">Governance</a></li>
          <li><a href="#" className="hover:text-cyan-400">Discord</a></li>
          <li><a href="#" className="hover:text-cyan-400">Twitter</a></li>
        </ul>
      </div>
    </div>
    <div className="text-center text-slate-600 text-xs px-4">
      &copy; 2025 Qubic MarketView Protocol. All rights reserved.
    </div>
  </footer>
);