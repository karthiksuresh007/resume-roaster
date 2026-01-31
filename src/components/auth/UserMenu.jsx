import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { signOut } from '../../services/auth'

function UserMenu() {
    const { user, userProfile } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)
    const navigate = useNavigate()

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Handle logout
    async function handleLogout() {
        try {
            await signOut()
            navigate('/login')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    if (!user) return null

    return (
        <div className="relative" ref={menuRef}>
            {/* User Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-glass-card transition-all"
            >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-neon-orange flex items-center justify-center overflow-hidden">
                    {user.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt={user.displayName || 'User'}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-white font-bold text-lg">
                            {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                        </span>
                    )}
                </div>

                {/* User Info (Desktop) */}
                <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-text-primary">
                        {user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-text-muted">
                        {userProfile?.credits_remaining || 0} credits
                    </p>
                </div>

                {/* Dropdown Icon */}
                <svg
                    className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 glass-card rounded-xl shadow-xl overflow-hidden z-50"
                    >
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-glass-border">
                            <p className="text-sm font-medium text-text-primary truncate">
                                {user.displayName || 'User'}
                            </p>
                            <p className="text-xs text-text-muted truncate">
                                {user.email}
                            </p>
                        </div>

                        {/* Credits */}
                        <div className="px-4 py-3 border-b border-glass-border">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-text-muted">Credits</span>
                                <span className="text-sm font-bold text-neon-pink">
                                    {userProfile?.credits_remaining || 0}
                                </span>
                            </div>
                            <div className="w-full bg-bg-primary rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-neon-pink to-neon-orange h-2 rounded-full transition-all"
                                    style={{
                                        width: `${Math.min(100, ((userProfile?.credits_remaining || 0) / 10) * 100)}%`
                                    }}
                                ></div>
                            </div>
                            <p className="text-xs text-text-muted mt-1">
                                {userProfile?.subscription_tier === 'free' ? 'Free Plan' :
                                    userProfile?.subscription_tier === 'basic' ? 'Basic Plan' : 'Pro Plan'}
                            </p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                            <Link
                                to="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-glass-card hover:text-text-primary transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Dashboard
                            </Link>

                            <Link
                                to="/profile"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-glass-card hover:text-text-primary transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Profile
                            </Link>

                            {userProfile?.subscription_tier === 'free' && (
                                <Link
                                    to="/pricing"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-neon-pink hover:bg-glass-card transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Upgrade Plan
                                </Link>
                            )}
                        </div>

                        {/* Logout */}
                        <div className="border-t border-glass-border py-2">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-glass-card transition-all w-full"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default UserMenu
