import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { scaleIn } from '../../utils/animations'
import { analyzeResume } from '../../services/resumeAnalyzer'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../config/supabase'

/**
 * UploadZone Component
 * Drag & drop file upload with validation
 * States: idle, hover, dragging, processing, error
 * Accepts: PDF, DOCX (max 5MB)
 */
function UploadZone({ className = '' }) {
    const [isDragging, setIsDragging] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState(null)
    const [file, setFile] = useState(null)
    const fileInputRef = useRef(null)
    const navigate = useNavigate()
    const { user, userProfile, hasCredits, deductCredit } = useAuth()

    // File validation
    const validateFile = (file) => {
        const maxSize = 5 * 1024 * 1024 // 5MB
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]

        if (file.size > maxSize) {
            return {
                valid: false,
                error: {
                    emoji: '🚫',
                    title: 'Whoa there! Your resume is bigger than your ambitions.',
                    subtitle: 'Keep it under 5MB'
                }
            }
        }

        if (!allowedTypes.includes(file.type)) {
            return {
                valid: false,
                error: {
                    emoji: '📄',
                    title: 'We need a PDF or DOCX. Screenshots don\'t count.',
                    subtitle: 'Upload a proper resume file'
                }
            }
        }

        return { valid: true }
    }

    // Handle file selection
    const handleFile = (selectedFile) => {
        console.log('📁 File selected:', selectedFile.name, selectedFile.type, selectedFile.size)
        setError(null)

        // Check if user is logged in
        if (!user) {
            setError({
                emoji: '🔐',
                title: 'Hold up! You need to sign in first.',
                subtitle: 'Create a free account to roast your resume'
            })
            setTimeout(() => navigate('/signup'), 2000)
            return
        }

        // Check if user has credits
        if (!hasCredits()) {
            setError({
                emoji: '💳',
                title: 'Out of credits! Time to upgrade.',
                subtitle: `You've used all ${userProfile?.subscription_tier === 'free' ? '10 free' : 'your'} analyses`
            })
            setTimeout(() => navigate('/pricing'), 2000)
            return
        }

        const validation = validateFile(selectedFile)

        if (!validation.valid) {
            console.log('❌ Validation failed:', validation.error)
            setError(validation.error)
            return
        }

        console.log('✅ Validation passed, processing file...')
        setFile(selectedFile)
        processFile(selectedFile)
    }

    // Process file with REAL AI and save to database
    const processFile = async (file) => {
        console.log('⚡ Processing file:', file.name)

        setIsProcessing(true)

        try {
            // Analyze resume with real AI
            const analysis = await analyzeResume(file)

            // Save resume to Supabase Storage
            const resumePath = `${user.uid}/${Date.now()}_${file.name}`
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(resumePath, file)

            if (uploadError) {
                console.error('❌ Storage upload error:', uploadError)
                throw new Error('Failed to save resume')
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(resumePath)

            // Save resume record to database using function
            const resumeData = await supabase
                .rpc('insert_resume', {
                    p_user_id: user.uid,
                    p_file_name: file.name,
                    p_file_url: publicUrl,
                    p_file_type: file.type === 'application/pdf' ? 'pdf' : 'docx',
                    p_file_size: file.size
                })

            if (resumeData.error) {
                console.error('❌ Resume save error:', resumeData.error)
                throw new Error('Failed to save resume record')
            }

            // Save analysis to database using function
            const analysisData = await supabase
                .rpc('insert_analysis', {
                    p_user_id: user.uid,
                    p_resume_id: resumeData.data.id,
                    p_ats_score: analysis.atsScore.score,
                    p_ats_breakdown: analysis.atsScore.breakdown,
                    p_roast_savage: analysis.roast.savage,
                    p_roast_mild: analysis.roast.mild,
                    p_fixes: analysis.fixes,
                    p_roast_mode: 'savage',
                    p_processing_time: analysis.metadata.processingTime
                })

            if (analysisData.error) {
                console.error('❌ Analysis save error:', analysisData.error)
                throw new Error('Failed to save analysis')
            }

            // Deduct credit
            await deductCredit()

            // Track activity using function
            await supabase
                .rpc('insert_user_activity', {
                    p_user_id: user.uid,
                    p_action: 'analyze',
                    p_metadata: {
                        file_name: file.name,
                        ats_score: analysis.atsScore.score
                    }
                })

            console.log('✅ Analysis complete, navigating to results...')
            setIsProcessing(false)

            // Navigate to results page with real data
            navigate('/results', {
                state: {
                    analysis,
                    fileName: file.name
                }
            })
        } catch (error) {
            console.error('❌ Processing failed:', error)
            setIsProcessing(false)
            setError({
                emoji: '💥',
                title: error.message || 'Analysis failed',
                subtitle: 'Please try again or contact support'
            })
        }
    }

    // Drag and drop handlers
    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) {
            handleFile(droppedFile)
        }
    }

    // Click to upload
    const handleClick = () => {
        if (!isProcessing) {
            fileInputRef.current?.click()
        }
    }

    const handleFileInput = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            handleFile(selectedFile)
        }
    }

    // Determine card state classes
    const getCardClasses = () => {
        const baseClasses = 'glass-card rounded-3xl p-12 border-2 transition-all duration-300 cursor-pointer relative overflow-hidden'

        if (isProcessing) {
            return `${baseClasses} border-solid border-neon-orange glow-orange`
        }

        if (error) {
            return `${baseClasses} border-solid border-neon-red glow-red animate-shake`
        }

        if (isDragging) {
            return `${baseClasses} border-solid border-neon-pink glow-pink scale-105`
        }

        return `${baseClasses} border-dashed border-glass-border hover:border-neon-pink hover:glow-pink hover:-translate-y-1`
    }

    return (
        <motion.div
            className={`max-w-2xl mx-auto ${className}`}
            {...scaleIn}
        >
            <div
                className={getCardClasses()}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                role="button"
                aria-label="Upload resume file, PDF or DOCX, maximum 5 megabytes"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleClick()
                    }
                }}
            >
                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileInput}
                    className="hidden"
                    aria-hidden="true"
                />

                <AnimatePresence mode="wait">
                    {isProcessing ? (
                        // Processing State
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center"
                        >
                            <div className="text-6xl mb-4 animate-pulse">⚡</div>
                            <h3 className="text-[24px] font-bold text-text-primary mb-2">
                                Reading resume…
                            </h3>
                            <p className="text-[13px] text-text-muted">
                                Judging life choices…
                            </p>
                            <div className="mt-6">
                                <div className="spinner mx-auto" />
                            </div>
                        </motion.div>
                    ) : error ? (
                        // Error State
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center"
                        >
                            <div className="text-6xl mb-4">{error.emoji}</div>
                            <h3 className="text-[24px] font-bold text-neon-red mb-2">
                                {error.title}
                            </h3>
                            <p className="text-[13px] text-text-muted mb-6">
                                {error.subtitle}
                            </p>
                            <Button
                                variant="secondary"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setError(null)
                                }}
                            >
                                Try Again
                            </Button>
                        </motion.div>
                    ) : (
                        // Idle/Hover State
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center"
                        >
                            <div className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">
                                {isDragging ? '🔥' : '🔥📄'}
                            </div>
                            <h3 className="text-[24px] font-bold text-text-primary mb-2">
                                {isDragging ? 'Drop it like it\'s hot!' : 'Drop your resume here'}
                            </h3>
                            <p className="text-[13px] text-text-muted mb-6">
                                PDF or DOCX • Max 5MB
                            </p>
                            <Button variant="primary">
                                Roast Me 🔥
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulsing border animation for idle state */}
                {!isProcessing && !error && !isDragging && (
                    <div className="absolute inset-0 rounded-3xl border-2 border-neon-pink opacity-0 hover:opacity-20 animate-pulse-border pointer-events-none" />
                )}
            </div>

            {/* Mobile: Fixed bottom CTA (optional, can be enabled for mobile) */}
            {/* <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-bg-primary border-t border-glass-border">
        <Button variant="primary" className="w-full" onClick={handleClick}>
          Upload Resume
        </Button>
      </div> */}
        </motion.div>
    )
}

export default UploadZone
