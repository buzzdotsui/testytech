import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SectionId } from '../types';

interface Testimonial {
  content: string;
  author: string;
  role: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    content: "Testy Tech Inc. transformed our outdated legacy system into a sleek, high-performance cloud platform. Their team is simply world-class.",
    author: "Sarah Jenkins",
    role: "CTO, FutureScale",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5
  },
  {
    content: "The AI integration they built for our customer support reduced ticket volume by 40% in the first month. ROI was immediate.",
    author: "David Chen",
    role: "Director of Ops, OmniCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5
  },
  {
    content: "Professional, timely, and technically brilliant. They didn't just take orders; they consulted us on the best architecture for our needs.",
    author: "Elena Rodriguez",
    role: "Founder, TechStart",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5
  },
  {
    content: "From concept to deployment, Testy Tech exceeded every expectation. Our mobile app now has a 4.9-star rating thanks to their expertise.",
    author: "Marcus Williams",
    role: "CEO, SwiftApp",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5
  }
];

// Animated Counter Component
const AnimatedCounter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({
  end,
  suffix = '',
  duration = 2000
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(end * easeOutQuart));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="stat-number">
      {count}{suffix}
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Intersection observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const goToPrevious = () => {
    goToSlide(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % testimonials.length);
  };

  return (
    <section ref={sectionRef} id={SectionId.TESTIMONIALS} className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-cyan-900/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Trusted by <span className="text-gradient-primary">Innovators</span>
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Hear from the partners we've helped succeed.
          </p>
        </div>

        {/* Carousel */}
        <div className={`relative max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-20 p-3 rounded-full glass border border-slate-700 hover:border-cyan-500/50 text-slate-400 hover:text-white transition-all hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-20 p-3 rounded-full glass border border-slate-700 hover:border-cyan-500/50 text-slate-400 hover:text-white transition-all hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Cards */}
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="glass-card p-8 md:p-12 rounded-2xl relative">
                    {/* Quote Icon */}
                    <Quote className="absolute top-6 right-6 w-12 h-12 text-cyan-500/10" />

                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`w-5 h-5 transition-all duration-300 ${starIndex < t.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-600'
                            }`}
                          style={{ animationDelay: `${starIndex * 100}ms` }}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed font-light italic">
                      "{t.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={t.image}
                          alt={t.author}
                          className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/50"
                        />
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping" style={{ animationDuration: '3s' }} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">{t.author}</h4>
                        <p className="text-slate-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`carousel-indicator ${i === currentIndex ? 'active' : ''}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-gradient-primary transition-all">
              <AnimatedCounter end={50} suffix="+" />
            </div>
            <div className="text-sm text-slate-500 uppercase tracking-wider">Projects Delivered</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-gradient-primary transition-all">
              <AnimatedCounter end={90} suffix="%" />
            </div>
            <div className="text-sm text-slate-500 uppercase tracking-wider">Client Retention</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-gradient-primary transition-all">
              24/7
            </div>
            <div className="text-sm text-slate-500 uppercase tracking-wider">Support Available</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-gradient-primary transition-all">
              <AnimatedCounter end={3} suffix="+" />
            </div>
            <div className="text-sm text-slate-500 uppercase tracking-wider">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;