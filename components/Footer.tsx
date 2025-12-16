import React from 'react';
import { Rocket, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-cyan-500/10 p-2 rounded-lg">
                <Rocket className="h-6 w-6 text-cyan-400" />
              </div>
              <span className="font-bold text-xl text-white">
                Testy<span className="text-cyan-400">Tech</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Innovating the future with scalable, secure, and intelligent software solutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-cyan-400 cursor-pointer">Web Development</li>
              <li className="hover:text-cyan-400 cursor-pointer">Mobile Apps</li>
              <li className="hover:text-cyan-400 cursor-pointer">Cloud Architecture</li>
              <li className="hover:text-cyan-400 cursor-pointer">AI Integration</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-cyan-400 cursor-pointer">About Us</li>
              <li className="hover:text-cyan-400 cursor-pointer">Careers</li>
              <li className="hover:text-cyan-400 cursor-pointer">Blog</li>
              <li className="hover:text-cyan-400 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-slate-800 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Testy Tech Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-600">
             <span>Terms</span>
             <span>•</span>
             <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;