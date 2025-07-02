# Video-Player

A modern, component-based video player built with Web Components and bundled with Webpack. This video player provides a customizable and reusable solution with various controls and features.

## Features

- 🎮 **Custom Video Controls**: Play/pause, seek bar, volume control, and fullscreen toggle
- 📱 **Responsive Design**: Adapts to different screen sizes with mobile-friendly controls
- ⌨️ **Keyboard Shortcuts**: Complete keyboard navigation support for accessibility
- 🎨 **Customizable Styling**: CSS custom properties for easy theming and customization
- 🔧 **Web Components Architecture**: Modular, reusable components that work across frameworks
- 📦 **Webpack Bundling**: Optimized build process for production deployment
- 🎯 **Center Overlay Controls**: Intuitive center button for play/pause and status feedback
- ⏱️ **Time Display**: Shows current time and total duration
- 🔊 **Advanced Volume Control**: Volume slider with mute toggle functionality

## Demo

The player includes:
- Interactive seekbar with click-to-seek functionality
- Responsive controls that hide/show on hover
- Fullscreen mode support
- Custom overlay button for visual feedback
- Professional styling with smooth animations

## Project Structure

```
Video-Player/
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation
├── webpack.config.js         # Webpack configuration
├── webpack-template.html     # HTML template for webpack
├── yarn.lock                # Yarn lock file
└── src/                     # Source code directory
    ├── icons/               # Icon definitions and assets
    │   └── icon-list.js     # Icon registry and definitions
    ├── images/              # Image assets
    │   └── Zoho-Desk-Sridhar-Vembu.jpg
    ├── js/                  # JavaScript source files
    │   ├── components/      # Web Components
    │   │   ├── common/      # Reusable common components
    │   │   │   ├── wc-button.js        # Generic button component
    │   │   │   ├── wc-range-slider.js  # Range slider component
    │   │   │   └── wc-svg-icon.js      # SVG icon component
    │   │   ├── video-controls/         # Video-specific controls
    │   │   │   ├── wc-fullscreen-button.js  # Fullscreen toggle
    │   │   │   ├── wc-play-button.js        # Play/pause button
    │   │   │   ├── wc-seekbar.js            # Video seekbar
    │   │   │   ├── wc-time-display.js       # Time display
    │   │   │   ├── wc-video-status.js       # Video status indicator
    │   │   │   └── wc-volume-control.js     # Volume control
    │   │   ├── wc-video-player.js           # Main video player component
    │   │   └── wc-video.js                  # Core video element wrapper
    │   ├── modules/                         # JavaScript modules
    │   │   ├── common/                      # Common utilities
    │   │   │   ├── render-text.js           # Text rendering utilities
    │   │   │   └── wd-event-handler.js      # Event handling utilities
    │   │   ├── video-manager.js             # Video state management
    │   │   └── video-shortcut-handler.js    # Keyboard shortcuts handler
    │   └── styles-entry.js                  # Styles entry point
    └── styles/                              # CSS stylesheets
        ├── main.css                         # Main stylesheet
        ├── video-controls.css               # Video controls styling
        └── video-player.css                 # Video player styling
```

## Component Architecture

### Core Components
- **`wc-video-player.js`**: Main video player container that orchestrates all other components
- **`wc-video.js`**: Core video element wrapper that handles video playback

### Video Controls
- **`wc-play-button.js`**: Play/pause functionality with icon state management
- **`wc-seekbar.js`**: Interactive progress bar with click-to-seek and scrubbing
- **`wc-volume-control.js`**: Volume slider with mute toggle and visual feedback
- **`wc-time-display.js`**: Current time and total duration display
- **`wc-fullscreen-button.js`**: Fullscreen mode toggle
- **`wc-video-status.js`**: Center overlay button for play/pause and status indicators

### Common Components
- **`wc-button.js`**: Reusable button component with customizable styling
- **`wc-range-slider.js`**: Generic range input component used for volume and seeking
- **`wc-svg-icon.js`**: SVG icon rendering component for UI icons

### Core Modules
- **`video-manager.js`**: Central state management for video playback, seeking, volume, and fullscreen
- **`video-shortcut-handler.js`**: Keyboard shortcuts and accessibility features
- **`wd-event-handler.js`**: Event delegation system for efficient event management

## Implemented Features

### Video Playback
- Play/pause functionality
- Automatic control hiding/showing
- Video state management
- Error handling and loading states

### Seeking & Progress
- Interactive seekbar with real-time updates
- Click-to-seek functionality
- Visual progress indication
- Time display (current/total duration)

### Audio Controls
- Volume slider (0-100%)
- Mute/unmute toggle
- Volume up/down with keyboard
- Visual volume feedback

### Fullscreen Support
- Toggle fullscreen mode
- Responsive controls in fullscreen
- Keyboard shortcut support

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `←` | Seek backward |
| `→` | Seek forward |
| `↑` | Volume up |
| `↓` | Volume down |
| `M` | Toggle mute |
| `F` | Toggle fullscreen |

### Responsive Design
- Mobile-friendly touch controls
- Adaptive control sizing
- Responsive typography
- Optimized for different screen sizes

## Technologies Used

- **Web Components**: Native browser components for encapsulation and reusability
- **Webpack 5**: Module bundling and build optimization
- **JavaScript (ES6+)**: Modern JavaScript features and modules
- **CSS3**: Advanced styling with custom properties and animations
- **SVG Icons**: Scalable vector graphics for UI elements

## Getting Started

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Build the project:**
   ```bash
   yarn build
   ```

3. **Development mode:**
   ```bash
   yarn dev
   ```

## Usage

The video player can be used as a web component in any HTML page:

```html
<wc-video-player 
    src="path/to/your/video.mp4"
    poster="path/to/poster.jpg"
    width="800"
    height="450">
</wc-video-player>
```

### Available Attributes
- `src`: Video source URL
- `poster`: Poster image URL  
- `width`: Player width
- `height`: Player height
- `autoplay`: Auto-play video (true/false)
- `loop`: Loop video playback (true/false)
- `muted`: Start with audio muted (true/false)
- `preload`: Preload strategy

## Styling

The player uses CSS custom properties for easy customization:

```css
:root {
    --wc-video-primary-color: #007bff;
    --wc-video-background-color: #000;
    --wc-video-text-color: #ffffff;
    --wc-video-border-radius: 8px;
    --wc-video-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
