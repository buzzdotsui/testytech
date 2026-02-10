import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* ─────────────────────────────────────────────
   MAGNETIC 3D CARD
   ───────────────────────────────────────────── */
export default function MagneticCard({ children, className }) {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const glowX = useMotionValue(0)
    const glowY = useMotionValue(0)

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

    function handleMouse(e) {
        const rect = ref.current.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width - 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5
        x.set(px)
        y.set(py)
        glowX.set(e.clientX - rect.left)
        glowY.set(e.clientY - rect.top)
    }

    function handleLeave() {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformPerspective: 800 }}
        >
            <motion.div className="card-glow" style={{ left: glowX, top: glowY }} />
            {children}
        </motion.div>
    )
}
