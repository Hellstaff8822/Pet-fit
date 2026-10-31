import type { QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "housing",
    criterionId: "housingType",
    question: "Де ти живеш?",
    answerType: "single_select",
    allowUnknown: true,
    options: [
      { label: "У квартирі", value: "apartment" },
      { label: "У приватному будинку", value: "house" },
    ],
  },
  {
    id: "daily_care",
    criterionId: "availableCareTime",
    question:
      "Скільки часу ти готовий приділяти щоденному догляду за твариною?",
    answerType: "single_select",
    allowUnknown: true,
    options: [
      { label: "До 30 хвилин на день", value: "under_30_minutes" },
      { label: "Від 30 хвилин до 2 годин на день", value: "30_min_to_2_hours" },
      { label: "Понад 2 години на день", value: "over_2_hours" },
    ],
  },
  {
    id: "social_interaction",
    criterionId: "desiredInteraction",
    question: "Скільки взаємодії з твариною ти хочеш у повсякденному житті?",
    answerType: "single_select",
    allowUnknown: true,
    options: [
      {
        label: "Переважно спостерігати, без постійного контакту",
        value: "low_interaction",
      },
      { label: "Спілкуватися та гратися щодня", value: "moderate_interaction" },
      {
        label: "Хочу багато взаємодії та спільних активностей",
        value: "high_interaction",
      },
    ],
  },
  {
    id: "finance",
    criterionId: "monthlyBudget",
    question:
      "Яку суму ти можеш регулярно виділяти на щоденне утримання тварини щомісяця?",
    answerType: "single_select",
    allowUnknown: true,
    customInput: {
      type: "number",
      min: 0,
      unit: "грн",
    },
    options: [
      {
        label: "До 500 грн",
        value: "under_500",
      },
      { label: "500–1 500 грн", value: "500_to_1500" },
      {
        label: "1 500–3 000 грн",
        value: "1500_to_3000",
      },
      {
        label: "3 000–5 000 грн",
        value: "3000_to_5000",
      },
      {
        label: "Понад 5 000 грн",
        value: "over_5000",
      },
      {
        label: "Введу власну суму",
        value: "custom_amount",
      },
      {
        label: "Ще не визначився",
        value: "not_sure",
      },
    ],
  },
  {
    id: "absence_care",
    criterionId: "dailyAbsence",
    question: "Як часто тебе не буває вдома протягом дня?",
    answerType: "single_select",
    allowUnknown: true,
    options: [
      {
        label: "Зазвичай я вдома або ненадовго виходжу",
        value: "rarely_away",
      },
      { label: "Щодня відсутній кілька годин", value: "several_hours_daily" },
      {
        label: "Часто відсутній більшу частину дня",
        value: "away_most_of_day",
      },
    ],
  },
  {
    id: "preparation",
    criterionId: "preparationReadiness",
    question:
      "Чи готовий ти заздалегідь підготувати житло та необхідні умови для тварини?",
    answerType: "single_select",
    allowUnknown: true,
    options: [
      {
        label: "Так, готовий усе необхідне підготувати",
        value: "ready_to_prepare",
      },
      {
        label: "Готовий, але мені потрібні інструкції",
        value: "needs_guidance",
      },
      {
        label: "Поки не впевнений",
        value: "not_sure",
      },
      {
        label: "Ні, хочу тварину без додаткової підготовки",
        value: "not_ready_to_prepare",
      },
    ],
  },
  {
    id: "activity",
    criterionId: "desiredActivity",
    question: "Який рівень активності тобі найбільше підходить?",
    answerType: "single_select",
    allowUnknown: true,
    options: [
      {
        label: "Спокійний спосіб життя, без особливих активностей",
        value: "low_activity",
      },
      {
        label: "Помірна активність, ігри та прогулянки щодня",
        value: "moderate_activity",
      },
      {
        label:
          "Висока активність, тривалі прогулянки та багато спільних занять",
        value: "high_activity",
      },
    ],
  },
];
