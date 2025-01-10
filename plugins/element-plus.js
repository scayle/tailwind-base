/**
 * Tailwind plugin to set element-plus css variables based on the tailwind config
 */

const plugin = require('tailwindcss/plugin.js');
const createColor = require('color');
const { mix, lighten, darken } = require('../utils.js');

const base = plugin(function({ addBase, theme }) {
    const whiteColor = createColor(theme('colors.white'));
    const blackColor = createColor(theme('colors.black'));

    function colorVariables(colorName, color) {
        const result = {
            [`--el-color-${colorName}`]: color.toString(),
            [`--el-color-${colorName}-dark-2`]: mix(createColor(color), blackColor, 20).toString(),
        };

        for (let i = 1; i <= 9; i++) {
            result[`--el-color-${colorName}-light-${i}`] = mix(createColor(color), whiteColor, i * 10).toString();
        }

        return result;
    }

    addBase({
        ':root': {
            // Font settings
            '--el-font-size-extra-large': theme('fontSize.lg'),
            '--el-font-size-large': theme('fontSize.lg'),
            '--el-font-size-medium': theme('fontSize.md'),
            '--el-font-size-base': theme('fontSize.base'),
            '--el-font-size-small': theme('fontSize.sm'),
            '--el-font-size-extra-small': theme('fontSize.xs'),
            '--el-font-family': theme('fontFamily.base'),

            // Color settings
            ...colorVariables('primary', theme('colors.primary')),
            ...colorVariables('info', theme('colors.dark-grey')),
            ...colorVariables('success', theme('colors.success')),
            ...colorVariables('warning', theme('colors.warning')),
            ...colorVariables('danger', theme('colors.danger')),
            ...colorVariables('error', theme('colors.danger')),

            '--el-text-color-primary': theme('colors.black'),
            '--el-text-color-regular': theme('colors.dark-grey'),
            '--el-text-color-secondary': theme('colors.secondary'),
            '--el-text-color-placeholder': theme('colors.secondary'),
            '--el-text-color-disabled': theme('colors.secondary'),

            '--el-border-color': theme('borderColor.DEFAULT'),
            '--el-border-color-light': lighten(createColor(theme('borderColor.DEFAULT')), 3).toString(),
            '--el-border-color-lighter': lighten(createColor(theme('borderColor.DEFAULT')), 6).toString(),
            '--el-border-color-extra-light': lighten(createColor(theme('borderColor.DEFAULT')), 9).toString(),
            '--el-border-color-dark': darken(createColor(theme('borderColor.DEFAULT')), 3).toString(),
            '--el-border-color-darker': darken(createColor(theme('borderColor.DEFAULT')), 6).toString(),

            '--el-border-color-hover': theme('colors.primary'),

            '--el-fill-color': theme('backgroundColor.dark'),
            '--el-fill-color-light': lighten(createColor(theme('backgroundColor.dark')), 1).toString(),
            '--el-fill-color-lighter': lighten(createColor(theme('backgroundColor.dark')), 2).toString(),
            '--el-fill-color-extra-light': lighten(createColor(theme('backgroundColor.dark')), 3).toString(),
            '--el-fill-color-dark': darken(createColor(theme('backgroundColor.dark')), 2).toString(),
            '--el-fill-color-darker': darken(createColor(theme('backgroundColor.dark')), 4).toString(),
        },
    });
});

module.exports = base;
