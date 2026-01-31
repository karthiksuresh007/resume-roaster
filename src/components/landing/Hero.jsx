import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/animations'

/**
 * Hero Component
 * Main headline and subheadline for landing page
 * Responsive font sizes: mobile 40px, tablet 48px, desktop 56px
 */
function Hero({ className = '' }) {
    return (
        <motion.div
            className={`text-center max-w-4xl mx-auto ${className}`}
            {...fadeInUp}
        >
            {/* Hero Headline */}
            <h1 className="text-[56px] md:text-[48px] sm:text-[40px] leading-tight font-extrabold text-text-primary mb-4">
                Your Resume Sucks. Let Us Fix It. 🔥
            </h1>

            {/* Subheadline */}
            <p className="text-[18px] leading-relaxed text-text-secondary mb-8">
                Get roasted by AI, then get hired by humans.
            </p>
        </motion.div>
    )
}

export default Hero
