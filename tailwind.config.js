/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F2",
        surface: "#FFFDF9",
        surfaceSecondary: "#F2EFE6",
        border: "#E3E0D7",

        primary: "#5F7657",
        primaryDark: "#40523B",
        primarySoft: "#DDE7D7",

        accent: "#E7A35F",
        accentYellow: "#E8C66B",

        text: "#252923",
        textSecondary: "#73786F",
        textMuted: "#9A9C94",

        success: "#6D9069",
        warning: "#D99A52",
        error: "#C86D62",
      },
      fontFamily: {
        display: ["DMSerifDisplay_400Regular"],
        body: ["Inter_400Regular"],
        bodyMedium: ["Inter_500Medium"],
        bodySemibold: ["Inter_600SemiBold"],
        bodyBold: ["Inter_700Bold"],
      },
    },
  },
  plugins: [],
};
