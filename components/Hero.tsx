import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Globe, ChevronDown, Sparkles } from 'lucide-react';
import { SectionId } from '../types';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
}

// Typewriter phrases
const phrases = [
  'Cybersecurity',
  'Web Development',
  'App Development',
  'Smart Contracts',
  'Performance Optimization',
  'Infrastructure & DevOps'
];

// Particle component
const Particle: React.FC<{ delay: number; size: 'sm' | 'md' | 'lg'; left: string; top: string }> = ({ delay, size, left, top }) => (
  <div
    className={`particle particle-${size}`}
    style={{
      left,
      top,
      animationDelay: `${delay}s`,
      animationDuration: `${8 + Math.random() * 4}s`
    }}
  />
);

// Generate particles
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  delay: Math.random() * 5,
  size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg',
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`
}));

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex]);

  // Reveal animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      id={SectionId.HOME}
      className="relative min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden flex items-center"
    >
      {/* Aurora Background Effect */}
      <div className="aurora-bg" />

      {/* Particles Container */}
      <div className="particles-container">
        {particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      {/* Enhanced Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 shadow-lg shadow-cyan-900/20"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-sm font-medium text-cyan-100">Accepting Enterprise Projects Globally</span>
            </motion.div>

            {/* Main Headline with Typewriter */}
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="block"
              >
                Secure. Scalable.
              </motion.span>
              <span className="block mt-2 min-h-[1.2em]">
                <span className="text-gradient-primary">{displayText}</span>
                <span className="typewriter-cursor"></span>
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              TESTY TECH INC delivers enterprise-grade security and full-stack development services.
              We transform businesses with secure, scalable digital solutions and developer innovation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => scrollToSection(SectionId.CONTACT)}
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              <button
                onClick={() => scrollToSection(SectionId.SERVICES)}
                className="group inline-flex items-center justify-center gap-2 glass hover:bg-slate-700/80 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all border border-slate-600 hover:border-cyan-500/50"
              >
                View Services
                <Sparkles className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
              </button>
            </motion.div>

            {/* Feature Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="pt-8 flex items-center justify-center lg:justify-start gap-6 lg:gap-8 text-slate-400"
            >
              <div className="group flex items-center gap-2 cursor-pointer">
                <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-cyan-500/20 transition-colors">
                  <Code className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">Clean Code</span>
              </div>
              <div className="group flex items-center gap-2 cursor-pointer">
                <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-blue-500/20 transition-colors">
                  <Cpu className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">AI Powered</span>
              </div>
              <div className="group flex items-center gap-2 cursor-pointer">
                <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-purple-500/20 transition-colors">
                  <Globe className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">Global Scale</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Visual Content - Enhanced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:flex justify-center items-center h-[500px]"
          >

            {/* Glowing Orb Background */}
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-[80px] animate-pulse" />

            {/* Main 3D Stack */}
            <div className="perspective-1000 relative w-72 h-72">
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-full h-full transform-style-3d"
              >

                {/* Layer 1 - Infrastructure */}
                <div className="absolute inset-0 transform translate-z-[-60px] glass-card rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.2)] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl" />
                  <svg className="w-24 h-24 text-slate-600 opacity-60 transform -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>

                {/* Layer 2 - Backend */}
                <div className="absolute inset-0 transform translate-z-[0px] glass-card rounded-2xl border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.3)] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl" />
                  <svg className="w-24 h-24 text-blue-500 transform -rotate-45 animate-glow-enhanced" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="8" rx="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" />
                    <circle cx="6" cy="6" r="1" fill="currentColor" />
                    <circle cx="6" cy="18" r="1" fill="currentColor" />
                  </svg>
                </div>

                {/* Layer 3 - AI/Frontend */}
                <div className="absolute inset-0 transform translate-z-[60px] glass-card rounded-2xl border-cyan-400/50 shadow-[0_0_60px_rgba(34,211,238,0.4)] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-purple-500/10" />
                  <Cpu className="w-28 h-28 text-cyan-400 transform -rotate-45 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
                </div>

                {/* Connecting Ring */}
                <div className="absolute inset-[-20px] border-2 border-dashed border-cyan-500/20 rounded-full animate-pulse transform translate-z-[30px]" />
              </motion.div>

              {/* Floating Labels */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-24 top-4"
              >
                <div className="glass border border-cyan-500/50 p-3 rounded-lg shadow-xl">
                  <p className="text-xs font-bold text-cyan-400 whitespace-nowrap">AI INTEGRATED</p>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-16 bottom-8"
              >
                <div className="glass border border-purple-500/50 p-3 rounded-lg shadow-xl">
                  <p className="text-xs font-bold text-purple-400 whitespace-nowrap">SECURE CLOUD</p>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-16"
              >
                <div className="glass border border-blue-500/50 p-3 rounded-lg shadow-xl">
                  <p className="text-xs font-bold text-blue-400 whitespace-nowrap">SCALABLE</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-[1100ms] ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;