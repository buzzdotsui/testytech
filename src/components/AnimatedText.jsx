import { motion } from 'framer-motion'

const wordVariants = {
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
export default function AnimatedText({ text, className, as: Tag = 'span' }) {
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
