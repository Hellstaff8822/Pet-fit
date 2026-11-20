import type { PetProfile } from "../types/matching";
import type { RecommendationStatus } from "./recommendation";

export type RankedRecommendation = {
  pet: PetProfile;
  status: RecommendationStatus;
  score: number | null;
};

const statusPriority = {
  recommended: 1,
  conditional: 2,
  excluded: 3,
};

export const rankRecommendations = (
  recommendations: RankedRecommendation[],
): RankedRecommendation[] => {
  return [...recommendations].sort((a, b) => {
    if (a.status !== b.status) {
      return statusPriority[a.status] - statusPriority[b.status];
    }

    if (a.score === null && b.score === null) {
      return 0;
    }

    if (a.score === null) {
      return 1;
    }

    if (b.score === null) {
      return -1;
    }

    return b.score - a.score;
  });
};
