import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getTouchZone } from '../utils/helpers';
import StoryContent from './StoryContent';
import StoryHeader from './StoryHeader';
import StoryProgress from './StoryProgress';

/**
 * Instagram Stories wrapper component
 * Shows current story with adjacent story previews
 * Horizontal layout with story frames
 */
const StoryWrapper = ({ stories, initialIndex, onClose, onMarkViewed }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const wrapperRef = useRef(null);
  const startTimeRef = useRef(null);
  const pauseTimeRef = useRef(null);
  const totalPauseTimeRef = useRef(0);
  const isPausedRef = useRef(false);

  const currentStory = stories[currentIndex];
  const STORY_DURATION = 5000; // 5 seconds

  // Group stories by user to get correct progress count
  const getUserStories = (userName) => {
    return stories.filter(story => story.user.name === userName);
  };

  const currentUserStories = getUserStories(currentStory.user.name);
  const currentUserStoryIndex = currentUserStories.findIndex(story => story.id === currentStory.id);


  // Start timer only when image has loaded successfully
  const startStoryTimer = () => {
    // Clear any existing timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    startTimeRef.current = Date.now();
    totalPauseTimeRef.current = 0;

    // Start the main story timer
    const startMainTimer = () => {
      timerRef.current = setTimeout(() => {
        if (currentIndex < stories.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setProgress(0);
          setIsLoading(true);
          setImageError(false);
        } else {
          onClose();
        }
      }, STORY_DURATION);
    };

    startMainTimer();

    // Start progress tracking
    progressRef.current = setInterval(() => {
      if (startTimeRef.current && !isPausedRef.current) {
        const elapsed = Date.now() - startTimeRef.current - totalPauseTimeRef.current;
        const newProgress = (elapsed / STORY_DURATION) * 100;
        setProgress(Math.min(newProgress, 100));
      }
    }, 50);
  };

  // Pause/Resume functionality
  const togglePause = () => {
    if (isPaused) {
      // Resume - immediately resume
      if (pauseTimeRef.current) {
        totalPauseTimeRef.current += Date.now() - pauseTimeRef.current;
        pauseTimeRef.current = null;
      }
      setIsPaused(false);
      isPausedRef.current = false;
      
      // Restart the main timer with remaining time
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current - totalPauseTimeRef.current;
        const remainingTime = STORY_DURATION - elapsed;
        
        if (remainingTime > 0) {
          timerRef.current = setTimeout(() => {
            if (currentIndex < stories.length - 1) {
              setCurrentIndex(prev => prev + 1);
              setProgress(0);
              setIsLoading(true);
              setImageError(false);
            } else {
              onClose();
            }
          }, remainingTime);
        }
      }
    } else {
      // Pause - immediately pause
      pauseTimeRef.current = Date.now();
      setIsPaused(true);
      isPausedRef.current = true;
      
      // Clear the main timer immediately
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Cleanup timers when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  // Mark current story as viewed when it becomes active
  useEffect(() => {
    if (stories[currentIndex] && !isLoading) {
      onMarkViewed(stories[currentIndex].id);
    }
  }, [currentIndex, isLoading, onMarkViewed, stories]);

  // Handle image loading
  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
    // Start the timer only when image has loaded successfully
    startStoryTimer();
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  // Navigation handlers
  const navigateToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      // Clear existing timers before navigation
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);

      setCurrentIndex(prev => prev - 1);
      setProgress(0);
      setIsLoading(true);
      setImageError(false);
      setIsPaused(false);
      isPausedRef.current = false;
      totalPauseTimeRef.current = 0;
      pauseTimeRef.current = null;
    }
  }, [currentIndex]);

  const navigateToNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      // Clear existing timers before navigation
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);

      setCurrentIndex(prev => prev + 1);
      setProgress(0);
      setIsLoading(true);
      setImageError(false);
      setIsPaused(false);
      isPausedRef.current = false;
      totalPauseTimeRef.current = 0;
      pauseTimeRef.current = null;
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);


  // Touch event handlers
  const handleTouchStart = (e) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!wrapperRef.current) return;

    const zone = getTouchZone(e, wrapperRef.current);
    if (zone === 'left') {
      navigateToPrevious();
    } else if (zone === 'right') {
      navigateToNext();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Prevent multiple rapid key presses
      if (e.repeat) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateToNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigateToPrevious, navigateToNext, onClose]);


  return (
    <div className="story-wrapper-overlay" onClick={onClose}>
      <div
        className="story-wrapper"
        ref={wrapperRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Current Story */}
        <div className="story-main">
          <div className="story-frame">
            <StoryProgress
              totalStories={currentUserStories.length}
              currentIndex={currentUserStoryIndex}
              progress={progress}
              isPaused={isPaused}
            />
            <StoryHeader 
              story={currentStory} 
              onClose={onClose}
              isPaused={isPaused}
              onTogglePause={togglePause}
            />
            <StoryContent
              story={currentStory}
              isLoading={isLoading}
              imageError={imageError}
              onImageLoad={handleImageLoad}
              onImageError={handleImageError}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default StoryWrapper;
