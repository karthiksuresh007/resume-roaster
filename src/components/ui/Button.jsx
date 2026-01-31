import { motion } from 'framer-motion'
import { hoverLift } from '../../utils/animations'

/**
 * Button Component
 * Variants: primary, secondary, disabled
 * Follows design system specifications
 */
function Button({
    children,
    variant = 'primary',
    disabled = false,
    loading = false,
    onClick,
    className = '',
    type = 'button',
    ...props
}) {
    const baseClasses = 'px-6 py-3 rounded-2xl font-semibold transition-all duration-200 focus-neon inline-flex items-center justify-center gap-2'

    const variantClasses = {
        primary: 'gradient-pink-orange text-white hover:scale-105 active:scale-95',
        secondary: 'glass-card text-text-primary hover:bg-[rgba(255,255,255,0.12)]',
    }

    const disabledClasses = 'bg-[rgba(255,255,255,0.1)] text-text-muted cursor-not-allowed hover:scale-100'

    const finalClasses = `${baseClasses} ${disabled ? disabledClasses : variantClasses[variant]
        } ${className}`

    const MotionButton = motion.button

    return (
        <MotionButton
            type={type}
            className={finalClasses}
            onClick={disabled || loading ? undefined : onClick}
            disabled={disabled || loading}
            {...(!disabled && !loading ? hoverLift : {})}
            {...props}
        >
            {loading ? (
                <>
                    <div className="spinner" />
                    <span>Loading...</span>
                </>
            ) : (
                children
            )}
        </MotionButton>
    )
}

export default Button
