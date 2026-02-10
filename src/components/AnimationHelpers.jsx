import { useRef } from 'react'
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from 'framer-motion'

/* ─────────────────────────────────────────────
   Animation Variants
   ───────────────────────────────────────────── */
export const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
}

export const fadeScale = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
}

export const slideIn = (dir = 'left') => ({
    hidden: { opacity: 0, x: dir === 'left' ? -80 : 80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
})

export const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

export const wordVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
}

/* ─────────────────────────────────────────────
   ANIMATED TEXT — word-by-word reveal
   ───────────────────────────────────────────── */
export function AnimatedText({ text, className, as: Tag = 'span' }) {
    const words = text.split(' ')
    return (
        <Tag className={className} style={{ display: 'inline' }}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={wordVariants}
                    style={{ display: 'inline-block', marginRight: '0.3em' }}
                >
                    {word}
                </motion.span>
            ))}
        </Tag>
    )
}

/* ─────────────────────────────────────────────
   MAGNETIC 3D CARD
   ───────────────────────────────────────────── */
export function MagneticCard({ children, className }) {
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

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
   ───────────────────────────────────────────── */
export function Particles({ count = 30 }) {
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

/* ─────────────────────────────────────────────
   PAGE TRANSITION WRAPPER
   ───────────────────────────────────────────── */
export function PageTransition({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}

/* ─────────────────────────────────────────────
   MORPHING BLOB
   ───────────────────────────────────────────── */
export function MorphingBlob({ color = '#4682B4', size = 400, style = {} }) {
    return (
        <motion.div
            style={{
                width: size,
                height: size,
                background: color,
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                filter: `blur(${size * 0.2}px)`,
                opacity: 0.15,
                position: 'absolute',
                pointerEvents: 'none',
                ...style,
            }}
            animate={{
                borderRadius: [
                    '30% 70% 70% 30% / 30% 30% 70% 70%',
                    '70% 30% 30% 70% / 70% 70% 30% 30%',
                    '50% 50% 70% 30% / 40% 60% 40% 60%',
                    '30% 70% 70% 30% / 30% 30% 70% 70%',
                ],
                scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
    )
}

/* ─────────────────────────────────────────────
   SECTION HEADER (reusable)
   ───────────────────────────────────────────── */
export function SectionHeader({ label, title, subtitle, center = true }) {
    return (
        <motion.div
            className={`section-header-block ${center ? 'center' : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
        >
            <motion.span className="section-label" variants={fadeUp}>{label}</motion.span>
            <motion.h2 className="section-title" variants={fadeUp} custom={1}>{title}</motion.h2>
            {subtitle && (
                <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    )
}
