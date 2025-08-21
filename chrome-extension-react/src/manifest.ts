import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'My React Chrome Extension',
  version: '1.0.0',
  description: 'A modern Chrome extension built with React, TypeScript, and Tailwind CSS',
  
  action: { 
    default_popup: 'src/popup/index.html',
    default_icon: {
      '16': 'icons/icon16.svg',
      '32': 'icons/icon32.svg',
      '48': 'icons/icon48.svg',
      '128': 'icons/icon128.svg'
    }
  },
  
  background: { 
    service_worker: 'src/background/index.ts',
    type: 'module'
  },
  
  options_page: 'src/options/index.html',
  
  icons: {
    '16': 'icons/icon16.svg',
    '32': 'icons/icon32.svg',
    '48': 'icons/icon48.svg',
    '128': 'icons/icon128.svg',
  },
  
  permissions: [
    'storage',
    'tabs'
  ],
  
  host_permissions: [],
  
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/main.tsx'],
      run_at: 'document_idle',
    },
  ],
  
  web_accessible_resources: [
    {
      resources: ['assets/*', 'icons/*'],
      matches: ['<all_urls>'],
    },
  ],
});