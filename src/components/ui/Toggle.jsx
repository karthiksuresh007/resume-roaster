import { motion } from 'framer-motion'

/**
 * Toggle Component - Roast Mode Switcher
 * Two states: Mild 🌶️ / Savage 🔥
 * Instant switch with animated slider
 */
function Toggle({
    mode = 'savage',
    onChange,
    className = ''
}) {
    const isSavage = mode === 'savage'

    const handleToggle = () => {
        const newMode = isSavage ? 'mild' : 'savage'
        onChange?.(newMode)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            e.preventDefault()
            handleToggle()
        }
    }

    return (
        <div className={`inline-flex items-center gap-3 ${className}`}>
            <span className={`text-sm font-medium transition-colors ${!isSavage ? 'text-text-primary' : 'text-text-muted'}`}>
                Mild 🌶️
            </span>

            <button
                role="switch"
                aria-checked={isSavage}
                aria-label="Toggle between mild and savage roast mode"
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                className="relative w-14 h-7 rounded-full glass-card border border-glass-border focus-neon transition-all duration-200"
            >
                <motion.div
                    className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-gradient-to-r from-neon-pink to-neon-orange shadow-lg"
                    animate={{
                        x: isSavage ? 26 : 0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30
                    }}
                />
            </button>

            <span className={`text-sm font-medium transition-colors ${isSavage ? 'text-text-primary' : 'text-text-muted'}`}>
                Savage 🔥
            </span>
        </div>
    )
}

export default Toggle
