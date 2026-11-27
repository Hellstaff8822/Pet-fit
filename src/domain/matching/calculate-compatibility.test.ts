import { describe, it, expect } from "vitest";

import {
  isHousingCompatible,
  isDailyAbsenceCompatible,
  checkCriticalRequirements,
  isCareTimeCompatible,
  isInteractionCompatible,
  isActivityCompatible,
  isBudgetCompatible,
  calculateCompatibilityScore,
} from "./calculate-compatibility";

describe("isHousingCompatible", () => {
  it("returns compatible when user's housing is allowed", () => {
    const result = isHousingCompatible(["apartment", "house"], {
      status: "known",
      value: "apartment",
    });

    expect(result).toBe("compatible");
  });

  it("returns incompatible when user's housing is not allowed", () => {
    const result = isHousingCompatible(["house"], {
      status: "known",
      value: "apartment",
    });

    expect(result).toBe("incompatible");
  });

  it("returns unknown when user's housing is unknown", () => {
    const result = isHousingCompatible(["apartment", "house"], {
      status: "unknown",
    });

    expect(result).toBe("unknown");
  });
});

describe("isDailyAbsenceCompatible", () => {
  it("returns compatible when user is away less than the pet's maximum", () => {
    const result = isDailyAbsenceCompatible("away_most_of_day", {
      status: "known",
      value: "several_hours_daily",
    });

    expect(result).toBe("compatible");
  });

  it("returns compatible when user is away exactly as much as the pet allows", () => {
    const result = isDailyAbsenceCompatible("several_hours_daily", {
      status: "known",
      value: "several_hours_daily",
    });

    expect(result).toBe("compatible");
  });

  it("returns incompatible when user is away longer than the pet allows", () => {
    const result = isDailyAbsenceCompatible("several_hours_daily", {
      status: "known",
      value: "away_most_of_day",
    });

    expect(result).toBe("incompatible");
  });

  it("returns unknown when user's daily absence is unknown", () => {
    const result = isDailyAbsenceCompatible("away_most_of_day", {
      status: "unknown",
    });

    expect(result).toBe("unknown");
  });
});

describe("checkCriticalRequirements", () => {
  it("returns compatible when all critical requirements are met", () => {
    const result = checkCriticalRequirements(
      ["apartment", "house"],
      "away_most_of_day",
      { status: "known", value: "apartment" },
      { status: "known", value: "several_hours_daily" },
    );

    expect(result).toBe("compatible");
  });

  it("returns incompatible when housing requirement fails", () => {
    const result = checkCriticalRequirements(
      ["house"],
      "away_most_of_day",
      { status: "known", value: "apartment" },
      { status: "known", value: "several_hours_daily" },
    );

    expect(result).toBe("incompatible");
  });

  it("returns incompatible when daily absence requirement fails", () => {
    const result = checkCriticalRequirements(
      ["apartment", "house"],
      "several_hours_daily",
      { status: "known", value: "apartment" },
      { status: "known", value: "away_most_of_day" },
    );

    expect(result).toBe("incompatible");
  });

  it("returns unknown when one critical requirement is unknown", () => {
    const result = checkCriticalRequirements(
      ["apartment", "house"],
      "away_most_of_day",
      { status: "unknown" },
      { status: "known", value: "several_hours_daily" },
    );

    expect(result).toBe("unknown");
  });

  it("returns incompatible when one requirement is unknown but another is incompatible", () => {
    const result = checkCriticalRequirements(
      ["house"],
      "several_hours_daily",
      { status: "unknown" },
      { status: "known", value: "away_most_of_day" },
    );

    expect(result).toBe("incompatible");
  });
});

describe("isCareTimeCompatible", () => {
  it("returns unknown when user's care time is unknown", () => {
    const result = isCareTimeCompatible(
      { minMinutes: 30, maxMinutes: 60 },
      { status: "unknown" },
    );

    expect(result).toBe("unknown");
  });

  it("returns insufficient when user's maximum time is below pet's minimum", () => {
    const result = isCareTimeCompatible(
      { minMinutes: 60, maxMinutes: 90 },
      {
        status: "known",
        value: { minMinutes: 20, maxMinutes: 40 },
      },
    );

    expect(result).toBe("insufficient");
  });

  it("returns full when user's minimum time covers pet's maximum", () => {
    const result = isCareTimeCompatible(
      { minMinutes: 30, maxMinutes: 60 },
      {
        status: "known",
        value: { minMinutes: 60, maxMinutes: 90 },
      },
    );

    expect(result).toBe("full");
  });

  it("returns partial when user covers minimum but not maximum care needs", () => {
    const result = isCareTimeCompatible(
      { minMinutes: 45, maxMinutes: 90 },
      {
        status: "known",
        value: { minMinutes: 30, maxMinutes: 60 },
      },
    );

    expect(result).toBe("partial");
  });

  it("returns partial when pet's maximum care time is unlimited", () => {
    const result = isCareTimeCompatible(
      { minMinutes: 30, maxMinutes: null },
      {
        status: "known",
        value: { minMinutes: 60, maxMinutes: 90 },
      },
    );

    expect(result).toBe("partial");
  });

  it("returns partial when user's maximum time is unlimited but minimum does not cover pet's maximum", () => {
    const result = isCareTimeCompatible(
      { minMinutes: 30, maxMinutes: 60 },
      {
        status: "known",
        value: { minMinutes: 20, maxMinutes: null },
      },
    );

    expect(result).toBe("partial");
  });
});

describe("isInteractionCompatible", () => {
  it("returns unknown when user interaction preference is unknown", () => {
    const result = isInteractionCompatible("high", {
      status: "unknown",
    });

    expect(result).toBe("unknown");
  });

  it("returns full when user and pet both have low interaction level", () => {
    const result = isInteractionCompatible("low", {
      status: "known",
      value: "low",
    });

    expect(result).toBe("full");
  });

  it("returns partial when user wants low interaction but pet needs moderate interaction", () => {
    const result = isInteractionCompatible("moderate", {
      status: "known",
      value: "low",
    });

    expect(result).toBe("partial");
  });

  it("returns insufficient when user wants low interaction but pet needs high interaction", () => {
    const result = isInteractionCompatible("high", {
      status: "known",
      value: "low",
    });

    expect(result).toBe("insufficient");
  });

  it("returns partial when user wants moderate interaction and pet needs low interaction", () => {
    const result = isInteractionCompatible("low", {
      status: "known",
      value: "moderate",
    });

    expect(result).toBe("partial");
  });

  it("returns full when user and pet both have moderate interaction level", () => {
    const result = isInteractionCompatible("moderate", {
      status: "known",
      value: "moderate",
    });

    expect(result).toBe("full");
  });

  it("returns partial when user wants moderate interaction but pet needs high interaction", () => {
    const result = isInteractionCompatible("high", {
      status: "known",
      value: "moderate",
    });

    expect(result).toBe("partial");
  });

  it("returns insufficient when user wants high interaction but pet needs low interaction", () => {
    const result = isInteractionCompatible("low", {
      status: "known",
      value: "high",
    });

    expect(result).toBe("insufficient");
  });

  it("returns partial when user wants high interaction and pet needs moderate interaction", () => {
    const result = isInteractionCompatible("moderate", {
      status: "known",
      value: "high",
    });

    expect(result).toBe("partial");
  });

  it("returns full when user and pet both have high interaction level", () => {
    const result = isInteractionCompatible("high", {
      status: "known",
      value: "high",
    });

    expect(result).toBe("full");
  });
});

describe("isActivityCompatible", () => {
  it("should return unknown when user activity is unknown", () => {
    expect(isActivityCompatible("high", { status: "unknown" })).toBe("unknown");
  });

  it.each([
    ["low", "low", "full"],
    ["low", "moderate", "partial"],
    ["low", "high", "insufficient"],
    ["moderate", "low", "partial"],
    ["moderate", "moderate", "full"],
    ["moderate", "high", "partial"],
    ["high", "low", "insufficient"],
    ["high", "moderate", "partial"],
    ["high", "high", "full"],
  ] as const)(
    "user preference %s and pet activity %s should return %s",
    (userActivity, requiredActivity, expected) => {
      expect(
        isActivityCompatible(requiredActivity, {
          status: "known",
          value: userActivity,
        }),
      ).toBe(expected);
    },
  );
});

describe("isBudgetCompatible", () => {
  const monthlyCosts = {
    min: 2000,
    max: 3000,
  };

  it("returns unknown when user's budget is unknown", () => {
    expect(isBudgetCompatible(monthlyCosts, { status: "unknown" })).toBe(
      "unknown",
    );
  });

  it("returns insufficient when maximum budget is below minimum costs", () => {
    expect(
      isBudgetCompatible(monthlyCosts, {
        status: "known",
        value: {
          type: "range",
          range: { min: 500, max: 1500 },
        },
      }),
    ).toBe("insufficient");
  });

  it("returns full when minimum budget covers maximum costs", () => {
    expect(
      isBudgetCompatible(monthlyCosts, {
        status: "known",
        value: {
          type: "range",
          range: { min: 3000, max: 4000 },
        },
      }),
    ).toBe("full");
  });

  it("returns partial when budget overlaps with monthly costs", () => {
    expect(
      isBudgetCompatible(monthlyCosts, {
        status: "known",
        value: {
          type: "range",
          range: { min: 2500, max: 3500 },
        },
      }),
    ).toBe("partial");
  });

  it("returns partial when custom budget equals minimum costs", () => {
    expect(
      isBudgetCompatible(monthlyCosts, {
        status: "known",
        value: { type: "custom", amount: 2000 },
      }),
    ).toBe("partial");
  });

  it("returns full when custom budget covers maximum costs", () => {
    expect(
      isBudgetCompatible(monthlyCosts, {
        status: "known",
        value: { type: "custom", amount: 3000 },
      }),
    ).toBe("full");
  });

  it("returns insufficient when custom budget is below minimum costs", () => {
    expect(
      isBudgetCompatible(monthlyCosts, {
        status: "known",
        value: { type: "custom", amount: 1500 },
      }),
    ).toBe("insufficient");
  });

  it("returns partial when custom budget is between minimum and maximum costs", () => {
    expect(
      isBudgetCompatible(monthlyCosts, {
        status: "known",
        value: { type: "custom", amount: 2500 },
      }),
    ).toBe("partial");
  });

  it("returns partial when maximum monthly costs are unknown", () => {
    expect(
      isBudgetCompatible(
        { min: 2000, max: null },
        {
          status: "known",
          value: { type: "custom", amount: 5000 },
        },
      ),
    ).toBe("partial");
  });
});

describe("calculateCompatibilityScore", () => {
  it("returns 100 when all criteria are fully compatible", () => {
    const result = calculateCompatibilityScore({
      careTime: "full",
      budget: "full",
      interaction: "full",
      activity: "full",
    });

    expect(result).toEqual({
      score: 100,
      completeness: 100,
      evaluatedCriteria: 4,
      totalCriteria: 4,
    });
  });

  it("returns 50 when all criteria are partially compatible", () => {
    const result = calculateCompatibilityScore({
      careTime: "partial",
      budget: "partial",
      interaction: "partial",
      activity: "partial",
    });

    expect(result.score).toBe(50);
  });

  it("returns 0 when all criteria are insufficient", () => {
    const result = calculateCompatibilityScore({
      careTime: "insufficient",
      budget: "insufficient",
      interaction: "insufficient",
      activity: "insufficient",
    });

    expect(result.score).toBe(0);
  });

  it("calculates score using different criterion weights", () => {
    const result = calculateCompatibilityScore({
      careTime: "full",
      budget: "partial",
      interaction: "full",
      activity: "unknown",
    });

    expect(result).toEqual({
      score: 81,
      completeness: 80,
      evaluatedCriteria: 3,
      totalCriteria: 4,
    });
  });

  it("does not include unknown criteria in the score", () => {
    const result = calculateCompatibilityScore({
      careTime: "full",
      budget: "unknown",
      interaction: "unknown",
      activity: "unknown",
    });

    expect(result).toEqual({
      score: 100,
      completeness: 30,
      evaluatedCriteria: 1,
      totalCriteria: 4,
    });
  });

  it("returns null score when all criteria are unknown", () => {
    const result = calculateCompatibilityScore({
      careTime: "unknown",
      budget: "unknown",
      interaction: "unknown",
      activity: "unknown",
    });

    expect(result).toEqual({
      score: null,
      completeness: 0,
      evaluatedCriteria: 0,
      totalCriteria: 4,
    });
  });

  it("calculates score correctly when only budget and care time are known", () => {
    const result = calculateCompatibilityScore({
      careTime: "full",
      budget: "insufficient",
      interaction: "unknown",
      activity: "unknown",
    });

    expect(result).toEqual({
      score: 50,
      completeness: 60,
      evaluatedCriteria: 2,
      totalCriteria: 4,
    });
  });

  it("rounds the calculated score to the nearest integer", () => {
    const result = calculateCompatibilityScore({
      careTime: "full",
      budget: "partial",
      interaction: "partial",
      activity: "unknown",
    });

    expect(result.score).toBe(69);
  });
});
