import colors from 'tailwindcss/colors'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
    colors: {
      ...colors
    }
  },
  safelist: [
    {
      pattern: /(bg|text)-+/
    }
  ],
  plugins: []
}
