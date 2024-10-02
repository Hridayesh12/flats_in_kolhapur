/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      base: {
        100: '#ffffff',
        200: '#f9f9f9',
        300: '#f6f6f6',
        400: '#b7b7b7',
        500: '#5c5c5c',
        600: '#000000',
        700: '#E3E3E3',
        800: '#f5f5f5',
        900: '#545454',
        1000: '#696969'
      },
      facebook: '#4267B2',    // Facebook Blue
      twitter: '#1DA1F2',     // Twitter Blue
      instagram: '#E1306C',   // Instagram Pink
      whatsapp: '#25D366',    // WhatsApp Green
      telegram: '#0088CC',    // Telegram Blue
    },
    extend: {
      fontFamily: {
        kollektif: ['Kollektif'],
      },
      boxShadow: {
        'custom-shadow': '-2px 6px 18.7px -3px rgba(0, 0, 0, 0.25)',
        'button-shadow': '-2px 6px 18.7px -3px rgba(0, 0, 0, 0.25)',
        'nav-hamburger-menu-shadow': '0px 4px 10px -3px rgba(0, 0, 0, 0.25)',
        'nav-hamburger-menu-link-shadow': '0px 4px 4px 0px #00000040',
        'footer-shadow': '-4px -2px 25.6px 1px #00000040'
      },
    },
  },
  plugins: [],
}