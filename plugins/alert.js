/**
 * Tailwind plugin to create utilities for alerts
 * Based on Bootstrap alerts
 * https://github.com/twbs/bootstrap/blob/v4.6.0/scss/_alert.scss
 */

const plugin = require('tailwindcss/plugin.js');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette.js');
const createColor = require('color');
const { apply } = require('../utils.js');

const alert = plugin(
    function({ addComponents, matchComponents, variants, theme }) {
        const baseAlert = {
            '.alert': {
                position: 'relative',
                padding: '0.75rem 1.25rem',
                'margin-bottom': '1rem',
                'border-width': '1px',
                'border-style': 'solid',
                ...apply(['rounded', 'text-black']),
            },
        };

        matchComponents(
            {
                alert: value => {
                    try {
                        const color = createColor(value);

                        return {
                            background: color.alpha(0.1).toString(),
                            'border-color': color.toString(),
                            hr: {
                                'border-top-color': color.toString(),
                            },
                        };
                    } catch {}
                },
            },
            {
                values: flattenColorPalette(theme('alertColor')),
                type: ['color', 'any'],
            }
        );

        addComponents(baseAlert, {
            variants: variants('alertColor'),
        });
    },
    {
        theme: {
            alertColor: theme => theme('colors'),
        },
        variants: {
            alertColor: [],
        },
    }
);

module.exports = alert;
