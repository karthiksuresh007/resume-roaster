import { motion } from 'framer-motion'

/**
 * GlassCard Component
 * Base glassmorphism card with optional hover effects
 * Background: rgba(255,255,255,0.08)
 * Border: rgba(255,255,255,0.12)
 * Backdrop blur: 12px
 */
function GlassCard({
    children,
    hover = false,
    className = '',
    onClick,
    ...props
}) {
    const baseClasses = 'glass-card rounded-2xl p-6'
    const hoverClasses = hover ? 'glass-card-hover cursor-pointer' : ''

    const finalClasses = `${baseClasses} ${hoverClasses} ${className}`

    const Component = onClick || hover ? motion.div : 'div'

    const motionProps = onClick || hover ? {
        whileHover: {
            scale: 1.02,
            transition: { duration: 0.2 }
        },
        whileTap: onClick ? { scale: 0.98 } : {}
    } : {}

    return (
        <Component
            className={finalClasses}
            onClick={onClick}
            {...motionProps}
            {...props}
        >
            {children}
        </Component>
    )
}

export default GlassCard
