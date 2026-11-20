import type { MatchingInput, PetProfile } from "../types/matching";
import {
  checkCriticalRequirements,
  isCareTimeCompatible,
  isInteractionCompatible,
  isActivityCompatible,
  isBudgetCompatible,
  calculateCompatibilityScore,
} from "./calculate-compatibility";
import { getRecommendationStatus } from "./recommendation";
import {
  rankRecommendations,
  type RankedRecommendation,
} from "./rank-recommendations";

export const matchPets = (
  pets: PetProfile[],
  matchingInput: MatchingInput,
): RankedRecommendation[] => {
  const result = pets.map((pet) => {
    return pet;
  });
};
