import type { PetProfile } from "@/domain/types/matching";

export const animals: PetProfile[] = [
  {
    id: "domestic-cat",
    species: "cat",
    details: {
      indoorAdaptation: true,
      groomingLevel: "moderate",
    },

    needs: {
      dailyCareTime: {
        minMinutes: 30,
        maxMinutes: 60,
      },
      interaction: "moderate",
      activity: "moderate",
    },

    requirements: {
      housing: ["apartment", "house"],
      maximumDailyAbsence: "away_most_of_day",
    },

    costs: {
      initialSetup: {
        min: 3000,
        max: 7000,
      },
      monthly: {
        min: 2000,
        max: 3000,
      },
      emergencyReserve: {
        min: 5000,
        max: 10000,
      },
    },
  },

  {
    id: "domestic-dog",
    species: "dog",
    details: {
      walksPerDay: 3,
      trainingNeeds: "moderate",
      socializationNeeds: "high",
    },

    needs: {
      dailyCareTime: {
        minMinutes: 90,
        maxMinutes: 150,
      },
      interaction: "high",
      activity: "high",
    },

    requirements: {
      housing: ["house"],
      maximumDailyAbsence: "several_hours_daily",
    },
    costs: {
      initialSetup: {
        min: 5000,
        max: 12000,
      },
      monthly: {
        min: 3000,
        max: 6000,
      },
      emergencyReserve: {
        min: 10000,
        max: 20000,
      },
    },
  },

  {
    id: "domestic-rabbit",
    species: "rabbit",
    details: {
      socialNeeds: "high",
      enclosureSpace: {
        minSquareMeters: 3,
        maxSquareMeters: 4,
      },
      chewingNeeds: "high",
    },

    needs: {
      dailyCareTime: {
        minMinutes: 60,
        maxMinutes: 90,
      },
      interaction: "moderate",
      activity: "moderate",
    },

    requirements: {
      housing: ["apartment", "house"],
      maximumDailyAbsence: "several_hours_daily",
    },

    costs: {
      initialSetup: {
        min: 4000,
        max: 8000,
      },
      monthly: {
        min: 1500,
        max: 3000,
      },
      emergencyReserve: {
        min: 5000,
        max: 10000,
      },
    },
  },

  {
    id: "syrian-hamster",
    species: "hamster",
    details: {
      nocturnalActivity: "high",
      enclosureSpace: {
        minSquareMeters: 0.5,
        maxSquareMeters: 0.6,
      },
      burrowingNeeds: "high",
    },

    needs: {
      dailyCareTime: {
        minMinutes: 20,
        maxMinutes: 40,
      },
      interaction: "low",
      activity: "moderate",
    },

    requirements: {
      housing: ["apartment", "house"],
      maximumDailyAbsence: "away_most_of_day",
    },

    costs: {
      initialSetup: {
        min: 3000,
        max: 6000,
      },
      monthly: {
        min: 500,
        max: 1000,
      },
      emergencyReserve: {
        min: 2000,
        max: 5000,
      },
    },
  },

  {
    id: "freshwater-aquarium",
    species: "freshwater_fish",
    details: {
      aquariumVolume: {
        minLiters: 60,
        maxLiters: 100,
      },
      waterMaintenance: "moderate",
      equipmentNeeds: "high",
    },

    needs: {
      dailyCareTime: {
        minMinutes: 15,
        maxMinutes: 30,
      },
      interaction: "low",
      activity: "low",
    },

    requirements: {
      housing: ["apartment", "house"],
      maximumDailyAbsence: "away_most_of_day",
    },

    costs: {
      initialSetup: {
        min: 5000,
        max: 12000,
      },
      monthly: {
        min: 500,
        max: 1500,
      },
      emergencyReserve: {
        min: 2000,
        max: 5000,
      },
    },
  },

  {
    id: "budgerigar",
    species: "budgerigar",
    details: {
      flightNeeds: "high",
      vocalizationLevel: "moderate",
      socialNeeds: "high",
    },

    needs: {
      dailyCareTime: {
        minMinutes: 45,
        maxMinutes: 90,
      },
      interaction: "high",
      activity: "high",
    },

    requirements: {
      housing: ["apartment", "house"],
      maximumDailyAbsence: "several_hours_daily",
    },

    costs: {
      initialSetup: {
        min: 3000,
        max: 7000,
      },
      monthly: {
        min: 700,
        max: 1500,
      },
      emergencyReserve: {
        min: 3000,
        max: 7000,
      },
    },
  },
];
