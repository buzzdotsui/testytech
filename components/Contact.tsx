import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send, Loader2, AlertCircle } from 'lucide-react';
import { SectionId } from '../types';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // using FormData is often more reliable for the initial FormSubmit activation than raw JSON
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('message', formState.message);
      formData.append('_subject', `New Project Inquiry from ${formState.name}`);
      formData.append('_template', 'table');
      formData.append('_captcha', 'false'); // Disable captcha to prevent blocking
      
      const response = await fetch("https://formsubmit.co/ajax/testytech7724@gmail.com", {
        method: "POST",
        body: formData,
        headers: { 
            'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        // Reset success message after a delay
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-6">Let's Build Something Great</h2>
            <p className="text-lg text-slate-400 mb-8">
              Ready to transform your business? Fill out the form to send us a message directly, or reach out via phone.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Email Us</h4>
                  <a href="mailto:testytech7724@gmail.com" className="text-slate-400 hover:text-cyan-400 transition-colors">testytech7724@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <Phone className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Call Us</h4>
                  <a href="tel:+2349049339759" className="text-slate-400 hover:text-cyan-400 transition-colors">+234 904 933 9759</a>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Visit Us</h4>
                  <p className="text-slate-400">Akure, Ondo State, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-800/80 backdrop-blur-lg p-8 rounded-2xl border border-slate-700 shadow-2xl relative">
             {/* Glow effect */}
             <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
             
             <div className="relative">
             {status === 'success' ? (
               <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-300">
                 <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                 <p className="text-slate-400">Thank you for contacting us. We will get back to you shortly.</p>
                 <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-slate-500 hover:text-white underline"
                 >
                    Send another message
                 </button>
               </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                      disabled={status === 'submitting'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                      disabled={status === 'submitting'}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Project Details</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                      placeholder="Tell us about your project..."
                      disabled={status === 'submitting'}
                    />
                  </div>
                  
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                        <AlertCircle className="w-4 h-4" />
                        <span>Something went wrong. Please try again or email us directly.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                        <>
                           <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                        </>
                    ) : (
                        <>
                           Send Message <Send className="w-4 h-4" />
                        </>
                    )}
                  </button>
                </form>
             )}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;