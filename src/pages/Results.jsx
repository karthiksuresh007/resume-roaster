import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import ATSScore from '../components/results/ATSScore'
import RoastDisplay from '../components/results/RoastDisplay'
import FixesList from '../components/results/FixesList'
import { fadeInUp } from '../utils/animations'
import { mockResumeData } from '../data/mockData'
import { trackRoastViewed, trackToggleRoastMode } from '../utils/analytics'

/**
 * Results Page
 * Displays ATS score, roast, and actionable fixes
 * Composition: ATSScore + RoastDisplay + FixesList
 */
function Results() {
    const location = useLocation()
    const navigate = useNavigate()

    // Get real analysis data from navigation state (or fallback to mock)
    const analysis = location.state?.analysis || mockResumeData
    const fileName = location.state?.fileName || analysis.metadata?.fileName || 'resume.pdf'

    const [showPaywall, setShowPaywall] = useState(true)
    const [roastMode, setRoastMode] = useState('savage')

    const { atsScore, roast, fixes } = analysis

    // Track roast viewed
    useEffect(() => {
        trackRoastViewed(atsScore.score, roastMode)
    }, [])

    const handleRoastModeChange = (newMode) => {
        trackToggleRoastMode(roastMode, newMode)
        setRoastMode(newMode)
    }

    const handleUnlockFixes = () => {
        // TODO: Implement paywall modal
        console.log('🔒 Unlock fixes clicked - show paywall modal')
        // For now, just unlock
        setShowPaywall(false)
    }

    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    {...fadeInUp}
                >
                    <h1 className="text-[48px] md:text-[40px] sm:text-[32px] font-bold text-text-primary mb-4">
                        Your Resume Analysis 🔥
                    </h1>
                    <p className="text-text-secondary mb-2">
                        File: <span className="text-neon-pink font-semibold">{fileName}</span>
                    </p>
                    <Button
                        variant="secondary"
                        onClick={() => navigate('/')}
                        className="mt-4"
                    >
                        ← Upload Another Resume
                    </Button>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Left Column: ATS Score */}
                    <ATSScore
                        score={atsScore.score}
                        breakdown={atsScore.breakdown}
                    />

                    {/* Right Column: Roast */}
                    <RoastDisplay
                        mildRoast={roast.mild}
                        savageRoast={roast.savage}
                        onModeChange={handleRoastModeChange}
                    />
                </div>

                {/* Fixes Section */}
                <FixesList
                    fixes={fixes}
                    showPaywall={showPaywall}
                    onShowMore={handleUnlockFixes}
                />

                {/* Share Section */}
                <motion.div
                    className="mt-12 text-center glass-card rounded-2xl p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <h3 className="text-xl font-bold text-text-primary mb-3">
                        Got roasted? Share the pain. 😂
                    </h3>
                    <p className="text-text-secondary mb-6">
                        Share your ATS score on social media
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Button
                            variant="secondary"
                            onClick={() => {
                                const text = `I got a ${atsScore.score}/100 ATS score on Resume Roaster! 🔥`
                                const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
                                window.open(url, '_blank')
                            }}
                        >
                            Share on Twitter 🐦
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
                                window.open(url, '_blank')
                            }}
                        >
                            Share on LinkedIn 💼
                        </Button>
                    </div>
                </motion.div>

                {/* Dev Note */}
                {!showPaywall && (
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <p className="text-text-muted text-sm">
                            💡 Dev Mode: Paywall bypassed. In production, users would see a payment modal.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Results
