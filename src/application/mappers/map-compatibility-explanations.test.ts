import { describe, it, expect } from "vitest";
import { mapCompatibilityExplanations } from "./map-compatibility-explanations";

describe("mapCompatibilityExplanations", () => {
  it("should map all compatibility criteria to explanations", () => {
    const result = mapCompatibilityExplanations({
      careTime: "full",
      budget: "partial",
      interaction: "insufficient",
      activity: "unknown",
    });

    expect(result).toEqual({
      careTime: {
        label: "Час на догляд",
        status: "full",
        message: "У тебе достатньо часу для щоденного догляду",
      },
      budget: {
        label: "Місячний бюджет",
        status: "partial",
        message: "Витрати можуть бути вищими за комфортний для тебе бюджет",
      },
      interaction: {
        label: "Взаємодія",
        status: "insufficient",
        message: "Потреби тварини не відповідають бажаному рівню взаємодії",
      },
      activity: {
        label: "Рівень активності",
        status: "unknown",
        message: "Недостатньо інформації про бажаний рівень активності",
      },
    });
  });

  it("should provide an explanation for every criterion status", () => {
    const statuses = ["full", "partial", "insufficient", "unknown"] as const;

    for (const status of statuses) {
      const result = mapCompatibilityExplanations({
        careTime: status,
        budget: status,
        interaction: status,
        activity: status,
      });

      expect(result.careTime.message).toBeTruthy();
      expect(result.budget.message).toBeTruthy();
      expect(result.interaction.message).toBeTruthy();
      expect(result.activity.message).toBeTruthy();
    }
  });
});
