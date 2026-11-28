
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

      companion: null,

      environment: [
        {
          level: "required",
          description: "Потрібні місця для відпочинку та укриття",
        },
        {
          level: "required",
          description: "Потрібна кігтеточка",
        },
        {
          level: "recommended",
          description: "Бажані вертикальні поверхні та інтерактивні іграшки",
        },
      ],
    },

    costs: {
      initialSetup: {
        min: 3500,
        max: 6300,
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
      housing: ["apartment", "house"],
      maximumDailyAbsence: "several_hours_daily",

      companion: null,

      environment: [
        {
          level: "required",
          description:
            "Потрібні регулярні прогулянки та можливість справляти природні потреби",
        },
        {
          level: "required",
          description: "Потрібні щоденна взаємодія та фізична активність",
        },
        {
          level: "recommended",
          description:
            "Бажані ігри, тренування та завдання для розумової активності",
        },
      ],
    },

    costs: {
      initialSetup: {
        min: 3000,
        max: 9000,
      },
      monthly: {
        min: 3500,
        max: 5400,
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
        minSquareMeters: 6,
        maxSquareMeters: null,
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

      companion: {
        required: true,
        description: "Потрібен сумісний кролик-компаньйон",
      },

      environment: [
        {
          level: "required",
          description:
            "Потрібна простора безпечна зона для вільного пересування площею близько 6 м²",
        },
        {
          level: "required",
          description: "Потрібні безпечні матеріали для гризіння",
        },
        {
          level: "recommended",
          description: "Бажані укриття, тунелі та іграшки для дослідження",
        },
      ],
    },

    costs: {
      initialSetup: {
        min: 3800,
        max: 6800,
      },
      monthly: {
        min: 1500,
        max: 3200,
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

      companion: null,

      environment: [
        {
          level: "required",
          description: "Потрібне просторе житло з достатньою площею основи",
        },
        {
          level: "required",
          description: "Потрібен глибокий шар наповнювача для риття",
        },
        {
          level: "required",
          description: "Потрібне безпечне суцільне колесо для бігу та укриття",
        },
        {
          level: "recommended",
          description:
            "Бажані пісочна ванна та різноманітні елементи для дослідження",
        },
      ],
    },

    costs: {
      initialSetup: {
        min: 4500,
        max: 8000,
      },
      monthly: {
        min: 250,
        max: 600,
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

      companion: null,

      environment: [
        {
          level: "required",
          description:
            "Потрібен акваріум відповідного об'єму для обраних видів риб",
        },
        {
          level: "required",
          description: "Потрібні фільтрація та контроль якості води",
        },
        {
          level: "required",
          description: "Потрібно запустити азотний цикл до заселення риб",
        },
        {
          level: "required",
          description:
            "Потрібне обладнання для підтримання температури, відповідної обраним видам",
        },
        {
          level: "recommended",
          description: "Бажані живі рослини та укриття",
        },
      ],
    },

    costs: {
      initialSetup: {
        min: 3000,
        max: 6000,
      },
      monthly: {
        min: 300,
        max: 800,
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

      companion: {
        required: false,
        description: "Рекомендовано утримувати сумісну пару хвилястих папуг",
      },

      environment: [
        {
          level: "required",
          description: "Потрібна простора клітка з можливістю вільно рухатися",
        },
        {
          level: "required",
          description: "Потрібен щоденний безпечний політ поза кліткою",
        },
        {
          level: "required",
          description:
            "Потрібні жердинки різної товщини та місця для відпочинку",
        },
        {
          level: "recommended",
          description: "Бажані іграшки та предмети для пошуку їжі",
        },
      ],
    },

    costs: {
      initialSetup: {
        min: 2400,
        max: 5000,
      },
      monthly: {
        min: 250,
        max: 650,
      },
      emergencyReserve: {
        min: 3000,
        max: 7000,
      },
    },
  },
];
