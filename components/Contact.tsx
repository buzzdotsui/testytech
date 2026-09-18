import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { SectionId } from '../types';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('message', formState.message);
      formData.append('_subject', `New Project Inquiry from ${formState.name}`);
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');

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
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-cyan-400" />,
      title: "Email Us",
      content: "testytech7724@gmail.com",
      href: "mailto:testytech7724@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6 text-cyan-400" />,
      title: "Call Us",
      content: "+234 904 933 9759",
      href: "tel:+2349049339759"
    },
    {
      icon: <MapPin className="w-6 h-6 text-cyan-400" />,
      title: "Visit Us",
      content: "Akure, Ondo State, Nigeria",
      href: null
    }
  ];

  return (
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400 tracking-wide uppercase">Get In Touch</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Let's Build Something <span className="text-gradient-primary">Great</span>
          </h2>

          <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
            Ready to transform your business? Fill out the form to send us a message directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-xl glass hover:border-cyan-500/30 transition-all cursor-pointer"
                >
                  <div className="p-3 rounded-lg bg-slate-800 group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-slate-400">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="mt-12 p-6 glass rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white font-bold">Join 50+ Companies</div>
                  <div className="text-sm text-slate-500">Who trust Testy Tech</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Usually respond within 2 hours</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50" />

              <div className="relative glass-card p-8 rounded-2xl">
                {status === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <div className="absolute inset-0 w-20 h-20 bg-green-500/20 rounded-full animate-ping" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400 mb-6">Thank you for contacting us. We will get back to you shortly.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-sm text-cyan-400 hover:text-cyan-300 underline transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'name' || formState.name
                            ? '-top-2.5 text-xs bg-slate-900 px-2 text-cyan-400'
                            : 'top-3 text-slate-500'
                          }`}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all input-premium"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'email' || formState.email
                            ? '-top-2.5 text-xs bg-slate-900 px-2 text-cyan-400'
                            : 'top-3 text-slate-500'
                          }`}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all input-premium"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <label
                        htmlFor="message"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'message' || formState.message
                            ? '-top-2.5 text-xs bg-slate-900 px-2 text-cyan-400'
                            : 'top-3 text-slate-500'
                          }`}
                      >
                        Project Details
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none input-premium"
                        disabled={status === 'submitting'}
                      />
                    </div>

                    {/* Error Message */}
                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>Something went wrong. Please try again or email us directly.</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {status === 'submitting' ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                          </>
                        ) : (
                          <>
                            Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;