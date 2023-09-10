import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                'montserrat': ['Montserrat', 'sans-serif'],
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                base_main: '#20FC8F',
                base_secondary: '#807D6A',
                base_third: '#3F5E5A',
                base_four: '#38423B',
                base_five: '#353831',
                base_six: '#2D2D2A',
            },
            boxShadow: {
                'rounded-2': '0px 10px 1px rgba(221, 221, 221, 1), 0 10px 20px rgba(204, 204, 204, 1)',
            }
        },
    },
    daisyui: {
        themes: ["light"],
    },
    plugins: [
        forms,
        require("daisyui")
    ],
};
