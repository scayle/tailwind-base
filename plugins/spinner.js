/**
 * Tailwind plugin for our spinner classes
 * Usage:
 *  Plain: <div class="spinner"></div>
 *         <div class="spinner spinner-sm"></div>
 *  VueJs: <spinner :size="`sm`" /> (default size: md === 3em)
 *         <spinner :size="`500px`" /> (custom size)
 */

const plugin = require('tailwindcss/plugin.js');

const spinner = plugin(
    function({ addComponents, matchComponents, theme }) {
        const baseClasses = {
            '@keyframes sk-bouncedelay': {
                '0%, 80%, 100%': {
                    transform: 'scale(0)',
                },
                '40%': {
                    transform: 'scale(1)',
                },
            },

            '.spinner': {
                display: 'block',
                'font-size': '14px',
                'text-align': 'center',
                'line-height': 0,

                span: {
                    display: 'inline-block',
                    width: '1em',
                    height: '1em',
                    'border-radius': '100%',
                    'background-color': 'currentColor',
                    animation: 'sk-bouncedelay 1.4s infinite ease-in-out both',
                    'will-change': 'transform',

                    '&:first-child': {
                        'animation-delay': '-0.32s',
                    },

                    '&:nth-child(2)': {
                        'animation-delay': '-0.16s',
                    },
                },

                '&:not(.spinner-current)': {
                    color: '#9fa5ac',
                },
            },

            '.spinner-overlay': {
                position: 'relative',

                '&::before': {
                    content: '""',
                    position: 'absolute',
                    'background-color': 'rgba(255, 255, 255, 0.8)',
                    'z-index': 999,
                    display: 'block',
                    top: 0,
                    'inset-inline-start': 0,
                    width: '100%',
                    height: '100%',
                },

                '&.has-rounded-border::before': {
                    'border-radius': '4px',
                },

                '.spinner': {
                    position: 'relative',
                    'z-index': 1000,

                    '&.is-centered': {
                        position: 'absolute',
                        top: '50%',
                        'inset-inline-start': '50%',
                        transform: 'translate(-50%, -50%)',
                    },
                },
            },
        };

        matchComponents(
            {
                spinner: value => ({
                    '&.spinner': {
                        width: value,
                        margin: 'auto auto 0',

                        span: {
                            width: `calc(${value} / 5)`,
                            height: `calc(${value} / 5)`,
                        },
                    },
                }),
            },
            {
                values: theme('spinnerSizes'),
                type: ['length'],
            }
        );

        addComponents(baseClasses);
    },
    {
        theme: {
            spinnerSizes: () => ({
                xs: '1em',
                sm: '1.5em',
                md: '3em',
                lg: '4.5em',
                xl: '6em',
            }),
        },
        variants: {
            spinnerSizes: [],
        },
    }
);

module.exports = spinner;
