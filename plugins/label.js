/**
 * Tailwind plugin to create label classes for forms
 */

const plugin = require('tailwindcss/plugin.js');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette.js');

const label = plugin(function({ addComponents, theme }) {
    const colors = flattenColorPalette(theme('colors'));

    const labelClasses = {
        // Label
        '.label': {
            display: 'flex',
            'flex-direction': 'column',
            'margin-bottom': 0,
        },

        '.label-row': {
            display: 'flex',
            'align-items': 'center',
        },

        '.label-text': {
            'font-size': '0.6875rem',
            'line-height': '1.125rem',
            'font-weight': 'normal',

            '.label &': {
                'margin-bottom': '4px',
            },
        },

        '.label-badge': {
            padding: '2px 8px',
            'border-radius': '3px',
            'font-size': '0.5rem',
            'line-height': 1.5,
            'font-weight': 900,
            'text-transform': 'uppercase',
            'white-space': 'nowrap',

            '.label-row &': {
                'align-self': 'flex-end',
                'margin-inline-start': 'auto',
                'margin-bottom': '4px',
            },

            '.label-row & + &': {
                'margin-inline-start': '4px',
            },
        },

        // Label horizontal
        '.label-horizontal': {
            display: 'flex',
            'align-items': 'center',
        },

        '.label-horizontal-text': {
            'font-size': '0.6875rem',
            'line-height': '1.125rem',
            'font-weight': 'normal',
            'text-align': 'end',
            'margin-top': '4px',
        },

        '.label-hint': {
            display: 'inline-block',
            color: colors['dark-grey'],
            'font-size': '0.5625rem',
            'line-height': '1rem',
            'margin-bottom': '12px',
        },

        '.is-required::after': {
            content: "'*'",
            color: colors.red,
            'margin-inline-start': '1px',
            'margin-inline-end': '1px',
        },
    };

    addComponents(labelClasses, {});
});

module.exports = label;
