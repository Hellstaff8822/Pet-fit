import { useState } from "react";
import type { QuizAnswers } from "@/types/quiz";
import { quizQuestions } from "@/data/quiz-questions";

export const useQuizState = () => {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const hasAnsweredCurrentQuestion = answers[currentQuestion.id] !== undefined;
  const allQuestionsAnswered = quizQuestions.every(
  (question) => answers[question.id] !== undefined
);
  const isQuizComplete = isLastQuestion && allQuestionsAnswered;

  const updateAnswer = (questionId: string, answerValue: string) => {
    setAnswers((prevAnswers) => {
      return {
        ...prevAnswers,
        [questionId]: answerValue,
      };
    });
  };

  const nextQuestion = () => {
    if (!hasAnsweredCurrentQuestion) return;
    if (isLastQuestion) return;

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

  return {
    answers,
    updateAnswer,
    resetAnswers,
    nextQuestion,
    previousQuestion,
    currentQuestionIndex,
    currentQuestion,
    isLastQuestion,
    hasAnsweredCurrentQuestion,
    isQuizComplete,
    allQuestionsAnswered,
  };
};
