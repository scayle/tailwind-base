/**
 * Tailwind plugin to hide the scrollbar
 */

const plugin = require('tailwindcss/plugin.js');

const noScrollbar = plugin(
    function({ addUtilities, variants }) {
        const utilities = {
            '.no-scrollbar': {
                '-ms-overflow-style': 'none' /* Internet Explorer 10+ */,
                'scrollbar-width': 'none' /* Firefox */,
                '&::-webkit-scrollbar': {
                    display: 'none' /* Safari and Chrome */,
                },
            },
        };

        addUtilities(utilities, {
            variants: variants('noScrollbar'),
        });
    },
    {
        variants: {
            noScrollbar: [],
        },
    }
);

module.exports = noScrollbar;
