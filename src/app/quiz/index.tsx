import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View } from "react-native";
import { quizQuestions } from "@/data/quiz-questions";
import { useQuizState } from "@/features/quiz/hooks/quiz-state";

const Quiz = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
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
    allQuestionsAnswered,
  } = useQuizState();

  const questionCount = quizQuestions.length;
  const progress = ((currentQuestionIndex + 1) / questionCount) * 100;
  const canContinue = hasAnsweredCurrentQuestion && (!isLastQuestion || allQuestionsAnswered);

  const handleContinue = () => {
    if (!canContinue) return;

    if (isLastQuestion) {
      resetAnswers();
      router.replace("/quiz/results");
      return;
    }

    nextQuestion();
  };

  return (
    <View className="flex-1 bg-cream" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pb-6 pt-5">
          <View className="mb-8 flex-row items-center justify-between">
            <Text className="font-bodyBold text-xl text-primaryDark">petfit.</Text>
            <Text className="font-bodyMedium text-sm text-textSecondary">
              Питання {currentQuestionIndex + 1} із {questionCount}
            </Text>
          </View>

          <View
            accessibilityRole="progressbar"
            accessibilityLabel="Прогрес вікторини"
            accessibilityValue={{ min: 0, max: questionCount, now: currentQuestionIndex + 1 }}
            className="mb-8 h-2 overflow-hidden rounded-full bg-surfaceSecondary"
          >
            <View className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
          </View>

          <Text className="mb-6 font-display text-[32px] leading-[40px] text-text">
            {currentQuestion.question}
          </Text>

          <View className="gap-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value;

              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: isSelected }}
                  onPress={() => updateAnswer(currentQuestion.id, option.value)}
                  className={`min-h-[60px] flex-row items-center rounded-2xl border px-4 py-4 ${
                    isSelected ? "border-primary bg-primarySoft" : "border-border bg-surface"
                  }`}
                >
                  <View
                    className={`mr-3 h-5 w-5 items-center justify-center rounded-full border ${
                      isSelected ? "border-primary bg-primary" : "border-textMuted"
                    }`}
                  >
                    {isSelected ? <View className="h-2 w-2 rounded-full bg-white" /> : null}
                  </View>
                  <Text className="flex-1 font-body text-base leading-6 text-text">{option.label}</Text>
                </Pressable>
              );
            })}
          </View>

          <View className="mt-auto flex-row gap-3 pt-8">
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: currentQuestionIndex === 0 }}
              onPress={previousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`h-14 flex-1 items-center justify-center rounded-2xl border ${
                currentQuestionIndex === 0 ? "border-border bg-surfaceSecondary" : "border-border bg-surface"
              }`}
            >
              <Text className={`font-bodySemibold text-base ${
                currentQuestionIndex === 0 ? "text-textMuted" : "text-primaryDark"
              }`}>Назад</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: !canContinue }}
              onPress={handleContinue}
              disabled={!canContinue}
              className={`h-14 flex-[1.4] items-center justify-center rounded-2xl ${
                canContinue ? "bg-primary" : "bg-primarySoft"
              }`}
            >
              <Text className={`font-bodySemibold text-base ${
                canContinue ? "text-white" : "text-primaryDark"
              }`}>{isLastQuestion ? "Завершити" : "Далі"}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Quiz;
