/**
 * Tailwind plugin for our text preset classes
 * See Styleguide
 */

const plugin = require('tailwindcss/plugin.js');
const { calcRem } = require('../utils.js');

const text = plugin(
    function({ addComponents, variants }) {
        const baseClasses = {
            '.headline-9': {
                'font-size': calcRem('9px'),
                'line-height': calcRem('14px'),
                'letter-spacing': calcRem('0.25px'),
                'font-weight': 'bold',
            },

            '.headline-11': {
                'font-size': calcRem('11px'),
                'line-height': calcRem('16px'),
                'letter-spacing': calcRem('0.1px'),
                'font-weight': 'bold',
            },

            '.headline-13': {
                'font-size': calcRem('13px'),
                'line-height': calcRem('20px'),
                'letter-spacing': 'normal',
                'font-weight': 'bold',
            },

            '.headline-15': {
                'font-size': calcRem('15px'),
                'line-height': calcRem('24px'),
                'letter-spacing': 'normal',
                'font-weight': 'bold',
            },

            '.headline-19': {
                'font-size': calcRem('19px'),
                'line-height': calcRem('28px'),
                'letter-spacing': 'normal',
                'font-weight': 900,
            },

            '.headline-26': {
                'font-size': calcRem('26px'),
                'line-height': calcRem('34px'),
                'letter-spacing': 'normal',
                'font-weight': 900,
            },

            '.headline-36': {
                'font-size': calcRem('36px'),
                'line-height': calcRem('44px'),
                'letter-spacing': 'normal',
                'font-weight': 900,
            },

            '.paragraph-9': {
                'font-size': calcRem('9px'),
                'line-height': calcRem('16px'),
                'letter-spacing': calcRem('0.25px'),
                'font-weight': 'normal',
            },

            '.paragraph-11': {
                'font-size': calcRem('11px'),
                'line-height': calcRem('18px'),
                'letter-spacing': calcRem('0.1px'),
                'font-weight': 'normal',
            },

            '.paragraph-13': {
                'font-size': calcRem('13px'),
                'line-height': calcRem('20px'),
                'letter-spacing': 'normal',
                'font-weight': 'normal',
            },

            '.column-label': {
                'font-size': calcRem('9px'),
                'line-height': calcRem('16px'),
                'letter-spacing': calcRem('0.85px'),
                'font-weight': 'bold',
                'text-transform': 'uppercase',
            },

            '.btn-label': {
                'font-size': calcRem('13px'),
                'line-height': calcRem('20px'),
                'letter-spacing': calcRem('0.8px'),
                'font-weight': 900,
            },
        };

        addComponents(baseClasses, {
            variants: variants('text'),
        });
    },
    {
        variants: {
            text: ['responsive'],
        },
    }
);

module.exports = text;
