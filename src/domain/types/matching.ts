export type Answer<T> = { status: "known"; value: T } | { status: "unknown" };

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
  "rarely_away" | "several_hours_daily" | "away_most_of_day";
export type PreparationReadiness =
  "ready" | "needs_guidance" | "unsure" | "not_ready";

export type BudgetValue =
  { type: "range"; range: NumericRange } | { type: "custom"; amount: number };

export interface MatchingInput {
  housingType: Answer<HousingType>;
  availableCareTime: Answer<TimeRange>;
  desiredInteraction: Answer<CompatibilityLevel>;
  monthlyBudget: Answer<BudgetValue>;
  dailyAbsence: Answer<DailyAbsence>;
  preparationReadiness: Answer<PreparationReadiness>;
  desiredActivity: Answer<CompatibilityLevel>;
}

export type PetSpecies =
  "cat" | "dog" | "rabbit" | "hamster" | "freshwater_fish" | "budgerigar";

export interface PetProfileBase {
  id: string;
  species: PetSpecies;

  needs: {
    dailyCareTime: TimeRange;
    interaction: CompatibilityLevel;
    activity: CompatibilityLevel;
  };

  requirements: {
    housing: HousingType[];
    maximumDailyAbsence: DailyAbsence;
  };

  costs: {
    initialSetup: NumericRange;
    monthly: NumericRange;
    emergencyReserve: NumericRange;
  };
}

export interface CatProfile extends PetProfileBase {
  species: "cat";

  details: {
    indoorAdaptation: boolean;
    groomingLevel: CompatibilityLevel;
  };
}

export interface DogProfile extends PetProfileBase {
  species: "dog";

  details: {
    walksPerDay: number;
    trainingNeeds: CompatibilityLevel;
    socializationNeeds: CompatibilityLevel;
  };
}

export interface RabbitProfile extends PetProfileBase {
  species: "rabbit";

  details: {
    socialNeeds: CompatibilityLevel;
    enclosureSpace: NumericRange;
    chewingNeeds: CompatibilityLevel;
  };
}

export interface HamsterProfile extends PetProfileBase {
  species: "hamster";

  details: {
    nocturnalActivity: CompatibilityLevel;
    enclosureSpace: NumericRange;
    burrowingNeeds: CompatibilityLevel;
  };
}

export interface FreshwaterFishProfile extends PetProfileBase {
  species: "freshwater_fish";

  details: {
    aquariumVolume: NumericRange;
    waterMaintenance: CompatibilityLevel;
    equipmentNeeds: CompatibilityLevel;
  };
}

export interface BudgerigarProfile extends PetProfileBase {
  species: "budgerigar";

  details: {
    flightNeeds: CompatibilityLevel;
    vocalizationLevel: CompatibilityLevel;
    socialNeeds: CompatibilityLevel;
  };
}

export type PetProfile = CatProfile | DogProfile | RabbitProfile | HamsterProfile | FreshwaterFishProfile | BudgerigarProfile;
