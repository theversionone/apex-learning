// Quiz-related types
export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'text-input' | 'image-based';
  text: string;
  imageUrl?: string;
  options?: string[];
  element: HTMLElement;
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
  confidence: number;
}

export interface QuizState {
  isActive: boolean;
  currentQuestion: number;
  totalQuestions: number;
  answers: QuizAnswer[];
}

// AI Provider types
export interface AIProvider {
  name: 'google' | 'groqcloud';
  apiKey: string;
  endpoint: string;
}

export interface AIResponse {
  answer: string;
  confidence: number;
  reasoning?: string;
}

// Extension messaging
export interface ExtensionMessage {
  type: 'START_QUIZ' | 'STOP_QUIZ' | 'QUIZ_STATUS' | 'ANSWER_QUESTION' | 'UPDATE_SETTINGS' | 'QUIZ_PAGE_DETECTED';
  data?: any;
}

// Settings
export interface ExtensionSettings {
  googleApiKey?: string;
  groqApiKey?: string;
  preferredProvider: 'google' | 'groqcloud';
  automationDelay: number; // ms between actions
  debugMode: boolean;
}