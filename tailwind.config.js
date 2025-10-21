/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#4f46e5',
                    DEFAULT: '#4f46e5',
                    dark: '#6366f1',
                },
                secondary: {
                    light: '#6366f1',
                    DEFAULT: '#6366f1',
                    dark: '#818cf8',
                },
                accent: {
                    light: '#818cf8',
                    DEFAULT: '#818cf8',
                    dark: '#a5b4fc',
                },
                surface: {
                    light: '#eef2ff',
                    DEFAULT: '#eef2ff',
                    dark: '#1e293b',
                },
                textPrimary: {
                    light: '#1e1b4b',
                    DEFAULT: '#1e1b4b',
                    dark: '#f1f5f9',
                },
                textSecondary: {
                    light: '#4338ca',
                    DEFAULT: '#4338ca',
                    dark: '#cbd5e1',
                },
                border: {
                    light: '#c7d2fe',
                    DEFAULT: '#c7d2fe',
                    dark: '#334155',
                },
            },
        },
    },
    plugins: [],
};
