import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────
   3D GEOMETRIC SHAPES
   ───────────────────────────────────────────── */
export function Cube({ size = 40, color = '#4682B4', x, y, duration = 10, delay = 0 }) {
    const half = size / 2
    return (
        <motion.div
            style={{
                width: size,
                height: size,
                position: 'absolute',
                top: y,
                left: x,
                transformStyle: 'preserve-3d',
                opacity: 0.6,
            }}
            animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
                y: [0, -30, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: 'linear',
                delay: delay,
            }}
        >
            {[
                { transform: `rotateY(0deg) translateZ(${half}px)` },
                { transform: `rotateY(180deg) translateZ(${half}px)` },
                { transform: `rotateY(90deg) translateZ(${half}px)` },
                { transform: `rotateY(-90deg) translateZ(${half}px)` },
                { transform: `rotateX(90deg) translateZ(${half}px)` },
                { transform: `rotateX(-90deg) translateZ(${half}px)` },
            ].map((style, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: color,
                        opacity: 0.15,
                        border: `1px solid ${color}`,
                        ...style,
                    }}
                />
            ))}
        </motion.div>
    )
}

export function Pyramid({ size = 40, color = '#FF6700', x, y, duration = 8, delay = 0 }) {
    // A simple tetrahedron-like shape using CSS borders or clip-paths
    // For simplicity in this demo, we'll use a rotating triangle cluster
    return (
        <motion.div
            style={{
                width: 0,
                height: 0,
                position: 'absolute',
                top: y,
                left: x,
                transformStyle: 'preserve-3d',
            }}
            animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
                y: [0, -40, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: 'linear',
                delay: delay
            }}
        >
            <div style={{
                position: 'absolute',
                width: 0,
                height: 0,
                borderLeft: `${size / 2}px solid transparent`,
                borderRight: `${size / 2}px solid transparent`,
                borderBottom: `${size}px solid ${color}`,
                opacity: 0.4,
                transform: 'translateZ(10px)'
            }} />
            <div style={{
                position: 'absolute',
                width: 0,
                height: 0,
                borderLeft: `${size / 2}px solid transparent`,
                borderRight: `${size / 2}px solid transparent`,
                borderBottom: `${size}px solid ${color}`,
                opacity: 0.4,
                transform: 'rotateY(90deg) translateZ(10px)'
            }} />
        </motion.div>
    )
}
