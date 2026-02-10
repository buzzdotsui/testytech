import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
    fadeUp, fadeScale, staggerContainer, PageTransition, MorphingBlob, Particles
} from '../components/AnimationHelpers'

/* ─────────────────────────────────────────────
   TEAM DATA
   ───────────────────────────────────────────── */
const teamData = [
    {
        name: 'Testimony Owolabi',
        role: 'Founder & Lead Engineer',
        expertise: ['Materials Engineering', 'Cloud DevOps', 'Python'],
        gradient: 'linear-gradient(135deg, #4682B4, #FF6700)',
        initials: 'TO',
    },
    {
        name: 'Adebayo Ogundimu',
        role: 'Senior DevOps Engineer',
        expertise: ['Kubernetes', 'Terraform', 'AWS'],
        gradient: 'linear-gradient(135deg, #5A9FD4, #3FB950)',
        initials: 'AO',
    },
    {
        name: 'Funke Adeyemi',
        role: 'Metallurgical Data Scientist',
        expertise: ['Machine Learning', 'NumPy', 'Materials Science'],
        gradient: 'linear-gradient(135deg, #FF6700, #FF8533)',
        initials: 'FA',
    },
    {
        name: 'Chukwuemeka Nwosu',
        role: 'Full-Stack Developer',
        expertise: ['React', 'Node.js', 'PostgreSQL'],
        gradient: 'linear-gradient(135deg, #3FB950, #4682B4)',
        initials: 'CN',
    },
    {
        name: 'Amina Bello',
        role: 'Cloud Architect',
        expertise: ['GCP', 'Docker', 'CI/CD'],
        gradient: 'linear-gradient(135deg, #D29922, #FF6700)',
        initials: 'AB',
    },
    {
        name: 'Olumide Akinola',
        role: 'QA & Automation Lead',
        expertise: ['Selenium', 'Pytest', 'Load Testing'],
        gradient: 'linear-gradient(135deg, #4682B4, #D29922)',
        initials: 'OA',
    },
]

/* ─────────────────────────────────────────────
   HOLOGRAPHIC TEAM CARD
   ───────────────────────────────────────────── */
function TeamCard({ member, index }) {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const glowX = useMotionValue(0)
    const glowY = useMotionValue(0)

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 })
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 })

    function handleMouse(e) {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width - 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5
        x.set(px)
        y.set(py)
        glowX.set(((e.clientX - rect.left) / rect.width) * 100)
        glowY.set(((e.clientY - rect.top) / rect.height) * 100)
    }

    function handleLeave() {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            className="team-card-wrapper"
            variants={fadeScale}
            custom={index}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
        >
            <div className="team-card">
                {/* Holographic shimmer */}
                <motion.div
                    className="holo-shimmer"
                    style={{
                        background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(70,130,180,0.2), transparent 60%)`,
                    }}
                />

                {/* Avatar */}
                <motion.div
                    className="team-avatar"
                    style={{ background: member.gradient }}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    <span>{member.initials}</span>
                </motion.div>

                <h3 className="team-name">{member.name}</h3>
                <span className="team-role">{member.role}</span>

                <div className="team-expertise">
                    {member.expertise.map((skill, si) => (
                        <motion.span
                            key={skill}
                            className="team-skill"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + si * 0.08 }}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

/* ─────────────────────────────────────────────
   TEAM PAGE
   ───────────────────────────────────────────── */
export default function Team() {
    return (
        <PageTransition>
            {/* Hero */}
            <section className="team-hero">
                <div className="hex-grid-bg" />
                <MorphingBlob color="#4682B4" size={400} style={{ top: '-15%', right: '-8%' }} />
                <MorphingBlob color="#FF6700" size={300} style={{ bottom: '-10%', left: '-5%' }} />
                <Particles count={15} />

                <div className="container">
                    <motion.div
                        className="team-hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.span className="section-label" variants={fadeUp}>The People</motion.span>
                        <motion.h1 className="section-title" variants={fadeUp} custom={1}>
                            Meet Our <span className="highlight-blue">Engineers</span>
                        </motion.h1>
                        <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
                            A multidisciplinary team bridging the gap between physical engineering and digital infrastructure.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="team-grid-section">
                <div className="container">
                    <motion.div
                        className="team-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={staggerContainer}
                    >
                        {teamData.map((member, i) => (
                            <TeamCard key={member.name} member={member} index={i} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Culture Section */}
            <section className="team-culture">
                <div className="container">
                    <motion.div
                        className="culture-content"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={staggerContainer}
                    >
                        <motion.span className="section-label" variants={fadeUp}>Culture</motion.span>
                        <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                            How We Work
                        </motion.h2>
                        <motion.div className="culture-grid" variants={staggerContainer}>
                            {[
                                { icon: '🔬', title: 'Research-Driven', desc: 'Every solution starts with understanding the science behind the problem.' },
                                { icon: '⚡', title: 'Ship Fast', desc: 'Automated pipelines and continuous delivery — no manual bottlenecks.' },
                                { icon: '🤝', title: 'Open Collaboration', desc: 'Transparent processes, shared knowledge, and collective ownership.' },
                                { icon: '🛡️', title: 'Reliability First', desc: 'If it's not tested, monitored, and documented — it's not done.' },
                            ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="culture-card"
                                variants={fadeUp}
                                custom={i}
                                whileHover={{ y: -6, borderColor: '#4682B4' }}
                            >
                                <span className="culture-emoji">{item.icon}</span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </PageTransition>
    )
}
