import { ExtensionMessage } from '../lib/types';

class BackgroundScript {
  
  constructor() {
    this.init();
  }

  private init() {
    chrome.runtime.onInstalled.addListener(() => {
      console.log('Apex Quiz Extension installed');
    });

    chrome.runtime.onMessage.addListener((message: ExtensionMessage, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
      return true;
    });

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.url?.includes('apexlearning.com')) {
        this.checkTabForQuiz(tabId);
      }
    });
  }

  private async handleMessage(
    message: ExtensionMessage, 
    sender: chrome.runtime.MessageSender, 
    sendResponse: Function
  ) {
    switch (message.type) {
      case 'QUIZ_PAGE_DETECTED':
        this.updateBadge(sender.tab?.id, 'QUIZ');
        break;

      case 'START_QUIZ':
      case 'STOP_QUIZ':
      case 'QUIZ_STATUS':
        if (sender.tab?.id) {
          chrome.tabs.sendMessage(sender.tab.id, message).then((response) => sendResponse(response));
        }
        break;

      case 'ANSWER_QUESTION':
        await this.handleQuestionAnswering(message.data, sendResponse);
        break;
    }
  }

  private async checkTabForQuiz(tabId: number) {
    try {
      const response = await chrome.tabs.sendMessage(tabId, { type: 'QUIZ_STATUS' });
      if (response?.isQuizPage) {
        this.updateBadge(tabId, 'QUIZ');
      } else {
        this.clearBadge(tabId);
      }
    } catch (error) {
      // Content script not ready or not injected
      this.clearBadge(tabId);
    }
  }

  private updateBadge(tabId: number | undefined, text: string) {
    if (tabId) {
      chrome.action.setBadgeText({ text, tabId });
      chrome.action.setBadgeBackgroundColor({ color: '#22c55e', tabId });
    }
  }

  private clearBadge(tabId: number) {
    chrome.action.setBadgeText({ text: '', tabId });
  }

  private async handleQuestionAnswering(questionData: any, sendResponse: Function) {
    // Placeholder for AI integration
    sendResponse({
      answer: 'Placeholder answer',
      confidence: 0.5,
      reasoning: 'AI integration pending'
    });
  }
}

// Initialize background script
new BackgroundScript();