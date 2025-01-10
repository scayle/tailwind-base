/**
 * Tailwind plugin to create utilities for forms
 * Based on Bootstrap forms
 * https://github.com/twbs/bootstrap/blob/v4.6.0/scss/_forms.scss
 */

const plugin = require('tailwindcss/plugin.js');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette.js');
const createColor = require('color');
const { apply } = require('../utils.js');

const forms = plugin(
    function({ addComponents, theme, e }) {
        const colors = flattenColorPalette(theme('colors'));

        const formClasses = {
            '.form-group': {
                'margin-bottom': '1rem',
            },

            '.grid .form-group': {
                'margin-bottom': 0,
            },

            '.form-horizontal': {
                ...apply(['grid', 'gap-y-5', 'gap-x-2']),

                'grid-template-columns': 'fit-content(30%) minmax(0, 1fr)',

                '.label-horizontal': {
                    display: 'contents',
                },
            },

            '.form-control': {
                display: 'block',
                width: '100%',
                height: 'calc((21 / 13) * 1em + 0.75rem + 2px)',
                padding: '0.375rem 0.6875rem',
                'font-size': '0.8125rem',
                'font-weight': 400,
                'line-height': 'calc(21 / 13)',
                color: colors.black,
                'background-color': colors.white,
                'background-clip': 'padding-box',
                'border-width': '1px',
                'border-style': 'solid',

                // Note: This has no effect on <select>s in some browsers, due to the limited stylability of `<select>`s in CSS.
                'border-radius': '4px',

                transition: 'border-color .15s ease-in-out, box-shadow .15s ease-in-out',
                '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none',
                },

                // Unstyle the caret on `<select>`s in IE10+.
                '&::-ms-expand': {
                    'background-color': 'transparent',
                    border: 0,
                },

                // Remove select outline from select box in FF
                '&:-moz-focusring': {
                    color: 'transparent',
                    'text-shadow': `0 0 0 ${colors.secondary}`,
                },

                '&:hover': {
                    'border-color': colors.primary,
                },

                // Customize the `:focus` state to imitate native WebKit styles.
                '&:focus': {
                    color: colors.black,
                    'background-color': colors.white,
                    'border-color': colors.primary,
                    'border-width': '1.5px',
                    outline: 0,
                    ...apply(['shadow-primary']),
                },

                // Placeholder
                '&::placeholder': {
                    color: colors.secondary,
                    // Override Firefox's unusual default opacity; see https://github.com/twbs/bootstrap/pull/11526.
                    opacity: 1,
                },

                // Disabled and read-only inputs
                //
                // HTML5 says that controls under a fieldset > legend:first-child won't be
                // disabled if the fieldset is disabled. Due to implementation difficulty, we
                // don't honor that edge case; we style them as disabled anyway.
                '&:disabled, &[readonly]': {
                    'background-color': theme('backgroundColor.light'),
                    // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655.
                    opacity: 1,

                    ...apply(['text-dark-grey', 'text-opacity-50']),

                    '&:hover, &:focus': {
                        'border-color': theme('borderColor.DEFAULT'),
                        'box-shadow': 'none',
                    },
                },
            },

            'input[type="date"], input[type="time"], input[type="datetime-local"], input[type="month"]': {
                '&.form-control': {
                    appearance: 'none', // Fix appearance for date inputs in Safari
                },
            },

            'select.form-control': {
                '&:focus::-ms-value': {
                    // Suppress the nested default white text on blue background highlight given to
                    // the selected option text when the (still closed) <select> receives focus
                    // in IE and (under certain conditions) Edge, as it looks bad and cannot be made to
                    // match the appearance of the native widget.
                    // See https://github.com/twbs/bootstrap/issues/19398.
                    color: colors.secondary,
                    'background-color': colors.white,
                },
                '&[size], &[multiple]': {
                    height: 'auto',
                },
            },

            'textarea.form-control': {
                height: 'auto',
            },
        };

        const validationStates = theme('validationStates');

        const validationClasses = Object.entries(validationStates).reduce((obj, [state, color]) => {
            const stateSelector = e(`is-${state}`);
            const feedbackSelector = e(`${state}-feedback`);

            obj[`.${feedbackSelector}`] = {
                display: 'none',
                width: '100%',
                'margin-top': '4px',
                'font-size': '0.6875rem',
                color,
            };

            obj[`.${stateSelector}`] = {
                [`~ .${feedbackSelector}`]: {
                    display: 'block',
                },
            };

            obj[`.form-control.${stateSelector}`] = {
                'border-color': color,

                '&:focus': {
                    'border-color': color,
                    'box-shadow': `0 0 7px 0 ${createColor(color).alpha(0.2).toString()}`,
                },
            };

            return obj;
        }, {});

        addComponents(formClasses, {});
        addComponents(validationClasses, {});
    },
    {
        theme: {
            validationStates: theme => ({
                invalid: theme('colors.danger'),
                valid: theme('colors.success'),
            }),
        },
    }
);

module.exports = forms;
