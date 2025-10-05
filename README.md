# Preview

### Before viewing the stories:

<img width="432" height="195" alt="image" src="https://github.com/user-attachments/assets/30488879-ece1-40ec-be1d-724de9307955" />

<br />

### After viewing the stories:

<img width="433" height="202" alt="image" src="https://github.com/user-attachments/assets/397fb064-a901-4c81-a73a-afc3e81126aa" />


# Instagram Stories

A modern Instagram Stories feature built with React 19 and vanilla CSS. This mobile-exclusive application provides a complete story viewing experience with advanced touch navigation, pause/resume controls, and real-time progress tracking. Features include video support, smart auto-advance, and comprehensive error handling.

## Features

- 📱 **Mobile-first design** - Optimized exclusively for mobile devices with strict viewport detection
- 📖 **Horizontal scrollable story list** - Browse available stories in thumbnails with smooth scrolling
- 👆 **Advanced touch navigation** - Precise touch zone detection (40% left/right areas) for story navigation
- ⏰ **Smart auto-advance** - Stories automatically advance after 5 seconds with pause/resume functionality
- ⏸️ **Pause/Resume controls** - Tap to pause stories, tap again to resume with accurate timing
- 📊 **Multi-story progress indicators** - Visual progress bars showing current story status within user's story collection
- 🔴 **Dynamic unviewed indicators** - Red borders for stories not yet viewed (auto-updates in real-time)
- 🔄 **Robust loading states** - Comprehensive loading and error handling with retry mechanisms
- 🎥 **Video support** - Full support for both image and video story content
- 🎨 **Smooth transitions** - Fluid animations and transitions for enhanced UX
- ⌨️ **Keyboard navigation** - Arrow keys and Escape for development/testing
- 🚫 **Mobile-only enforcement** - Strict mobile device detection with desktop warning
- ❌ **Zero external dependencies** - Core functionality built entirely from scratch

## Tech Stack

- **React 19** - Latest component-based UI framework with enhanced performance
- **Vite 7** - Ultra-fast build tool and development server
- **ESLint 9** - Modern JavaScript linting with flat config
- **Vanilla CSS** - Mobile-first responsive styling
- **JavaScript (ES2020+)** - Modern JavaScript features with latest syntax

## Project Structure

```
src/
├── components/
│   ├── StoriesList.jsx        # Horizontal scrollable story thumbnails
│   ├── StoryViewer.jsx        # Main story viewer container & logic
│   ├── StoryProgress.jsx      # Progress bars component
│   ├── StoryHeader.jsx        # Story header with user info
│   ├── StoryContent.jsx       # Story content with loading states
│   └── StoryNavigation.jsx    # Touch navigation zones
├── data/
│   └── stories.js             # Mock story data
├── utils/
│   └── helpers.js             # Utility functions
├── App.jsx                    # Main application component
├── App.css                    # Application styles
├── index.css                  # Global styles
└── main.jsx                   # Application entry point
```

## Getting Started

### Prerequisites

- **Node.js** (version 18 or higher) - Required for React 19 and Vite 7
- **npm** (version 9 or higher) or **yarn** package manager
- **Modern mobile browser** for testing (iOS Safari 14+, Chrome Mobile 90+)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd instagram-stories
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. **Important**: Open your mobile browser and navigate to `http://localhost:5173`
   - The app is designed exclusively for mobile devices
   - Desktop browsers will show a warning message
   - Use your phone's browser or mobile device emulation for testing

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

### Viewing Stories

1. **Story List**: Browse available stories in the horizontal scrollable list at the top
2. **Visual Indicators**: Stories with red borders haven't been viewed yet
3. **Open Story**: Tap on any story thumbnail to open the full-screen viewer (removes red border)
4. **Auto-Updates**: Stories viewed via auto-advance or navigation also lose their red borders
5. **Navigate**: Tap the left side of the screen (40% area) to go to the previous story, right side for next
6. **Pause/Resume**: Tap anywhere on the story to pause, tap again to resume with accurate timing
7. **Auto-advance**: Stories automatically advance to the next one after 5 seconds (when not paused)
8. **Progress Tracking**: Visual progress bars show current story status within the user's story collection
9. **Close**: Tap the X button or outside the story area to close the viewer

### Keyboard Navigation (Development)

- **Arrow Left**: Previous story
- **Arrow Right**: Next story
- **Escape**: Close story viewer

## Architecture Decisions

### Mobile-First Approach

- **Strict Mobile Detection**: Viewport-based detection (≤480px) with user agent validation
- **Touch-First Design**: All interactions optimized for touch with precise zone detection
- **Responsive Scaling**: Fluid design that adapts to various mobile screen sizes
- **Desktop Restriction**: Enforced mobile-only access with informative desktop warning

### Component Architecture

- **Modular Design**: StoryWrapper orchestrates focused sub-components (Header, Content, Progress, Navigation)
- **Single Responsibility**: Each component handles one specific aspect of the story experience
- **React 19 Optimizations**: Leverages latest React features for enhanced performance
- **State Management**: Centralized state with proper separation of concerns
- **Memory Management**: Comprehensive cleanup of timers and event listeners

### Advanced Timer Management

- **Smart Timing**: Auto-advance timer only starts after successful content loading
- **Pause/Resume Logic**: Accurate timing preservation during pause states
- **Progress Tracking**: Real-time progress updates with 50ms intervals
- **Cleanup**: Proper timer cleanup to prevent memory leaks

### Touch Interaction System

- **Precise Zone Detection**: 40% left/right touch zones for navigation
- **Event Prevention**: Proper touch event handling to prevent browser defaults
- **Debounced Navigation**: Prevents accidental rapid navigation
- **Cross-Platform**: Consistent behavior across iOS and Android

### Error Handling & Resilience

- **Network Resilience**: Simulated network failures with retry mechanisms
- **Content Loading**: Graceful handling of image/video loading failures
- **Fallback States**: Proper error states with user-friendly messages
- **Data Validation**: Robust handling of missing or malformed story data

### Modern JavaScript Features

- **ES2020+ Syntax**: Latest JavaScript features including optional chaining and nullish coalescing
- **ESLint 9 Configuration**: Modern flat config with React hooks and refresh plugins
- **TypeScript Support**: Optional TypeScript definitions for enhanced development experience
- **Vite 7 Integration**: Ultra-fast development server with HMR and optimized builds

## Browser Support

### Mobile Browsers (Primary)

- **iOS Safari** 14+ (iOS 14+)
- **Chrome Mobile** 90+ (Android 8+)
- **Samsung Internet** 13+
- **Firefox Mobile** 88+

### Desktop Browsers (Development Only)

- **Chrome** 90+ (for development and testing)
- **Firefox** 88+ (for development and testing)
- **Safari** 14+ (for development and testing)
- **Edge** 90+ (for development and testing)

### Features

- **Touch Support**: Full touch interaction support on mobile devices
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Responsive Design**: Optimized for mobile viewports (≤480px)
- **Modern JavaScript**: ES2020+ features with proper polyfills

## React 19 Features

This project leverages the latest React 19 capabilities:

- **Enhanced Performance**: Improved rendering and state management
- **Modern Hooks**: Latest React hooks with optimized re-rendering
- **Better Memory Management**: Automatic cleanup and garbage collection
- **Improved Developer Experience**: Better debugging and development tools
- **Future-Ready**: Built with the latest React patterns and best practices

## Future Enhancements

- **Real API Integration**: Replace mock data with actual API calls
- **Story Creation**: Add ability to create new stories with media upload
- **Persistence**: Save viewing progress and user preferences
- **Offline Support**: Cache stories for offline viewing with service workers
- **Analytics**: Track story engagement metrics and user behavior
- **Push Notifications**: Real-time notifications for new stories
- **Social Features**: Like, comment, and share functionality
- **Advanced Media**: Support for 360° photos and AR filters

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
