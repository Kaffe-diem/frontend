import type { Config } from "tailwindcss";
import DaisyUI from "daisyui";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {}
  },

  daisyui: {
    themes: [
      {
        // Modified DaisyUI "forest" theme
        // Example themes: https://github.com/saadeghi/daisyui/blob/56313736a3eba4e12d24285caea4e1c3dbf229c1/src/theming/themes.js
        kaffeDiem: {
          primary: "#1EB854",
          secondary: "#1DB88E",
          accent: "#1DB8AB",
          neutral: "#19362D",
          "base-100": "#FFFFFF",
          "base-200": "#F2F2F2",
          "base-300": "#E5E6E6"
        },
        // Based on gruvbox-dark-hard from tinted-theming/schemes
        // https://tinted-theming.github.io/base16-gallery/
        kaffeDiemDark: {
          primary: "#b8bb26",
          secondary: "#8ec07c",
          accent: "#83a598",
          neutral: "#ebdbb2",
          "base-100": "#1d2021",
          "base-200": "#3c3836",
          "base-300": "#504945"
        }
      }
    ],
    darkTheme: "kaffeDiemDark"
  },

  plugins: [DaisyUI]
} as Config;
