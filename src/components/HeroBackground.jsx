import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HeroBackground() {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)

    // Parallax effect for the background container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, 100])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width, height
        let animationFrameId
        let time = 0

        // Mouse state
        const mouse = { x: 0, y: 0, active: false }

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        const handleMouseMove = (e) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
            mouse.active = true
        }

        const handleMouseLeave = () => {
            mouse.active = false
        }

        window.addEventListener('mousemove', handleMouseMove)
        document.body.addEventListener('mouseleave', handleMouseLeave)

        // Configuration
        const gridSize = 40
        const perspective = 300
        const speed = 0.5

        const drawGrid = (t) => {
            ctx.clearRect(0, 0, width, height)

            // Horizon gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, height)
            gradient.addColorStop(0, '#05090D')
            gradient.addColorStop(0.5, '#0D1117')
            gradient.addColorStop(1, '#05090D')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)

            // Grid lines
            ctx.strokeStyle = 'rgba(70, 130, 180, 0.15)'
            ctx.lineWidth = 1

            const horizon = height * 0.4

            // Vertical lines (converging)
            const centerX = width / 2
            const fov = 1000

            for (let x = -width; x < width * 2; x += gridSize) {
                // Perspective magic could go here, but simple lines often look cleaner
                // Let's do a simple 3D moving plane effect

                // We'll draw a "floor"
            }

            // Better Approach: Moving Particles + Connections
            // The grid from the CSS is actually quite nice, so let's keep that as a base layer in CSS
            // and use Canvas for the dynamic "data stream" particles

            gridParticles.forEach((p, i) => {
                p.z -= speed
                if (p.z <= 0) p.z = 2000

                // Perspective projection
                const scale = fov / (fov + p.z)
                const x2d = (p.x - centerX) * scale + centerX
                const y2d = (p.y - height / 2) * scale + height / 2

                // Interactive repulse
                let dx = mouse.x - x2d
                let dy = mouse.y - y2d
                let dist = Math.sqrt(dx * dx + dy * dy)
                let scaleFactor = scale

                if (dist < 200 && mouse.active) {
                    scaleFactor *= (1 + (200 - dist) / 1000)
                }

                // Draw particle
                const alpha = (1 - p.z / 2000) * p.opacity
                ctx.fillStyle = p.color
                ctx.globalAlpha = alpha // Use globalAlpha instead of parsing color string

                ctx.beginPath()
                ctx.arc(x2d, y2d, p.size * scaleFactor, 0, Math.PI * 2)
                ctx.fill()

                // Reset global alpha
                ctx.globalAlpha = 1
            })

            time += 0.01
            animationFrameId = requestAnimationFrame(() => drawGrid(time))
        }

        // Initialize particles
        const gridParticles = []
        for (let i = 0; i < 150; i++) {
            gridParticles.push({
                x: Math.random() * width * 2 - width / 2, // Spread wider
                y: Math.random() * height * 2 - height / 2,
                z: Math.random() * 2000,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                color: Math.random() > 0.8 ? '#FF6700' : '#4682B4'
            })
        }

        drawGrid(0)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            document.body.removeEventListener('mouseleave', handleMouseLeave)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <motion.div
            ref={containerRef}
            className="hero-background"
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                y,
                opacity
            }}
        >
            <div className="hero-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, transparent 0%, #05090D 90%)',
                pointerEvents: 'none'
            }} />
        </motion.div>
    )
}
