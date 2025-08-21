export interface Message {
  type: string;
  data?: any;
}

export function sendToBackground<T = any>(message: Message): Promise<T> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, undefined, (response: T) => {
      resolve(response);
    });
  });
}

export function sendToContent<T = any>(tabId: number, message: Message): Promise<T> {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, message, undefined, (response: T) => {
      resolve(response);
    });
  });
}

export function onMessage<T = Message>(
  handler: (
    message: T,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => void | boolean
) {
  chrome.runtime.onMessage.addListener(handler as any);
}