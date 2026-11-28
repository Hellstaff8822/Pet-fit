
import type { RankedRecommendation } from "@/domain/matching/rank-recommendations";

export interface CriterionExplanation {
  label: string;
  status: "full" | "partial" | "insufficient" | "unknown";
  message: string;
}

export const mapCompatibilityExplanations = (
  criteria: RankedRecommendation["criteria"],
): Record<keyof RankedRecommendation["criteria"], CriterionExplanation> => {
  return {
    careTime: {
      label: "Час на догляд",
      status: criteria.careTime,
      message: {
        full: "У тебе достатньо часу для щоденного догляду",
        partial: "Часу може вистачати не для всіх потреб тварини",
        insufficient: "Тварині потрібно більше часу, ніж ти можеш приділяти",
        unknown: "Недостатньо інформації про доступний час для догляду",
      }[criteria.careTime],
    },

    budget: {
      label: "Місячний бюджет",
      status: criteria.budget,
      message: {
        full: "Твій бюджет покриває очікувані щомісячні витрати",
        partial: "Витрати можуть бути вищими за комфортний для тебе бюджет",
        insufficient: "Очікувані витрати перевищують твій бюджет",
        unknown: "Недостатньо інформації для оцінки бюджету",
      }[criteria.budget],
    },

    interaction: {
      label: "Взаємодія",
      status: criteria.interaction,
      message: {
        full: "Твої очікування збігаються з потребами тварини",
        partial: "Потреби тварини частково відрізняються від твоїх очікувань",
        insufficient: "Потреби тварини не відповідають бажаному рівню взаємодії",
        unknown: "Недостатньо інформації про бажаний рівень взаємодії",
      }[criteria.interaction],
    },

    activity: {
      label: "Рівень активності",
      status: criteria.activity,
      message: {
        full: "Рівень активності тварини відповідає твоїм уподобанням",
        partial: "Рівень активності тварини частково відрізняється від твоїх уподобань",
        insufficient: "Рівень активності тварини не відповідає твоїм уподобанням",
        unknown: "Недостатньо інформації про бажаний рівень активності",
      }[criteria.activity],
    },
  };
};
