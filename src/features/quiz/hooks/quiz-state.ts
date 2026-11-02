import { quizQuestions } from "@/data/quiz-questions";
import { useQuizSession } from "@/features/quiz/context/quiz-session-context";

export const useQuizState = () => {
  const {
    answers,
    currentQuestionIndex,
    updateAnswer,
    updateCustomNumberAnswer,
    markAnswerUnknown,
    clearAnswer,
    resetAnswers,
    nextQuestion,
    previousQuestion,
  } = useQuizSession();

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const hasAnsweredCurrentQuestion = answers[currentQuestion.id] !== undefined;

  const allQuestionsAnswered = quizQuestions.every(
    (question) => answers[question.id] !== undefined,
  );

  const isQuizComplete = isLastQuestion && allQuestionsAnswered;

  return {
    answers,
    updateAnswer,
    updateCustomNumberAnswer,
    markAnswerUnknown,
    clearAnswer,
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
