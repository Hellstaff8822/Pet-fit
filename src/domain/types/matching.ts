export type Answer<T> =
  | { status: "known"; value: T }
  | { status: "unknown" };

export interface NumericRange {
  min: number;
  max: number | null;
}

export interface TimeRange {
  minMinutes: number;
  maxMinutes: number | null;
}

export type CompatibilityLevel = "low" | "moderate" | "high";
export type HousingType = "apartment" | "house";
export type DailyAbsence =
  | "rarely_away"
  | "several_hours_daily"
  | "away_most_of_day";
export type PreparationReadiness =
  | "ready"
  | "needs_guidance"
  | "unsure"
  | "not_ready";

export type BudgetValue =
  | { type: "range"; range: NumericRange }
  | { type: "custom"; amount: number };

export interface MatchingInput {
  housingType: Answer<HousingType>;
  availableCareTime: Answer<TimeRange>;
  desiredInteraction: Answer<CompatibilityLevel>;
  monthlyBudget: Answer<BudgetValue>;
  dailyAbsence: Answer<DailyAbsence>;
  preparationReadiness: Answer<PreparationReadiness>;
  desiredActivity: Answer<CompatibilityLevel>;
}
