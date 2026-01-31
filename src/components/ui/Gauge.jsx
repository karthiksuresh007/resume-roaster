import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

/**
 * Gauge Component - ATS Score Display
 * Circular progress ring with animated count-up
 * Color-coded by score range:
 * - 0-40: Neon Red
 * - 41-70: Neon Orange  
 * - 71-100: Neon Green
 */
function Gauge({
    score = 0,
    breakdown = {},
    caption = '',
    className = ''
}) {
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))

    // Determine color based on score
    const getColor = (value) => {
        if (value <= 40) return { color: '#FF3B3B', shadow: '0 0 40px rgba(255, 59, 59, 0.4)', name: 'neon-red' }
        if (value <= 70) return { color: '#FF9F1C', shadow: '0 0 40px rgba(255, 159, 28, 0.4)', name: 'neon-orange' }
        return { color: '#3DFF7A', shadow: '0 0 40px rgba(61, 255, 122, 0.4)', name: 'neon-green' }
    }

    const scoreColor = getColor(score)

    // Calculate circle properties
    const size = 200
    const strokeWidth = 12
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (score / 100) * circumference

    useEffect(() => {
        const controls = animate(count, score, {
            duration: 2,
            ease: 'easeOut',
            delay: 0.5
        })

        return controls.stop
    }, [score, count])

    return (
        <div
            className={`flex flex-col items-center ${className}`}
            role="meter"
            aria-valuenow={score}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="ATS Score"
        >
            {/* Circular Gauge */}
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background Circle */}
                <svg className="transform -rotate-90" width={size} height={size}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={scoreColor.color}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
                        style={{
                            strokeDasharray: circumference,
                            filter: `drop-shadow(${scoreColor.shadow})`
                        }}
                    />
                </svg>

                {/* Score Number */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                        className="text-6xl font-extrabold"
                        style={{ color: scoreColor.color }}
                    >
                        {rounded}
                    </motion.div>
                    <div className="text-text-muted text-sm font-medium mt-1">/ 100</div>
                </div>
            </div>

            {/* Caption */}
            {caption && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.3 }}
                    className="text-text-secondary text-center mt-6 text-lg font-medium max-w-md"
                >
                    {caption}
                </motion.p>
            )}

            {/* Score Breakdown */}
            {breakdown && Object.keys(breakdown).length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.7, duration: 0.3 }}
                    className="grid grid-cols-2 gap-4 mt-8 w-full max-w-sm"
                >
                    {Object.entries(breakdown).map(([key, value]) => (
                        <div key={key} className="glass-card rounded-xl p-3">
                            <div className="text-text-muted text-xs uppercase tracking-wide mb-1">
                                {key}
                            </div>
                            <div className="text-text-primary text-2xl font-bold">
                                {value}
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}

export default Gauge
