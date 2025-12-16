import React from 'react';
import { Check, ArrowRight, Zap, Building2, Crown } from 'lucide-react';
import { SectionId } from '../types';

const Pricing: React.FC = () => {
  const tiers = [
    {
      name: "MVP Launchpad",
      price: "$999",
      description: "Perfect for startups needing a high-quality Proof of Concept or MVP.",
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Laptop/Startup
      features: [
        "React / Next.js Web App",
        "Basic Database Integration",
        "User Authentication",
        "Mobile Responsive Design",
        "1 Month Support"
      ],
      cta: "Start MVP",
      popular: false
    },
    {
      name: "Business Scale",
      price: "$2,999",
      description: "Comprehensive solution for growing businesses requiring robust features.",
      icon: <Building2 className="w-6 h-6 text-blue-400" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Data/Growth
      features: [
        "Everything in MVP",
        "Mobile App (iOS & Android)",
        "Advanced AI Integration",
        "Payment Gateway Setup",
        "SEO Optimization",
        "3 Months Support"
      ],
      cta: "Scale Now",
      popular: true
    },
    {
      name: "Enterprise Core",
      price: "Custom",
      description: "Full-scale digital transformation with dedicated teams and security.",
      icon: <Crown className="w-6 h-6 text-purple-400" />,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Global/Tech
      features: [
        "Custom Cloud Architecture",
        "Microservices & DevOps",
        "Dedicated Development Team",
        "24/7 SLA Support",
        "Security Audits",
        "On-Premise Deployment"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id={SectionId.PRICING} className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-cyan-400 font-semibold tracking-wide uppercase">Transparent Pricing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Invest in Your Future
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
            Choose a package that aligns with your business goals. No hidden fees, just value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col rounded-2xl border transition-all duration-300 card-3d-hover overflow-hidden ${
                tier.popular 
                  ? 'bg-slate-900 border-cyan-500 shadow-2xl shadow-cyan-500/10 scale-105 z-10' 
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'
              }`}
            >
              {/* Card Image Header */}
              <div className="h-48 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/40 z-10 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
                <img 
                  src={tier.image} 
                  alt={tier.name} 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                {tier.popular && (
                  <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    POPULAR
                  </div>
                )}
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${tier.popular ? 'bg-cyan-900/30' : 'bg-slate-800'}`}>
                    {tier.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <p className="mt-2 text-sm text-slate-400 min-h-[40px]">{tier.description}</p>
                
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-slate-500">/project</span>}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href={tier.price === 'Custom' ? "mailto:testytech7724@gmail.com" : "#contact"}
                  onClick={(e) => {
                     if (tier.price !== 'Custom') {
                       e.preventDefault();
                       document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
                     }
                  }}
                  className={`w-full flex items-center justify-center py-4 px-6 rounded-xl text-sm font-bold transition-all ${
                    tier.popular 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25' 
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {tier.cta} <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;