import React, { useState, useEffect, useRef } from 'react';
import { Check, ArrowRight, Zap, Building2, Crown, Sparkles } from 'lucide-react';
import { SectionId } from '../types';

interface Tier {
  name: string;
  price: string;
  priceAnnual: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  features: string[];
  cta: string;
  popular: boolean;
}

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const tiers: Tier[] = [
    {
      name: "MVP Launchpad",
      price: "$999",
      priceAnnual: "$799",
      description: "Perfect for startups needing a high-quality Proof of Concept or MVP.",
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      priceAnnual: "$2,399",
      description: "Comprehensive solution for growing businesses requiring robust features.",
      icon: <Building2 className="w-6 h-6 text-blue-400" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      priceAnnual: "Custom",
      description: "Full-scale digital transformation with dedicated teams and security.",
      icon: <Crown className="w-6 h-6 text-purple-400" />,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    <section ref={sectionRef} id={SectionId.PRICING} className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/5 via-transparent to-transparent rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400 tracking-wide uppercase">Transparent Pricing</span>
          </div>

          <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Invest in Your <span className="text-gradient-primary">Future</span>
          </h2>

          <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
            Choose a package that aligns with your business goals. No hidden fees, just value.
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="mt-10 inline-flex items-center gap-4 p-2 rounded-full glass border border-slate-700">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isAnnual
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${isAnnual
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              Annual
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all ${isAnnual ? 'bg-white/20 text-white' : 'bg-green-500/20 text-green-400'
                }`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${tier.popular
                  ? 'md:scale-105 z-10'
                  : 'hover:scale-[1.02]'
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredTier(index)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {/* Card Container */}
              <div className={`flex-1 flex flex-col glass-card border transition-all duration-300 rounded-2xl ${tier.popular
                  ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/10'
                  : hoveredTier === index
                    ? 'border-slate-600'
                    : 'border-slate-800'
                }`}>

                {/* Image Header */}
                <div className="h-48 w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/40 z-10 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10" />
                  <img
                    src={tier.image}
                    alt={tier.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${hoveredTier === index ? 'scale-110' : 'scale-100'
                      }`}
                  />
                  {tier.popular && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur animate-pulse" />
                        <span className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          POPULAR
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  {/* Icon & Title */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`p-3 rounded-lg transition-colors ${tier.popular ? 'bg-cyan-900/30' : 'bg-slate-800'
                      }`}>
                      {tier.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  </div>

                  <p className="text-sm text-slate-400 min-h-[40px] mb-6">{tier.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span
                        key={isAnnual ? 'annual' : 'monthly'}
                        className="text-4xl font-extrabold text-white transition-all"
                      >
                        {isAnnual ? tier.priceAnnual : tier.price}
                      </span>
                      {tier.price !== 'Custom' && (
                        <span className="text-slate-500">/project</span>
                      )}
                    </div>
                    {isAnnual && tier.price !== 'Custom' && (
                      <p className="text-sm text-green-400 mt-1">
                        You save ${parseInt(tier.price.replace(/\D/g, '')) * 0.2}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-start transition-all duration-300 ${hoveredTier === index ? 'translate-x-1' : ''
                          }`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <div className={`p-0.5 rounded-full mr-3 flex-shrink-0 ${tier.popular ? 'bg-cyan-500' : 'bg-slate-600'
                          }`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href={tier.price === 'Custom' ? "mailto:testytech7724@gmail.com" : "#contact"}
                    onClick={(e) => {
                      if (tier.price !== 'Custom') {
                        e.preventDefault();
                        document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`group w-full flex items-center justify-center py-4 px-6 rounded-xl text-sm font-bold transition-all overflow-hidden relative ${tier.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {tier.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    {tier.popular && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    )}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className={`mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-500 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400" />
            <span>No hidden fees</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;