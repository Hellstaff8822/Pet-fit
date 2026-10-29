import { useQuizState } from "@/features/quiz/hooks/quiz-state";
import { View, Text } from "react-native";

const Quiz = () => {
  const {
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
  } = useQuizState();

  return (
    <View>
      <Text>{currentQuestion.question}</Text>
    </View>
  );
};


export default Quiz;