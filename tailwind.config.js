/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',    // pages klasörü altındaki ts ve tsx dosyaları
    './components/**/*.{ts,tsx}', // components klasörü altındaki ts ve tsx dosyaları
    './app/**/*.{ts,tsx}',       // Eğer app klasörünüz varsa
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
