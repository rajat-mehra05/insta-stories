# Instagram Stories

A simplified Instagram Stories feature built with React and vanilla CSS. This mobile-first application allows users to view temporary photo posts in a story format with smooth navigation and auto-advance functionality.

## Features

- 📱 **Mobile-first design** - Optimized for mobile devices
- 📖 **Horizontal scrollable story list** - Browse available stories in thumbnails
- 👆 **Touch navigation** - Tap left/right sides to navigate between stories
- ⏰ **Auto-advance** - Stories automatically advance after 5 seconds
- 📊 **Progress indicators** - Visual progress bars showing current story status
- 🔴 **Unviewed story indicators** - Red borders for stories not yet viewed (auto-updates for viewed stories)
- 🔄 **Loading states** - Proper loading and error handling
- 🎨 **Smooth transitions** - Fluid animations for better UX
- ❌ **No external libraries** - Core functionality built from scratch

## Tech Stack

- **React 18** - Component-based UI framework
- **Vite** - Fast build tool and development server
- **Vanilla CSS** - Mobile-first responsive styling
- **JavaScript (ES6+)** - Modern JavaScript features

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

- Node.js (version 16 or higher)
- npm or yarn package manager

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

4. Open your browser and navigate to `http://localhost:5173`

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
5. **Navigate**: Tap the left side of the screen to go to the previous story, right side for next
6. **Auto-advance**: Stories automatically advance to the next one after 5 seconds
7. **Close**: Tap the X button or outside the story area to close the viewer

### Keyboard Navigation (Development)

- **Arrow Left**: Previous story
- **Arrow Right**: Next story
- **Escape**: Close story viewer

## Architecture Decisions

### Mobile-First Approach

- All styles start with mobile breakpoints
- Touch interactions prioritized over hover states
- Responsive design ensures proper scaling

### Component Structure

- **Modular Architecture**: StoryViewer broken into focused sub-components (Header, Content, Navigation)
- **Separation of Concerns**: Each component has a single, clear responsibility
- **Reusability**: Components designed for easy reuse and testing
- **Performance**: Minimal re-renders with proper state management and useCallback optimization

### Error Handling

- Network failure simulation with retry option
- Image loading error handling with fallbacks
- Graceful degradation for missing data
- **Timer Management**: Auto-advance timer only starts after image loads successfully

### Touch Interactions

- Custom touch zone detection (40% left/right areas)
- Prevents default browser behaviors
- Debounced interactions to avoid accidental navigation

## Browser Support

- Modern mobile browsers (iOS Safari, Chrome Mobile)
- Desktop browsers for development and testing
- Progressive enhancement for touch capabilities

## Future Enhancements

- **Real API Integration**: Replace mock data with actual API calls
- **Story Creation**: Add ability to create new stories
- **Persistence**: Save viewing progress and preferences
- **Offline Support**: Cache stories for offline viewing
- **Analytics**: Track story engagement metrics

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
