import { describe, it, expect } from "vitest";
import { matchPets } from "./match-pets";
import type { MatchingInput, CatProfile } from "../types/matching";
import { animals } from "@/data/animals";

const matchingInput: MatchingInput = {
  housingType: { status: "known", value: "apartment" },
  availableCareTime: {
    status: "known",
    value: { minMinutes: 60, maxMinutes: 120 },
  },
  desiredInteraction: { status: "known", value: "moderate" },
  monthlyBudget: {
    status: "known",
    value: { type: "custom", amount: 3000 },
  },
  companionReadiness: { status: "unknown" },
  dailyAbsence: {
    status: "known",
    value: "several_hours_daily",
  },
  preparationReadiness: { status: "known", value: "ready" },
  desiredActivity: { status: "known", value: "moderate" },
};

const compatibleCat: CatProfile = {
  id: "cat-1",
  species: "cat",
  needs: {
    dailyCareTime: { minMinutes: 30, maxMinutes: 60 },
    interaction: "moderate",
    activity: "moderate",
  },
  requirements: {
    housing: ["apartment", "house"],
    maximumDailyAbsence: "several_hours_daily",
    companion: null,
    environment: [],
  },
  costs: {
    initialSetup: { min: 3000, max: 6000 },
    monthly: { min: 1000, max: 2000 },
    emergencyReserve: { min: 3000, max: 5000 },
  },
  details: {
    indoorAdaptation: true,
    groomingLevel: "low",
  },
};

describe("matchPets", () => {
  it("should recommend a fully compatible pet", () => {
    const result = matchPets([compatibleCat], matchingInput);

    expect(result).toHaveLength(1);
    expect(result[0].pet.id).toBe("cat-1");
    expect(result[0].status).toBe("recommended");
    expect(result[0].score).toBe(100);
  });

  it("should exclude a pet when housing is incompatible", () => {
    const houseOnlyCat: CatProfile = {
      ...compatibleCat,
      requirements: {
        housing: ["house"],
        maximumDailyAbsence: "several_hours_daily",
        companion: null,
        environment: [],
      },
    };

    const result = matchPets([houseOnlyCat], matchingInput);

    expect(result[0].status).toBe("excluded");
    expect(result[0].score).toBe(100);
  });

  it("should return conditional when housing is unknown", () => {
    const input: MatchingInput = {
      ...matchingInput,
      housingType: { status: "unknown" },
    };

    const result = matchPets([compatibleCat], input);

    expect(result[0].status).toBe("conditional");
    expect(result[0].score).toBe(100);
  });

  it("should lower compatibility score when the budget is insufficient", () => {
    const input: MatchingInput = {
      ...matchingInput,
      monthlyBudget: {
        status: "known",
        value: { type: "custom", amount: 500 },
      },
      desiredInteraction: {
        status: "known",
        value: "low",
      },
    };

    const result = matchPets([compatibleCat], input);

    expect(result[0].score).toBe(60);
    expect(result[0].status).toBe("conditional");
  });

  it("should return conditional with null score when all answers are unknown", () => {
    const input: MatchingInput = {
      housingType: { status: "unknown" },
      availableCareTime: { status: "unknown" },
      desiredInteraction: { status: "unknown" },
      monthlyBudget: { status: "unknown" },
      companionReadiness: { status: "unknown" },
      dailyAbsence: { status: "unknown" },
      preparationReadiness: { status: "unknown" },
      desiredActivity: { status: "unknown" },
    };

    const result = matchPets([compatibleCat], input);

    expect(result[0].status).toBe("conditional");
    expect(result[0].score).toBeNull();
  });

  it("should sort pets by recommendation status and score", () => {
    const recommendedCat: CatProfile = {
      ...compatibleCat,
      id: "cat-2",
      needs: {
        ...compatibleCat.needs,
        interaction: "high",
      },
    };

    const conditionalCat: CatProfile = {
      ...compatibleCat,
      id: "cat-3",
      needs: {
        ...compatibleCat.needs,
        interaction: "high",
      },
      costs: {
        ...compatibleCat.costs,
        monthly: { min: 4000, max: 5000 },
      },
    };

    const excludedCat: CatProfile = {
      ...compatibleCat,
      id: "cat-4",
      requirements: {
        housing: ["house"],
        maximumDailyAbsence: "several_hours_daily",
        companion: null,
        environment: [],
      },
    };

    const result = matchPets(
      [excludedCat, conditionalCat, recommendedCat, compatibleCat],
      matchingInput,
    );

    expect(result.map((item) => item.pet.id)).toEqual([
      "cat-1",
      "cat-2",
      "cat-3",
      "cat-4",
    ]);

    expect(result.map((item) => item.status)).toEqual([
      "recommended",
      "recommended",
      "conditional",
      "excluded",
    ]);

    expect(result.map((item) => item.score)).toEqual([100, 90, 60, 100]);
  });
});

describe("PetFit user scenarios", () => {
  it("should recommend suitable pets for a calm user with a low budget", () => {
    const calmUser: MatchingInput = {
      housingType: {
        status: "known",
        value: "apartment",
      },
      availableCareTime: {
        status: "known",
        value: {
          minMinutes: 0,
          maxMinutes: 30,
        },
      },
      desiredInteraction: {
        status: "known",
        value: "low",
      },
      monthlyBudget: {
        status: "known",
        value: {
          type: "range",
          range: {
            min: 500,
            max: 1500,
          },
        },
      },
      companionReadiness: { status: "unknown" },
      dailyAbsence: {
        status: "known",
        value: "away_most_of_day",
      },
      preparationReadiness: {
        status: "known",
        value: "ready",
      },
      desiredActivity: {
        status: "known",
        value: "low",
      },
    };

    const result = matchPets(animals, calmUser);

    expect(
      result.map(({ pet, score, status }) => ({
        id: pet.id,
        score,
        status,
      })),
    ).toEqual([
      {
        id: "freshwater-aquarium",
        score: 70,
        status: "recommended",
      },
      {
        id: "syrian-hamster",
        score: 60,
        status: "conditional",
      },
      {
        id: "domestic-cat",
        score: 35,
        status: "conditional",
      },
      {
        id: "domestic-rabbit",
        score: 35,
        status: "excluded",
      },
      {
        id: "budgerigar",
        score: 15,
        status: "excluded",
      },
      {
        id: "domestic-dog",
        score: 0,
        status: "excluded",
      },
    ]);
  });

  it("should recommend active pets for an active user with a high budget", () => {
    const activeUser: MatchingInput = {
      housingType: {
        status: "known",
        value: "house",
      },
      availableCareTime: {
        status: "known",
        value: {
          minMinutes: 120,
          maxMinutes: null,
        },
      },
      desiredInteraction: {
        status: "known",
        value: "high",
      },
      monthlyBudget: {
        status: "known",
        value: {
          type: "range",
          range: {
            min: 5000,
            max: null,
          },
        },
      },
      companionReadiness: { status: "unknown" },
      dailyAbsence: {
        status: "known",
        value: "rarely_away",
      },
      preparationReadiness: {
        status: "known",
        value: "ready",
      },
      desiredActivity: {
        status: "known",
        value: "high",
      },
    };

    const result = matchPets(animals, activeUser);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].status).toBe("recommended");
  });

  it("should recommend suitable pets for a busy user who is away most of the day", () => {
    const busyUser: MatchingInput = {
      housingType: {
        status: "known",
        value: "apartment",
      },
      availableCareTime: {
        status: "known",
        value: {
          minMinutes: 0,
          maxMinutes: 30,
        },
      },
      desiredInteraction: {
        status: "known",
        value: "low",
      },
      monthlyBudget: {
        status: "known",
        value: {
          type: "range",
          range: {
            min: 1500,
            max: 3000,
          },
        },
      },
      companionReadiness: { status: "unknown" },
      dailyAbsence: {
        status: "known",
        value: "away_most_of_day",
      },
      preparationReadiness: {
        status: "known",
        value: "ready",
      },
      desiredActivity: {
        status: "known",
        value: "low",
      },
    };

    const result = matchPets(animals, busyUser);

    expect(
      result
        .filter(({ status }) => status === "excluded")
        .map(({ pet }) => pet.id),
    ).toEqual(
      expect.arrayContaining(["domestic-dog", "domestic-rabbit", "budgerigar"]),
    );
  });

  it("should recommend social pets for a highly interactive user", () => {
    const socialUser: MatchingInput = {
      housingType: {
        status: "known",
        value: "apartment",
      },
      availableCareTime: {
        status: "known",
        value: {
          minMinutes: 120,
          maxMinutes: null,
        },
      },
      desiredInteraction: {
        status: "known",
        value: "high",
      },
      monthlyBudget: {
        status: "known",
        value: {
          type: "range",
          range: {
            min: 5000,
            max: null,
          },
        },
      },
      companionReadiness: { status: "unknown" },
      dailyAbsence: {
        status: "known",
        value: "rarely_away",
      },
      preparationReadiness: {
        status: "known",
        value: "ready",
      },
      desiredActivity: {
        status: "known",
        value: "high",
      },
    };

    const result = matchPets(animals, socialUser);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].status).toBe("recommended");
  });
});

describe("matchPets additional requirements", () => {
  it("should exclude a pet when daily absence is incompatible", () => {
    const input: MatchingInput = {
      ...matchingInput,
      dailyAbsence: {
        status: "known",
        value: "away_most_of_day",
      },
    };

    const result = matchPets([compatibleCat], input);

    expect(result[0].status).toBe("excluded");
  });

  it("should return conditional when daily absence is unknown", () => {
    const input: MatchingInput = {
      ...matchingInput,
      dailyAbsence: { status: "unknown" },
    };

    const result = matchPets([compatibleCat], input);

    expect(result[0].status).toBe("conditional");
  });

  it("should not exclude a pet when the user is ready to provide a companion", () => {
    const socialCat: CatProfile = {
      ...compatibleCat,
      requirements: {
        ...compatibleCat.requirements,
        companion: {
          required: true,
          description: "Needs another cat",
        },
      },
    };

    const input: MatchingInput = {
      ...matchingInput,
      companionReadiness: {
        status: "known",
        value: "ready",
      },
    };

    const result = matchPets([socialCat], input);

    expect(result[0].status).toBe("recommended");
  });

  it("should exclude a pet when the user is not ready to provide a required companion", () => {
    const socialCat: CatProfile = {
      ...compatibleCat,
      requirements: {
        ...compatibleCat.requirements,
        companion: {
          required: true,
          description: "Needs another cat",
        },
      },
    };

    const input: MatchingInput = {
      ...matchingInput,
      companionReadiness: {
        status: "known",
        value: "not_ready",
      },
    };

    const result = matchPets([socialCat], input);

    expect(result[0].status).toBe("excluded");
  });

  it("should return conditional when companion readiness is unsure", () => {
    const socialCat: CatProfile = {
      ...compatibleCat,
      requirements: {
        ...compatibleCat.requirements,
        companion: {
          required: true,
          description: "Needs another cat",
        },
      },
    };

    const input: MatchingInput = {
      ...matchingInput,
      companionReadiness: {
        status: "known",
        value: "unsure",
      },
    };

    const result = matchPets([socialCat], input);

    expect(result[0].status).toBe("conditional");
  });

  it("should exclude a pet when one critical requirement is incompatible even if another is unknown", () => {
    const input: MatchingInput = {
      ...matchingInput,
      housingType: { status: "unknown" },
      dailyAbsence: {
        status: "known",
        value: "away_most_of_day",
      },
    };

    const result = matchPets([compatibleCat], input);

    expect(result[0].status).toBe("excluded");
  });

  it("should keep a pet with no companion requirement compatible", () => {
    const input: MatchingInput = {
      ...matchingInput,
      companionReadiness: {
        status: "known",
        value: "not_ready",
      },
    };

    const result = matchPets([compatibleCat], input);

    expect(result[0].status).toBe("recommended");
  });
});
