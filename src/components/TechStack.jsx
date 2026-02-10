import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from './AnimationHelpers'

const tech = [
    { name: 'Python', icon: '🐍' },
    { name: 'React', icon: '⚛️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Kubernetes', icon: '☸️' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Terraform', icon: '🏗️' },
    { name: 'Go', icon: '🐹' },
    { name: 'Rust', icon: '🦀' },
]

export default function TechStack() {
    return (
        <section className="tech-stack">
            <div className="container">
                <motion.div
                    className="section-header-block center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={staggerContainer}
                >
                    <motion.span className="section-label" variants={fadeUp}>Toolbelt</motion.span>
                    <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                        Enterprise-Grade <span className="highlight-orange">Arsenal</span>
                    </motion.h2>
                    <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
                        We build with tools that are battle-tested, scalable, and secure.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="tech-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={staggerContainer}
                >
                    {tech.map((item, i) => (
                        <motion.div
                            key={item.name}
                            className="tech-item glass-card"
                            variants={fadeUp}
                            custom={i}
                            whileHover={{
                                y: -8,
                                borderColor: '#4682B4',
                                boxShadow: '0 10px 30px rgba(70, 130, 180, 0.2)',
                                backgroundColor: 'rgba(22, 27, 34, 0.9)'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <span className="tech-item-icon">{item.icon}</span>
                            <span className="tech-item-name">{item.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
