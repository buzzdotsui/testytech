import React from 'react';
import { Smartphone, Monitor, Cloud, Brain, Shield, BarChart3 } from 'lucide-react';
import { SectionId } from '../types';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Monitor className="w-8 h-8 text-cyan-400" />,
      title: "Web Development",
      description: "High-performance websites and web applications built with React, Next.js, and modern frameworks."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-400" />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile solutions for iOS and Android that engage users on the go."
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: "AI Solutions",
      description: "Integrate cutting-edge Artificial Intelligence like Gemini to automate workflows and enhance UX."
    },
    {
      icon: <Cloud className="w-8 h-8 text-sky-400" />,
      title: "Cloud Infrastructure",
      description: "Scalable, secure, and cost-effective cloud architecture on AWS, Google Cloud, or Azure."
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: "Cybersecurity",
      description: "Protect your digital assets with enterprise-grade security auditing and implementation."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-400" />,
      title: "Data Analytics",
      description: "Turn raw data into actionable insights with custom dashboards and visualization tools."
    }
  ];

  return (
    <section id={SectionId.SERVICES} className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-cyan-400 font-semibold tracking-wide uppercase">Our Expertise</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Solutions for the Modern Enterprise
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
            We don't just write code; we build digital ecosystems designed to grow with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group card-3d-hover p-8 bg-slate-800 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 relative overflow-hidden"
            >
              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 z-0"></div>
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
              
              <div className="relative z-10">
                <div className="mb-6 inline-block p-4 rounded-xl bg-slate-900 group-hover:bg-slate-950 transition-colors shadow-inner">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;