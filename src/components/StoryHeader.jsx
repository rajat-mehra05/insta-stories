import React from 'react';
import { formatTimeAgo } from '../utils/helpers';

/**
 * Header component for story viewer
 * Shows user info, controls, and close button
 */
const StoryHeader = ({ story, onClose, isPaused, onTogglePause }) => {
  return (
    <div className="story-header">
      <div className="story-user">
        <img
          src={story.user.avatar}
          alt={story.user.name}
          className="story-avatar"
        />
        <div className="story-user-info">
          <span className="story-username">{story.user.name}</span>
          <span className="story-timestamp">{formatTimeAgo(story.timestamp)}</span>
        </div>
      </div>
      <div className="story-controls">
        <button className="story-pause-btn" onClick={onTogglePause}>
          {isPaused ? '▶️' : '⏸️'}
        </button>
        <button className="story-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default StoryHeader;
