export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "surface-bright": "#faf8ff",
        tertiary: "#a43a00",
        "on-secondary-fixed-variant": "#005138",
        "on-secondary": "#ffffff",
        "inverse-on-surface": "#eef0ff",
        "secondary-container": "#60f9bd",
        "on-secondary-fixed": "#002114",
        "primary-fixed": "#dae1ff",
        "on-primary": "#ffffff",
        "on-background": "#131b2e",
        "on-error": "#ffffff",
        "primary-fixed-dim": "#b3c5ff",
        "on-tertiary": "#ffffff",
        "inverse-surface": "#283044",
        "outline-variant": "#c2c6d8",
        secondary: "#006c4b",
        "primary-container": "#1a6bff",
        "on-tertiary-fixed-variant": "#7f2b00",
        "on-secondary-container": "#00714f",
        "secondary-fixed": "#63fcc0",
        error: "#ba1a1a",
        "on-tertiary-fixed": "#370e00",
        "surface-tint": "#0055d5",
        "on-primary-container": "#fffeff",
        "on-surface-variant": "#424655",
        "tertiary-container": "#cd4a00",
        "surface-container-low": "#f2f3ff",
        "surface-dim": "#d2d9f4",
        "surface-container-highest": "#dae2fd",
        "on-tertiary-container": "#fffdff",
        "on-primary-fixed": "#001849",
        surface: "#faf8ff",
        "inverse-primary": "#b3c5ff",
        "surface-container": "#eaedff",
        primary: "#0053d3",
        "tertiary-fixed": "#ffdbce",
        "on-surface": "#131b2e",
        "surface-variant": "#dae2fd",
        "surface-container-high": "#e2e7ff",
        "surface-container-lowest": "#ffffff",
        background: "#faf8ff",
        "secondary-fixed-dim": "#3fdfa5",
        outline: "#727687",
        "on-error-container": "#93000a",
        "tertiary-fixed-dim": "#ffb599",
        "on-primary-fixed-variant": "#003fa4",
        "error-container": "#ffdad6",
        navy: "#0A0F1E",
        "indigo-electric": "#5C6FFF",
        "violet-accent": "#8B5CF6",
        "emerald-accent": "#10B981",
        "warm-white": "#F8FAFF"
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        heading: ["Syne", "sans-serif"],
        headline: ["Syne", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        label: ["Inter", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.08)" }
        }
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
