import { motion } from 'framer-motion'
import FixCard from './FixCard'
import { staggerContainer } from '../../utils/animations'

/**
 * FixesList Component
 * Displays a list of fixes with preview/full view toggle
 * Shows first 3 fixes by default, with "Show More" button
 */
function FixesList({
    fixes = [],
    showPaywall = false,
    onShowMore,
    className = ''
}) {
    const previewCount = 3
    const hasMore = fixes.length > previewCount
    const displayedFixes = showPaywall ? fixes.slice(0, previewCount) : fixes

    return (
        <div className={className}>
            {/* Header */}
            <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="text-[28px] font-bold text-text-primary mb-2">
                    Actionable Fixes
                </h2>
                <p className="text-text-secondary">
                    {fixes.length} issues found. Here's how to fix them:
                </p>
            </motion.div>

            {/* Fixes Grid */}
            <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
            >
                {displayedFixes.map((fix, index) => (
                    <FixCard
                        key={index}
                        category={fix.category}
                        issue={fix.issue}
                        before={fix.before}
                        after={fix.after}
                        index={index}
                    />
                ))}
            </motion.div>

            {/* Blur Overlay for Paywall */}
            {showPaywall && hasMore && (
                <motion.div
                    className="relative mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {/* Blurred Preview Cards */}
                    <div className="relative">
                        <div className="space-y-4 blur-md pointer-events-none select-none">
                            {fixes.slice(previewCount, previewCount + 2).map((fix, index) => (
                                <FixCard
                                    key={`preview-${index}`}
                                    category={fix.category}
                                    issue={fix.issue}
                                    before={fix.before}
                                    after={fix.after}
                                    index={previewCount + index}
                                />
                            ))}
                        </div>

                        {/* Overlay with CTA */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent">
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <p className="text-text-primary text-xl font-bold mb-2">
                                    🔒 {fixes.length - previewCount} more fixes locked
                                </p>
                                <p className="text-text-secondary text-sm mb-4">
                                    Unlock all fixes to make your resume ATS-ready
                                </p>
                                <button
                                    onClick={onShowMore}
                                    className="btn-primary px-8 py-3"
                                >
                                    Unlock All Fixes 🔥
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Stats Footer */}
            {!showPaywall && (
                <motion.div
                    className="mt-8 glass-card rounded-xl p-6 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-text-secondary mb-2">
                        ✅ All {fixes.length} fixes unlocked!
                    </p>
                    <p className="text-text-muted text-sm">
                        Apply these changes to boost your ATS score by up to 40 points
                    </p>
                </motion.div>
            )}
        </div>
    )
}

export default FixesList
