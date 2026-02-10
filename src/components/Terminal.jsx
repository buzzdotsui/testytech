import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from './AnimationHelpers'

const initialLines = [
    { type: 'info', text: '[SYSTEM] Initializing Testy Tech Kernel v4.0...' },
    { type: 'success', text: '[OK] Loaded module: reactor-core' },
    { type: 'success', text: '[OK] Loaded module: cloud-infrastructure' },
    { type: 'info', text: '[INFO] Establishing secure link to satellite cluster...' },
]

const commands = [
    { cmd: 'analyze_alloy --target=Fe-C', output: ['[PROCESSING] Spectroscopic analysis started...', '[RESULT] Carbon content: 0.45%', '[RESULT] Tensile strength: 450 MPa', '[SUCCESS] Spec meets ASTM-A36 standards.'] },
    { cmd: 'deploy_stack --env=prod', output: ['[INFO] Building container images...', '[INFO] Pushing to registry...', '[SUCCESS] Deployment complete. Pods healthy.'] },
    { cmd: 'check_status', output: ['[SYSTEM] All systems nominal.', '[METRICS] CPU: 12% | MEM: 4.2GB | TEMP: 45C'] }
]

export default function Terminal() {
    const [lines, setLines] = useState(initialLines)
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0)

    // Auto-typing animation state
    const [autoTypeIndex, setAutoTypeIndex] = useState(0)
    const [autoTypeCharIndex, setAutoTypeCharIndex] = useState(0)
    const [showCursor, setShowCursor] = useState(true)

    const containerRef = useRef(null)
    const terminalBodyRef = useRef(null)

    // Scroll opacity effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })
    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    // Auto-scroll to bottom
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
        }
    }, [lines, isTyping, autoTypeCharIndex])

    // Blinking cursor
    useEffect(() => {
        const interval = setInterval(() => setShowCursor(prev => !prev), 500)
        return () => clearInterval(interval)
    }, [])

    // Simulated Auto-Typing Logic
    useEffect(() => {
        if (currentCommandIndex >= commands.length) return

        const commandObj = commands[currentCommandIndex]
        const cmdText = commandObj.cmd

        let timeout

        if (!isTyping) {
            // Wait before starting next command
            timeout = setTimeout(() => {
                setIsTyping(true)
                setAutoTypeCharIndex(0)
            }, 2000)
        } else {
            if (autoTypeCharIndex < cmdText.length) {
                // Typing...
                timeout = setTimeout(() => {
                    setInput(prev => prev + cmdText[autoTypeCharIndex])
                    setAutoTypeCharIndex(prev => prev + 1)
                }, 50 + Math.random() * 50)
            } else {
                // Finished typing, execute
                timeout = setTimeout(() => {
                    handleCommandSubmit(cmdText, commandObj.output)
                    setInput('')
                    setIsTyping(false)
                    setCurrentCommandIndex(prev => prev + 1)
                }, 400)
            }
        }

        return () => clearTimeout(timeout)
    }, [isTyping, autoTypeCharIndex, currentCommandIndex, lines]) // Added lines dependency to re-trigger after state update if needed, though logical flow handles it

    const handleCommandSubmit = (cmd, output = []) => {
        const newLines = [
            { type: 'cmd', text: cmd },
            ...output.map(text => {
                if (text.includes('[SUCCESS]')) return { type: 'success', text }
                if (text.includes('[WARN]')) return { type: 'warning', text }
                if (text.includes('[ERROR]')) return { type: 'error', text }
                return { type: 'info', text }
            })
        ]
        setLines(prev => [...prev, ...newLines])
    }

    // Manual Input Handler
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            handleCommandSubmit(input, ['[SYSTEM] Command not recognized in demo mode.'])
            setInput('')
        }
    }

    return (
        <section className="terminal-section" ref={containerRef}>
            <div className="container">
                <motion.div
                    className="section-header-block center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={staggerContainer}
                >
                    <motion.span className="section-label" variants={fadeUp}>Live Operations</motion.span>
                    <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                        Code that <span className="highlight-blue">Run the World</span>
                    </motion.h2>
                    <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
                        Transparent, predictable, and robust. Watch our systems in action.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="terminal-window"
                    style={{ y, opacity }}
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* macOS Title Bar */}
                    <div className="terminal-titlebar">
                        <div className="mac-buttons">
                            <div className="mac-btn close" />
                            <div className="mac-btn minimize" />
                            <div className="mac-btn maximize" />
                        </div>
                        <div className="terminal-title">
                            <span className="ssh-user">root@testy-tech</span>
                            <span className="ssh-host">:~/deploy</span>
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="terminal-body" ref={terminalBodyRef}>
                        <AnimatePresence initial={false}>
                            {lines.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`terminal-line line-${line.type}`}
                                >
                                    <span className="timestamp">[{new Date().toLocaleTimeString()}]</span>
                                    {line.type === 'cmd' && <span className="prompt">{'>'}</span>}
                                    <span className="line-content">
                                        {line.text.split(' ').map((word, w) => {
                                            if (word.startsWith('--')) return <span key={w} className="syntax-flag">{word} </span>
                                            if (word.startsWith('[')) return <span key={w} className={`syntax-bracket ${line.type === 'info' ? 'info' : line.type === 'success' ? 'success' : ''}`}>{word} </span>
                                            return word + ' '
                                        })}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Input Line */}
                        <div
                            className="terminal-line typing"
                            onClick={() => document.getElementById('terminal-input').focus()}
                        >
                            <span className="prompt">{'>'}</span>
                            <span className="input-text">{input}</span>
                            <motion.span
                                className="cursor"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            >
                                █
                            </motion.span>
                            <input
                                id="terminal-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                style={{
                                    position: 'absolute',
                                    opacity: 0,
                                    pointerEvents: 'none', // Prevent clicking initially, rely on container click
                                    width: 1,
                                    height: 1
                                }}
                                autoFocus
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
