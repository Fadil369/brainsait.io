export default {
    content: [
        "./src/**/*.{html,js}",
        "./src/index.html"
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2563eb',
                secondary: '#10b981',
                accent: '#f59e0b'
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'arabic': ['Noto Sans Arabic', 'Tahoma', 'sans-serif']
            }
        }
    },
    plugins: [],
    darkMode: 'class'
}