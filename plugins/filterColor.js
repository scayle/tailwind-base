/**
 * Tailwind plugin for setting image colors through the filter property
 * https://developer.mozilla.org/en-US/docs/Web/CSS/filter
 *
 */

const createColor = require('color');
const plugin = require('tailwindcss/plugin.js');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette.js');

const filterColor = plugin(
    function({ matchUtilities, theme }) {
        matchUtilities(
            {
                filter: value => {
                    try {
                        const { r, g, b } = createColor(value).unitObject();
                        const encodedSvg = encodeURI(
                            `<svg xmlns="http://www.w3.org/2000/svg">
                                <filter id="filter" color-interpolation-filters="sRGB">
                                    <feColorMatrix type="matrix" values="
                                        0 0 0 0 ${r}
                                        0 0 0 0 ${g}
                                        0 0 0 0 ${b}
                                        0 0 0 1 0
                                    "></feColorMatrix>
                                </filter>
                            </svg>`.replace(/[\n\r]+/g, ' ')
                        );

                        return {
                            filter: `url("data:image/svg+xml,${encodedSvg}#filter");`,
                        };
                    } catch {}
                },
            },
            {
                values: flattenColorPalette(theme('filterColor')),
                type: ['color', 'any'],
            }
        );
    },
    {
        theme: {
            filterColor: theme => theme('colors'),
        },
        variants: {
            filterColor: [],
        },
    }
);

module.exports = filterColor;
