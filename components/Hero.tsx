import React from 'react';
import { ArrowRight, Code, Cpu, Globe, Database, Server, Layers } from 'lucide-react';
import { SectionId } from '../types';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id={SectionId.HOME} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left z-10 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700 backdrop-blur-md shadow-lg shadow-cyan-900/20">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-sm font-medium text-cyan-100">Accepting New Projects in Nigeria & Global</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Scale Your Vision with <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 gradient-text text-transparent filter drop-shadow-sm">Intelligent Tech</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light">
              We transform ambitious ideas into high-performance digital products. 
              From AI-driven platforms to enterprise cloud architecture, 
              Testy Tech Inc delivers excellence at it's peak.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => scrollToSection(SectionId.CONTACT)}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 transform hover:-translate-y-1 hover:scale-105"
              >
                Start Your Project <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection(SectionId.SERVICES)}
                className="inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all border border-slate-700 backdrop-blur-sm"
              >
                View Services
              </button>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" /> <span>Clean Code</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" /> <span>AI Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-400" /> <span>Global Scale</span>
              </div>
            </div>
          </div>

          {/* 3D Visual Content */}
          <div className="relative hidden lg:flex justify-center items-center h-[500px]">
            {/* CSS 3D Rotating Stack */}
            <div className="perspective-1000 relative w-64 h-64">
               <div className="relative w-full h-full transform-style-3d animate-spin-slow">
                  
                  {/* Layer 1 - Infrastructure */}
                  <div className="absolute inset-0 transform translate-z-[-50px] bg-slate-900/80 border border-slate-600/50 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)] backdrop-blur-xl flex items-center justify-center">
                    <Database className="w-20 h-20 text-slate-600 opacity-50 transform -rotate-45" />
                  </div>
                  
                  {/* Layer 2 - Backend */}
                  <div className="absolute inset-0 transform translate-z-[0px] bg-slate-900/80 border border-blue-500/30 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.3)] backdrop-blur-xl flex items-center justify-center">
                     <Server className="w-20 h-20 text-blue-500 transform -rotate-45" />
                  </div>

                  {/* Layer 3 - Frontend/AI */}
                  <div className="absolute inset-0 transform translate-z-[50px] bg-slate-800/90 border border-cyan-400/50 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.4)] backdrop-blur-xl flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent"></div>
                     <Cpu className="w-24 h-24 text-cyan-400 transform -rotate-45 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                  </div>

                  {/* Connecting Beams (Visual decoration) */}
                  <div className="absolute inset-0 border-2 border-dashed border-cyan-500/20 rounded-full animate-pulse transform translate-z-[25px]"></div>
               </div>
               
               {/* Floating Labels */}
               <div className="absolute -right-20 top-0 animate-bounce delay-100">
                  <div className="bg-slate-800/90 backdrop-blur border border-cyan-500/50 p-3 rounded-lg shadow-xl">
                    <p className="text-xs font-bold text-cyan-400">AI INTEGRATED</p>
                  </div>
               </div>
               <div className="absolute -left-10 bottom-0 animate-bounce delay-700">
                  <div className="bg-slate-800/90 backdrop-blur border border-blue-500/50 p-3 rounded-lg shadow-xl">
                    <p className="text-xs font-bold text-blue-400">SECURE CLOUD</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;