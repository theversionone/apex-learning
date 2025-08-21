import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { mountShadowRoot } from './mountShadowRoot';
import cssText from './tailwind.css?inline';

const ContentApp = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState('');

  const sendMessageToBackground = () => {
    chrome.runtime.sendMessage(
      { type: 'CONTENT_MESSAGE', data: 'Hello from content script!' },
      undefined,
      (response: any) => {
        setMessage('Response received!');
        setTimeout(() => setMessage(''), 2000);
      }
    );
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-lg"
      >
        Show Extension
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl p-4 w-80">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-slate-800">Extension Widget</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-slate-600 text-lg leading-none"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="text-xs text-slate-600">
          <p>Current URL:</p>
          <p className="font-mono text-xs mt-1 truncate">{window.location.href}</p>
        </div>
        
        <button
          onClick={sendMessageToBackground}
          className="w-full px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition-all"
        >
          Send Message to Background
        </button>
        
        {message && (
          <div className="text-xs text-green-600 text-center animate-pulse">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

const initContentScript = () => {
  const shadow = mountShadowRoot();
  
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);
  (shadow as any).adoptedStyleSheets = [sheet];
  
  const app = document.createElement('div');
  shadow.appendChild(app);
  
  createRoot(app).render(<ContentApp />);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContentScript);
} else {
  initContentScript();
}