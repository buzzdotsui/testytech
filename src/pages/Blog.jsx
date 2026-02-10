import { motion } from 'framer-motion'
import {
    fadeUp, fadeScale, staggerContainer, PageTransition, MorphingBlob
} from '../components/AnimationHelpers'

/* ─────────────────────────────────────────────
   BLOG DATA
   ───────────────────────────────────────────── */
const articles = [
    {
        id: 1,
        title: 'Why Metallurgical Engineers Should Learn Docker',
        category: 'DevOps',
        date: 'Jan 28, 2026',
        readTime: '7 min',
        excerpt: 'Containerization isn't just for web developers.Here's how Docker is revolutionizing reproducible engineering simulations.',
        color: '#FF6700',
    },
    {
        id: 2,
        title: 'Carbon Equivalency: A Deep Dive into Weldability Prediction',
        category: 'Metallurgy',
        date: 'Jan 15, 2026',
        excerpt: 'Understanding the IIW and Dearden-O\'Neill formulas — and how we built a real-time calculator for the field.',
        readTime: '12 min',
        color: '#4682B4',
    },
    {
        id: 3,
        title: 'Building GPU-Backed Virtual Labs on GCP',
        category: 'Cloud',
        date: 'Dec 20, 2025',
        readTime: '9 min',
        excerpt: 'A technical walkthrough of our auto-provisioning lab environment — from Terraform configs to cost optimization.',
        color: '#3FB950',
    },
    {
        id: 4,
        title: 'CI/CD Pipelines for Engineering Firms: A Practical Guide',
        category: 'DevOps',
        date: 'Dec 5, 2025',
        readTime: '10 min',
        excerpt: 'Most CI/CD guides target SaaS companies. Here's how to adapt pipeline best practices for simulation - heavy engineering teams.',
        color: '#FF6700',
    },
    {
        id: 5,
        title: 'Predicting UTS from Brinell Hardness: Model Accuracy Report',
        category: 'Metallurgy',
        date: 'Nov 18, 2025',
        readTime: '15 min',
        excerpt: 'We tested our HB→UTS conversion model against 500+ real-world samples. Here are the results and lessons learned.',
        color: '#4682B4',
    },
    {
        id: 6,
        title: 'Infrastructure as Code: Our Terraform Journey',
        category: 'Cloud',
        date: 'Nov 3, 2025',
        readTime: '8 min',
        excerpt: 'How we migrated from manual cloud provisioning to a fully automated IaC workflow — and the mistakes we made along the way.',
        color: '#3FB950',
    },
]

/* ─────────────────────────────────────────────
   GLASSMORPHIC ARTICLE CARD
   ───────────────────────────────────────────── */
function ArticleCard({ article, index }) {
    return (
        <motion.article
            className="article-card"
            variants={fadeScale}
            custom={index}
            whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: `0 20px 50px ${article.color}15, 0 0 30px ${article.color}08`,
            }}
            transition={{ duration: 0.3 }}
        >
            <div className="article-card-glow" style={{ background: article.color }} />
            <div className="article-meta">
                <span className="article-category" style={{ color: article.color, borderColor: article.color + '40' }}>
                    {article.category}
                </span>
                <span className="article-date">{article.date}</span>
            </div>
            <h3 className="article-title">{article.title}</h3>
            <p className="article-excerpt">{article.excerpt}</p>
            <div className="article-footer">
                <span className="article-read-time">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {article.readTime}
                </span>
                <motion.span
                    className="article-read-more"
                    whileHover={{ x: 4, color: article.color }}
                >
                    Read More →
                </motion.span>
            </div>
        </motion.article>
    )
}

/* ─────────────────────────────────────────────
   BLOG PAGE
   ───────────────────────────────────────────── */
export default function Blog() {
    return (
        <PageTransition>
            {/* Hero */}
            <section className="blog-hero">
                <MorphingBlob color="#4682B4" size={400} style={{ top: '-10%', left: '-5%' }} />
                <MorphingBlob color="#3FB950" size={300} style={{ bottom: '-8%', right: '-5%' }} />

                <div className="container">
                    <motion.div
                        className="blog-hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.span className="section-label" variants={fadeUp}>Insights</motion.span>
                        <motion.h1 className="section-title" variants={fadeUp} custom={1}>
                            Engineering <span className="highlight-orange">Blog</span>
                        </motion.h1>
                        <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
                            Deep dives into metallurgy, DevOps, and the technology that powers industrial innovation.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="blog-grid-section">
                <div className="container">
                    <motion.div
                        className="blog-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {articles.map((article, i) => (
                            <ArticleCard key={article.id} article={article} index={i} />
                        ))}
                    </motion.div>
                </div>
            </section>
        </PageTransition>
    )
}
