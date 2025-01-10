/**
 * Tailwind plugin to add additional CSS variables
 */

const plugin = require('tailwindcss/plugin.js');

const base = plugin(function({ addBase }) {
    addBase({
        ':root': {
            '--translate-x-multiplier': '1',
        },
        '*:dir(rtl)': {
            '--translate-x-multiplier': '-1',
        },
    });
});

module.exports = base;
