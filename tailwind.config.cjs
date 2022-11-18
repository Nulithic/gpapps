/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3366FF",
          "primary-content": "#ffffff",
          secondary: "#00AB55",
          "secondary-content": "#ffffff",
          "accent-content": "#ffffff",
          neutral: "#191D24",
          "neutral-focus": "#111318",
          "neutral-content": "#ffffff",
          "base-100": "#2A303C",
          "base-200": "#242933",
          "base-300": "#20252E",
          "base-content": "#ffffff",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
