import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Particles from '../components/Particles'

// Animation variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
}

const slideIn = (dir = 'left') => ({
    hidden: { opacity: 0, x: dir === 'left' ? -80 : 80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
})

export default function About() {
    return (
        <section className="about-page" style={{ paddingTop: '120px', minHeight: '100vh', position: 'relative' }}>
            <Particles count={20} />
            <div className="container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="about-header"
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <motion.h1 variants={fadeUp} className="section-title">About Testy Tech</motion.h1>
                    <motion.p variants={fadeUp} custom={1} className="section-subtitle" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        We are a specialized engineering firm dedicated to modernizing industrial R&D processes through cloud-native technologies.
                    </motion.p>
                </motion.div>

                <div className="about-content">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideIn('left')}
                    >
                        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#4682B4' }}>Our Mission</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#8892b0', marginBottom: '1.5rem' }}>
                            Traditionally, metallurgical engineering and software development have existed in separate silos.
                            Engineers rely on legacy software, spreadsheet models, and on-premise hardware that limits scalability.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#8892b0' }}>
                            Testy Tech bridges this gap by bringing <strong>DevOps automation</strong>, <strong>containerization</strong>, and <strong>modern web interfaces</strong> to the physical sciences.
                            We empower researchers to run complex simulations in the cloud, collaborate globally, and accelerate discovery.
                        </p>
                    </motion.div>

                    <div style={{ position: 'relative' }}>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={slideIn('right')}
                            style={{
                                width: '100%',
                                height: '400px',
                                background: 'rgba(70, 130, 180, 0.05)',
                                border: '1px solid #4682B4',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    border: '2px dashed #FF6700',
                                    borderRadius: '50%',
                                    position: 'absolute'
                                }}
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    border: '2px solid #4682B4',
                                    borderRadius: '50%',
                                    position: 'absolute'
                                }}
                            />
                            <span style={{ zIndex: 1, fontSize: '1.5rem', fontWeight: 'bold' }}>The Bridge</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
