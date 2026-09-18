import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Users, Award, ArrowRight } from 'lucide-react';
import { SectionId } from '../types';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Removed IntersectionObserver logic as we are using whileInView from framer-motion

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Innovation First",
      description: "Always exploring the bleeding edge of technology.",
      color: "cyan"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Client Obsessed",
      description: "Your success is our only metric.",
      color: "purple"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative",
      description: "We partner with you, not just for you.",
      color: "blue"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description: "Quality over quantity, always.",
      color: "emerald"
    }
  ];

  const milestones = [
    { year: "Founded", title: "Testimony Owolabi", description: "Visionary Leader & Founder" },
    { year: "Growth", title: "50+ Projects", description: "Successfully delivered over 50 projects" },
    { year: "Expertise", title: "Certified Experts", description: "Team of certified security & dev professionals" },
    { year: "Strategy", title: "Strategic Approach", description: "Focus on scalable, secure solutions" },
    { year: "Future", title: "Global Impact", description: "Transforming businesses worldwide" }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500', text: 'text-cyan-400' },
      purple: { bg: 'bg-purple-500/10', border: 'border-purple-500', text: 'text-purple-400' },
      blue: { bg: 'bg-blue-500/10', border: 'border-blue-500', text: 'text-blue-400' },
      emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500', text: 'text-emerald-400' }
    };
    return colors[color] || colors.cyan;
  };

  return (
    <section id={SectionId.ABOUT} className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-2xl overflow-hidden group">
              {/* Image Skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 skeleton animate-pulse" />
              )}

              {/* Main Image */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Modern Tech Team Collaboration"
                className={`w-full h-auto object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                  } group-hover:scale-105`}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-950/20 to-cyan-900/20 pointer-events-none" />

              {/* Floating Stats Card */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-xs text-slate-400">Projects</div>
                  </div>
                  <div className="w-px h-10 bg-slate-700" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">3+</div>
                    <div className="text-xs text-slate-400">Years</div>
                  </div>
                  <div className="w-px h-10 bg-slate-700" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">90%</div>
                    <div className="text-xs text-slate-400">Retention</div>
                  </div>
                </div>
              </div>

              {/* Corner Decoration */}
              <div className="absolute -top-2 -right-2 w-20 h-20 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-3xl pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 w-20 h-20 border-b-2 border-l-2 border-purple-500/50 rounded-bl-3xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <span className="text-sm font-semibold text-cyan-400 tracking-wide uppercase">Who We Are</span>
            </div>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Engineers of the{' '}
              <span className="text-gradient-primary">Digital Frontier</span>
            </h2>

            <p className="text-lg text-slate-400 leading-relaxed">
              Founded by <strong>Testimony Owolabi</strong>, TESTY TECH INC combines enterprise-grade protection with developer innovation.
            </p>

            <p className="text-lg text-slate-400 leading-relaxed">
              We believe in transparency, code quality, and user-centric design. Our diverse team of developers, designers, and AI specialists work tirelessly to turn complex problems into elegant solutions.
            </p>

            {/* Values Grid */}
            <div className="pt-6 grid grid-cols-2 gap-4">
              {values.map((value, index) => {
                const colors = getColorClasses(value.color);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                    className={`group p-4 rounded-xl glass border-l-4 ${colors.border} hover:${colors.bg} transition-all duration-300 cursor-pointer`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={colors.text}>
                        {value.icon}
                      </div>
                      <h4 className="text-white font-bold group-hover:text-gradient-primary transition-all">{value.title}</h4>
                    </div>
                    <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
              >
                Work with us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">Our Journey</h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent hidden md:block" />

            {/* Timeline Items */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                  className="relative text-center group"
                >
                  {/* Dot */}
                  <div className="relative z-10 mx-auto mb-4">
                    <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-cyan-500 group-hover:bg-cyan-500 transition-colors mx-auto" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-cyan-500/50 animate-ping opacity-0 group-hover:opacity-100 mx-auto" style={{ animationDuration: '2s' }} />
                  </div>

                  {/* Content */}
                  <div className="glass p-4 rounded-xl group-hover:border-cyan-500/30 transition-colors">
                    <div className="text-cyan-400 font-bold text-lg mb-1">{milestone.year}</div>
                    <div className="text-white font-semibold mb-1">{milestone.title}</div>
                    <div className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{milestone.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;