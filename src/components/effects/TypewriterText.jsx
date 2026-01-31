import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * TypewriterText Component
 * Character-by-character reveal animation
 * 50ms per character (configurable)
 * Respects prefers-reduced-motion
 */
function TypewriterText({
    text = '',
    speed = 50,
    onComplete,
    className = '',
    showCursor = false
}) {
    const [displayedText, setDisplayedText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false

    useEffect(() => {
        // If reduced motion, show all text immediately
        if (prefersReducedMotion) {
            setDisplayedText(text)
            setIsComplete(true)
            onComplete?.()
            return
        }

        // Reset when text changes
        if (text !== displayedText) {
            setDisplayedText('')
            setCurrentIndex(0)
            setIsComplete(false)
        }
    }, [text, prefersReducedMotion])

    useEffect(() => {
        if (prefersReducedMotion || isComplete) return

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, speed)

            return () => clearTimeout(timeout)
        } else if (currentIndex === text.length && !isComplete) {
            setIsComplete(true)
            onComplete?.()
        }
    }, [currentIndex, text, speed, isComplete, prefersReducedMotion, onComplete])

    return (
        <motion.p
            className={`font-mono text-roast leading-loose text-text-primary ${showCursor && !isComplete ? 'typewriter-cursor' : ''} ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {displayedText}
        </motion.p>
    )
}

export default TypewriterText
