/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: "#7F1D3A",
          burgundyHover: "#6B1831",
          burgundyLight: "#FDF2F4",
          burgundyBorder: "#F7C5D1",
          plum: "#4A2545",
          plumHover: "#391C36",
          plumLight: "#F5F0F4",
          ivory: "#FAF9F6",
          charcoal: "#202124",
          slate: "#667085",
          stone: "#E5E1DC",
          emerald: "#27836A",
          emeraldLight: "#EBF6F3",
          amber: "#C58A2B",
          amberLight: "#FDF7ED",
          coral: "#C94B4B",
          coralLight: "#FDF2F2",
          teal: "#3F7C7A",
          tealLight: "#EFF6F6",
          rose: "#C98F9B",
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(32, 33, 36, 0.04)',
        'card': '0 4px 16px rgba(32, 33, 36, 0.06)',
        'dropdown': '0 10px 30px rgba(32, 33, 36, 0.08)',
      },
      borderRadius: {
        'control': '8px',
        'card': '12px',
        'section': '16px',
      }
    },
  },
  plugins: [],
}
