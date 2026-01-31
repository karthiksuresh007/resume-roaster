import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Hero from '../components/landing/Hero'
import UploadZone from '../components/landing/UploadZone'
import SocialProof from '../components/landing/SocialProof'
import UserMenu from '../components/auth/UserMenu'
import Button from '../components/ui/Button'

/**
 * Landing Page
 * Main entry point for the application
 * Composition: Hero + UploadZone + SocialProof
 */
function Landing() {
    const { user } = useAuth()

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-glass-border bg-bg-primary/80 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-2xl font-bold text-text-primary">
                            Resume Roaster 🔥
                        </Link>

                        <div className="flex items-center gap-4">
                            {user ? (
                                <>
                                    <Link to="/dashboard">
                                        <Button variant="secondary" size="sm">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <UserMenu />
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <Button variant="secondary" size="sm">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button variant="primary" size="sm">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-20 flex flex-col items-center justify-center px-4 py-12">
                <div className="max-w-6xl w-full">
                    {/* Hero Section */}
                    <Hero className="mb-12" />

                    {/* Upload Zone */}
                    <UploadZone className="mb-8" />

                    {/* Social Proof */}
                    <SocialProof className="mb-8" />

                    {/* Dev Link to Showcase */}
                    <div className="text-center">
                        <a
                            href="/showcase"
                            className="text-neon-pink hover:text-neon-orange transition-colors text-sm underline inline-block"
                        >
                            View Component Showcase →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
