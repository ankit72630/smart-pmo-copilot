module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#4f46e5" },
      animation: {
        "fade-in-up": "fadeInUp 0.4s ease-out",
        pulse: "pulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%,100%": { opacity: 0.5 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    // .card utility for equal heights + a11y outlines + fade
    function ({ addComponents }) {
      addComponents({
        ".card": {
          "@apply bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-primary animate-fade-in-up":
            {},
        },
      });
    },
  ],
};
