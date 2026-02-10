import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
    fadeUp, fadeScale, staggerContainer, PageTransition, MorphingBlob, Particles
} from '../components/AnimationHelpers'

/* ─────────────────────────────────────────────
   PROJECT DATA
   ───────────────────────────────────────────── */
const projectsData = [
    {
        id: 1,
        title: 'MME Toolkit',
        category: 'Engineering',
        desc: 'A suite of browser-based metallurgical calculators for HB→UTS, Carbon Equivalency, and Cooling Rate predictions.',
        details: 'Built with Python/FastAPI backend and React frontend. Processes 15K+ daily computations with sub-100ms response times. Deployed on GCP Cloud Run with auto-scaling.',
        tags: ['Python', 'React', 'FastAPI', 'GCP'],
        color: '#4682B4',
    },
    {
        id: 2,
        title: 'Pipeline Forge',
        category: 'DevOps',
        desc: 'A CI/CD pipeline framework that generates GitHub Actions workflows from YAML config templates.',
        details: 'Reduces pipeline setup from hours to minutes. Templates for Docker builds, Terraform deployments, and automated testing. Used by 30+ engineering teams.',
        tags: ['GitHub Actions', 'Docker', 'YAML', 'Bash'],
        color: '#FF6700',
    },
    {
        id: 3,
        title: 'Virtual Lab Platform',
        category: 'Cloud',
        desc: 'On-demand GPU-backed simulation environments for materials science research and education.',
        details: 'Powered by GCP Compute Engine with custom VM images. Supports ANSYS, COMSOL, and custom Python simulations. Auto-teardown after session expiry saves 60% on costs.',
        tags: ['GCP', 'Terraform', 'Docker', 'Python'],
        color: '#3FB950',
    },
    {
        id: 4,
        title: 'Carbon Eq. Calculator',
        category: 'Engineering',
        desc: 'Precision calculator for weldability assessment using IIW and Dearden-O\'Neill formulas.',
        details: 'Integrates with lab data APIs for real-time alloy composition input. Exports reports in PDF with metallurgical recommendations. Used in 3 research institutes.',
        tags: ['Python', 'NumPy', 'React', 'PDF Gen'],
        color: '#4682B4',
    },
    {
        id: 5,
        title: 'InfraWatch',
        category: 'DevOps',
        desc: 'Infrastructure monitoring dashboard with real-time metrics, alerting, and cost optimization insights.',
        details: 'Aggregates data from GCP, AWS, and on-prem servers. Custom Grafana dashboards with Prometheus backends. Slack/email alerting with intelligent anomaly detection.',
        tags: ['Prometheus', 'Grafana', 'Go', 'Terraform'],
        color: '#FF6700',
    },
    {
        id: 6,
        title: 'Alloy Database',
        category: 'Cloud',
        desc: 'Cloud-hosted searchable database of 10,000+ alloy compositions with property predictions.',
        details: 'Elasticsearch backend with React frontend. ML-powered property prediction for novel alloy compositions. REST API available for third-party integrations.',
        tags: ['Elasticsearch', 'React', 'ML', 'REST API'],
        color: '#3FB950',
    },
]

const categories = ['All', 'Engineering', 'DevOps', 'Cloud']

/* ─────────────────────────────────────────────
   FLIP CARD
   ───────────────────────────────────────────── */
function FlipCard({ project }) {
    const [flipped, setFlipped] = useState(false)
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateXVal = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
    const rotateYVal = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

    function handleMouse(e) {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    function handleLeave() {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            className="flip-card-container"
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ rotateX: rotateXVal, rotateY: rotateYVal, transformPerspective: 1000 }}
            variants={fadeScale}
        >
            <motion.div
                className="flip-card"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div className="flip-card-face flip-card-front" style={{ borderTopColor: project.color }}>
                    <div className="flip-card-shimmer" />
                    <div className="project-category-badge" style={{ color: project.color, borderColor: project.color + '40' }}>
                        {project.category}
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="project-tags">
                        {project.tags.map(t => (
                            <span key={t} className="project-tag">{t}</span>
                        ))}
                    </div>
                    <motion.button
                        className="flip-btn"
                        onClick={() => setFlipped(true)}
                        whileHover={{ scale: 1.05, backgroundColor: project.color }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Details →
                    </motion.button>
                </div>

                {/* Back */}
                <div className="flip-card-face flip-card-back" style={{ borderTopColor: project.color }}>
                    <h3>{project.title}</h3>
                    <p className="flip-card-details">{project.details}</p>
                    <motion.button
                        className="flip-btn"
                        onClick={() => setFlipped(false)}
                        whileHover={{ scale: 1.05, backgroundColor: project.color }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ← Back
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    )
}

/* ─────────────────────────────────────────────
   PROJECTS PAGE
   ───────────────────────────────────────────── */
export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('All')
    const filtered = activeCategory === 'All'
        ? projectsData
        : projectsData.filter(p => p.category === activeCategory)

    return (
        <PageTransition>
            <section className="projects-hero">
                <MorphingBlob color="#4682B4" size={450} style={{ top: '-10%', left: '-5%' }} />
                <MorphingBlob color="#FF6700" size={300} style={{ bottom: '-10%', right: '-5%' }} />
                <Particles count={15} />

                <div className="container">
                    <motion.div
                        className="projects-hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.span className="section-label" variants={fadeUp}>Our Work</motion.span>
                        <motion.h1 className="section-title" variants={fadeUp} custom={1}>
                            Projects & Case Studies
                        </motion.h1>
                        <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
                            Real-world solutions at the intersection of materials science and cloud engineering.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="projects-grid-section">
                <div className="container">
                    {/* Filter Tabs */}
                    <motion.div
                        className="filter-tabs"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {categories.map((cat, i) => (
                            <motion.button
                                key={cat}
                                className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                                variants={fadeUp}
                                custom={i}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {cat}
                                {activeCategory === cat && (
                                    <motion.div
                                        className="filter-tab-indicator"
                                        layoutId="filter-indicator"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Project Cards */}
                    <motion.div
                        className="projects-grid"
                        layout
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <FlipCard project={project} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </PageTransition>
    )
}
