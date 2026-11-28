import { describe, expect, it } from "vitest";
import { mapQuizAnswers } from "./map-quiz-answers";
import type { QuizAnswers } from "@/types/quiz";

const createValidAnswers = (): QuizAnswers => ({
  housing: { type: "option", value: "apartment" },
  daily_care: { type: "option", value: "30_min_to_2_hours" },
  social_interaction: { type: "option", value: "moderate_interaction" },
  finance: { type: "option", value: "1500_to_3000" },
  absence_care: { type: "option", value: "rarely_away" },
  preparation: { type: "option", value: "ready_to_prepare" },
  activity: { type: "option", value: "moderate_activity" },
});

describe("mapQuizAnswers", () => {
  it("should successfully map valid quiz answers", () => {
    const result = mapQuizAnswers(createValidAnswers());

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.input).toEqual({
        housingType: {
          status: "known",
          value: "apartment",
        },
        availableCareTime: {
          status: "known",
          value: { minMinutes: 30, maxMinutes: 120 },
        },
        desiredInteraction: {
          status: "known",
          value: "moderate",
        },
        monthlyBudget: {
          status: "known",
          value: {
            type: "range",
            range: { min: 1500, max: 3000 },
          },
        },
        companionReadiness: {
          status: "unknown",
        },
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
          value: "moderate",
        },
      });
    }
  });

  it("should reject answers with unknown question IDs", () => {
    const answers = {
      ...createValidAnswers(),
      fake_question: { type: "option", value: "some_value" },
    } as QuizAnswers;

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          code: "UNKNOWN_QUESTION",
          questionId: "fake_question",
        }),
      );
    }
  });

  it("should reject answers with unknown option values", () => {
    const answers = createValidAnswers();
    answers.housing = { type: "option", value: "unknown_value" };

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          code: "INVALID_OPTION",
          questionId: "housing",
        }),
      );
    }
  });

  it("should accept unknown answers", () => {
    const answers = createValidAnswers();
    answers.daily_care = { type: "unknown" };

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.input.availableCareTime).toEqual({
        status: "unknown",
      });
    }
  });

  it("should map not_sure budget option as unknown", () => {
    const answers = createValidAnswers();
    answers.finance = { type: "option", value: "not_sure" };

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.input.monthlyBudget).toEqual({
        status: "unknown",
      });
    }
  });

  it("should treat missing answers as unknown", () => {
    const answers = createValidAnswers();
    delete answers.housing;

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.input.housingType).toEqual({
        status: "unknown",
      });
    }
  });

  it("should reject malformed answer objects", () => {
    const answers = {
      ...createValidAnswers(),
      housing: null,
    } as unknown as QuizAnswers;

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          code: "INVALID_ANSWER_TYPE",
          questionId: "housing",
        }),
      );
    }
  });

  it("should reject unsupported answer types", () => {
    const answers = {
      ...createValidAnswers(),
      housing: { type: "unsupported", value: "apartment" },
    } as unknown as QuizAnswers;

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          code: "INVALID_ANSWER_TYPE",
          questionId: "housing",
        }),
      );
    }
  });

  it("should successfully map custom budget answer", () => {
    const answers = createValidAnswers();
    answers.finance = { type: "custom_number", value: 2500 };

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.input.monthlyBudget).toEqual({
        status: "known",
        value: {
          type: "custom",
          amount: 2500,
        },
      });
    }
  });

  it("should reject negative custom budget", () => {
    const answers = createValidAnswers();
    answers.finance = { type: "custom_number", value: -900 };

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          code: "INVALID_NUMBER",
          questionId: "finance",
        }),
      );
    }
  });

  it("should reject decimal custom budget", () => {
    const answers = createValidAnswers();
    answers.finance = { type: "custom_number", value: 1500.5 };

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          code: "INVALID_NUMBER",
          questionId: "finance",
        }),
      );
    }
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY])(
    "should reject invalid numeric budget: %s",
    (value) => {
      const answers = {
        ...createValidAnswers(),
        finance: { type: "custom_number", value },
      } as QuizAnswers;

      const result = mapQuizAnswers(answers);

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.errors).toContainEqual(
          expect.objectContaining({
            code: "INVALID_NUMBER",
            questionId: "finance",
          }),
        );
      }
    },
  );

  it("should reject custom_number answer for a non-budget question", () => {
    const answers = createValidAnswers();
    answers.housing = {
      type: "custom_number",
      value: 100,
    };

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          code: "INVALID_ANSWER_TYPE",
          questionId: "housing",
        }),
      );
    }
  });

  it("should reject custom_amount option without a numeric value", () => {
    const answers = createValidAnswers();
    answers.finance = {
      type: "option",
      value: "custom_amount",
    };

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          code: "INVALID_ANSWER_TYPE",
          questionId: "finance",
        }),
      );
    }
  });
});

it.each([
  ["ready", "ready"],
  ["not_ready", "not_ready"],
  ["unsure", "unsure"],
] as const)("should map companion readiness option: %s", (answer, expected) => {
  const answers = createValidAnswers();
  answers.companion = { type: "option", value: answer };

  const result = mapQuizAnswers(answers);

  expect(result.success).toBe(true);

  if (result.success) {
    expect(result.input.companionReadiness).toEqual({
      status: "known",
      value: expected,
    });
  }
});

it("should map unknown companion readiness answer", () => {
  const answers = createValidAnswers();
  answers.companion = { type: "unknown" };

  const result = mapQuizAnswers(answers);

  expect(result.success).toBe(true);

  if (result.success) {
    expect(result.input.companionReadiness).toEqual({
      status: "unknown",
    });
  }
});

it.each([
  ["apartment", "apartment"],
  ["house", "house"],
] as const)("should map housing option: %s", (answer, expected) => {
  const answers = createValidAnswers();
  answers.housing = { type: "option", value: answer };

  const result = mapQuizAnswers(answers);

  expect(result.success).toBe(true);

  if (result.success) {
    expect(result.input.housingType).toEqual({
      status: "known",
      value: expected,
    });
  }
});

it.each([
  ["under_30_minutes", { minMinutes: 0, maxMinutes: 30 }],
  ["30_min_to_2_hours", { minMinutes: 30, maxMinutes: 120 }],
  ["over_2_hours", { minMinutes: 120, maxMinutes: null }],
] as const)("should map daily care time option: %s", (answer, expected) => {
  const answers = createValidAnswers();
  answers.daily_care = { type: "option", value: answer };

  const result = mapQuizAnswers(answers);

  expect(result.success).toBe(true);

  if (result.success) {
    expect(result.input.availableCareTime).toEqual({
      status: "known",
      value: expected,
    });
  }
});

it.each([
  ["low_interaction", "low"],
  ["moderate_interaction", "moderate"],
  ["high_interaction", "high"],
] as const)("should map desired interaction option: %s", (answer, expected) => {
  const answers = createValidAnswers();
  answers.social_interaction = { type: "option", value: answer };

  const result = mapQuizAnswers(answers);

  expect(result.success).toBe(true);

  if (result.success) {
    expect(result.input.desiredInteraction).toEqual({
      status: "known",
      value: expected,
    });
  }
});

it.each([
  ["under_500", { min: 0, max: 500 }],
  ["500_to_1500", { min: 500, max: 1500 }],
  ["1500_to_3000", { min: 1500, max: 3000 }],
  ["3000_to_5000", { min: 3000, max: 5000 }],
  ["over_5000", { min: 5000, max: null }],
] as const)("should map monthly budget range: %s", (answer, expected) => {
  const answers = createValidAnswers();
  answers.finance = { type: "option", value: answer };

  const result = mapQuizAnswers(answers);

  expect(result.success).toBe(true);

  if (result.success) {
    expect(result.input.monthlyBudget).toEqual({
      status: "known",
      value: {
        type: "range",
        range: expected,
      },
    });
  }
});

it.each(["rarely_away", "several_hours_daily", "away_most_of_day"] as const)(
  "should map daily absence option: %s",
  (answer) => {
    const answers = createValidAnswers();
    answers.absence_care = { type: "option", value: answer };

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.input.dailyAbsence).toEqual({
        status: "known",
        value: answer,
      });
    }
  },
);

it.each([
  ["ready_to_prepare", "ready"],
  ["needs_guidance", "needs_guidance"],
  ["not_sure", "unsure"],
  ["not_ready_to_prepare", "not_ready"],
] as const)(
  "should map preparation readiness option: %s",
  (answer, expected) => {
    const answers = createValidAnswers();
    answers.preparation = { type: "option", value: answer };

    const result = mapQuizAnswers(answers);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.input.preparationReadiness).toEqual({
        status: "known",
        value: expected,
      });
    }
  },
);

it.each([
  ["low_activity", "low"],
  ["moderate_activity", "moderate"],
  ["high_activity", "high"],
] as const)("should map desired activity option: %s", (answer, expected) => {
  const answers = createValidAnswers();
  answers.activity = { type: "option", value: answer };

  const result = mapQuizAnswers(answers);

  expect(result.success).toBe(true);

  if (result.success) {
    expect(result.input.desiredActivity).toEqual({
      status: "known",
      value: expected,
    });
  }
});
