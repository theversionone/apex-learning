import { QuizQuestion } from '../lib/types';

export class QuizDetector {
  
  isQuizPage(): boolean {
    const url = window.location.href.toLowerCase();
    
    // Apex Learning assessment URL pattern
    if (url.includes('course.apexlearning.com') && url.includes('/assessment')) {
      return true;
    }
    
    // Check for Apex quiz elements
    const apexSelectors = ['.sia-question-number', '.sia-input', 'kp-sia-question-multiple-choice'];
    return apexSelectors.some(selector => document.querySelector(selector) !== null);
  }

  getQuestions(): QuizQuestion[] {
    const questionText = this.getApexQuestionText();
    const questionNumber = this.getApexQuestionNumber();
    const options = this.getApexAnswerOptions();
    
    if (questionText) {
      return [{
        id: `apex-question-${questionNumber || 1}`,
        type: 'multiple-choice',
        text: questionText,
        options: options,
        element: document.body
      }];
    }

    return [];
  }

  private getApexQuestionText(): string | null {
    // Primary: Question stem element
    const questionStem = document.querySelector('.sia-question-stem');
    if (questionStem?.textContent?.trim()) {
      return questionStem.textContent.trim();
    }

    // Fallback: Extract from question container
    const siaQuestion = document.querySelector('kp-sia-question');
    if (siaQuestion?.textContent) {
      const text = siaQuestion.textContent.trim();
      const questionPart = text.split('A.')[0].trim();
      if (questionPart.length > 10) {
        return questionPart;
      }
    }

    return null;
  }

  private getApexQuestionNumber(): number | null {
    const questionNumberEl = document.querySelector('.sia-question-number');
    const match = questionNumberEl?.textContent?.match(/Question (\d+) of (\d+)/);
    return match ? parseInt(match[1]) : null;
  }

  private getApexAnswerOptions(): string[] {
    const options: string[] = [];
    
    // Primary: sia-distractor elements
    const distractors = document.querySelectorAll('.sia-distractor');
    distractors.forEach(distractor => {
      const choiceLetter = distractor.querySelector('.sia-choice-letter')?.textContent?.trim();
      const choiceContent = distractor.querySelector('kp-content')?.textContent?.trim();
      
      if (choiceLetter && choiceContent) {
        options.push(`${choiceLetter} ${choiceContent}`);
      }
    });
    
    return options;
  }

}