/**
 * Tailwind plugin for style resets
 */

const plugin = require('tailwindcss/plugin.js');

const reset = plugin(
    function({ addComponents, variants }) {
        const utilities = {
            '.anchor-reset': {
                color: 'inherit',
                '&:focus': {
                    color: 'inherit',
                    'text-decoration': 'none',
                },
                '&:hover': {
                    color: 'inherit',
                    'text-decoration': 'none',
                },
            },
            '.button-reset': {
                padding: 0,
                margin: 0,
                'background-color': 'transparent',
                'border-width': 0,
            },
        };

        addComponents(utilities, {
            variants: variants('reset'),
        });
    },
    {
        variants: {
            reset: [],
        },
    }
);

module.exports = reset;
