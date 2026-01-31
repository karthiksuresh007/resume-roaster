import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChange, getCurrentUser } from '../services/auth'
import { supabase } from '../config/supabase'

// Create Auth Context
const AuthContext = createContext({})

// Custom hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

// Auth Provider Component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadUserProfile = async (userId) => {
        try {
            console.log('📊 Loading user profile...', userId)

            // Use database function instead of direct query (bypasses API permissions)
            const { data, error } = await supabase
                .rpc('get_user_profile', {
                    p_user_id: userId
                })

            if (error) {
                console.error('❌ Error loading user profile:', error)
                return null
            }

            console.log('✅ User profile loaded:', data)
            return data
        } catch (error) {
            console.error('❌ Error loading user profile:', error)
            return null
        }
    }

    // Listen to auth state changes
    useEffect(() => {
        console.log('🔐 Setting up auth listener...')

        // Check current user on mount
        const currentUser = getCurrentUser()
        if (currentUser) {
            setUser(currentUser)
            loadUserProfile(currentUser.uid).then(profile => {
                if (profile) setUserProfile(profile)
            })
        }
        setLoading(false)

        // Subscribe to auth changes
        const unsubscribe = onAuthStateChange(async (authUser) => {
            console.log('🔄 Auth state changed:', authUser?.email || 'No user')

            setUser(authUser)

            if (authUser) {
                const profile = await loadUserProfile(authUser.uid)
                if (profile) setUserProfile(profile)
            } else {
                setUserProfile(null)
            }

            setLoading(false)
        })

        return () => {
            console.log('👋 Cleaning up auth listener')
            unsubscribe()
        }
    }, [])

    // Refresh user profile
    async function refreshProfile() {
        if (user) {
            await loadUserProfile(user.uid)
        }
    }

    // Check if user has credits
    function hasCredits() {
        return userProfile?.credits_remaining > 0
    }

    // Deduct credits
    async function deductCredit() {
        if (!user || !userProfile) {
            throw new Error('No user logged in')
        }

        if (userProfile.credits_remaining <= 0) {
            throw new Error('No credits remaining')
        }

        try {
            const newCredits = userProfile.credits_remaining - 1

            // Use database function instead of direct update (bypasses API permissions)
            const { data, error } = await supabase
                .rpc('update_user_credits', {
                    p_user_id: user.uid,
                    p_new_credits: newCredits
                })

            if (error) throw error

            // Update local state
            setUserProfile({
                ...userProfile,
                credits_remaining: newCredits
            })

            console.log(`✅ Credit deducted. Remaining: ${newCredits}`)
            return newCredits
        } catch (err) {
            console.error('❌ Error deducting credit:', err)
            throw new Error('Failed to deduct credit')
        }
    }

    // Context value
    const value = {
        user,
        userProfile,
        loading,
        error,
        refreshProfile,
        hasCredits,
        deductCredit,
        isAuthenticated: !!user,
        isPro: userProfile?.subscription_tier === 'pro',
        isBasic: userProfile?.subscription_tier === 'basic',
        isFree: userProfile?.subscription_tier === 'free',
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
