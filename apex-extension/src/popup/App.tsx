import React, { useState, useEffect } from 'react';

function App() {
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        setCurrentTab(tabs[0]);
      }
    });
  }, []);

  return (
    <div className="w-96 min-h-[400px] p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          React Chrome Extension
        </h1>
        <p className="text-sm text-slate-600">
          Built with React, TypeScript & Tailwind CSS
        </p>
      </header>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-sm font-semibold text-slate-700 mb-2">Current Tab</h2>
          <p className="text-xs text-slate-600 truncate">
            {currentTab?.title || 'Loading...'}
          </p>
          <p className="text-xs text-slate-500 truncate mt-1">
            {currentTab?.url || ''}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">Counter Demo</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCount(count - 1)}
              className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded transition-colors"
            >
              -
            </button>
            <span className="text-xl font-bold text-slate-800 min-w-[40px] text-center">
              {count}
            </span>
            <button
              onClick={() => setCount(count + 1)}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => chrome.runtime.openOptionsPage()}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Open Options
          </button>
          <button
            onClick={() => {
              chrome.runtime.sendMessage({ type: 'TEST_MESSAGE' }, undefined, (response: any) => {
                console.log('Response from background:', response);
              });
            }}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Test Message
          </button>
        </div>
      </div>

      <footer className="mt-6 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500 text-center">
          Version 1.0.0 | Made with React & Tailwind
        </p>
      </footer>
    </div>
  );
}

export default App;