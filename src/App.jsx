import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import StoriesList from './components/StoriesList';
import StoryWrapper from './components/StoryWrapper';
import { stories } from './data/stories';
import { isMobile as checkIsMobile, fetchStoriesData } from './utils/helpers';

/**
 * Main Instagram Stories application
 * Handles story data fetching and viewer state management
 */
function App() {
  const [storyData, setStoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [viewedStories, setViewedStories] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false); // Start with false, let useEffect determine

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = checkIsMobile();
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch stories data (simulating external file fetch)
  useEffect(() => {
    const fetchStories = async () => {
      const result = await fetchStoriesData(stories);
      
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        setStoryData(result.data);
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleStorySelect = (index) => {
    setCurrentStoryIndex(index);
    setViewerOpen(true);
    // Mark story as viewed when opened
    setViewedStories(prev => new Set([...prev, storyData[index]?.id]));
  };

  const markStoryAsViewed = useCallback((storyId) => {
    setViewedStories(prev => new Set([...prev, storyId]));
  }, []);

  const handleCloseViewer = () => {
    setViewerOpen(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading stories...</p>
      </div>
    );
  }

  if (!isMobile) {
      return (
        <div className="mobile-only-warning">
          <h3>Hi there! 👋 </h3>
          <p>This Instagram Stories app is designed exclusively for mobile phones.</p>
          <p>Please access this app on a mobile phone (not tablet or desktop).</p>
        </div>
      );
  }

  // Error state
  if (error) {
    return (
      <div className="app-error">
        <div className="error-icon">⚠️</div>
        <h2>Oops!</h2>
        <p>{error}</p>
        <button
          className="retry-btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Instagram Stories</h1>
      </header>

      <main className="app-main">
        <StoriesList
          stories={storyData}
          viewedStories={viewedStories}
          onStorySelect={handleStorySelect}
        />
      </main>

      {viewerOpen && (
        <StoryWrapper
          stories={storyData}
          initialIndex={currentStoryIndex}
          onClose={handleCloseViewer}
          onMarkViewed={markStoryAsViewed}
        />
      )}
    </div>
  );
}

export default App;
