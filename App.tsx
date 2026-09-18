import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import ClientLogos from './components/ClientLogos';
import QuickReach from './components/QuickReach';
import Portfolio from './components/Portfolio';
import { SectionId } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HOME);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll to section function
  const scrollToSection = useCallback((id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  }, []);

  // Setup intersection observer for active section detection
  useEffect(() => {
    const sections = Object.values(SectionId);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative">
      {/* Global Background Effects */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <main className="relative z-10">
        <Hero scrollToSection={scrollToSection} />
        <ClientLogos />
        <Services />
        <Portfolio />
        <Pricing />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <QuickReach />
      <AIChatbot />
    </div>
  );
}

export default App;