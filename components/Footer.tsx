import React, { useState } from 'react';
import { Rocket, Twitter, Linkedin, Github, Instagram, ArrowUp, Send, CheckCircle, Loader2 } from 'lucide-react';
import { SectionId } from '../types';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribeStatus('loading');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubscribeStatus('success');
    setEmail('');
    setTimeout(() => setSubscribeStatus('idle'), 3000);
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter", color: "hover:bg-blue-500" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn", color: "hover:bg-blue-600" },
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub", color: "hover:bg-slate-600" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram", color: "hover:bg-pink-600" }
  ];

  const footerLinks = {
    services: [
      { label: "Web Development", href: "#" },
      { label: "Mobile Apps", href: "#" },
      { label: "Cloud Architecture", href: "#" },
      { label: "AI Integration", href: "#" }
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Privacy Policy", href: "#" }
    ],
    support: [
      { label: "Contact", href: "#contact" },
      { label: "FAQ", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Status", href: "#" }
    ]
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Newsletter Section */}
        <div className="glass-card p-8 rounded-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-cyan-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-slate-400">Get the latest insights on tech, AI, and digital transformation.</p>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  disabled={subscribeStatus !== 'idle'}
                />
              </div>
              <button
                type="submit"
                disabled={subscribeStatus !== 'idle'}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {subscribeStatus === 'idle' && <><Send className="w-4 h-4" /> Subscribe</>}
                {subscribeStatus === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                {subscribeStatus === 'success' && <><CheckCircle className="w-5 h-5" /> Subscribed!</>}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-lg">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Testy<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tech</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Innovating the future with scalable, secure, and intelligent software solutions. Based in Akure, Nigeria, serving clients worldwide.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`group bg-slate-800 p-2.5 rounded-lg text-slate-400 hover:text-white ${social.color} transition-all hover:scale-110 hover:shadow-lg`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Testy Tech Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-400 transition-colors">Terms</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 p-3 rounded-full glass border border-slate-700 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-all hover:scale-110 shadow-lg z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;