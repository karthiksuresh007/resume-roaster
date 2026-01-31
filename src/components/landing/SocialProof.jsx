import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/animations'

/**
 * SocialProof Component
 * Displays stats and social proof
 * Animated counter (optional)
 */
function SocialProof({ className = '' }) {
    return (
        <motion.div
            className={`text-center ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
        >
            <div className="text-text-muted text-[14px] flex items-center justify-center gap-2 flex-wrap">
                <span className="flex items-center gap-1">
                    <span className="text-neon-pink font-semibold">10,000+</span>
                    <span>resumes roasted</span>
                </span>
                <span className="text-text-muted">•</span>
                <span className="flex items-center gap-1">
                    <span className="text-neon-orange font-semibold">4.8★</span>
                    <span>on ProductHunt</span>
                </span>
            </div>
        </motion.div>
    )
}

export default SocialProof
