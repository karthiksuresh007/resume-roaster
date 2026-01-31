/**
 * Analytics Utility
 * Track user events for analytics
 * Using Plausible Analytics (privacy-friendly)
 */

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {Object} props - Event properties
 */
export function trackEvent(eventName, props = {}) {
  // Check if Plausible is available
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props })
  } else {
    // Fallback to console in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics Event:', eventName, props)
    }
  }
}

/**
 * Track page view
 * @param {string} page - Page path
 */
export function trackPageView(page) {
  trackEvent('pageview', { page })
}

/**
 * Track upload start
 * @param {string} fileType - Type of file uploaded
 * @param {number} fileSize - Size of file in bytes
 */
export function trackUploadStart(fileType, fileSize) {
  trackEvent('upload_start', {
    file_type: fileType,
    file_size: Math.round(fileSize / 1024) + 'KB'
  })
}

/**
 * Track upload complete
 * @param {number} processingTime - Time taken to process in ms
 */
export function trackUploadComplete(processingTime) {
  trackEvent('upload_complete', {
    processing_time: processingTime + 'ms'
  })
}

/**
 * Track roast viewed
 * @param {number} atsScore - ATS score
 * @param {string} roastMode - Roast mode (mild/savage)
 */
export function trackRoastViewed(atsScore, roastMode) {
  trackEvent('roast_viewed', {
    ats_score: atsScore,
    roast_mode: roastMode
  })
}

/**
 * Track roast mode toggle
 * @param {string} fromMode - Previous mode
 * @param {string} toMode - New mode
 */
export function trackToggleRoastMode(fromMode, toMode) {
  trackEvent('toggle_roast_mode', {
    from_mode: fromMode,
    to_mode: toMode
  })
}

/**
 * Track fixes viewed
 * @param {number} scrollDepth - How far user scrolled (percentage)
 */
export function trackFixesViewed(scrollDepth) {
  trackEvent('fixes_viewed', {
    scroll_depth: scrollDepth + '%'
  })
}

/**
 * Track paywall shown
 * @param {number} atsScore - ATS score when paywall shown
 */
export function trackPaywallShown(atsScore) {
  trackEvent('paywall_shown', {
    ats_score: atsScore
  })
}

/**
 * Track payment initiated
 * @param {string} tier - Pricing tier (basic/pro)
 */
export function trackPaymentInitiated(tier) {
  trackEvent('payment_initiated', {
    tier: tier
  })
}

/**
 * Track payment completed
 * @param {number} amount - Amount paid
 * @param {string} tier - Pricing tier
 */
export function trackPaymentCompleted(amount, tier) {
  trackEvent('payment_completed', {
    amount: amount,
    tier: tier
  })
}

/**
 * Track share clicked
 * @param {string} platform - Social platform (twitter/linkedin)
 */
export function trackShareClicked(platform) {
  trackEvent('share_clicked', {
    platform: platform
  })
}

/**
 * Track error
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message
 */
export function trackError(errorType, errorMessage) {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage
  })
}
