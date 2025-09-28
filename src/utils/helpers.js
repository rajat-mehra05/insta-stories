/**
 * Utility functions for Instagram Stories feature
 */

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if device is mobile (strict mobile phones only)
 * @returns {boolean} True if mobile device
 */
export const isMobile = () => {
  return window.innerWidth <= 480;
};

/**
 * Check if device is mobile with detailed detection
 * @returns {Object} Mobile detection details
 */
export const getMobileDetection = () => {
  const isMobileUserAgent =
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isMobileViewport = window.innerWidth <= 480;

  return {
    userAgent: navigator.userAgent,
    windowWidth: window.innerWidth,
    isMobileUserAgent,
    isMobileViewport,
    isMobile: isMobileViewport, // Only use viewport for strict mobile
  };
};

/**
 * Format timestamp to relative time
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted time string
 */
export const formatTimeAgo = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return "Just now";
};

/**
 * Preload images for better performance
 * @param {string[]} urls - Array of image URLs to preload
 * @returns {Promise} Promise that resolves when all images are loaded
 */
export const preloadImages = (urls) => {
  const promises = urls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(url);
      img.src = url;
    });
  });
  return Promise.allSettled(promises);
};

/**
 * Handle touch events for navigation
 * @param {TouchEvent} event - Touch event
 * @param {HTMLElement} element - Element to check
 * @returns {string|null} 'left', 'right', or null
 */
export const getTouchZone = (event, element) => {
  const rect = element.getBoundingClientRect();
  const touch = event.touches[0] || event.changedTouches[0];
  const x = touch.clientX - rect.left;
  const width = rect.width;

  // Left zone: first 40% of screen
  if (x < width * 0.4) return "left";
  // Right zone: last 40% of screen
  if (x > width * 0.6) return "right";

  return null;
};

/**
 * Fetch stories data with loading simulation
 * @param {Array} stories - Stories data array
 * @returns {Promise<Object>} Promise with stories data or error
 */
export const fetchStoriesData = async (stories) => {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, this would be: fetch('/api/stories.json')
    return { data: stories, error: null };
  } catch {
    return { data: [], error: "Failed to load stories. Please try again." };
  }
};

/**
 * Create a story timer with progress tracking
 * @param {Object} refs - Object containing timerRef, progressRef, startTimeRef
 * @param {Function} onComplete - Callback when timer completes
 * @param {number} duration - Timer duration in milliseconds
 * @returns {Function} Function to start the timer
 */
export const createStoryTimer = (refs, onComplete, duration = 5000) => {
  const { timerRef, progressRef, startTimeRef } = refs;

  return () => {
    // Clear any existing timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    startTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      onComplete();
    }, duration);

    progressRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = (elapsed / duration) * 100;
        // This would need to be handled by the component
        return Math.min(newProgress, 100);
      }
    }, 50);
  };
};
