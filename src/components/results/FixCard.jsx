import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/animations'

/**
 * FixCard Component
 * Displays a single fix with before/after comparison
 * Shows issue category, before text (crossed out), and after text (highlighted)
 */
function FixCard({
    category = '',
    issue = '',
    before = '',
    after = '',
    index = 0,
    className = ''
}) {
    return (
        <motion.div
            className={`glass-card rounded-xl p-6 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
        >
            {/* Category Badge */}
            <div className="flex items-start justify-between mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-neon-pink/10 text-neon-pink border border-neon-pink/20">
                    {category}
                </span>
                <span className="text-2xl">
                    {getCategoryEmoji(category)}
                </span>
            </div>

            {/* Issue Description */}
            <h3 className="text-lg font-bold text-text-primary mb-3">
                {issue}
            </h3>

            {/* Before/After Comparison */}
            <div className="space-y-4">
                {/* Before */}
                <div className="bg-bg-secondary rounded-lg p-4 border border-neon-red/20">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-neon-red text-xs font-semibold uppercase tracking-wide">
                            ❌ Before
                        </span>
                    </div>
                    <p className="text-text-muted text-sm line-through opacity-70">
                        {before}
                    </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                    <div className="text-neon-green text-2xl">↓</div>
                </div>

                {/* After */}
                <div className="bg-bg-secondary rounded-lg p-4 border border-neon-green/20">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-neon-green text-xs font-semibold uppercase tracking-wide">
                            ✅ After
                        </span>
                    </div>
                    <p className="text-text-primary text-sm font-medium">
                        {after}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

// Helper function to get emoji based on category
function getCategoryEmoji(category) {
    const emojiMap = {
        'Summary': '📝',
        'Experience': '💼',
        'Skills': '🛠️',
        'Education': '🎓',
        'Formatting': '✨',
        'Keywords': '🔑',
        'Impact': '💥',
        'Clarity': '💡',
        'Grammar': '📖',
        'Length': '📏'
    }
    return emojiMap[category] || '📄'
}

export default FixCard
