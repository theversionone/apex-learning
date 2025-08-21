chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed successfully!');
});

chrome.runtime.onMessage.addListener((request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  console.log('Message received:', request, 'from:', sender);
  sendResponse({ received: true });
  return true;
});

export {};