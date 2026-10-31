import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { QuizAnswers } from "@/types/quiz";
import { quizQuestions } from "@/data/quiz-questions";

interface QuizSessionContextValue {
  answers: QuizAnswers;
  currentQuestionIndex: number;
  updateAnswer: (questionId: string, answerValue: string) => void;
  updateCustomNumberAnswer: (questionId: string, value: number) => void;
  markAnswerUnknown: (questionId: string) => void;
  clearAnswer: (questionId: string) => void;
  resetAnswers: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
}

interface QuizSessionProviderProps {
  children: ReactNode;
}

const QuizSessionContext = createContext<QuizSessionContextValue | undefined>(
  undefined
);

export const QuizSessionProvider = ({
  children,
}: QuizSessionProviderProps) => {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const updateAnswer = (questionId: string, answerValue: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: { type: "option", value: answerValue },
    }));
  };

  const updateCustomNumberAnswer = (questionId: string, value: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: { type: "custom_number", value },
    }));
  };

  const markAnswerUnknown = (questionId: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: { type: "unknown" },
    }));
  };

  const clearAnswer = (questionId: string) => {
    setAnswers((prevAnswers) => {
      const nextAnswers = { ...prevAnswers };
      delete nextAnswers[questionId];
      return nextAnswers;
    });
  };

  const nextQuestion = () => {
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
    const hasAnsweredCurrentQuestion =
      answers[quizQuestions[currentQuestionIndex].id] !== undefined;

    if (!hasAnsweredCurrentQuestion || isLastQuestion) return;

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const previousQuestion = () => {
    if (currentQuestionIndex === 0) return;

    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const resetAnswers = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  return (
    <QuizSessionContext.Provider
      value={{
        answers,
        currentQuestionIndex,
        updateAnswer,
        updateCustomNumberAnswer,
        markAnswerUnknown,
        clearAnswer,
        resetAnswers,
        nextQuestion,
        previousQuestion,
      }}
    >
      {children}
    </QuizSessionContext.Provider>
  );
};

export const useQuizSession = () => {
  const context = useContext(QuizSessionContext);

  if (context === undefined) {
    throw new Error(
      "useQuizSession must be used within a QuizSessionProvider"
    );
  }

  return context;
};