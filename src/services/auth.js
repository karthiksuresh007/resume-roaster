import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'
import { supabase } from '../config/supabase'

/**
 * Sign in with Google
 * @returns {Promise<Object>} User object
 */
export async function signInWithGoogle() {
  try {
    console.log('🔐 Signing in with Google...')
    
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    
    console.log('✅ Google sign-in successful:', user.email)
    
    // Sync user to Supabase database
    await syncUserToDatabase(user)
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
  } catch (error) {
    console.error('❌ Google sign-in error:', error)
    throw new Error(getAuthErrorMessage(error.code))
  }
}

/**
 * Sign in with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>} User object
 */
export async function signInWithEmail(email, password) {
  try {
    console.log('🔐 Signing in with email:', email)
    
    const result = await signInWithEmailAndPassword(auth, email, password)
    const user = result.user
    
    console.log('✅ Email sign-in successful')
    
    await syncUserToDatabase(user)
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
  } catch (error) {
    console.error('❌ Email sign-in error:', error)
    throw new Error(getAuthErrorMessage(error.code))
  }
}

/**
 * Sign up with email and password
 * @param {string} email 
 * @param {string} password 
 * @param {string} displayName 
 * @returns {Promise<Object>} User object
 */
export async function signUpWithEmail(email, password, displayName) {
  try {
    console.log('📝 Signing up with email:', email)
    
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const user = result.user
    
    // Update display name
    await firebaseUpdateProfile(user, { displayName })
    
    console.log('✅ Email sign-up successful')
    
    // Create user in database
    await syncUserToDatabase({ ...user, displayName })
    
    return {
      uid: user.uid,
      email: user.email,
      displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
  } catch (error) {
    console.error('❌ Email sign-up error:', error)
    throw new Error(getAuthErrorMessage(error.code))
  }
}

/**
 * Sign out
 */
export async function signOut() {
  try {
    console.log('👋 Signing out...')
    await firebaseSignOut(auth)
    console.log('✅ Sign out successful')
  } catch (error) {
    console.error('❌ Sign out error:', error)
    throw new Error('Failed to sign out')
  }
}

/**
 * Get current user
 * @returns {Object|null} Current user or null
 */
export function getCurrentUser() {
  const user = auth.currentUser
  if (!user) return null
  
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified
  }
}

/**
 * Listen to auth state changes
 * @param {Function} callback 
 * @returns {Function} Unsubscribe function
 */
export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      })
    } else {
      callback(null)
    }
  })
}

/**
 * Send password reset email
 * @param {string} email 
 */
export async function resetPassword(email) {
  try {
    console.log('📧 Sending password reset email to:', email)
    await sendPasswordResetEmail(auth, email)
    console.log('✅ Password reset email sent')
  } catch (error) {
    console.error('❌ Password reset error:', error)
    throw new Error(getAuthErrorMessage(error.code))
  }
}

/**
 * Update user profile
 * @param {Object} data - { displayName, photoURL }
 */
export async function updateProfile(data) {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('No user logged in')
    
    console.log('✏️ Updating profile...')
    await firebaseUpdateProfile(user, data)
    
    // Update in Supabase
    await supabase
      .from('app_users')
      .update({
        full_name: data.displayName,
        avatar_url: data.photoURL,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.uid)
    
    console.log('✅ Profile updated')
  } catch (error) {
    console.error('❌ Profile update error:', error)
    throw new Error('Failed to update profile')
  }
}

/**
 * Sync user to Supabase database
 * @param {Object} user - Firebase user
 */
async function syncUserToDatabase(user) {
  try {
    console.log('💾 Syncing user to database...', user.uid)
    
    const freeCredits = parseInt(import.meta.env.VITE_FREE_TIER_CREDITS) || 10
    console.log('🎫 Free tier credits:', freeCredits)
    
    // Use database function instead of direct insert (bypasses API permissions)
    const { data, error } = await supabase
      .rpc('upsert_user', {
        p_id: user.uid,
        p_email: user.email,
        p_full_name: user.displayName || 'User',
        p_avatar_url: user.photoURL || null,
        p_subscription_tier: 'free',
        p_credits_remaining: freeCredits
      })
    
    if (error) {
      console.error('❌ Database sync error details:', error)
      throw error
    }
    
    console.log('✅ User synced to database:', data)
  } catch (error) {
    console.error('❌ Database sync error:', error)
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    console.error('Error details:', error.details)
    // Don't throw - auth should still work even if DB sync fails
  }
}

/**
 * Get user-friendly error message
 * @param {string} errorCode 
 * @returns {string} Error message
 */
function getAuthErrorMessage(errorCode) {
  const errorMessages = {
    'auth/email-already-in-use': 'This email is already registered. Try logging in instead.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/cancelled-popup-request': 'Sign-in cancelled.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
  }
  
  return errorMessages[errorCode] || 'Authentication failed. Please try again.'
}
