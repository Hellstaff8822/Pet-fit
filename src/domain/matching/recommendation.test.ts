import { describe, it, expect } from "vitest";
import { getRecommendationStatus } from "./recommendation";

describe("getRecommendationStatus", () => {
  const fullScore = {
    score: 90,
    completeness: 100,
    evaluatedCriteria: 4,
    totalCriteria: 4,
  };

  it("returns excluded when critical requirements are incompatible", () => {
    expect(getRecommendationStatus("incompatible", fullScore)).toBe("excluded");
  });

  it("returns conditional when critical requirements are unknown", () => {
    expect(getRecommendationStatus("unknown", fullScore)).toBe("conditional");
  });

  it("returns recommended when score and completeness meet thresholds", () => {
    expect(getRecommendationStatus("compatible", fullScore)).toBe(
      "recommended",
    );
  });

  it("returns conditional when score is below 70", () => {
    expect(
      getRecommendationStatus("compatible", {
        ...fullScore,
        score: 69,
      }),
    ).toBe("conditional");
  });

  it("returns conditional when completeness is below 75", () => {
    expect(
      getRecommendationStatus("compatible", {
        ...fullScore,
        completeness: 50,
      }),
    ).toBe("conditional");
  });

  it("returns conditional when score is null", () => {
    expect(
      getRecommendationStatus("compatible", {
        ...fullScore,
        score: null,
      }),
    ).toBe("conditional");
  });

  it("returns recommended when score is exactly 70", () => {
    expect(
      getRecommendationStatus("compatible", {
        ...fullScore,
        score: 70,
      }),
    ).toBe("recommended");
  });

  it("returns conditional when completeness is exactly 75 but score is below 70", () => {
    expect(
      getRecommendationStatus("compatible", {
        ...fullScore,
        score: 60,
        completeness: 75,
      }),
    ).toBe("conditional");
  });

  it("returns recommended when completeness is exactly 75", () => {
    expect(
      getRecommendationStatus("compatible", {
        ...fullScore,
        completeness: 75,
      }),
    ).toBe("recommended");
  });
});
