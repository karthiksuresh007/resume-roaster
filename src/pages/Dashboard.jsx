import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import UserMenu from '../components/auth/UserMenu'
import { fadeIn, staggerContainer } from '../utils/animations'

function Dashboard() {
    const { user, userProfile } = useAuth()

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Header */}
            <header className="border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-2xl font-bold text-text-primary">
                            Resume Roaster 🔥
                        </Link>
                        <UserMenu />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div {...staggerContainer}>
                    {/* Welcome Section */}
                    <motion.div {...fadeIn} className="mb-12">
                        <h1 className="text-4xl font-bold text-text-primary mb-2">
                            Welcome back, {user?.displayName?.split(' ')[0] || 'there'}! 👋
                        </h1>
                        <p className="text-text-secondary text-lg">
                            Ready to roast some more resumes?
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div {...fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {/* Credits Card */}
                        <div className="glass-card rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-text-secondary text-sm font-medium">Credits Remaining</h3>
                                <svg className="w-6 h-6 text-neon-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <p className="text-4xl font-bold text-text-primary mb-2">
                                {userProfile?.credits_remaining || 0}
                            </p>
                            <div className="w-full bg-bg-primary rounded-full h-2 mb-3">
                                <div
                                    className="bg-gradient-to-r from-neon-pink to-neon-orange h-2 rounded-full transition-all"
                                    style={{
                                        width: `${Math.min(100, ((userProfile?.credits_remaining || 0) / 10) * 100)}%`
                                    }}
                                ></div>
                            </div>
                            <p className="text-text-muted text-xs">
                                {userProfile?.subscription_tier === 'free' ? 'Free Plan (10 total)' :
                                    userProfile?.subscription_tier === 'basic' ? 'Basic Plan (50/month)' : 'Pro Plan (Unlimited)'}
                            </p>
                        </div>

                        {/* Subscription Card */}
                        <div className="glass-card rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-text-secondary text-sm font-medium">Subscription</h3>
                                <svg className="w-6 h-6 text-neon-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <p className="text-2xl font-bold text-text-primary mb-2 capitalize">
                                {userProfile?.subscription_tier || 'Free'}
                            </p>
                            {userProfile?.subscription_tier === 'free' && (
                                <Link
                                    to="/pricing"
                                    className="inline-block text-neon-pink hover:text-neon-pink/80 text-sm font-medium transition-colors"
                                >
                                    Upgrade Plan →
                                </Link>
                            )}
                        </div>

                        {/* Analyses Card */}
                        <div className="glass-card rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-text-secondary text-sm font-medium">Total Analyses</h3>
                                <svg className="w-6 h-6 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-4xl font-bold text-text-primary mb-2">
                                {10 - (userProfile?.credits_remaining || 10)}
                            </p>
                            <p className="text-text-muted text-xs">
                                Resumes roasted
                            </p>
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div {...fadeIn} className="mb-12">
                        <h2 className="text-2xl font-bold text-text-primary mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Analyze New Resume */}
                            <Link
                                to="/"
                                className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink to-neon-orange flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-text-primary group-hover:text-neon-pink transition-colors">
                                            Analyze New Resume
                                        </h3>
                                        <p className="text-text-muted text-sm">
                                            Upload and roast a new resume
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            {/* View History (Coming Soon) */}
                            <div className="glass-card rounded-2xl p-6 opacity-50 cursor-not-allowed">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-glass-card flex items-center justify-center">
                                        <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-text-primary">
                                            View History
                                        </h3>
                                        <p className="text-text-muted text-sm">
                                            Coming soon...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Info Banner */}
                    <motion.div {...fadeIn} className="glass-card rounded-2xl p-6 border border-neon-pink/20">
                        <div className="flex items-start gap-4">
                            <svg className="w-6 h-6 text-neon-pink flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-lg font-bold text-text-primary mb-2">
                                    Resume History Coming Soon! 🚀
                                </h3>
                                <p className="text-text-secondary">
                                    We're working on adding resume history, version tracking, and comparison features.
                                    For now, your analyses are saved and you can access them anytime.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    )
}

export default Dashboard
