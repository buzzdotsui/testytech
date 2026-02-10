import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AnimatedText, Cube, Pyramid, fadeUp, slideIn, staggerContainer, PageTransition } from '../components/AnimationHelpers'
import HeroBackground from '../components/HeroBackground'
import Services from '../components/Services'
import TechStack from '../components/TechStack'
import Terminal from '../components/Terminal'

export default function Home() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

    return (
        <PageTransition>
            <section className="hero" id="hero" ref={ref}>
                <HeroBackground />

                {/* 3D Floating Objects - More Dynamic */}
                <Cube size={80} color="#4682B4" x="5%" y="15%" duration={25} />
                <Cube size={40} color="#5A9FD4" x="90%" y="25%" duration={18} delay={2} />
                <Cube size={120} color="#365F8A" x="80%" y="60%" duration={30} delay={1} />
                <Pyramid size={100} color="#FF6700" x="10%" y="70%" duration={22} />
                <Pyramid size={50} color="#FF8533" x="45%" y="5%" duration={15} delay={3} />

                <motion.div className="container" style={{ y: heroY, opacity: heroOpacity }}>
                    <div className="hero-content-wrapper">
                        <motion.div
                            className="hero-content"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div className="hero-badge" variants={fadeUp}>
                                <span className="dot" />
                                <span className="badge-text">Forging the Future</span>
                            </motion.div>

                            <motion.h1 variants={staggerContainer} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}>
                                <AnimatedText text="We Don't Just Write Code." />
                                <br />
                                <AnimatedText text="We Engineer" className="highlight-blue" />
                                <motion.span variants={fadeUp} custom={2}> the </motion.span>
                                <AnimatedText text="Infrastructure." className="highlight-orange" />
                            </motion.h1>

                            <motion.p className="hero-sub" variants={fadeUp} custom={3}>
                                From the heat of the blast furnace to the cool logic of the cloud. Testy Tech Inc. delivers rigorous, battle-tested software solutions for heavy industry and modern enterprise.
                            </motion.p>

                            <motion.div className="hero-actions" variants={fadeUp} custom={4}>
                                <Link to="/services" className="btn-primary">
                                    <motion.span
                                        className="btn-text"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        Explore Solutions
                                    </motion.span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </Link>
                                <Link to="/projects" className="btn-secondary">
                                    View Casestudies
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="hero-visual"
                            variants={slideIn('right')}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Reusing existing 3D graphic but ensuring it's visible */}
                            <motion.div
                                animate={{ rotateY: [0, 10, 0, -10, 0], rotateX: [5, 0, 5] }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="hero-graphic" style={{ transformStyle: 'preserve-3d' }}>
                                    {/* Central Core */}
                                    <div className="core-glow" />
                                    {/* Rings */}
                                    <div className="ring ring--outer" />
                                    <div className="ring ring--mid" />
                                    <div className="ring ring--inner" />
                                    {/* Emblem */}
                                    <div className="hero-emblem" style={{ transform: 'translateZ(60px)' }}>
                                        <span>TT</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <Services />
            <TechStack />
            <Terminal />
        </PageTransition>
    )
}
