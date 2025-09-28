import React from 'react';
import { formatTimeAgo } from '../utils/helpers';

/**
 * Horizontal scrollable list of story thumbnails
 * Shows user avatars and allows opening stories
 */
const StoriesList = ({ stories, viewedStories, onStorySelect }) => {

  return (
    <div className="stories-list-container">
      <div className="stories-list">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="story-thumbnail"
            onClick={() => onStorySelect(index)}
          >
            <div className={`thumbnail-wrapper ${!viewedStories.has(story.id) ? 'unviewed' : ''}`}>
              <img
                src={story.thumbnailUrl}
                alt={`${story.user.name}'s story`}
                className="thumbnail-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x150/cccccc/666666?text=No+Image';
                }}
              />
              <div className="thumbnail-overlay">
                <img
                  src={story.user.avatar}
                  alt={story.user.name}
                  className="thumbnail-avatar"
                />
                <span className="thumbnail-username">{story.user.name}</span>
                <span className="thumbnail-time">{formatTimeAgo(story.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesList;
