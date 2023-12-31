/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          brandRed: "#FF3F4A",
          brandBlue: "#3E45EB",
          chatBg: "#E8E8E8",
          walletBorder: "#A52B32",
      },
      backgroundImage: {
          "svg-background": "url('/src/assets/landing_svg.png')",
          "landing-vector": "url('/src/assets/landing_vector_svg.svg')",
          "svg-background-mobile": "url('/src/assets/images/how_it_works.svg')",
          cover_placeholder: "url('/src/assets/images/Dashboard/cover_placeholder.png')",
          wallet_balance_card: "url('/src/assets/icons/wallet_balance_card.svg')",
          wallet_spent_card: "url('/src/assets/icons/wallet_spent_icon.png')",
      },
  },
  },
  plugins: [],
}