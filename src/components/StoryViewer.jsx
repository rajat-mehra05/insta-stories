import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getTouchZone } from '../utils/helpers';
import StoryContent from './StoryContent';
import StoryHeader from './StoryHeader';
import StoryNavigation from './StoryNavigation';
import StoryProgress from './StoryProgress';

/**
 * Full-screen story viewer component
 * Handles navigation, auto-advance, and loading states
 */
const StoryViewer = ({ stories, initialIndex, onClose, onMarkViewed }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const viewerRef = useRef(null);
  const startTimeRef = useRef(null);

  const currentStory = stories[currentIndex];
  const STORY_DURATION = 5000; // 5 seconds

  // Start timer only when image has loaded successfully
  const startStoryTimer = () => {
    // Clear any existing timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    startTimeRef.current = Date.now();

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

    progressRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = (elapsed / STORY_DURATION) * 100;
        setProgress(Math.min(newProgress, 100));
      }
    }, 50);
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
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  // Touch event handlers
  const handleTouchStart = (e) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!viewerRef.current) return;

    const zone = getTouchZone(e, viewerRef.current);
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
    <div className="story-viewer-overlay" onClick={onClose}>
      <div
        className="story-viewer"
        ref={viewerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <StoryProgress
          totalStories={stories.length}
          currentIndex={currentIndex}
          progress={progress}
        />
        <StoryHeader story={currentStory} onClose={onClose} />
        <StoryContent
          story={currentStory}
          isLoading={isLoading}
          imageError={imageError}
          onImageLoad={handleImageLoad}
          onImageError={handleImageError}
        />
        <StoryNavigation
          onPrevious={navigateToPrevious}
          onNext={navigateToNext}
        />
      </div>
    </div>
  );
};

export default StoryViewer;
