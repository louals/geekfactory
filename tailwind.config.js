/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'bismuth-cyan': '#22d3ee',
        'bismuth-magenta': '#d946ef',
        'bismuth-purple': '#8b5cf6',
        'bismuth-teal': '#2dd4bf',
        'bismuth-lavender': '#c084fc',
      },
    },
  },
  plugins: [],
};

export default config;
