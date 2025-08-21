import { QuizDetector } from './quiz-detector';
import { ExtensionMessage, QuizState } from '../lib/types';

class ContentScript {
  private detector: QuizDetector;
  private isActive = false;
  private quizState: QuizState = {
    isActive: false,
    currentQuestion: 0,
    totalQuestions: 0,
    answers: []
  };

  constructor() {
    this.detector = new QuizDetector();
    this.init();
  }

  private init() {
    // Listen for messages from popup/background
    chrome.runtime.onMessage.addListener((message: ExtensionMessage, sender, sendResponse) => {
      this.handleMessage(message, sendResponse);
      return true;
    });

    // Check if we're on a quiz page
    this.checkQuizPage();
    
    // Set up dynamic content monitoring
    this.setupDynamicMonitoring();
  }

  private setupDynamicMonitoring() {
    // Monitor for quiz content loading
    const observer = new MutationObserver((mutations) => {
      let shouldRecheck = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.querySelector?.('.sia-question-number, .sia-input, [class*="kp-generated-"]')) {
                shouldRecheck = true;
              }
            }
          });
        }
      });
      
      if (shouldRecheck) {
        setTimeout(() => this.recheckQuizContent(), 1000);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Delayed checks for slow-loading content
    setTimeout(() => this.recheckQuizContent(), 2000);
    setTimeout(() => this.recheckQuizContent(), 5000);
  }

  private recheckQuizContent() {
    const questions = this.detector.getQuestions();
    
    if (questions.length > 0 && this.quizState.totalQuestions === 0) {
      this.quizState.totalQuestions = questions.length;
      const question = questions[0];
      
      console.log(`✅ Quiz loaded: ${questions.length} question(s) found`);
      console.log(`📝 Question type: ${question.type}`);
      if (question.imageUrl) {
        console.log(`🖼️ Image detected: ${question.imageUrl}`);
      } else {
        console.log(`📄 Text-only question`);
      }
    }
  }

  private async handleMessage(message: ExtensionMessage, sendResponse: Function) {
    switch (message.type) {
      case 'START_QUIZ':
        await this.startQuiz();
        sendResponse({ success: true, state: this.quizState });
        break;
      
      case 'STOP_QUIZ':
        this.stopQuiz();
        sendResponse({ success: true, state: this.quizState });
        break;
      
      case 'QUIZ_STATUS':
        sendResponse({ 
          isQuizPage: this.detector.isQuizPage(),
          state: this.quizState 
        });
        break;
    }
  }

  private checkQuizPage() {
    if (this.detector.isQuizPage()) {
      // Notify background script
      chrome.runtime.sendMessage({ 
        type: 'QUIZ_PAGE_DETECTED',
        data: { url: window.location.href }
      });
    }
  }

  private async startQuiz() {
    if (!this.detector.isQuizPage()) return;
    
    this.isActive = true;
    this.quizState.isActive = true;
    
    const questions = this.detector.getQuestions();
    this.quizState.totalQuestions = questions.length;
    this.quizState.currentQuestion = 0;
  }

  private stopQuiz() {
    this.isActive = false;
    this.quizState.isActive = false;
  }

}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ContentScript());
} else {
  new ContentScript();
}