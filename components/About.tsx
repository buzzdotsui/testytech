import React from 'react';
import { SectionId } from '../types';

const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
             <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="Modern Tech Team Collaboration" 
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105 transition-transform"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 to-cyan-900/20 pointer-events-none"></div>
             </div>
          </div>
          
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-base text-cyan-400 font-semibold tracking-wide uppercase">Who We Are</h2>
            <h3 className="text-3xl font-extrabold text-white sm:text-4xl">
              Engineers of the Digital Frontier
            </h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              Founded in 2020, Testy Tech Inc. started with a simple mission: to make enterprise-grade technology accessible to ambitious startups and scaling companies.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              We believe in transparency, code quality, and user-centric design. Our diverse team of developers, designers, and AI specialists work tirelessly to turn complex problems into elegant solutions.
            </p>
            
            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-xl border-l-4 border-cyan-500">
                <h4 className="text-white font-bold">Innovation First</h4>
                <p className="text-sm text-slate-500 mt-1">Always exploring the bleeding edge.</p>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border-l-4 border-purple-500">
                <h4 className="text-white font-bold">Client Obsessed</h4>
                <p className="text-sm text-slate-500 mt-1">Your success is our only metric.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;