import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
     screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
          colors: {
        'skyBlue-950': '#082f49',
        'skyBlue-900': '#0c4a6e',
        'skyBlue-700': '#0369a1',
        'skyBlue-500': '#0ea5e9',
        'skyBlue-300': '#7dd3fc',
        'skyBlue-200': '#bae6fd',
      },
      backgroundColor: {
        'skyBlue-950': '#082f49',
        'skyBlue-900': '#0c4a6e',
        'skyBlue-700': '#0369a1',
        'skyBlue-500': '#0ea5e9',
        'skyBlue-300': '#7dd3fc',
        'skyBlue-200': '#bae6fd',
      },
    },
  },
  plugins: [],
} satisfies Config;
