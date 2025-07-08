module.exports = {
    content: ['./src/**/*.{html,js,ts,tsx}', './content/**/*.{html,js,ts,tsx,md,mdx}'],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '997px',
            xl: '1280px',
            '2xl': '1536px'
        },
        extend: {
            colors: {
                primary: {
                    100: '#cce6f6',
                    200: '#99ceed',
                    300: '#66b5e5',
                    400: '#339ddc',
                    500: '#0084d3',
                    600: '#006aa9',
                    700: '#004f7f',
                    800: '#003554',
                    900: '#001a2a'
                },
                'white-80-alpha': 'rgba(255, 255, 255, 0.80)'
            },
            fontFamily: {
                clean: ['Montserrat']
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp')]
}
