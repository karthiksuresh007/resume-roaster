import { extractText, validateExtractedText } from '../utils/extractText'
import { analyzeResumeWithGemini } from './gemini'
import { trackUploadStart, trackUploadComplete, trackError } from '../utils/analytics'

/**
 * Main resume analysis function
 * Orchestrates text extraction and AI analysis
 * @param {File} file - Resume file (PDF or DOCX)
 * @returns {Promise<Object>} Analysis result
 */
export async function analyzeResume(file) {
  const startTime = Date.now()
  
  try {
    console.log('🚀 Starting resume analysis...')
    
    // Track upload start
    trackUploadStart(file.type, file.size)
    
    // Step 1: Extract text from file
    console.log('📄 Step 1: Extracting text...')
    const resumeText = await extractText(file)
    
    // Validate extracted text
    validateExtractedText(resumeText)
    
    console.log(`✅ Extracted ${resumeText.length} characters`)
    console.log('Preview:', resumeText.substring(0, 200) + '...')
    
    // Step 2: Analyze with AI
    console.log('🤖 Step 2: Analyzing with Gemini AI...')
    const analysis = await analyzeResumeWithGemini(resumeText)
    
    // Step 3: Add metadata
    const result = {
      ...analysis,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        analyzedAt: new Date().toISOString(),
        processingTime: Date.now() - startTime
      }
    }
    
    // Track completion
    const processingTime = Date.now() - startTime
    trackUploadComplete(processingTime)
    
    console.log(`✅ Analysis complete in ${processingTime}ms`)
    console.log('ATS Score:', result.atsScore.score)
    console.log('Fixes found:', result.fixes.length)
    
    return result

  } catch (error) {
    console.error('❌ Resume analysis failed:', error)
    
    // Track error
    trackError('analysis_failed', error.message)
    
    // Re-throw with user-friendly message
    throw new Error(getUserFriendlyError(error))
  }
}

/**
 * Convert technical errors to user-friendly messages
 * @param {Error} error - Original error
 * @returns {string} User-friendly message
 */
function getUserFriendlyError(error) {
  const message = error.message.toLowerCase()
  
  if (message.includes('pdf') || message.includes('extract')) {
    return '📄 We couldn\'t read your PDF. Is it password-protected or corrupted?'
  }
  
  if (message.includes('docx') || message.includes('document')) {
    return '📝 We couldn\'t read your DOCX file. Try saving it as a PDF instead?'
  }
  
  if (message.includes('no text') || message.includes('scanned')) {
    return '🖼️ This looks like a scanned image. We need a text-based resume (not a photo).'
  }
  
  if (message.includes('too short')) {
    return '📏 This resume seems too short. Did you upload the complete file?'
  }
  
  if (message.includes('api') || message.includes('network')) {
    return '☁️ Our AI is taking a coffee break. Try again in a moment?'
  }
  
  if (message.includes('rate limit')) {
    return '⏱️ Whoa, slow down! You\'ve hit the upload limit. Try again later.'
  }
  
  // Default error
  return '🔥 Something went wrong. Try uploading again, or contact support if this keeps happening.'
}

/**
 * Check if user has exceeded rate limit
 * @returns {boolean} Can upload
 */
export function checkRateLimit() {
  const MAX_UPLOADS = parseInt(import.meta.env.VITE_MAX_UPLOADS_PER_DAY) || 10
  const today = new Date().toDateString()
  
  // Get upload history from localStorage
  const history = JSON.parse(localStorage.getItem('uploadHistory') || '[]')
  
  // Filter uploads from today
  const todayUploads = history.filter(upload => 
    new Date(upload.date).toDateString() === today
  )
  
  if (todayUploads.length >= MAX_UPLOADS) {
    console.warn(`⚠️ Rate limit exceeded: ${todayUploads.length}/${MAX_UPLOADS}`)
    return false
  }
  
  return true
}

/**
 * Record upload in localStorage
 */
export function recordUpload() {
  const history = JSON.parse(localStorage.getItem('uploadHistory') || '[]')
  
  history.push({
    date: new Date().toISOString(),
    timestamp: Date.now()
  })
  
  // Keep only last 30 days
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
  const filtered = history.filter(upload => upload.timestamp > thirtyDaysAgo)
  
  localStorage.setItem('uploadHistory', JSON.stringify(filtered))
}

/**
 * Get remaining uploads for today
 * @returns {number} Remaining uploads
 */
export function getRemainingUploads() {
  const MAX_UPLOADS = parseInt(import.meta.env.VITE_MAX_UPLOADS_PER_DAY) || 10
  const today = new Date().toDateString()
  
  const history = JSON.parse(localStorage.getItem('uploadHistory') || '[]')
  const todayUploads = history.filter(upload => 
    new Date(upload.date).toDateString() === today
  )
  
  return Math.max(0, MAX_UPLOADS - todayUploads.length)
}
