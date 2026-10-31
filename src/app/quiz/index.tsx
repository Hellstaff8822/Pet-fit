import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { quizQuestions } from "@/data/quiz-questions";
import { useQuizState } from "@/features/quiz/hooks/quiz-state";

const Quiz = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
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
    allQuestionsAnswered,
  } = useQuizState();

  const [customBudgetText, setCustomBudgetText] = useState(() => {
    const savedBudget = answers.finance;
    return savedBudget?.type === "custom_number"
      ? String(savedBudget.value)
      : "";
  });
  const [customBudgetSelected, setCustomBudgetSelected] = useState(
    () => answers.finance?.type === "custom_number",
  );

  const questionCount = quizQuestions.length;
  const savedAnswer = answers[currentQuestion.id];
  const customInput = currentQuestion.customInput;
  const progress = ((currentQuestionIndex + 1) / questionCount) * 100;
  const canContinue =
    hasAnsweredCurrentQuestion && (!isLastQuestion || allQuestionsAnswered);

  const handleOptionPress = (optionValue: string) => {
    if (optionValue === "custom_amount" && customInput?.type === "number") {
      setCustomBudgetSelected(true);
      if (savedAnswer?.type === "custom_number") {
        setCustomBudgetText(String(savedAnswer.value));
      } else {
        setCustomBudgetText("");
        clearAnswer(currentQuestion.id);
      }
      return;
    }

    if (currentQuestion.criterionId === "monthlyBudget") {
      setCustomBudgetSelected(false);
      setCustomBudgetText("");
    }
    updateAnswer(currentQuestion.id, optionValue);
  };

  const handleCustomBudgetChange = (text: string) => {
    setCustomBudgetText(text);
    const normalizedText = text.trim();

    if (!/^\d+$/.test(normalizedText)) {
      clearAnswer(currentQuestion.id);
      return;
    }

    const value = Number(normalizedText);
    if (
      !Number.isSafeInteger(value) ||
      value < (customInput?.min ?? 0)
    ) {
      clearAnswer(currentQuestion.id);
      return;
    }

    updateCustomNumberAnswer(currentQuestion.id, value);
  };

  const handleSkip = () => {
    if (currentQuestion.criterionId === "monthlyBudget") {
      setCustomBudgetSelected(false);
      setCustomBudgetText("");
    }
    markAnswerUnknown(currentQuestion.id);
  };

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
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={insets.top}
      >
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
              const isSelected =
                option.value === "custom_amount"
                  ? customBudgetSelected
                  : savedAnswer?.type === "option" &&
                    savedAnswer.value === option.value;

              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: isSelected }}
                  onPress={() => handleOptionPress(option.value)}
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

          {customBudgetSelected && customInput?.type === "number" ? (
            <View className="mt-5">
              <Text className="mb-2 font-bodySemibold text-sm text-text">
                Твій бюджет на місяць ({customInput.unit})
              </Text>
              <TextInput
                accessibilityLabel={`Твій бюджет на місяць у ${customInput.unit}`}
                keyboardType="number-pad"
                value={customBudgetText}
                onChangeText={handleCustomBudgetChange}
                placeholder={`Введи суму від ${customInput.min}`}
                returnKeyType="done"
                className="min-h-[56px] rounded-2xl border border-border bg-surface px-4 font-body text-base text-text placeholder:text-textMuted"
              />
              {!hasAnsweredCurrentQuestion ? (
                <Text accessibilityRole="alert" className="mt-2 font-body text-sm text-error">
                  Введи ціле невід’ємне число, щоб продовжити.
                </Text>
              ) : null}
            </View>
          ) : null}

          {currentQuestion.allowUnknown ? (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: savedAnswer?.type === "unknown" }}
              onPress={handleSkip}
              className={`mt-4 min-h-11 items-center justify-center rounded-xl ${
                savedAnswer?.type === "unknown" ? "bg-primarySoft" : ""
              }`}
            >
              <Text
                className={`font-bodySemibold text-sm ${
                  savedAnswer?.type === "unknown"
                    ? "text-primaryDark"
                    : "text-textSecondary"
                }`}
              >
                Не знаю / Пропустити
              </Text>
            </Pressable>
          ) : null}

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
      </KeyboardAvoidingView>
    </View>
  );
};

export default Quiz;
