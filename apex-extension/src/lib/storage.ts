import { ExtensionSettings } from './types';

const DEFAULT_SETTINGS: ExtensionSettings = {
  preferredProvider: 'google',
  automationDelay: 2000,
  debugMode: false
};

export class Storage {
  static async getSettings(): Promise<ExtensionSettings> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['settings'], (result) => {
        resolve({ ...DEFAULT_SETTINGS, ...result.settings });
      });
    });
  }

  static async updateSettings(updates: Partial<ExtensionSettings>): Promise<void> {
    const current = await this.getSettings();
    const updated = { ...current, ...updates };
    return new Promise((resolve) => {
      chrome.storage.sync.set({ settings: updated }, () => resolve());
    });
  }

  static async get<T>(key: string): Promise<T | null> {
    return new Promise((resolve) => {
      chrome.storage.sync.get([key], (result) => {
        resolve(result[key] || null);
      });
    });
  }

  static async set<T>(key: string, value: T): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: value }, () => resolve());
    });
  }
}