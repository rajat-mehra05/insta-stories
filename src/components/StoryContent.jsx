import React from 'react';

/**
 * Content area component for story viewer
 * Handles loading states and story image display
 */
const StoryContent = ({ story, isLoading, imageError, onImageLoad, onImageError }) => {
  return (
    <div className="story-content">
      {isLoading && (
        <div className="story-loading">
          <div className="loading-spinner"></div>
        </div>
      )}

      {imageError ? (
        <div className="story-error">
          <div className="error-icon">⚠️</div>
          <p>Failed to load story</p>
        </div>
      ) : (
        <img
          src={story.imageUrl}
          alt="Story"
          className={`story-image ${isLoading ? 'hidden' : ''}`}
          onLoad={onImageLoad}
          onError={onImageError}
        />
      )}
    </div>
  );
};

export default StoryContent;
