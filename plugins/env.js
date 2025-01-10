/**
 * Tailwind plugin that creates --env-color, and --env-name custom properties
 * based on the current panel environment.
 */

const plugin = require('tailwindcss/plugin.js');

const env = plugin(
    function({ addBase, theme }) {
        addBase({
            body: {
                '--env-color': theme('colors.green'),
                '--env-name': '\'live\'',

                '&.app-space-local': {
                    '--env-name': '\'local\'',
                    '--env-color': theme('colors.dark-grey'),
                },

                '&.app-space-staging': {
                    '--env-name': '\'staging\'',
                    '--env-color': theme('colors.red'),
                },

                '&.app-space-integration': {
                    '--env-name': '\'integration\'',
                    '--env-color': theme('colors.yellow'),
                },

                '&.app-space-qa': {
                    '--env-name': '\'qa\'',
                    '--env-color': theme('colors.purple'),
                },

                '&.app-space-dev': {
                    '--env-name': '\'dev\'',
                    '--env-color': theme('colors.purple'),
                },

                '&.app-space-prev, &.app-space-preview': {
                    '--env-name': '\'preview\'',
                    '--env-color': theme('colors.yellow'),
                },

                '&.app-space-test': {
                    '--env-name': '\'test\'',
                    '--env-color': theme('colors.red'),
                },

                '&.app-space-production': {
                    '--env-name': '\'production\'',
                    '--env-color': theme('colors.green'),
                },
            },
        });
    },
    {
        theme: {
            extend: {
                backgroundColor: {
                    'env-color': 'var(--env-color)',
                },
                textColor: {
                    env: 'var(--env-color)',
                },
            },
        },
    }
);

module.exports = env;
