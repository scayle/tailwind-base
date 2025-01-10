/**
 * Tailwind plugin to support CSS Scrollbar Styling
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scrollbars
 *
 */

const plugin = require('tailwindcss/plugin.js');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette.js');

const scrollbar = plugin(
    function({ addUtilities, matchUtilities, addBase, theme }) {
        const options = {
            values: flattenColorPalette(theme('scrollbarColor')),
            type: ['color', 'any'],
        };

        matchUtilities(
            {
                track: value => {
                    return {
                        '--tw-scrollbar-track-color': value,
                    };
                },
            },
            options
        );

        matchUtilities(
            {
                thumb: value => {
                    return {
                        '--tw-scrollbar-thumb-color': value,
                    };
                },
            },
            options
        );

        const scrollbarWidth = {
            '.scrollbar-auto': {
                '--tw-scrollbar-width': 'auto',
            },
            '.scrollbar-thin': {
                '--tw-scrollbar-width': 'thin',
            },
            '.scrollbar-none': {
                '--tw-scrollbar-width': 'none',
            },
        };

        addBase({
            '*, ::before, ::after': {
                '--tw-scrollbar-track-color': 'auto',
                '--tw-scrollbar-thumb-color': 'auto',
                '--tw-scrollbar-width': 'auto',
                'scrollbar-color': 'var(--tw-scrollbar-thumb-color, auto) var(--tw-scrollbar-track-color, auto)',
                'scrollbar-width': 'var(--tw-scrollbar-width, auto)',
            },
        });

        addUtilities(scrollbarWidth);
    },
    {
        theme: {
            scrollbarColor: theme => theme('colors'),
        },
        variants: {
            scrollbarColor: [],
        },
    }
);

module.exports = scrollbar;
