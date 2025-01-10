/**
 * Tailwind plugin to create utilities for buttons
 * Based on Bootstrap buttons and button groups
 * https://github.com/twbs/bootstrap/blob/v4.6.0/scss/_buttons.scss
 * https://github.com/twbs/bootstrap/blob/v4.6.0/scss/_button-group.scss
 */

const plugin = require('tailwindcss/plugin.js');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette.js');
const createColor = require('color');
const { darken } = require('../utils.js');

const button = plugin(
    function({ addComponents, matchComponents, theme }) {
        // Re-implement Bootstrap's method of finding a good contrast color
        // Bump the threshold from 150 to 151 so that it uses white for our
        // danger color, which looks much better.
        // https://getbootstrap.com/docs/4.0/getting-started/theming/#color-contrast
        const YIQ_THRESHOLD = 151;
        function colorYIQ(color) {
            const [r, g, b] = color.rgb().array();
            const yiq = (r * 299 + g * 587 + b * 114) / 1000;

            return yiq >= YIQ_THRESHOLD ? createColor('#000000') : createColor('#ffffff');
        }

        const colors = flattenColorPalette(theme('buttonColor'));

        const primaryColor = createColor(colors.primary);
        const darkTextColor = createColor(colors.black);
        const lightTextColor = createColor(colors['dark-grey']);

        function colorButton(value) {
            const mainColor = createColor(value);
            const hoverColor = darken(mainColor, 3);
            let textColor = colorYIQ(mainColor).toString();

            // Manually override the text color for yellow buttons
            if (value === colors.yellow) {
                textColor = '#ffffff';
            }

            return {
                color: textColor,
                background: value,
                'border-color': value,
                'box-shadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075)',

                '&:hover': {
                    color: textColor,
                    background: hoverColor.toString(),
                    'border-color': hoverColor.toString(),
                },

                '&:focus': {
                    color: textColor,
                    background: hoverColor.toString(),
                    'border-color': hoverColor.toString(),

                    'box-shadow': `0 0 0 0.2rem ${mainColor.alpha(0.2).toString()} !important`,
                },

                '&.focus': {
                    color: textColor,
                    background: hoverColor.toString(),
                    'border-color': hoverColor.toString(),

                    'box-shadow': `0 0 0 0.2rem ${mainColor.alpha(0.2).toString()} !important`,
                },

                '&:disabled': {
                    color: textColor,
                    'background-color': value,
                    'border-color': value,
                    opacity: 0.6,
                },

                '&.disabled': {
                    color: textColor,
                    'background-color': value,
                    'border-color': value,
                    opacity: 0.6,
                },
            };
        }

        function outlineButton(value) {
            const color = createColor(value);
            const colorHover = darken(color, 3);

            return {
                color: value,
                'border-color': value,

                '&:hover': {
                    color: colorHover.toString(),
                    'border-color': colorHover.toString(),
                },

                '&:focus': {
                    'box-shadow': `0 0 0 0.2rem ${color.alpha(0.2).toString()} !important`,
                },

                '&.focus': {
                    'box-shadow': `0 0 0 0.2rem ${color.alpha(0.2).toString()} !important`,
                },

                '&:disabled': {
                    color: value,
                    opacity: 0.6,
                },

                '&.disabled': {
                    color: value,
                    opacity: 0.6,
                },
            };
        }

        const baseClasses = {
            '.btn': {
                display: 'inline-block',
                'text-align': 'center',
                'vertical-align': 'middle',
                'user-select': 'none',

                border: '1px solid transparent',

                padding: '0.25rem 0.875rem',
                'line-height': 1.5,
                'border-radius': '0.3125rem',

                'border-color': theme('borderColor.DEFAULT'),
                'background-color': colors.white,
                color: colors['dark-grey'],

                transition:
                    'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',

                '&:hover': {
                    color: darkTextColor.toString(),
                    'border-color': darken(createColor(theme('borderColor.DEFAULT')), 3).toString(),
                    'text-decoration': 'none',
                },

                '&:focus': {
                    outline: 0,
                    'box-shadow': `0 0 0 0.2rem ${primaryColor.alpha(0.2).toString()}`,
                },

                '&.focus': {
                    outline: 0,
                    'box-shadow': `0 0 0 0.2rem ${primaryColor.alpha(0.2).toString()}`,
                },

                '&:disabled': {
                    color: colors['dark-grey'],
                    opacity: 0.6,
                    'box-shadow': 'none',
                    cursor: 'default',
                },

                '&.disabled': {
                    color: colors['dark-grey'],
                    opacity: 0.6,
                    'box-shadow': 'none',
                    cursor: 'default',
                },

                '&:not(:disabled):not(.disabled)': {
                    cursor: 'pointer',
                },

                font: 'inherit',
                'font-weight': 'bold',

                // Regression in bootstrap 4.2+
                'white-space': 'nowrap',

                '&:not(.btn-link)': {
                    'font-size': '11px',
                    'font-weight': '900',
                    'line-height': '1.82',
                    'letter-spacing': '1.5px',
                    'text-transform': 'uppercase',
                },
            },

            // Future-proof disabling of clicks on `<a>` elements
            'a.btn.disabled': {
                'pointer-events': 'none',
            },

            'fieldset:disabled a.btn': {
                'pointer-events': 'none',
            },

            '.btn-link': {
                'font-weight': 'normal',
                color: primaryColor.toString(),
                'text-decoration': 'none',
                'border-width': 0,
                'background-color': 'transparent',

                '&:hover': {
                    color: darken(primaryColor, 15).toString(),
                    'text-decoration': 'underline',
                },

                '&:focus': {
                    'text-decoration': 'underline',
                },

                '&.focus': {
                    'text-decoration': 'underline',
                },

                '&:disabled': {
                    opacity: 0.6,
                    'pointer-events': 'none',
                },

                '&.disabled': {
                    opacity: 0.6,
                    'pointer-events': 'none',
                },
            },

            '.btn-text': {
                'font-weight': 'black',
                'text-transform': 'uppercase',
                'font-size': '11px',
                color: 'currentColor',
                'border-width': 0,
                background: 'transparent',
                'text-decoration': 'none',

                '&:hover': {
                    'text-decoration': 'underline',
                },

                '&:focus': {
                    'text-decoration': 'underline',
                },

                '&.focus': {
                    'text-decoration': 'underline',
                },

                '&:disabled': {
                    color: lightTextColor.toString(),
                    'pointer-events': 'none',
                },

                '&.disabled': {
                    color: lightTextColor.toString(),
                    'pointer-events': 'none',
                },
            },

            '.btn-lg': {
                padding: '0.25rem 1rem',
                'font-size': '12px',
                'line-height': 1.67,
                'border-radius': '.3rem',
            },

            '.btn.btn-xl': {
                padding: '0.5rem 1.25rem',
                'font-size': '13px',
                'line-height': 1.67,
                'border-radius': '.3rem',
            },

            '.btn-sm': {
                padding: '.25rem .5rem',
                'font-size': '.875rem',
                'line-height': 1.5,
                'border-radius': '.2rem',
            },

            '.btn-block': {
                display: 'block',
                width: '100%',

                // Vertically space out multiple block buttons
                '+ .btn-block': {
                    'margin-top': '0.5rem',
                },
            },

            '.btn-group': {
                position: 'relative',
                display: 'inline-flex',

                '> .btn': {
                    position: 'relative',
                    flex: '1 1 auto',

                    // Bring the hover, focused, and "active" buttons to the front to overlay the borders properly
                    '&:hover': {
                        'z-index': 1,
                    },

                    '&:focus': {
                        'z-index': 1,
                    },

                    '&:active': {
                        'z-index': 1,
                    },

                    '&.active': {
                        'z-index': 1,
                    },
                },

                // Prevent double borders when buttons are next to each other
                '> .btn:not(:first-child), > .btn-group:not(:first-child)': {
                    'margin-inline-start': '-1px',
                },

                // Reset rounded corners
                '> .btn:not(:last-child), > .btn-group:not(:last-child) > .btn': {
                    'border-start-end-radius': '0px',
                    'border-end-end-radius': '0px',
                },

                '> .btn:not(:first-child), > .btn-group:not(:first-child) > .btn': {
                    'border-start-start-radius': '0px',
                    'border-end-start-radius': '0px',
                },
            },

            // Group btn-groups in a toolbar
            '.btn-toolbar': {
                display: 'flex',
                'flex-wrap': 'wrap',
                'justify-content': 'flex-start',

                '.input-group': {
                    width: 'auto',
                },
            },

            // Environment-themed buttons
            '.btn-primary': {
                '.app-space-local &.btn-env-based': colorButton(colors['dark-grey']),
                '.app-space-qa &.btn-env-based, .app-space-dev &.btn-env-based': colorButton(colors.purple),
                '.app-space-staging &.btn-env-based, .app-space-test &.btn-env-based': colorButton(colors.red),
                '.app-space-integration &.btn-env-based, .app-space-prev &.btn-env-based': colorButton(colors.yellow),
            },

            // Icon Buttons
            '.btn-icon-only:not(.btn-link)': {
                'padding-inline-start': '0.5875rem',
                'padding-inline-end': '0.5875rem',
                'line-height': 0,
                'letter-spacing': 0,
            },

            '.btn-icon': {
                'font-size': '0.875rem',
            },
        };

        addComponents(baseClasses, {});

        matchComponents(
            {
                btn: value => {
                    try {
                        return colorButton(value);
                    } catch {}
                },
                'btn-outline': value => {
                    try {
                        return outlineButton(value);
                    } catch {}
                },
            },
            {
                values: flattenColorPalette(theme('buttonColor')),
                type: ['color', 'any'],
            }
        );
    },
    {
        theme: {
            buttonColor: theme => theme('colors'),
        },
        variants: {
            buttonColor: [],
        },
    }
);

module.exports = button;
