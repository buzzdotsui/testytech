import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, ArrowRight, Layers } from 'lucide-react';
import { SectionId } from '../types';

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
    liveUrl?: string;
    githubUrl?: string;
    results?: string[];
}

const projects: Project[] = [
    {
        title: "FinTech Dashboard",
        description: "A comprehensive financial analytics platform with real-time data visualization and AI-powered insights.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["React", "Node.js", "AI", "Charts"],
        category: "Web App",
        results: ["50% faster reporting", "3x user engagement"]
    },
    {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with payment integration, inventory management, and mobile-first design.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
        category: "Web App",
        results: ["200% sales increase", "99.9% uptime"]
    },
    {
        title: "HealthCare Mobile App",
        description: "Cross-platform mobile application for patient management with telemedicine features.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["React Native", "Firebase", "WebRTC"],
        category: "Mobile",
        results: ["40K+ downloads", "4.8 star rating"]
    },
    {
        title: "AI Content Generator",
        description: "Intelligent content creation tool powered by Gemini for marketing and social media automation.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Gemini AI", "Python", "FastAPI", "React"],
        category: "AI",
        results: ["70% time saved", "10K+ users"]
    },
    {
        title: "Cloud Infrastructure",
        description: "Enterprise-grade cloud architecture with auto-scaling, monitoring, and disaster recovery.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["AWS", "Terraform", "Docker", "Kubernetes"],
        category: "Cloud",
        results: ["60% cost reduction", "99.99% SLA"]
    },
    {
        title: "Real Estate Platform",
        description: "Property listing and management platform with virtual tours and lead generation.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Vue.js", "Node.js", "MongoDB", "Maps"],
        category: "Web App",
        results: ["500+ listings", "35% conversion"]
    }
];

const categories = ["All", "Web App", "Mobile", "AI", "Cloud"];

const Portfolio: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
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

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <section ref={sectionRef} id={SectionId.PORTFOLIO} className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <Layers className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">Our Work</span>
                    </div>

                    <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Featured <span className="text-gradient-primary">Projects</span>
                    </h2>

                    <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
                        Explore our portfolio of successful digital transformations.
                    </p>
                </div>

                {/* Category Filter */}
                <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                                : 'glass text-slate-400 hover:text-white hover:border-cyan-500/30'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                            style={{ transitionDelay: `${index * 100 + 300}ms` }}
                            onMouseEnter={() => setHoveredProject(index)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="glass-card border border-slate-700/50 group-hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all">
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`w-full h-full object-cover transition-transform duration-700 ${hoveredProject === index ? 'scale-110' : 'scale-100'
                                            }`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-cyan-400 backdrop-blur-sm border border-cyan-500/30">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className={`absolute inset-0 bg-slate-900/90 flex items-center justify-center gap-4 transition-opacity duration-300 ${hoveredProject === index ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 rounded-full bg-cyan-500 text-white hover:bg-cyan-400 transition-colors"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-colors"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Results */}
                                    {project.results && (
                                        <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                                            {project.results.map((result, i) => (
                                                <span key={i} className="text-xs font-semibold text-green-400">
                                                    ✓ {result}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className={`text-center mt-16 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-slate-400 mb-4">Want to see more or discuss your project?</p>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1"
                    >
                        Start Your Project
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
