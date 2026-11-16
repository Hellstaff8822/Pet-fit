import type {
  Answer,
  HousingType,
  DailyAbsence,
  PreferenceLevel,
  NeedLevel,
  BudgetValue,
  NumericRange,
} from "@/domain/types/matching";


type CriterionResult =
  | "full"
  | "partial"
  | "insufficient"
  | "unknown";

interface CompatibilityCriteria {
  careTime: CriterionResult;
  budget: CriterionResult;
  interaction: CriterionResult;
  activity: CriterionResult;
}

export interface CompatibilityScore {
  score: number | null;
  completeness: number;
  evaluatedCriteria: number;
  totalCriteria: number;
}

const SCORE_WEIGHTS: Record<
  keyof CompatibilityCriteria,
  number
> = {
  careTime: 30,
  budget: 30,
  interaction: 20,
  activity: 20,
};

const RESULT_POINTS: Record<
  Exclude<CriterionResult, "unknown">,
  number
> = {
  full: 100,
  partial: 50,
  insufficient: 0,
};


export const isHousingCompatible = (
  allowedHousing: HousingType[],
  userHousing: Answer<HousingType>,
): "compatible" | "incompatible" | "unknown" => {
  if (userHousing.status === "unknown") {
    return "unknown";
  }

  return allowedHousing.includes(userHousing.value)
    ? "compatible"
    : "incompatible";
};

export const isDailyAbsenceCompatible = (
  maximumDailyAbsence: DailyAbsence,
  userAbsence: Answer<DailyAbsence>,
): "compatible" | "incompatible" | "unknown" => {
  if (userAbsence.status === "unknown") {
    return "unknown";
  }

  const absenceRank: Record<DailyAbsence, number> = {
    rarely_away: 0,
    several_hours_daily: 1,
    away_most_of_day: 2,
  };

  const userRank = absenceRank[userAbsence.value];
  const maximumRank = absenceRank[maximumDailyAbsence];

  return userRank <= maximumRank ? "compatible" : "incompatible";
};

export const checkCriticalRequirements = (
  allowedHousing: HousingType[],
  maximumDailyAbsence: DailyAbsence,
  userHousing: Answer<HousingType>,
  userAbsence: Answer<DailyAbsence>,
): "compatible" | "incompatible" | "unknown" => {
  const housingResult = isHousingCompatible(allowedHousing, userHousing);

  const absenceResult = isDailyAbsenceCompatible(
    maximumDailyAbsence,
    userAbsence,
  );

  if (housingResult === "incompatible" || absenceResult === "incompatible") {
    return "incompatible";
  }

  if (housingResult === "unknown" || absenceResult === "unknown") {
    return "unknown";
  }

  return "compatible";
};

export const isCareTimeCompatible = (
  requiredCareTime: { minMinutes: number; maxMinutes: number | null },
  userCareTime: Answer<{ minMinutes: number; maxMinutes: number | null }>,
): "full" | "partial" | "insufficient" | "unknown" => {
  if (userCareTime.status === "unknown") {
    return "unknown";
  }
  const userMaximum = userCareTime.value.maxMinutes;
  const userMinimum = userCareTime.value.minMinutes;

  const requiredMinimum = requiredCareTime.minMinutes;
  const requiredMaximum = requiredCareTime.maxMinutes;

  if (userMaximum !== null && userMaximum < requiredMinimum) {
    return "insufficient";
  }

  if (requiredMaximum !== null && userMinimum >= requiredMaximum) {
    return "full";
  }

  return "partial";
};

export const isInteractionCompatible = (
  requiredInteraction: NeedLevel,
  userInteraction: Answer<PreferenceLevel>,
): "full" | "partial" | "insufficient" | "unknown" => {
  if (userInteraction.status === "unknown") {
    return "unknown";
  }

  const compatibilityMatrix: Record<
    PreferenceLevel,
    Record<NeedLevel, "full" | "partial" | "insufficient">
  > = {
    low: {
      low: "full",
      moderate: "partial",
      high: "insufficient",
    },
    moderate: {
      low: "full",
      moderate: "full",
      high: "partial",
    },
    high: {
      low: "partial",
      moderate: "full",
      high: "full",
    },
  };

  return compatibilityMatrix[userInteraction.value][requiredInteraction];
};
export const isActivityCompatible = (
  requiredActivity: NeedLevel,
  userActivity: Answer<PreferenceLevel>,
): "full" | "partial" | "insufficient" | "unknown" => {
  if (userActivity.status === "unknown") {
    return "unknown";
  }

  const compatibilityMatrix: Record<
    PreferenceLevel,
    Record<NeedLevel, "full" | "partial" | "insufficient">
  > = {
    low: {
      low: "full",
      moderate: "partial",
      high: "insufficient",
    },
    moderate: {
      low: "full",
      moderate: "full",
      high: "partial",
    },
    high: {
      low: "partial",
      moderate: "full",
      high: "full",
    },
  };

  return compatibilityMatrix[userActivity.value][requiredActivity];
};

export const isBudgetCompatible = (
  monthlyCosts: NumericRange,
  userBudget: Answer<BudgetValue>,
): "full" | "partial" | "insufficient" | "unknown" => {
  if (userBudget.status === "unknown") {
    return "unknown";
  }

  const budget = userBudget.value;

  const userMinimum =
    budget.type === "range" ? budget.range.min : budget.amount;

  const userMaximum =
    budget.type === "range" ? budget.range.max : budget.amount;

  if (userMaximum !== null && userMaximum < monthlyCosts.min) {
    return "insufficient";
  }

  if (monthlyCosts.max !== null && userMinimum >= monthlyCosts.max) {
    return "full";
  }

  return "partial";
};


export const calculateCompatibilityScore = (
  criteria: CompatibilityCriteria,
): CompatibilityScore => {
  let weightedScore = 0;
  let evaluatedWeight = 0;
  let evaluatedCriteria = 0;

  for (const criterion in criteria) {
    const key = criterion as keyof CompatibilityCriteria;
    const result = criteria[key];

    if (result === "unknown") {
      continue;
    }

    const points = RESULT_POINTS[result];
    const weight = SCORE_WEIGHTS[key];

    weightedScore += points * weight;
    evaluatedWeight += weight;
    evaluatedCriteria++;
  }

  const score =
    evaluatedWeight === 0
      ? null
      : Math.round(weightedScore / evaluatedWeight);

  return {
    score,
    completeness: evaluatedWeight,
    evaluatedCriteria,
    totalCriteria: Object.keys(SCORE_WEIGHTS).length,
  };
};
