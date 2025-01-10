/**
 * Tailwind plugin for our icon classes
 */

const fs = require('fs');
const path = require('path');

const plugin = require('tailwindcss/plugin.js');

const icons = ({ iconFolder }) =>
    plugin(
        function({ addComponents, matchComponents, variants }) {
            const baseClasses = {
                '.icon': {
                    display: 'inline-block',
                    'vertical-align': 'middle',
                    width: '1.25rem',
                    height: '1.25rem',
                    'stroke-width': 0,
                    'line-height': 1,
                },

                '.icon:not(.icon-native)': {
                    fill: 'currentColor',
                    stroke: 'currentColor',
                },

                '.icon image': {
                    height: '100%',
                    width: '100%',
                },

                // In cases where we can't use an Icon Vue Component, we can load icons via a special
                // css class. Use masks so the icons can still use the currentColor for the fills.
                // Modeled on https://github.com/StackExchange/Stacks-Icons/blob/production/src/icons.css
                '.icon-bg::after': {
                    content: '""',
                    height: '100% !important',
                    width: '100% !important',
                    display: 'inline-block',
                    'background-color': 'currentColor',
                    mask: 'var(--bg-icon) no-repeat center',
                    'mask-size': 'contain',
                },

                '.icon-bg.icon-native::after': {
                    'background-color': 'unset',
                    mask: 'none',
                    'background-image': 'var(--bg-icon)',
                    'background-size': 'contain',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                },
            };

            const iconClasses = {};

            if (iconFolder) {
                fs.readdirSync(iconFolder).forEach(function(file) {
                    const svgContent = fs.readFileSync(path.join(iconFolder, file)).toString('utf8');
                    const uriString = `url(data:image/svg+xml,${encodeURIComponent(svgContent)})`;

                    const simpleName = file.replace('.svg', '');

                    iconClasses[`.icon-bg-${simpleName}`] = {
                        '--bg-icon': uriString,
                    };
                });
            }

            addComponents(baseClasses, {
                variants: variants('iconSizes'),
            });

            matchComponents(
                {
                    icon: value => ({
                        width: value,
                        height: value,
                    }),
                },
                {
                    values: {
                        xs: '1rem',
                        sm: '1.25rem',
                        md: '1.5rem',
                        lg: '2rem',
                        xl: '3rem',
                    },
                    type: ['length'],
                }
            );

            addComponents(iconClasses);
        },
        {
            variants: {
                iconSizes: [],
            },
        }
    );

module.exports = icons;
