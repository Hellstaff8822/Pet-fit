import type { MatchingInput, PetProfile } from "../types/matching";
import {
  checkCriticalRequirements,
  isCareTimeCompatible,
  isInteractionCompatible,
  isActivityCompatible,
  isBudgetCompatible,
  calculateCompatibilityScore,
  checkCompanionRequirement,
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
  const result = pets.map((pet): RankedRecommendation => {
    const criticalResult = checkCriticalRequirements(
      pet.requirements.housing,
      pet.requirements.maximumDailyAbsence,
      matchingInput.housingType,
      matchingInput.dailyAbsence,
    );

    const companionResult = checkCompanionRequirement(
      pet.requirements.companion?.required ?? false,
      matchingInput.companionReadiness,
    );

    const combinedCriticalResult =
      criticalResult === "incompatible" || companionResult === "incompatible"
        ? "incompatible"
        : criticalResult === "unknown" || companionResult === "unknown"
          ? "unknown"
          : "compatible";

    const careTimeResult = isCareTimeCompatible(
      pet.needs.dailyCareTime,
      matchingInput.availableCareTime,
    );

    const interactionResult = isInteractionCompatible(
      pet.needs.interaction,
      matchingInput.desiredInteraction,
    );

    const activityResult = isActivityCompatible(
      pet.needs.activity,
      matchingInput.desiredActivity,
    );

    const budgetResult = isBudgetCompatible(
      pet.costs.monthly,
      matchingInput.monthlyBudget,
    );

    const compatibilityScore = calculateCompatibilityScore({
      careTime: careTimeResult,
      budget: budgetResult,
      interaction: interactionResult,
      activity: activityResult,
    });

    const status = getRecommendationStatus(
      combinedCriticalResult,
      compatibilityScore,
    );

    return {
      pet,
      status,
      score: compatibilityScore.score,
    };
  });

  return rankRecommendations(result);
};
