import React, { useState, useEffect } from 'react';

interface Settings {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  autoStart: boolean;
  apiKey: string;
}

function App() {
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    notifications: true,
    autoStart: false,
    apiKey: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(['settings'], (result) => {
      if (result.settings) {
        setSettings(result.settings);
      }
    });
  }, []);

  const saveSettings = () => {
    chrome.storage.sync.set({ settings }, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Extension Settings
          </h1>
          <p className="text-slate-600">
            Configure your Chrome extension preferences
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value as Settings['theme'])}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => updateSetting('notifications', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  Enable notifications
                </span>
              </label>
              <p className="ml-7 text-xs text-slate-500 mt-1">
                Receive notifications for important events
              </p>
            </div>

            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoStart}
                  onChange={(e) => updateSetting('autoStart', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  Auto-start on browser launch
                </span>
              </label>
              <p className="ml-7 text-xs text-slate-500 mt-1">
                Automatically activate the extension when Chrome starts
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                API Key (Optional)
              </label>
              <input
                type="password"
                value={settings.apiKey}
                onChange={(e) => updateSetting('apiKey', e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                Required for advanced features
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={saveSettings}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              {saved ? 'Settings Saved!' : 'Save Settings'}
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">About</h2>
          <div className="space-y-2 text-sm text-slate-600">
            <p>Version: 1.0.0</p>
            <p>Built with React, TypeScript, and Tailwind CSS</p>
            <p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;