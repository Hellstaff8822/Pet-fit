export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizAnswerOption[];
}

export interface QuizAnswerOption {
  label: string;
  value: string;
}

export type QuizAnswers = Record<string, string>;
