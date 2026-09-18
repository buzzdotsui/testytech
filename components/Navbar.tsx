import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, ChevronRight } from 'lucide-react';
import { SectionId } from '../types';

interface NavbarProps {
  activeSection: SectionId;
  scrollToSection: (id: SectionId) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Calculate scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: SectionId.HOME, label: 'Home' },
    { id: SectionId.SERVICES, label: 'Services' },
    { id: SectionId.PORTFOLIO, label: 'Portfolio' },
    { id: SectionId.PRICING, label: 'Pricing' },
    { id: SectionId.ABOUT, label: 'About' },
    { id: SectionId.TESTIMONIALS, label: 'Stories' },
    { id: SectionId.CONTACT, label: 'Contact' },
  ];

  const handleNavClick = (id: SectionId) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled
        ? 'bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 shadow-lg shadow-black/10'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => scrollToSection(SectionId.HOME)}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 rounded-lg blur group-hover:blur-md transition-all" />
                  <div className="relative bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-lg">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className="font-bold text-xl tracking-tight text-white">
                  Testy<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tech Inc</span>
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === link.id
                      ? 'text-cyan-400'
                      : 'text-slate-300 hover:text-white'
                      }`}
                  >
                    {link.label}
                    {/* Active Indicator */}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 transition-all duration-300 ${activeSection === link.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      }`} />
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection(SectionId.CONTACT)}
                  className="group relative ml-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-1">
                    Get Started
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'
                    }`} />
                  <span className={`absolute block h-0.5 w-6 bg-current top-3 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'
                    }`} />
                  <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'
                    }`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="glass border-t border-slate-800 px-4 pt-4 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-colors ${activeSection === link.id
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                  >
                    {link.label}
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeSection === link.id ? 'translate-x-1' : ''
                      }`} />
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick(SectionId.CONTACT)}
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-lg text-base font-medium shadow-lg"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;