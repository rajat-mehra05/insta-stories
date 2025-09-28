import React from 'react';
import { formatTimeAgo } from '../utils/helpers';

/**
 * Horizontal scrollable list of story thumbnails
 * Shows user avatars and allows opening stories
 * Groups multiple stories per user
 */
const StoriesList = ({ stories, viewedStories, onStorySelect }) => {
  // Group stories by user
  const groupedStories = stories.reduce((acc, story, index) => {
    const userName = story.user.name;
    if (!acc[userName]) {
      acc[userName] = {
        user: story.user,
        stories: [],
        startIndex: index
      };
    }
    acc[userName].stories.push({ ...story, originalIndex: index });
    return acc;
  }, {});

  // Check if user has any unviewed stories
  const hasUnviewedStories = (userStories) => {
    return userStories.some(story => !viewedStories.has(story.id));
  };

  // Get the most recent story for display
  const getMostRecentStory = (userStories) => {
    return userStories.sort((a, b) => b.timestamp - a.timestamp)[0];
  };

  return (
    <div className="stories-list-container">
      <div className="stories-list">
        {Object.values(groupedStories).map((userGroup) => {
          const mostRecentStory = getMostRecentStory(userGroup.stories);
          const hasUnviewed = hasUnviewedStories(userGroup.stories);
          
          return (
            <div
              key={userGroup.user.name}
              className="story-card"
              onClick={() => onStorySelect(userGroup.startIndex)}
            >
              <div className="story-card-avatar">
                <img
                  src={userGroup.user.avatar}
                  alt={userGroup.user.name}
                  className="avatar-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/40x40/cccccc/666666?text=U';
                  }}
                />
                {hasUnviewed && <div className="unviewed-ring"></div>}
              </div>
              <div className="story-card-info">
                <span className="story-username">{userGroup.user.name}</span>
                <span className="story-timestamp">{formatTimeAgo(mostRecentStory.timestamp)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoriesList;
