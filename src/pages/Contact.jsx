import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

const initialLines = [
    { type: 'prompt', text: '$ docker build -t testy-tech/mme-toolkit:latest .' },
    { type: 'info', text: '[+] Building 14.7s (12/12) FINISHED' },
    { type: 'plain', text: ' => [internal] load build definition from Dockerfile' },
    { type: 'plain', text: ' => [internal] load .dockerignore' },
    { type: 'info', text: ' => [1/8] FROM python:3.12-slim@sha256:a3e5...' },
    { type: 'plain', text: ' => [2/8] WORKDIR /app/mme-toolkit' },
    { type: 'plain', text: ' => [3/8] COPY requirements.txt .' },
    { type: 'info', text: ' => [4/8] RUN pip install --no-cache-dir -r requirements.txt' },
    { type: 'plain', text: ' => [5/8] COPY src/ ./src/' },
    { type: 'plain', text: ' => [6/8] COPY configs/metallurgy.yaml ./configs/' },
    { type: 'warning', text: ' => [7/8] RUN python -m pytest tests/ --tb=short' },
    { type: 'success', text: '     ✓ test_hb_to_uts_conversion ... PASSED' },
    { type: 'success', text: '     ✓ test_carbon_equivalency   ... PASSED' },
    { type: 'success', text: '     ✓ test_cooling_rate_model   ... PASSED' },
    { type: 'plain', text: ' => [8/8] CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0"]' },
    { type: 'info', text: ' => exporting to image' },
    { type: 'hash', text: ' => => naming to docker.io/testy-tech/mme-toolkit:latest' },
    { type: 'blank', text: '' },
    { type: 'success', text: '✔ Build complete — image ready for deployment to GCP Cloud Run' },
]

export default function Contact() {
    const ref = useRef(null)
    const containerRef = useRef(null)
    const bodyRef = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [visibleLines, setVisibleLines] = useState(0)
    const started = useRef(false)
    const [fullLines] = useState(initialLines)

    // 3D Tilt for Terminal
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 400, damping: 30 })
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 400, damping: 30 })

    function handleMouse(e) {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(px);
        y.set(py);
    }

    function handleLeave() {
        x.set(0);
        y.set(0);
    }

    useEffect(() => {
        if (isInView && !started.current) {
            started.current = true
            let count = 0
            const interval = setInterval(() => {
                count++
                setVisibleLines(prev => prev + 1)
                if (bodyRef.current) {
                    bodyRef.current.scrollTop = bodyRef.current.scrollHeight
                }
                if (count >= fullLines.length) clearInterval(interval)
            }, 100)
            return () => clearInterval(interval)
        }
    }, [isInView, fullLines.length])

    return (
        <section className="terminal-section" id="terminal" ref={ref} style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="container" style={{ perspective: '1200px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="terminal-header" style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <h2 className="section-title">DevOps Lab</h2>
                    <p className="section-subtitle">Monitor our deployment pipelines in real-time.</p>
                </motion.div>

                <motion.div
                    ref={containerRef}
                    className="terminal-container"
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: 'preserve-3d',
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}
                    onMouseMove={handleMouse}
                    onMouseLeave={handleLeave}
                    initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="terminal-window">
                        <div className="terminal-titlebar">
                            <div className="terminal-buttons">
                                <span className="term-btn term-close" />
                                <span className="term-btn term-min" />
                                <span className="term-btn term-max" />
                            </div>
                            <div className="terminal-title">user@testy-tech:~/pipelines/build-deploy</div>
                        </div>
                        <div className="terminal-body" ref={bodyRef}>
                            {fullLines.slice(0, visibleLines).map((line, i) => (
                                <div key={i} className={`term-line term-${line.type}`}>
                                    {line.text}
                                </div>
                            ))}
                            <div className="term-cursor">_</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
