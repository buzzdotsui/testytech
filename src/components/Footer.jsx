import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const footerLinks = [
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Team', path: '/team' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
]

export default function Footer() {
    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="container">
                <div className="footer-content">
                    <div className="footer-top">
                        <div className="footer-brand">
                            <motion.div
                                className="logo-icon"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                TT
                            </motion.div>
                            Testy Tech Inc.
                        </div>
                        <nav className="footer-nav">
                            {footerLinks.map((link) => (
                                <Link key={link.path} to={link.path} className="footer-link">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <p className="footer-location">
                        <span className="location-icon">📍</span>
                        Based in Akure, Nigeria &nbsp;|&nbsp; Serving the Global Engineering Industry.
                    </p>
                    <div className="footer-divider" />
                    <p className="footer-copy">© 2026 Testy Tech Inc. All rights reserved.</p>
                </div>
            </div>
        </motion.footer>
    )
}
