/**
 * Resume Parser Utility
 * Extracts text from PDF and DOCX files
 */

/**
 * Parse PDF file and extract text
 * @param {File} file - PDF file to parse
 * @returns {Promise<string>} Extracted text
 */
export async function parsePDF(file) {
  // TODO: Implement PDF parsing
  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
        JOHN DOE
        Software Engineer
        
        SUMMARY
        Hardworking and motivated professional with experience in software development.
        
        EXPERIENCE
        Software Developer at Tech Company
        - Responsible for developing features
        - Responsible for fixing bugs
        - Responsible for code reviews
        
        SKILLS
        JavaScript, React, Node.js, Python, Java, C++, HTML, CSS
      `)
    }, 500)
  })
}

/**
 * Parse DOCX file and extract text
 * @param {File} file - DOCX file to parse
 * @returns {Promise<string>} Extracted text
 */
export async function parseDOCX(file) {
  // TODO: Implement DOCX parsing
  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
        JANE SMITH
        Product Manager
        
        SUMMARY
        Results-driven product manager with a passion for innovation.
        
        EXPERIENCE
        Product Manager at Startup Inc
        - Responsible for product strategy
        - Responsible for stakeholder management
        - Responsible for roadmap planning
        
        SKILLS
        Product Management, Agile, Scrum, Data Analysis
      `)
    }, 500)
  })
}

/**
 * Parse resume file based on type
 * @param {File} file - Resume file (PDF or DOCX)
 * @returns {Promise<string>} Extracted text
 */
export async function parseResume(file) {
  const fileType = file.type

  if (fileType === 'application/pdf') {
    return await parsePDF(file)
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return await parseDOCX(file)
  } else {
    throw new Error('Unsupported file type')
  }
}

/**
 * Validate file before parsing
 * @param {File} file - File to validate
 * @returns {Object} Validation result
 */
export function validateResumeFile(file) {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]

  if (!file) {
    return {
      valid: false,
      error: 'No file provided'
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 5MB limit'
    }
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'File must be PDF or DOCX format'
    }
  }

  return {
    valid: true
  }
}
