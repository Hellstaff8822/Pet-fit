import { quizQuestions } from "@/data/quiz-questions";
import type { QuizAnswers } from "@/types/quiz";
import type {
  Answer,
  BudgetValue,
  CompatibilityLevel,
  DailyAbsence,
  HousingType,
  MatchingInput,
  NumericRange,
  PreparationReadiness,
  TimeRange,
} from "@/domain/types/matching";

export type ValidationErrorCode =
  | "INVALID_OPTION"
  | "INVALID_NUMBER"
  | "INVALID_RANGE"
  | "INVALID_ANSWER_TYPE";

export interface ValidationError {
  questionId: string;
  code: ValidationErrorCode;
  message: string;
}

export type MappingResult =
  | { success: true; input: MatchingInput }
  | { success: false; errors: ValidationError[] };

const unknownAnswer = <T>(): Answer<T> => ({ status: "unknown" });
const knownAnswer = <T>(value: T): Answer<T> => ({ status: "known", value });

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isValidNumericRange = (range: NumericRange): boolean =>
  Number.isFinite(range.min) &&
  range.min >= 0 &&
  (range.max === null ||
    (Number.isFinite(range.max) && range.max >= range.min));

const isValidTimeRange = (range: TimeRange): boolean =>
  Number.isFinite(range.minMinutes) &&
  range.minMinutes >= 0 &&
  (range.maxMinutes === null ||
    (Number.isFinite(range.maxMinutes) && range.maxMinutes >= range.minMinutes));

export function mapQuizAnswers(answers: QuizAnswers): MappingResult {
  const errors: ValidationError[] = [];
  const input: MatchingInput = {
    housingType: unknownAnswer<HousingType>(),
    availableCareTime: unknownAnswer<TimeRange>(),
    desiredInteraction: unknownAnswer<CompatibilityLevel>(),
    monthlyBudget: unknownAnswer<BudgetValue>(),
    dailyAbsence: unknownAnswer<DailyAbsence>(),
    preparationReadiness: unknownAnswer<PreparationReadiness>(),
    desiredActivity: unknownAnswer<CompatibilityLevel>(),
  };

  const addError = (
    questionId: string,
    code: ValidationErrorCode,
    message: string,
  ) => errors.push({ questionId, code, message });

  for (const question of quizQuestions) {
    const rawAnswer: unknown = answers[question.id];
    if (rawAnswer === undefined) continue;

    if (!isRecord(rawAnswer) || typeof rawAnswer.type !== "string") {
      addError(question.id, "INVALID_ANSWER_TYPE", "Відповідь має невідомий формат.");
      continue;
    }

    if (rawAnswer.type === "unknown") {
      if (!question.allowUnknown) {
        addError(question.id, "INVALID_ANSWER_TYPE", "Для цього питання пропуск не дозволений.");
      }
      continue;
    }

    if (rawAnswer.type === "option") {
      if (question.answerType !== "single_select" || typeof rawAnswer.value !== "string") {
        addError(question.id, "INVALID_ANSWER_TYPE", "Очікувався інший тип відповіді.");
        continue;
      }

      if (!question.options.some((option) => option.value === rawAnswer.value)) {
        addError(question.id, "INVALID_OPTION", "Вибраний варіант відсутній у питанні.");
        continue;
      }

      switch (question.criterionId) {
        case "housingType":
          if (rawAnswer.value === "apartment" || rawAnswer.value === "house") {
            input.housingType = knownAnswer(rawAnswer.value);
          } else {
            addError(question.id, "INVALID_OPTION", "Невідомий тип житла.");
          }
          break;
        case "availableCareTime": {
          const ranges: Record<string, TimeRange> = {
            under_30_minutes: { minMinutes: 0, maxMinutes: 30 },
            "30_min_to_2_hours": { minMinutes: 30, maxMinutes: 120 },
            over_2_hours: { minMinutes: 120, maxMinutes: null },
          };
          const range = ranges[rawAnswer.value];
          if (!range) {
            addError(question.id, "INVALID_OPTION", "Невідомий варіант часу догляду.");
          } else if (!isValidTimeRange(range)) {
            addError(question.id, "INVALID_RANGE", "Діапазон часу догляду некоректний.");
          } else {
            input.availableCareTime = knownAnswer(range);
          }
          break;
        }
        case "desiredInteraction":
          if (rawAnswer.value === "low_interaction") {
            input.desiredInteraction = knownAnswer("low");
          } else if (rawAnswer.value === "moderate_interaction") {
            input.desiredInteraction = knownAnswer("moderate");
          } else if (rawAnswer.value === "high_interaction") {
            input.desiredInteraction = knownAnswer("high");
          } else {
            addError(question.id, "INVALID_OPTION", "Невідомий рівень взаємодії.");
          }
          break;
        case "monthlyBudget": {
          const ranges: Record<string, NumericRange> = {
            under_500: { min: 0, max: 500 },
            "500_to_1500": { min: 500, max: 1500 },
            "1500_to_3000": { min: 1500, max: 3000 },
            "3000_to_5000": { min: 3000, max: 5000 },
            over_5000: { min: 5000, max: null },
          };
          if (rawAnswer.value === "not_sure") {
            input.monthlyBudget = unknownAnswer<BudgetValue>();
          } else if (rawAnswer.value === "custom_amount") {
            addError(question.id, "INVALID_ANSWER_TYPE", "Для власної суми потрібне числове значення.");
          } else {
            const range = ranges[rawAnswer.value];
            if (!range) {
              addError(question.id, "INVALID_OPTION", "Невідомий варіант бюджету.");
            } else if (!isValidNumericRange(range)) {
              addError(question.id, "INVALID_RANGE", "Діапазон бюджету некоректний.");
            } else {
              input.monthlyBudget = knownAnswer({ type: "range", range });
            }
          }
          break;
        }
        case "dailyAbsence":
          if (
            rawAnswer.value === "rarely_away" ||
            rawAnswer.value === "several_hours_daily" ||
            rawAnswer.value === "away_most_of_day"
          ) {
            input.dailyAbsence = knownAnswer(rawAnswer.value);
          } else {
            addError(question.id, "INVALID_OPTION", "Невідомий варіант щоденної відсутності.");
          }
          break;
        case "preparationReadiness":
          if (rawAnswer.value === "ready_to_prepare") {
            input.preparationReadiness = knownAnswer("ready");
          } else if (rawAnswer.value === "needs_guidance") {
            input.preparationReadiness = knownAnswer("needs_guidance");
          } else if (rawAnswer.value === "not_sure") {
            input.preparationReadiness = knownAnswer("unsure");
          } else if (rawAnswer.value === "not_ready_to_prepare") {
            input.preparationReadiness = knownAnswer("not_ready");
          } else {
            addError(question.id, "INVALID_OPTION", "Невідомий варіант підготовки.");
          }
          break;
        case "desiredActivity":
          if (rawAnswer.value === "low_activity") {
            input.desiredActivity = knownAnswer("low");
          } else if (rawAnswer.value === "moderate_activity") {
            input.desiredActivity = knownAnswer("moderate");
          } else if (rawAnswer.value === "high_activity") {
            input.desiredActivity = knownAnswer("high");
          } else {
            addError(question.id, "INVALID_OPTION", "Невідомий рівень активності.");
          }
          break;
        default:
          addError(question.id, "INVALID_OPTION", "Питання не має правила нормалізації.");
      }

      continue;
    }

    if (rawAnswer.type === "custom_number") {
      if (
        question.criterionId !== "monthlyBudget" ||
        question.customInput?.type !== "number" ||
        !question.options.some((option) => option.value === "custom_amount") ||
        typeof rawAnswer.value !== "number"
      ) {
        addError(question.id, "INVALID_ANSWER_TYPE", "Очікувався інший тип відповіді.");
        continue;
      }
      if (
        !Number.isFinite(rawAnswer.value) ||
        rawAnswer.value < question.customInput.min
      ) {
        addError(
          question.id,
          "INVALID_NUMBER",
          `Власна сума має бути скінченним числом не менше ${question.customInput.min}.`,
        );
        continue;
      }

      input.monthlyBudget = knownAnswer({ type: "custom", amount: rawAnswer.value });
      continue;
    }

    addError(question.id, "INVALID_ANSWER_TYPE", "Тип відповіді не підтримується.");
  }

  return errors.length > 0
    ? { success: false, errors }
    : { success: true, input };
}
