import React from 'react';

/**
 * Navigation component for story viewer
 * Provides touch/click zones for left/right navigation
 */
const StoryNavigation = ({ onPrevious, onNext }) => {
  return (
    <div className="story-navigation">
      <div className="nav-zone left-zone" onClick={onPrevious}>
        <div className="nav-arrow">‹</div>
      </div>
      <div className="nav-zone right-zone" onClick={onNext}>
        <div className="nav-arrow">›</div>
      </div>
    </div>
  );
};

export default StoryNavigation;
