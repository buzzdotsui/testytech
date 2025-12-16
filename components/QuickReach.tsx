import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const QuickReach: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/2349049339759?text=Hi%2C%20I%20visited%20your%20website%20and%20I%20want%20to%20discuss%20a%20project." 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg shadow-green-900/20 hover:scale-110 transition-transform hover:shadow-[#25D366]/40"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute left-full ml-3 px-3 py-1 bg-white text-slate-900 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
          WhatsApp Us
        </span>
      </a>

      {/* Phone Button */}
      <a 
        href="tel:+2349049339759" 
        className="group relative flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-900/20 hover:scale-110 transition-transform hover:shadow-blue-600/40"
        aria-label="Call Now"
      >
        <Phone className="w-6 h-6 animate-pulse" />
        <span className="absolute left-full ml-3 px-3 py-1 bg-white text-slate-900 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
          Call Now
        </span>
      </a>
    </div>
  );
};

export default QuickReach;