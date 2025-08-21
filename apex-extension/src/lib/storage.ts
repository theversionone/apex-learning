export class ExtensionStorage {
  static async get<T = any>(key: string): Promise<T | null> {
    return new Promise((resolve) => {
      chrome.storage.sync.get([key], (result) => {
        resolve(result[key] || null);
      });
    });
  }

  static async set<T = any>(key: string, value: T): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve();
      });
    });
  }

  static async remove(key: string): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.remove([key], () => {
        resolve();
      });
    });
  }

  static async clear(): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.clear(() => {
        resolve();
      });
    });
  }

  static async getAll(): Promise<{ [key: string]: any }> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(undefined, (result) => {
        resolve(result);
      });
    });
  }
}