
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
