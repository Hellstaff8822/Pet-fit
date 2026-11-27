export type Answer<T> = { status: "known"; value: T } | { status: "unknown" };

export interface NumericRange {
  min: number;
  max: number | null;
}

export interface TimeRange {
  minMinutes: number;
  maxMinutes: number | null;
}

export interface AreaRange {
  minSquareMeters: number;
  maxSquareMeters: number | null;
}

export interface VolumeRange {
  minLiters: number;
  maxLiters: number | null;
}

export type NeedLevel = "low" | "moderate" | "high";
export type PreferenceLevel = "low" | "moderate" | "high";

export type HousingType = "apartment" | "house";

export type DailyAbsence =
  "rarely_away" | "several_hours_daily" | "away_most_of_day";

export type PreparationReadiness =
  "ready" | "needs_guidance" | "unsure" | "not_ready";

export type CompanionReadiness = "ready" | "not_ready" | "unsure";

export type BudgetValue =
  { type: "range"; range: NumericRange } | { type: "custom"; amount: number };

export interface MatchingInput {
  housingType: Answer<HousingType>;
  availableCareTime: Answer<TimeRange>;
  desiredInteraction: Answer<PreferenceLevel>;
  monthlyBudget: Answer<BudgetValue>;
  dailyAbsence: Answer<DailyAbsence>;
  preparationReadiness: Answer<PreparationReadiness>;
  companionReadiness: Answer<CompanionReadiness>;
  desiredActivity: Answer<PreferenceLevel>;
}

export type PetSpecies =
  "cat" | "dog" | "rabbit" | "hamster" | "freshwater_fish" | "budgerigar";

export type RequirementLevel = "required" | "recommended";

export interface CompanionRequirement {
  required: boolean;
  description: string;
}

export interface EnvironmentRequirement {
  level: RequirementLevel;
  description: string;
}

export interface PetProfileBase {
  id: string;
  species: PetSpecies;

  needs: {
    dailyCareTime: TimeRange;
    interaction: NeedLevel;
    activity: NeedLevel;
  };

  requirements: {
    housing: HousingType[];
    maximumDailyAbsence: DailyAbsence;
    companion: CompanionRequirement | null;
    environment: EnvironmentRequirement[];
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
    groomingLevel: NeedLevel;
  };
}

export interface DogProfile extends PetProfileBase {
  species: "dog";
  details: {
    walksPerDay: number;
    trainingNeeds: NeedLevel;
    socializationNeeds: NeedLevel;
  };
}

export interface RabbitProfile extends PetProfileBase {
  species: "rabbit";
  details: {
    socialNeeds: NeedLevel;
    enclosureSpace: AreaRange;
    chewingNeeds: NeedLevel;
  };
}

export interface HamsterProfile extends PetProfileBase {
  species: "hamster";
  details: {
    nocturnalActivity: NeedLevel;
    enclosureSpace: AreaRange;
    burrowingNeeds: NeedLevel;
  };
}

export interface FreshwaterFishProfile extends PetProfileBase {
  species: "freshwater_fish";
  details: {
    aquariumVolume: VolumeRange;
    waterMaintenance: NeedLevel;
    equipmentNeeds: NeedLevel;
  };
}

export interface BudgerigarProfile extends PetProfileBase {
  species: "budgerigar";
  details: {
    flightNeeds: NeedLevel;
    vocalizationLevel: NeedLevel;
    socialNeeds: NeedLevel;
  };
}

export type PetProfile =
  | CatProfile
  | DogProfile
  | RabbitProfile
  | HamsterProfile
  | FreshwaterFishProfile
  | BudgerigarProfile;
