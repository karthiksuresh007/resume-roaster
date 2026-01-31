import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import GlassCard from '../components/ui/GlassCard'
import Toggle from '../components/ui/Toggle'
import Gauge from '../components/ui/Gauge'
import TypewriterText from '../components/effects/TypewriterText'
import FireParticles from '../components/effects/FireParticles'
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations'

function ComponentShowcase() {
    const [roastMode, setRoastMode] = useState('savage')
    const [loading, setLoading] = useState(false)
    const [showFire, setShowFire] = useState(false)

    const handleButtonClick = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
    }

    return (
        <div className="min-h-screen px-4 py-12">
            {showFire && <FireParticles count={8} />}

            <div className="max-w-6xl mx-auto">
                <motion.h1
                    className="text-hero text-center mb-4"
                    {...fadeInUp}
                >
                    Component Showcase 🔥
                </motion.h1>

                <motion.p
                    className="text-body text-text-secondary text-center mb-12"
                    {...fadeInUp}
                >
                    Testing all UI components from Phase 2
                </motion.p>

                <motion.div
                    className="space-y-12"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                >
                    {/* Buttons Section */}
                    <motion.section variants={staggerItem}>
                        <h2 className="text-section mb-6">Buttons</h2>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="primary" onClick={handleButtonClick}>
                                Primary Button
                            </Button>
                            <Button variant="secondary">
                                Secondary Button
                            </Button>
                            <Button variant="primary" loading={loading}>
                                Loading State
                            </Button>
                            <Button variant="primary" disabled>
                                Disabled Button
                            </Button>
                        </div>
                    </motion.section>

                    {/* Glass Cards Section */}
                    <motion.section variants={staggerItem}>
                        <h2 className="text-section mb-6">Glass Cards</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <GlassCard>
                                <h3 className="text-xl font-bold mb-2">Basic Card</h3>
                                <p className="text-text-secondary">
                                    This is a basic glass card with no hover effect.
                                </p>
                            </GlassCard>

                            <GlassCard hover>
                                <h3 className="text-xl font-bold mb-2">Hover Card</h3>
                                <p className="text-text-secondary">
                                    This card has a hover effect. Try hovering over it!
                                </p>
                            </GlassCard>

                            <GlassCard hover onClick={() => alert('Card clicked!')}>
                                <h3 className="text-xl font-bold mb-2">Clickable Card</h3>
                                <p className="text-text-secondary">
                                    This card is clickable. Click to see an alert!
                                </p>
                            </GlassCard>
                        </div>
                    </motion.section>

                    {/* Toggle Section */}
                    <motion.section variants={staggerItem}>
                        <h2 className="text-section mb-6">Roast Mode Toggle</h2>
                        <div className="flex justify-center">
                            <Toggle mode={roastMode} onChange={setRoastMode} />
                        </div>
                        <p className="text-center text-text-secondary mt-4">
                            Current mode: <span className="text-neon-pink font-bold">{roastMode}</span>
                        </p>
                    </motion.section>

                    {/* Gauge Section */}
                    <motion.section variants={staggerItem}>
                        <h2 className="text-section mb-6">ATS Score Gauges</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-center text-text-muted mb-4">Low Score (Red)</h3>
                                <Gauge
                                    score={35}
                                    caption="Ghosted harder than a bad Tinder date."
                                    breakdown={{
                                        formatting: 40,
                                        keywords: 25,
                                        impact: 30,
                                        clarity: 45
                                    }}
                                />
                                <div className="text-center mt-4">
                                    <Button
                                        variant="secondary"
                                        onClick={() => setShowFire(!showFire)}
                                    >
                                        {showFire ? 'Hide' : 'Show'} Fire Particles
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-center text-text-muted mb-4">Medium Score (Orange)</h3>
                                <Gauge
                                    score={65}
                                    caption="Almost hireable. Almost."
                                    breakdown={{
                                        formatting: 70,
                                        keywords: 60,
                                        impact: 65,
                                        clarity: 65
                                    }}
                                />
                            </div>

                            <div>
                                <h3 className="text-center text-text-muted mb-4">High Score (Green)</h3>
                                <Gauge
                                    score={85}
                                    caption="Okay… this actually slaps."
                                    breakdown={{
                                        formatting: 90,
                                        keywords: 85,
                                        impact: 80,
                                        clarity: 85
                                    }}
                                />
                            </div>
                        </div>
                    </motion.section>

                    {/* Typewriter Section */}
                    <motion.section variants={staggerItem}>
                        <h2 className="text-section mb-6">Typewriter Effect</h2>
                        <GlassCard>
                            <TypewriterText
                                text="Your summary says 'hardworking'. So does literally everyone. You used 'responsible for' 6 times. HR fell asleep by the second one. Your skills section looks like you googled 'top tech skills 2023'."
                                speed={50}
                                showCursor
                                onComplete={() => console.log('Typewriter complete!')}
                            />
                        </GlassCard>
                    </motion.section>

                    {/* Back to Landing */}
                    <motion.div variants={staggerItem} className="text-center pt-8">
                        <Button variant="primary" onClick={() => window.location.href = '/'}>
                            ← Back to Landing Page
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default ComponentShowcase
