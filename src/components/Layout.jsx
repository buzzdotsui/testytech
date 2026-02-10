import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import { motion, AnimatePresence } from 'framer-motion'

const PageTransition = ({ children }) => {
    const location = useLocation()
    return (
        <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ minHeight: '100vh', width: '100%' }}
        >
            {children}
        </motion.div>
    )
}

const Curtain = () => {
    return (
        <motion.div
            className="curtain"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: '#0d1117',
                zIndex: 9999,
                originY: 0
            }}
        />
    )
}

export default function Layout() {
    const location = useLocation()

    return (
        <>
            <Navbar />
            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                >
                    <Outlet />
                </motion.main>
            </AnimatePresence>
        </>
    )
}
