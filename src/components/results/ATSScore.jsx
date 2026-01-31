import { motion } from 'framer-motion'
import Gauge from '../ui/Gauge'
import FireParticles from '../effects/FireParticles'
import { scaleIn } from '../../utils/animations'

/**
 * ATSScore Component
 * Wrapper for Gauge component with context-specific messaging
 * Shows fire particles for low scores
 */
function ATSScore({
    score = 0,
    breakdown = {},
    className = ''
}) {
    // Determine message based on score
    const getMessage = (score) => {
        if (score <= 40) {
            return "Ghosted harder than a bad Tinder date."
        } else if (score <= 60) {
            return "Almost hireable. Almost."
        } else if (score <= 80) {
            return "Not bad. But we can do better."
        } else {
            return "Okay… this actually slaps. 🔥"
        }
    }

    const showFireParticles = score <= 40

    return (
        <motion.div
            className={`relative ${className}`}
            {...scaleIn}
        >
            {/* Fire Particles for Low Scores */}
            {showFireParticles && (
                <div className="absolute inset-0 pointer-events-none">
                    <FireParticles count={6} />
                </div>
            )}

            {/* Score Card */}
            <div className="glass-card rounded-2xl p-8 text-center relative z-10">
                <h2 className="text-[28px] font-bold text-text-primary mb-2">
                    Your ATS Score
                </h2>
                <p className="text-text-secondary mb-8">
                    How well your resume passes Applicant Tracking Systems
                </p>

                <Gauge
                    score={score}
                    caption={getMessage(score)}
                    breakdown={breakdown}
                />

                {/* Score Interpretation */}
                <div className="mt-8 pt-6 border-t border-glass-border">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <div className="text-neon-red font-bold mb-1">0-40</div>
                            <div className="text-text-muted text-xs">Needs Work</div>
                        </div>
                        <div>
                            <div className="text-neon-orange font-bold mb-1">41-70</div>
                            <div className="text-text-muted text-xs">Getting There</div>
                        </div>
                        <div>
                            <div className="text-neon-green font-bold mb-1">71-100</div>
                            <div className="text-text-muted text-xs">ATS Ready</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ATSScore
