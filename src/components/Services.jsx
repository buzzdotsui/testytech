import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, MagneticCard } from './AnimationHelpers'

const services = [
    {
        title: 'Metallurgical Simulation',
        desc: 'We don\'t guess. We simulate. From grain boundary analysis to phase transformation modeling, our Python-driven simulations provide atomic-level precision before the first pour.',
        icon: '🔬',
        tags: ['Python', 'NumPy', 'SciPy', 'OpenCV'],
        color: '#4682B4',
    },
    {
        title: 'DevOps Orchestration',
        desc: 'Infrastructure that heals itself. We build Kubernetes clusters that scale with your computational load, automating everything from rigorous testing to seamless deployment.',
        icon: '⚡',
        tags: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
        color: '#FF6700',
    },
    {
        title: 'Industrial Automation',
        desc: 'Bridging OT and IT. We develop custom control systems and digital twins that bring real-time data from the factory floor to the boardroom.',
        icon: '🏭',
        tags: ['IoT', 'PLC', 'MQTT', 'Real-time Data'],
        color: '#3FB950',
    },
]

export default function Services() {
    return (
        <section className="services" id="services">
            <div className="container">
                <motion.div
                    className="section-header-block center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={staggerContainer}
                >
                    <motion.span className="section-label" variants={fadeUp}>Our Expertise</motion.span>
                    <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                        Forging <span className="highlight-blue">Digital Iron</span>
                    </motion.h2>
                    <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
                        We combine the rigor of materials science with the agility of modern software engineering. No compromises.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="services-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={staggerContainer}
                >
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            variants={fadeUp}
                            custom={i}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <MagneticCard className="service-card glass-card">
                                <div
                                    className="service-icon"
                                    style={{
                                        background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)`,
                                        color: service.color,
                                        borderColor: `${service.color}40`,
                                        boxShadow: `0 0 20px ${service.color}20`
                                    }}
                                >
                                    {service.icon}
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                                <div className="service-tags">
                                    {service.tags.map(tag => (
                                        <span key={tag} className="service-tag">{tag}</span>
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
