/**
 * Tailwind plugin to create utilities for bullets
 */

const plugin = require('tailwindcss/plugin.js');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette.js');
const createColor = require('color');

const bullet = plugin(
    function({ addComponents, matchComponents, variants, theme }) {
        const mainBullet = {
            '.bullet': {
                display: 'inline-block',
                position: 'relative',
                'padding-inline-start': '10px',
                'font-size': '13px',
                color: theme('colors.black'),
                'text-transform': 'capitalize',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    'inset-inline-start': '0',
                    'vertical-align': 'baseline',
                    transform: 'translateY(-50%)',
                    width: '6px',
                    height: '6px',
                    display: 'block',
                    'border-radius': '10px',
                },
                '&:empty': {
                    '&::before': {
                        position: 'inherit',
                    },
                },
            },
        };

        matchComponents(
            {
                bullet: value => {
                    try {
                        const color = createColor(value);

                        return {
                            '&::before': {
                                background: color.toString(),
                            },
                        };
                    } catch {}
                },
            },
            {
                values: flattenColorPalette(theme('bulletColor')),
                type: ['color', 'any'],
            }
        );

        addComponents(mainBullet, {
            variants: variants('bulletColor'),
        });
    },
    {
        theme: {
            bulletColor: theme => theme('colors'),
        },
        variants: {
            bulletColor: [],
        },
    }
);

module.exports = bullet;
