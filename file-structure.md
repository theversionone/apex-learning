# File Structure for Apex Quiz Automation Extension

## Overview
Simple, focused file structure for a quiz automation Chrome extension. No unnecessary complexity, just the essentials for DOM scraping, AI integration, and basic UI.

## Planned Structure

```
src/
├── manifest.ts                 # Chrome extension manifest
├── background/
│   └── index.ts                # Background service worker
├── content/
│   ├── index.ts                # Main content script entry
│   ├── quiz-detector.ts        # Detect quiz pages and elements
│   ├── scraper.ts              # Extract questions/answers/images
│   └── automation.ts           # Handle quiz interactions
├── popup/
│   ├── index.html              # Popup HTML
│   ├── index.ts                # Popup script
│   └── styles.css              # Popup styles
├── lib/
│   ├── ai-providers.ts         # Google/GroqCloud API integrations
│   ├── storage.ts              # Chrome storage wrapper
│   └── types.ts                # TypeScript types
└── styles/
    └── content.css             # Content script styles
```

## File Purposes

### Core Extension Files
- **manifest.ts** - Extension configuration, permissions, entry points
- **background/index.ts** - Message routing, API calls, coordination between components

### Content Script (Quiz Automation)
- **content/index.ts** - Initialize content script, handle page detection
- **content/quiz-detector.ts** - Identify quiz elements, question types, navigation
- **content/scraper.ts** - Extract question text, images, answer options
- **content/automation.ts** - Fill answers, submit forms, handle timing

### User Interface
- **popup/** - Simple toggle controls, status display, settings access

### Utilities
- **lib/ai-providers.ts** - Handle API calls to Google/GroqCloud for question analysis
- **lib/storage.ts** - Store API keys, settings, quiz state
- **lib/types.ts** - Shared TypeScript interfaces

## Design Principles
1. **Simple & Focused** - Each file has one clear responsibility
2. **Easy to Debug** - Clear separation between detection, scraping, and automation
3. **Modular** - Can test each component independently
4. **Minimal Dependencies** - Use browser APIs and basic utilities only