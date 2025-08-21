# Chrome Extension - React + TypeScript + Tailwind CSS

A modern Chrome extension built with React, TypeScript, and Tailwind CSS using Vite and Manifest V3.

## Features

- React 19 with TypeScript
- Tailwind CSS v4 with PostCSS
- Vite build system with @crxjs/vite-plugin for hot reload
- Manifest V3 compliant
- Shadow DOM for content script style isolation
- Background service worker
- Popup and options pages
- Message passing between components
- Chrome storage API integration

## Development

### Prerequisites
- Node.js 18+ 
- Chrome browser

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server with hot reload:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

### Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the `dist` folder from this project
5. The extension should now be loaded and visible in your extensions bar

### Development Workflow

1. Run `npm run dev` to start the development server
2. The extension will auto-reload when you make changes
3. For popup/options pages: Changes will hot reload automatically
4. For content scripts: The page will need to be refreshed
5. For background scripts: The extension will reload automatically

## Project Structure

```
├── dist/                 # Built extension (load this in Chrome)
├── public/
│   └── icons/           # Extension icons
├── src/
│   ├── background/      # Background service worker
│   ├── popup/          # Popup UI (React app)
│   ├── options/        # Options page (React app)
│   ├── content/        # Content script with Shadow DOM
│   ├── lib/            # Shared utilities (messaging, storage)
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript declarations
│   └── manifest.ts     # Extension manifest configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.cjs
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run type-check` - Run TypeScript type checking

## Testing the Extension

1. Click the extension icon in Chrome to open the popup
2. Test the counter functionality
3. Click "Open Options" to view the options page
4. Click "Test Message" to test message passing to the background script
5. Visit any website to see the content script widget in the top-right corner
6. Check the Chrome DevTools console for background script logs

## Features Included

### Popup
- Display current tab information
- Interactive counter demo
- Button to open options page
- Message sending to background script

### Options Page
- Settings management with Chrome storage sync
- Theme selection
- Notification preferences
- Auto-start settings
- API key configuration

### Content Script
- Isolated styles using Shadow DOM
- Floating widget on web pages
- Message passing to background
- Show/hide functionality

### Background Service Worker
- Message handling
- Extension lifecycle events
- Cross-component communication

## Notes

- The extension uses SVG placeholder icons. For production, convert to PNG format for better compatibility
- Content scripts use Shadow DOM for complete style isolation
- All TypeScript types are properly configured for Chrome APIs
- Hot reload works for most changes, but some manifest changes require manual reload

## Troubleshooting

1. If the extension doesn't load:
   - Make sure you've run `npm run build` first
   - Check that you're loading the `dist` folder, not the project root
   - Ensure Developer mode is enabled in Chrome

2. If styles aren't working:
   - Check that Tailwind classes are being compiled
   - Verify PostCSS configuration is correct
   - For content scripts, ensure Shadow DOM is properly initialized

3. If hot reload isn't working:
   - Try manually reloading the extension
   - Check the console for any build errors
   - Some changes (like manifest updates) require manual reload