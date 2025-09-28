import React from 'react';
import { formatTimeAgo } from '../utils/helpers';

/**
 * Header component for story viewer
 * Shows user info and close button
 */
const StoryHeader = ({ story, onClose }) => {
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
      <button className="story-close-btn" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};

export default StoryHeader;
