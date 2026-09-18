import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, Cloud, Code, Shield, BarChart3, ArrowRight } from 'lucide-react';
import { SectionId } from '../types';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, color, delay }) => {
  const [transform, setTransform] = useState('');
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale(1)');
  };

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-8 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        transform,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 z-0" />

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl border border-slate-700/50 group-hover:border-transparent transition-colors z-10" />
      <div
        className="absolute inset-[-1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `linear-gradient(135deg, ${color}40, transparent, ${color}40)`,
          padding: '1px'
        }}
      />

      {/* Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${color}15, transparent 50%)`
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon Container */}
        <div className={`mb-6 inline-block p-4 rounded-xl bg-slate-900 group-hover:bg-slate-950 transition-all duration-300 shadow-inner group-hover:shadow-lg`}
          style={{ boxShadow: `0 0 0 0 ${color}00` }}
        >
          <div className="transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300 mb-4">
          {description}
        </p>

        {/* Learn More Link */}
        <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          style={{ color }}
        >
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Corner Accent */}
      <div
        className="absolute -bottom-2 -right-2 w-20 h-20 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-tl-3xl"
        style={{ background: `linear-gradient(135deg, transparent, ${color})` }}
      />
    </motion.div>
  );
};

const Services: React.FC = () => {

  const services = [
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: "Cybersecurity & Pentesting",
      description: "Comprehensive security audits and penetration testing to safeguard your digital assets.",
      color: "#34d399"
    },
    {
      icon: <Monitor className="w-8 h-8 text-cyan-400" />,
      title: "Web Development",
      description: "High-performance websites and web applications built with modern frameworks.",
      color: "#22d3ee"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-400" />,
      title: "App Development",
      description: "Native and cross-platform mobile solutions for iOS and Android.",
      color: "#3b82f6"
    },
    {
      icon: <Code className="w-8 h-8 text-purple-400" />,
      title: "Smart Contracts",
      description: "Secure and efficient smart contract development for blockchain applications.",
      color: "#a855f7"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-400" />,
      title: "Performance Optimization",
      description: "Enhance the speed and efficiency of your existing digital platforms.",
      color: "#fb923c"
    },
    {
      icon: <Cloud className="w-8 h-8 text-sky-400" />,
      title: "Infrastructure & DevOps",
      description: "Scalable cloud architecture and streamlined CI/CD pipelines.",
      color: "#0ea5e9"
    }
  ];

  return (
    <section id={SectionId.SERVICES} className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-semibold text-cyan-400 tracking-wide uppercase">Our Expertise</span>
          </div>

          <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Solutions for the{' '}
            <span className="text-gradient-primary">Modern Enterprise</span>
          </h2>

          <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
            We don't just write code; we build digital ecosystems designed to grow with your business.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              color={service.color}
              delay={index * 100}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-4">Need something custom?</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors group"
          >
            Let's discuss your project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;