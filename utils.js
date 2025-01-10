/**
 *  @typedef {import('color')} Color
 */
module.exports = {
    /**
     * Convert a pixel value to rem
     * @param {String|Number} pixel - the value to convert in pixels
     * @param {String|Number?} context - the base font-size value in pixels
     */
    calcRem(pixel, context = 16) {
        return parseFloat(pixel) / parseFloat(context) + 'rem';
    },

    /**
     * Replacement for Sass's lighten function
     * https://sass-lang.com/documentation/modules/color#lighten
     * @param {Color} color
     * @param {Number} amount - the percent to increase the lightness by e.g. `3` will increase a lightness of 40% to 43%
     * @return {Color}
     */
    lighten(color, amount) {
        return color.lightness(color.lightness() + amount);
    },

    /**
     * Replacement for Sass's darken function
     * https://sass-lang.com/documentation/modules/color#darken
     * @param {Color} color
     * @param {Number} amount - the percent to decrease the lightness by e.g. `3` will decrease a lightness of 43% to 40%
     * @return {Color}
     */
    darken(color, amount) {
        return color.lightness(color.lightness() - amount);
    },

    /**
     * Replacement for Sass's mix function
     * https://sass-lang.com/documentation/modules/color#mix
     * @param {Color} firstColor
     * @param {Color} secondColor
     * @param {Number} weight - the weight from 0-100 of the first color in the mix
     * @return {Color}
     */
    mix(firstColor, secondColor, weight) {
        return firstColor.mix(secondColor, weight / 100);
    },

    /**
     * Utility to use @apply within Tailwind plugins
     * @param {Array<String>} classes - the classes to apply
     */
    apply(classes) {
        return {
            [`@apply ${classes.join(' ')}`]: {},
        };
    },
};
