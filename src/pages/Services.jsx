import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticCard from '../components/MagneticCard'

const servicesData = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="2" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
            </svg>
        ),
        iconClass: 'service-icon--metallurgy',
        title: 'Computational Metallurgy',
        desc: 'Web-based calculators for HB-to-UTS conversion, Carbon Equivalency (CE), and Cooling Rate modeling — accessible from any browser.',
        tags: ['HB → UTS', 'Carbon Eq.', 'Cooling Rates'],
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
        iconClass: 'service-icon--devops',
        title: 'DevOps Automation',
        desc: 'Industrial-grade CI/CD pipelines and Docker containerization tailored for engineering firms — reliable, reproducible, and fast.',
        tags: ['CI/CD', 'Docker', 'IaC'],
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 1 0-1-9.9" />
            </svg>
        ),
        iconClass: 'service-icon--labs',
        title: 'Virtual Labs',
        desc: 'Scalable cloud environments for technical training and simulations — spin up GPU-backed labs on demand, tear them down when done.',
        tags: ['Cloud Labs', 'Simulations', 'Training'],
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
}

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

export default function Services() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section className="services" id="services" ref={ref} style={{ perspective: 1000, paddingTop: '120px', minHeight: '100vh' }}>
            {/* Background Decoration */}
            <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.05, pointerEvents: 'none', zIndex: -1 }}>
                <svg width="400" height="400" viewBox="0 0 100 100">
                    <path d="M0 0 L100 0 L100 100 Z" fill="#4682B4" />
                </svg>
            </div>

            <div className="container">
                <motion.div
                    className="services-header"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={staggerContainer}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <motion.span className="section-label" variants={fadeUp}>What We Do</motion.span>
                    <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                        Industrial-Grade Solutions
                    </motion.h2>
                    <motion.p className="section-subtitle" variants={fadeUp} custom={2} style={{ margin: '0 auto', maxWidth: '600px' }}>
                        Purpose-built tools and infrastructure where materials science meets modern software engineering.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="services-grid"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={staggerContainer}
                    style={{ perspective: 1000 }}
                >
                    {servicesData.map((s, i) => (
                        <motion.div key={s.title} variants={fadeUp} custom={i}>
                            <MagneticCard className="service-card">
                                <motion.div
                                    className={`service-icon ${s.iconClass}`}
                                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15, z: 20 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {s.icon}
                                </motion.div>
                                <motion.h3 style={{ transform: 'translateZ(10px)' }}>{s.title}</motion.h3>
                                <motion.p style={{ transform: 'translateZ(5px)' }}>{s.desc}</motion.p>
                                <div className="service-tags" style={{ transform: 'translateZ(15px)' }}>
                                    {s.tags.map((t) => (
                                        <motion.span
                                            key={t}
                                            className="service-tag"
                                            whileHover={{ scale: 1.1, borderColor: '#4682B4', z: 10, backgroundColor: 'rgba(70,130,180,0.1)' }}
                                        >
                                            {t}
                                        </motion.span>
                                    ))}
                                </div>
                            </MagneticCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
