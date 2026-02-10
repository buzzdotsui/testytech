import { useRef } from 'react'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
   ───────────────────────────────────────────── */
export default function Particles({ count = 30 }) {
    const particles = useRef(
        Array.from({ length: count }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 2,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5,
            color: Math.random() > 0.5 ? '#4682B4' : '#FF6700',
        }))
    ).current

    return (
        <div className="particles-container">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="particle"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: p.color,
                    }}
                    animate={{
                        y: [0, -80, 0],
                        x: [0, Math.random() * 40 - 20, 0],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}
