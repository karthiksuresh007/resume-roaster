import * as pdfjsLib from 'pdfjs-dist'
import mammoth from 'mammoth'

// Configure PDF.js to use the build without worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

/**
 * Extract text from PDF file using pdfjs-dist
 * @param {File} file - PDF file
 * @returns {Promise<string>} Extracted text
 */
export async function extractFromPDF(file) {
  try {
    console.log('📄 Extracting text from PDF using pdfjs-dist...')
    
    const arrayBuffer = await file.arrayBuffer()
    
    // Load PDF document with worker disabled (use main thread)
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    })
    
    const pdf = await loadingTask.promise
    console.log(`📄 PDF loaded: ${pdf.numPages} pages`)
    
    let fullText = ''
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()
      
      // Combine all text items
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ')
      
      fullText += pageText + '\n\n'
      console.log(`✅ Page ${pageNum}: ${pageText.length} characters`)
    }
    
    // Clean up text
    fullText = fullText
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
    
    if (fullText.length < 100) {
      throw new Error('Could not extract enough text from PDF. It might be a scanned image or encrypted.')
    }
    
    console.log(`✅ Extracted ${fullText.length} characters from PDF`)
    console.log('Preview (first 300 chars):', fullText.substring(0, 300))
    
    return fullText
    
  } catch (error) {
    console.error('PDF extraction error:', error)
    
    // If pdfjs fails, fall back to simple extraction
    console.warn('⚠️ Falling back to simple PDF extraction...')
    return await extractFromPDFSimple(file)
  }
}

/**
 * Simple fallback PDF extraction
 * @param {File} file - PDF file
 * @returns {Promise<string>} Extracted text
 */
async function extractFromPDFSimple(file) {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    
    // Convert to string
    const decoder = new TextDecoder('utf-8', { fatal: false })
    const pdfText = decoder.decode(uint8Array)
    
    // Extract text from PDF streams
    let extractedText = ''
    
    // Extract text between parentheses (PDF text objects)
    const textMatches = pdfText.matchAll(/\((.*?)\)/g)
    for (const match of textMatches) {
      let text = match[1]
      // Clean up PDF escape sequences
      text = text
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\\(/g, '(')
        .replace(/\\\)/g, ')')
        .replace(/\\\\/g, '\\')
      
      // Only add if it looks like real text
      if (text.length > 1 && /[a-zA-Z]/.test(text)) {
        const specialCharRatio = (text.match(/[^a-zA-Z0-9\s.,!?@#$%&*()_+\-=[\]{};':"\\|,.<>/?]/g) || []).length / text.length
        if (specialCharRatio < 0.3) {
          extractedText += text + ' '
        }
      }
    }
    
    // Clean up
    extractedText = extractedText
      .replace(/\s+/g, ' ')
      .trim()
    
    if (extractedText.length < 100) {
      throw new Error('Could not extract enough text from PDF. It might be a scanned image or encrypted.')
    }
    
    console.log(`✅ Extracted ${extractedText.length} characters from PDF (simple method)`)
    console.log('Preview (first 300 chars):', extractedText.substring(0, 300))
    
    return extractedText
    
  } catch (error) {
    console.error('Simple PDF extraction error:', error)
    throw new Error('Failed to extract text from PDF. The file might be corrupted, password-protected, or a scanned image.')
  }
}

/**
 * Extract text from DOCX file
 * @param {File} file - DOCX file
 * @returns {Promise<string>} Extracted text
 */
export async function extractFromDOCX(file) {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    
    if (!result.value || result.value.trim().length === 0) {
      throw new Error('No text found in document')
    }
    
    console.log(`✅ Extracted ${result.value.length} characters from DOCX`)
    return result.value.trim()
  } catch (error) {
    console.error('DOCX extraction error:', error)
    throw new Error('Failed to extract text from DOCX. The file might be corrupted.')
  }
}

/**
 * Main text extraction function
 * Detects file type and extracts text accordingly
 * @param {File} file - Resume file (PDF or DOCX)
 * @returns {Promise<string>} Extracted text
 */
export async function extractText(file) {
  console.log('📄 Extracting text from:', file.name, file.type)
  
  const fileType = file.type
  
  if (fileType === 'application/pdf') {
    return await extractFromPDF(file)
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return await extractFromDOCX(file)
  } else {
    throw new Error(`Unsupported file type: ${fileType}`)
  }
}

/**
 * Validate extracted text
 * @param {string} text - Extracted text
 * @returns {boolean} Is valid
 */
export function validateExtractedText(text) {
  if (!text || text.trim().length === 0) {
    throw new Error('No text found in file. Is this a scanned image?')
  }
  
  if (text.trim().length < 100) {
    throw new Error('Resume seems too short. Please upload a complete resume.')
  }
  
  return true
}
