export type QuizAnswerType = "single_select" | "custom_number";

export interface QuizAnswerOption {
  label: string;
  value: string;
}

export interface QuizQuestion {
  id: string;
  criterionId: string;
  question: string;
  answerType: QuizAnswerType;
  allowUnknown: boolean;
  customInput?: {
    type: "number";
    min: number;
    unit: string;
  };
  options: QuizAnswerOption[];
}

export type QuizAnswer =
  | {
      type: "option";
      value: string;
    }
  | {
      type: "custom_number";
      value: number;
    }
  | {
      type: "unknown";
    };

export type QuizAnswers = Record<string, QuizAnswer>;

export interface QuizSession {
  answers: QuizAnswers;
}
