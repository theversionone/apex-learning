import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'Apex Quiz Automation',
  version: '1.0.0',
  description: 'Automate Apex Learning quizzes with AI-powered question analysis',
  
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
  
  icons: {
    '16': 'icons/icon16.svg',
    '32': 'icons/icon32.svg',
    '48': 'icons/icon48.svg',
    '128': 'icons/icon128.svg',
  },
  
  permissions: [
    'storage',
    'tabs',
    'activeTab'
  ],
  
  host_permissions: [
    '*://*.apexlearning.com/*',
    '*://course.apexlearning.com/*'
  ],
  
  content_scripts: [
    {
      matches: ['*://*.apexlearning.com/*', '*://course.apexlearning.com/*'],
      js: ['src/content/index.ts'],
      run_at: 'document_idle',
    },
  ],
  
  web_accessible_resources: [
    {
      resources: ['assets/*', 'icons/*'],
      matches: ['*://*.apexlearning.com/*', '*://course.apexlearning.com/*'],
    },
  ],
});