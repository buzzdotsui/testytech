import React from 'react';
import { Quote } from 'lucide-react';
import { SectionId } from '../types';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      content: "Testy Tech Inc. transformed our outdated legacy system into a sleek, high-performance cloud platform. Their team is simply world-class.",
      author: "Sarah Jenkins",
      role: "CTO, FutureScale",
      image: "https://picsum.photos/100/100?random=1"
    },
    {
      content: "The AI integration they built for our customer support reduced ticket volume by 40% in the first month. ROI was immediate.",
      author: "David Chen",
      role: "Director of Ops, OmniCorp",
      image: "https://picsum.photos/100/100?random=2"
    },
    {
      content: "Professional, timely, and technically brilliant. They didn't just take orders; they consulted us on the best architecture for our needs.",
      author: "Elena Rodriguez",
      role: "Founder, TechStart",
      image: "https://picsum.photos/100/100?random=3"
    }
  ];

  return (
    <section id={SectionId.TESTIMONIALS} className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Trusted by Innovators
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Hear from the partners we've helped succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-700 opacity-50" />
              <p className="text-slate-300 mb-8 italic relative z-10">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={t.image} 
                  alt={t.author} 
                  className="w-12 h-12 rounded-full border-2 border-cyan-500 object-cover"
                />
                <div>
                  <h4 className="text-white font-bold text-sm">{t.author}</h4>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-12">
           <div className="text-center">
             <div className="text-4xl font-bold text-white mb-2">50+</div>
             <div className="text-sm text-slate-500 uppercase tracking-wider">Projects Delivered</div>
           </div>
           <div className="text-center">
             <div className="text-4xl font-bold text-white mb-2">90%</div>
             <div className="text-sm text-slate-500 uppercase tracking-wider">Client Retention</div>
           </div>
           <div className="text-center">
             <div className="text-4xl font-bold text-white mb-2">15/6</div>
             <div className="text-sm text-slate-500 uppercase tracking-wider">Support & Maintenance</div>
           </div>
           <div className="text-center">
             <div className="text-4xl font-bold text-white mb-2">3+</div>
             <div className="text-sm text-slate-500 uppercase tracking-wider">Years Experience</div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;