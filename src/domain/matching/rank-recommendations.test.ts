import { describe, expect, it } from "vitest";
import type { PetProfile } from "../types/matching";
import {
  rankRecommendations,
  type RankedRecommendation,
} from "./rank-recommendations";

const createRecommendation = (
  id: string,
  status: RankedRecommendation["status"],
  score: number | null,
): RankedRecommendation => ({
  pet: { id } as PetProfile,
  status,
  score,
});

describe("rankRecommendations", () => {
  it("sorts recommendations by status priority", () => {
    const recommendations = [
      createRecommendation("dog", "excluded", 98),
      createRecommendation("cat", "recommended", 85),
      createRecommendation("rabbit", "conditional", 75),
    ];

    const result = rankRecommendations(recommendations);

    expect(result.map((item) => item.status)).toEqual([
      "recommended",
      "conditional",
      "excluded",
    ]);
  });

  it("sorts recommendations by score in descending order", () => {
    const recommendations = [
      createRecommendation("cat", "recommended", 85),
      createRecommendation("rabbit", "recommended", 92),
      createRecommendation("bird", "recommended", 78),
    ];

    const result = rankRecommendations(recommendations);

    expect(result.map((item) => item.score)).toEqual([92, 85, 78]);
  });

  it("places null scores after numeric scores", () => {
    const recommendations = [
      createRecommendation("cat", "conditional", null),
      createRecommendation("rabbit", "conditional", 85),
      createRecommendation("bird", "conditional", 60),
    ];

    const result = rankRecommendations(recommendations);

    expect(result.map((item) => item.score)).toEqual([85, 60, null]);
  });

  it("preserves original order when scores are equal", () => {
    const recommendations = [
      createRecommendation("cat", "recommended", 85),
      createRecommendation("rabbit", "recommended", 85),
    ];

    const result = rankRecommendations(recommendations);

    expect(result.map((item) => item.pet.id)).toEqual(["cat", "rabbit"]);
  });

  it("does not mutate the original array", () => {
    const recommendations = [
      createRecommendation("dog", "excluded", 98),
      createRecommendation("cat", "recommended", 85),
    ];

    const originalOrder = [...recommendations];

    rankRecommendations(recommendations);

    expect(recommendations).toEqual(originalOrder);
  });

  it("returns an empty array when input is empty", () => {
    expect(rankRecommendations([])).toEqual([]);
  });
});
