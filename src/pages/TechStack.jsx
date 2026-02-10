import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const techData = [
    {
        name: 'Python',
        desc: 'Core computation engine',
        icon: (
            <svg viewBox="0 0 128 128" width="48" height="48">
                <linearGradient id="py-a" x1="70.252" x2="170.659" y1="1237.399" y2="1151.357" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#5A9FD4" /><stop offset="1" stopColor="#306998" /></linearGradient>
                <linearGradient id="py-b" x1="209.474" x2="130.27" y1="1098.811" y2="1175.229" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFD43B" /><stop offset="1" stopColor="#FFE873" /></linearGradient>
                <path fill="url(#py-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" />
                <path fill="url(#py-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" />
            </svg>
        ),
    },
    {
        name: 'Docker',
        desc: 'Containerized workflows',
        icon: (
            <svg viewBox="0 0 128 128" width="48" height="48">
                <path fill="#4682B4" d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.7 3.2-3.5 8.5-3.1 12.5.3 2.9 1.2 5.9 3 8.3-1.4.8-2.9 1.4-4.3 1.8-2.7.8-5.6 1.3-8.5 1.3H1.4l-.2 2.7c-.7 10.1 1.5 20.2 6.5 28.7l2.2 3.5.2.3c7.8 12.1 21.6 17.3 36.4 17.3 27.8 0 50.5-11.7 64.2-37.3 6.5.3 13.5-.5 18.5-5.5 1.6-1.6 2.7-3.7 3.5-5.8l.5-1.6-1.4-.8zM29 68H18.5v10.5H29V68zm12.7 0H31.3v10.5h10.5V68zm12.7 0H44v10.5h10.5V68zM67.1 55.3H56.7v10.5h10.5V55.3zM54.4 55.3H44v10.5h10.5V55.3zM41.7 55.3H31.3v10.5h10.5V55.3zM29 55.3H18.5v10.5H29V55.3zM67.1 42.6H56.7v10.5h10.5V42.6zM79.8 68H69.4v10.5h10.5V68z" />
            </svg>
        ),
    },
    {
        name: 'GitHub Actions',
        desc: 'CI/CD orchestration',
        icon: (
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#8B949E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
    },
    {
        name: 'Google Cloud',
        desc: 'Scalable infrastructure',
        icon: (
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none">
                <path d="M14.5 6.5l1.8-1.8.1-.7A9.7 9.7 0 0 0 4 9.5l.8-.1 3.6-.6s.2-.3.3-.3A5.9 5.9 0 0 1 14.5 6.5z" fill="#EA4335" />
                <path d="M19.6 9.5A9.6 9.6 0 0 0 16.4 4l-1.9 1.9-.1.6A5.9 5.9 0 0 1 16.6 10l.5.5 2.5-.4z" fill="#4285F4" />
                <path d="M4 9.5a9.7 9.7 0 0 0 1.6 10.8L8.9 17a5.9 5.9 0 0 1-1.3-3.5L7.2 13l-2.5-.4-.7-.1z" fill="#34A853" />
                <path d="M5.6 20.3A9.7 9.7 0 0 0 16.4 20l-2.8-2.8-.6-.1a5.9 5.9 0 0 1-4.1.4l-.4.4-2.9 2.4z" fill="#FBBC05" />
            </svg>
        ),
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

const fadeScale = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
}

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

export default function TechStack() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section className="tech-stack" id="tech-stack" ref={ref} style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <div className="container">
                <motion.div
                    className="tech-header"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={staggerContainer}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <motion.span className="section-label" variants={fadeUp}>Our Stack</motion.span>
                    <motion.h2 className="section-title" variants={fadeUp} custom={1}>Built on Proven Technologies</motion.h2>
                    <motion.p className="section-subtitle" variants={fadeUp} custom={2} style={{ margin: '0 auto', maxWidth: '600px' }}>
                        We rely on mature, battle-tested tools that scale from prototype to production.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="tech-grid"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={staggerContainer}
                >
                    {techData.map((t, i) => (
                        <motion.div
                            key={t.name}
                            className="tech-item"
                            variants={fadeScale}
                            custom={i}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                borderColor: '#4682B4',
                                boxShadow: '0 0 30px rgba(70,130,180,0.15)',
                                transition: { duration: 0.25 },
                            }}
                            style={{ position: 'relative', overflow: 'hidden' }}
                        >
                            <motion.div
                                className="tech-item-icon"
                                whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 0.4 }}
                            >
                                {t.icon}
                            </motion.div>
                            <span className="tech-item-name">{t.name}</span>
                            <span className="tech-item-desc">{t.desc}</span>

                            {/* Hover slide effect */}
                            <motion.div
                                style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                                    background: 'linear-gradient(90deg, #4682B4, #FF6700)',
                                    scaleX: 0
                                }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
