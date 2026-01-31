import { motion } from 'framer-motion'
import { useMemo } from 'react'

/**
 * FireParticles Component
 * Floating fire emoji particles for low ATS scores
 * Performance optimized (max 10 particles)
 */
function FireParticles({
    count = 8,
    className = ''
}) {
    // Generate random particles with memoization for performance
    const particles = useMemo(() => {
        return Array.from({ length: Math.min(count, 10) }, (_, i) => ({
            id: i,
            emoji: ['🔥', '💥', '⚡'][Math.floor(Math.random() * 3)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 2,
            size: 20 + Math.random() * 20
        }))
    }, [count])

    return (
        <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        fontSize: `${particle.size}px`,
                    }}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                        opacity: [0, 0.8, 0.8, 0],
                        y: [-20, -40, -60, -80],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    {particle.emoji}
                </motion.div>
            ))}
        </div>
    )
}

export default FireParticles
