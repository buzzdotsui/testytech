import React from 'react';
import { Activity, Cloud, Cpu, Database, Globe, Layers, Shield, Wifi, Anchor, Box, Zap, Command, Aperture, Hexagon, Triangle, Circle } from 'lucide-react';

const ClientLogos: React.FC = () => {
  // Enhanced list of "Innovative Tech Companies"
  const companies = [
    { name: 'NebulaCloud', icon: Cloud },
    { name: 'CyberFort', icon: Shield },
    { name: 'DataStream', icon: Activity },
    { name: 'QuantumSoft', icon: Cpu },
    { name: 'GlobalNet', icon: Globe },
    { name: 'StackLogic', icon: Layers },
    { name: 'InfoBase', icon: Database },
    { name: 'ConnectWiFi', icon: Wifi },
    { name: 'FluxDynamics', icon: Zap },
    { name: 'CoreSystem', icon: Box },
    { name: 'AeroTech', icon: Anchor },
    { name: 'CmdLine', icon: Command },
    { name: 'LensOptic', icon: Aperture },
    { name: 'HexaGrid', icon: Hexagon },
    { name: 'DeltaForce', icon: Triangle },
    { name: 'OrbitLoop', icon: Circle },
  ];

  return (
    <section className="py-16 bg-slate-900/50 border-y border-slate-800/50 overflow-hidden relative backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
         <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-[0.2em] uppercase">
           Trusted by Innovative Tech Companies Worldwide
         </p>
      </div>

      <div className="relative w-full">
        {/* Enhanced Gradient Masks for smooth fade effect at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

        <div className="flex w-max animate-scroll hover:[animation-play-state:paused] group">
          {/* First set of logos */}
          <div className="flex items-center gap-20 px-10">
            {companies.map((company, index) => (
              <div key={`a-${index}`} className="flex flex-col items-center gap-3 text-slate-500 group-hover:text-cyan-400 transition-all duration-300 transform group-hover:scale-110 cursor-pointer grayscale group-hover:grayscale-0">
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 group-hover:border-cyan-500/50 group-hover:bg-slate-800 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                   <company.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-bold font-mono tracking-tight">{company.name}</span>
              </div>
            ))}
          </div>
          
          {/* Duplicate set for seamless scrolling */}
          <div className="flex items-center gap-20 px-10">
            {companies.map((company, index) => (
              <div key={`b-${index}`} className="flex flex-col items-center gap-3 text-slate-500 group-hover:text-cyan-400 transition-all duration-300 transform group-hover:scale-110 cursor-pointer grayscale group-hover:grayscale-0">
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 group-hover:border-cyan-500/50 group-hover:bg-slate-800 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                   <company.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-bold font-mono tracking-tight">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;