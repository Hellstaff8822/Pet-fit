import {
  CompatibilityLevel,
  HousingType,
  TimeRange,
  DailyAbsence,
  NumericRange,
} from "@/domain/types/matching";

export type PetSpecies =
  "cat" | "dog" | "rabbit" | "hamster" | "freshwater_fish" | "budgerigar";

export interface PetProfileBase {
  id: PetSpecies;
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
