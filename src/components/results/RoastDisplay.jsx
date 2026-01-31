import { useState } from 'react'
import { motion } from 'framer-motion'
import Toggle from '../ui/Toggle'
import TypewriterText from '../effects/TypewriterText'
import { fadeInUp } from '../../utils/animations'

/**
 * RoastDisplay Component
 * Displays the AI-generated roast with mode toggle
 * Modes: Mild 🌶️ / Savage 🔥
 * Uses TypewriterText for character-by-character reveal
 */
function RoastDisplay({
    mildRoast = '',
    savageRoast = '',
    onModeChange,
    className = ''
}) {
    const [roastMode, setRoastMode] = useState('savage')

    const handleModeChange = (newMode) => {
        setRoastMode(newMode)
        onModeChange?.(newMode)
    }

    const currentRoast = roastMode === 'savage' ? savageRoast : mildRoast

    return (
        <motion.div
            className={`glass-card rounded-2xl p-8 ${className}`}
            {...fadeInUp}
        >
            {/* Header with Toggle */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h2 className="text-[28px] font-bold text-text-primary">
                    The Roast 🔥
                </h2>
                <Toggle mode={roastMode} onChange={handleModeChange} />
            </div>

            {/* Roast Content */}
            <div className="bg-bg-secondary rounded-xl p-6 border border-glass-border">
                <TypewriterText
                    text={currentRoast}
                    speed={30}
                    showCursor={false}
                    className="text-roast"
                    key={roastMode} // Re-trigger animation on mode change
                />
            </div>

            {/* Footer Note */}
            <p className="text-text-muted text-micro mt-4 text-center">
                {roastMode === 'savage'
                    ? '💀 Savage mode activated. Brace yourself.'
                    : '🌶️ Mild mode. We\'re being nice... for now.'}
            </p>
        </motion.div>
    )
}

export default RoastDisplay
