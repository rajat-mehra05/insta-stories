import React from 'react';

/**
 * Progress bars component for story viewer
 * Shows current progress and completed stories
 */
const StoryProgress = ({ totalStories, currentIndex, progress }) => {
  return (
    <div className="story-progress">
      {Array.from({ length: totalStories }, (_, index) => (
        <div
          key={index}
          className={`progress-bar ${index < currentIndex ? 'completed' : index === currentIndex ? 'active' : ''}`}
        >
          <div
            className="progress-fill"
            style={{
              width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default StoryProgress;
