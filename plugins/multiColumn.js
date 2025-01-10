/**
 * Tailwind plugin to create utilities for CSS Multicol
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns
 */

const plugin = require('tailwindcss/plugin.js');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette.js');

const multiColumn = plugin(
    function({ addUtilities, matchUtilities, variants, e, theme }) {
        matchUtilities(
            {
                'col-count': value => ({
                    'column-count': value,
                }),
            },
            {
                values: theme('columnCount'),
                type: ['number'],
            }
        );

        const columnSpan = Object.entries(theme('columnSpan')).reduce((obj, [key, value]) => {
            obj[`.${e(`col-span-${key}`)}`] = { 'column-span': value };
            return obj;
        }, {});

        addUtilities(columnSpan, {
            variants: variants('columnSpan'),
        });

        const columnRuleStyle = Object.entries(theme('columnRuleStyle')).reduce((obj, [key, value]) => {
            obj[`.${e(`rule-${key}`)}`] = { 'column-rule-style': value };
            return obj;
        }, {});

        addUtilities(columnRuleStyle, {
            variants: variants('columnRuleStyle'),
        });

        matchUtilities(
            {
                rule: value => ({
                    'column-rule-width': value,
                }),
            },
            {
                values: theme('columnRuleWidth'),
                type: ['length'],
            }
        );

        matchUtilities(
            {
                rule: value => ({
                    'column-rule-color': value,
                }),
            },
            {
                values: flattenColorPalette(theme('columnRuleColor')),
                type: ['color', 'any'],
            }
        );
    },
    {
        theme: {
            columnCount: () => ({
                auto: 'auto',
                1: 1,
                2: 2,
                3: 3,
            }),
            columnSpan: () => ({
                all: 'all',
                none: 'none',
            }),
            columnRuleStyle: () => ({
                none: 'none',
                hidden: 'hidden',
                dotted: 'dotted',
                dashed: 'dashed',
                solid: 'solid',
                double: 'double',
                groove: 'groove',
                ridge: 'ridge',
                inset: 'inset',
                outset: 'outset',
            }),
            columnRuleWidth: () => ({
                thin: 'thin',
                medium: 'medium',
                thick: 'thick',
            }),
            columnRuleColor: theme => theme('colors'),
        },
        variants: {
            columnCount: ['responsive'],
            columnSpan: ['responsive'],
            columnRuleStyle: [],
            columnRuleWidth: [],
            columnRuleColor: [],
        },
    }
);

module.exports = multiColumn;
