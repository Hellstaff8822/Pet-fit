import type { CompatibilityScore } from "./calculate-compatibility";

export type RecommendationStatus =
  | "recommended"
  | "conditional"
  | "excluded";

export const getRecommendationStatus = (
  criticalResult: "compatible" | "incompatible" | "unknown",
  compatibilityScore: CompatibilityScore,
): RecommendationStatus => {
  if (criticalResult === "incompatible") {
    return "excluded";
  }

  if (criticalResult === "unknown") {
    return "conditional";
  }

  if (
    compatibilityScore.score === null ||
    compatibilityScore.completeness < 75
  ) {
    return "conditional";
  }

  if (compatibilityScore.score >= 70) {
    return "recommended";
  }

  return "conditional";
};