# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome extension project built with React 19, TypeScript, and Tailwind CSS v4. The extension uses Manifest V3 and is configured with Vite for development with hot reload capabilities via @crxjs/vite-plugin.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

## Loading Extension in Chrome

1. Run `npm run build` to create the dist folder
2. Open Chrome → Extensions (`chrome://extensions/`)
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist` folder

## Architecture

### Core Components
- **Background Service Worker** (`src/background/`) - Handles extension lifecycle and cross-component communication
- **Popup** (`src/popup/`) - React app displayed when clicking extension icon
- **Options Page** (`src/options/`) - React app for extension settings
- **Content Script** (`src/content/`) - Injected into web pages with Shadow DOM isolation

### Key Libraries
- **Messaging** (`src/lib/messaging.ts`) - Type-safe message passing between extension components
- **Storage** (`src/lib/storage.ts`) - Chrome storage API wrapper with async/await interface

### Shadow DOM Integration
Content scripts use Shadow DOM for complete style isolation via `mountShadowRoot.ts`. This prevents conflicts between extension styles and host page styles.

### Build Configuration
- Uses `@crxjs/vite-plugin` for Chrome extension development
- TypeScript path alias `@/*` maps to `src/*`
- Tailwind CSS configured to scan `src/**/*.{html,ts,tsx}`
- Chrome APIs typed via `chrome-types` package

## Development Notes

- Hot reload works for popup/options pages automatically
- Content script changes require page refresh
- Background script changes trigger automatic extension reload
- Manifest changes may require manual extension reload
- All components communicate via typed message passing system