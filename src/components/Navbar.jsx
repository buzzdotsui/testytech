import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/tech-stack', label: 'Tech Stack' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'DevOps Lab' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
    const location = useLocation()

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handler, { passive: true })
        handler()
        return () => window.removeEventListener('scroll', handler)
    }, [])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [mobileOpen])

    return (
        <>
            <motion.div
                style={{
                    scaleX,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: 'linear-gradient(90deg, #4682B4, #FF6700)',
                    transformOrigin: '0%',
                    zIndex: 10001
                }}
            />
            <motion.nav
                className={`navbar ${scrolled ? 'scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    background: scrolled ? 'rgba(5, 9, 13, 0.85)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent'
                }}
            >
                <div className="container">
                    <Link to="/" className="navbar-brand" onClick={() => setMobileOpen(false)}>
                        <motion.div
                            className="logo-icon"
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                        >
                            TT
                        </motion.div>
                        <span style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>Testy Tech</span>
                    </Link>

                    {/* Desktop Links */}
                    <ul className="navbar-links desktop-only">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link to={link.path} className={location.pathname === link.path ? 'active' : ''}>
                                    {link.label}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            style={{
                                                position: 'absolute',
                                                bottom: -4,
                                                left: 0,
                                                right: 0,
                                                height: 2,
                                                background: '#FF6700',
                                                borderRadius: 2
                                            }}
                                        />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Toggle */}
                    <button
                        className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                        style={{ zIndex: 10002 }}
                    >
                        <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} />
                        <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} />
                        <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: '#0D1117',
                            zIndex: 10000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <div className="hero-grid-bg" style={{ opacity: 0.2 }} />
                        <ul style={{ listStyle: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.path}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setMobileOpen(false)}
                                        style={{
                                            fontSize: '2.5rem',
                                            fontWeight: 800,
                                            color: location.pathname === link.path ? '#FF6700' : '#E6EDF3',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
