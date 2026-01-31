import { GoogleGenerativeAI } from '@google/generative-ai'
import { SYSTEM_PROMPT, ANALYSIS_PROMPT, FALLBACK_RESPONSE } from '../prompts/resumeAnalysis'

// Initialize Gemini API with v1 endpoint
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

if (!API_KEY) {
  console.error('❌ VITE_GEMINI_API_KEY is not set in .env file')
}

const genAI = new GoogleGenerativeAI(API_KEY)

/**
 * Analyze resume using Google Gemini API
 * @param {string} resumeText - Extracted resume text
 * @returns {Promise<Object>} Analysis result
 */
export async function analyzeResumeWithGemini(resumeText) {
  try {
    console.log('🤖 Calling Gemini API...')
    
    // Use gemini-2.5-flash (latest model, fast and efficient)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7, // Slightly lower for more consistent JSON
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096, // Increased to allow full response
      }
    })

    // Combine system prompt and analysis prompt
    const fullPrompt = `${SYSTEM_PROMPT}\n\n${ANALYSIS_PROMPT(resumeText)}`

    // Generate content
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    console.log('✅ Gemini API response received')
    console.log('Raw response:', text.substring(0, 200) + '...')

    // Parse JSON response
    const parsedResponse = parseGeminiResponse(text)
    
    // Validate response structure
    validateResponse(parsedResponse)

    return parsedResponse

  } catch (error) {
    console.error('❌ Gemini API error:', error)
    
    // Return fallback response on error
    console.warn('⚠️ Using fallback response')
    return FALLBACK_RESPONSE
  }
}

/**
 * Parse Gemini response (handles various formats)
 * @param {string} text - Raw response text
 * @returns {Object} Parsed JSON
 */
function parseGeminiResponse(text) {
  try {
    // Remove markdown code blocks if present
    let cleanText = text.trim()
    
    // Remove ```json and ``` if present
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?$/g, '')
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```\n?/g, '')
    }
    
    // Try to parse JSON directly
    try {
      const parsed = JSON.parse(cleanText)
      return parsed
    } catch (parseError) {
      // If parsing fails, try to fix common issues
      console.warn('⚠️ Initial JSON parse failed, attempting to fix...')
      
      // Try to find the last complete object by finding matching braces
      const lastCloseBrace = cleanText.lastIndexOf('}')
      if (lastCloseBrace > 0) {
        const truncatedText = cleanText.substring(0, lastCloseBrace + 1)
        
        // Try parsing the truncated version
        try {
          const parsed = JSON.parse(truncatedText)
          console.log('✅ Successfully parsed truncated JSON')
          return parsed
        } catch (truncError) {
          // Still failed, throw original error
          throw parseError
        }
      }
      
      throw parseError
    }

  } catch (error) {
    console.error('❌ JSON parse error:', error.message)
    console.error('Failed text (first 500 chars):', text.substring(0, 500))
    console.error('Failed text (last 200 chars):', text.substring(text.length - 200))
    throw new Error('Failed to parse AI response')
  }
}

/**
 * Validate response structure
 * @param {Object} response - Parsed response
 * @throws {Error} If response is invalid
 */
function validateResponse(response) {
  if (!response.atsScore || typeof response.atsScore.score !== 'number') {
    throw new Error('Invalid ATS score in response')
  }
  
  if (!response.roast || !response.roast.savage || !response.roast.mild) {
    throw new Error('Invalid roast in response')
  }
  
  if (!Array.isArray(response.fixes) || response.fixes.length === 0) {
    throw new Error('Invalid fixes in response')
  }

  // Ensure score is within range
  response.atsScore.score = Math.max(0, Math.min(100, response.atsScore.score))
  
  console.log('✅ Response validation passed')
}

/**
 * Test Gemini API connection
 * @returns {Promise<boolean>} Is API working
 */
export async function testGeminiConnection() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent('Say "API is working" if you can read this.')
    const response = await result.response
    const text = response.text()
    
    console.log('✅ Gemini API test successful:', text)
    return true
  } catch (error) {
    console.error('❌ Gemini API test failed:', error)
    return false
  }
}
