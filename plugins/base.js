/**
 * Tailwind plugin to apply our base styles
 */

const plugin = require('tailwindcss/plugin.js');
const createColor = require('color');
const { apply, darken } = require('../utils.js');

const base = plugin(function({ addBase, theme }) {
    addBase({
        body: {
            margin: 0,
            'font-size': '1rem',
            'font-weight': 400,
            'line-height': 1.5,
            'text-align': 'start',
            ...apply(['bg-light', 'text-black']),
            'max-width': '100vw',
            'overscroll-behavior': 'none',

            '--env-color': theme('colors.green'),
            '--env-name': "'live'",

            '&.app-space-local': {
                '--env-name': "'local'",
                '--env-color': theme('colors.dark-grey'),
            },

            '&.app-space-staging': {
                '--env-name': "'staging'",
                '--env-color': theme('colors.red'),
            },

            '&.app-space-integration': {
                '--env-name': "'integration'",
                '--env-color': theme('colors.yellow'),
            },

            '&.app-space-qa': {
                '--env-name': "'qa'",
                '--env-color': theme('colors.purple'),
            },

            '&.app-space-dev': {
                '--env-name': "'dev'",
                '--env-color': theme('colors.purple'),
            },

            '&.app-space-prev, &.app-space-preview': {
                '--env-name': "'preview'",
                '--env-color': theme('colors.yellow'),
            },

            '&.app-space-test': {
                '--env-name': "'test'",
                '--env-color': theme('colors.red'),
            },

            '&.app-space-production': {
                '--env-name': "'production'",
                '--env-color': theme('colors.green'),
            },
        },

        hr: {
            ...apply(['my-4', 'border-t']),
        },

        a: {
            color: theme('colors.primary'),
            'text-decoration': 'none',
            'background-color': 'transparent',

            '&:hover': {
                color: darken(createColor(theme('colors.primary')), 15).toString(),
                'text-decoration': 'underline',
            },
        },

        'h1, .h1': {
            ...apply(['headline-36']),
        },

        'h2, .h2': {
            ...apply(['headline-26']),
        },

        'h3, .h3': {
            ...apply(['headline-19']),
        },

        'h4, .h4': {
            ...apply(['headline-15']),
        },

        'h5, .h5': {
            ...apply(['headline-13']),
        },

        'h6, .h6': {
            ...apply(['headline-11']),
        },

        'h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6': {
            ...apply(['mb-2']),
        },

        button: {
            '&:not(:disabled):not(.disabled)': {
                cursor: 'pointer',
            },
        },

        '*': {
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
        },

        'html, body': {
            height: '100%',
        },

        img: {
            'max-width': '100%',
            'vertical-align': 'bottom',
        },
    });
});

module.exports = base;
