/**
 * Tailwind plugin to create utilities for badges
 */

const plugin = require('tailwindcss/plugin.js');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette.js');
const createColor = require('color');

const badge = plugin(
    function({ addComponents, matchComponents, variants, theme }) {
        const mainBadge = {
            '.badge': {
                display: 'inline-block',
                padding: '2px 5px',
                'text-align': 'center',
                'white-space': 'nowrap',
                'vertical-align': 'baseline',
                'border-radius': '4px',
                'font-size': '8px',
                'font-weight': '900',
                'line-height': '1.5',
                'letter-spacing': '0.05625rem',
                'text-transform': 'uppercase',
                'min-width': '3.75rem',

                // Empty badges collapse automatically
                '&:empty': {
                    display: 'none',
                },
            },
        };

        matchComponents(
            {
                badge: value => {
                    try {
                        const color = createColor(value);

                        return {
                            background: color.alpha(0.1).toString(),
                            color: color.toString(),
                        };
                    } catch {}
                },
            },
            {
                values: flattenColorPalette(theme('badgeColor')),
                type: ['color', 'any'],
            }
        );

        addComponents(mainBadge, {
            variants: variants('badgeColor'),
        });
    },
    {
        theme: {
            badgeColor: theme => theme('colors'),
        },
        variants: {
            badgeColor: [],
        },
    }
);

module.exports = badge;
