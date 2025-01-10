/**
 * Tailwind plugin for our avatar classes
 * See Styleguide
 */

const plugin = require('tailwindcss/plugin.js');

const avatar = plugin(
    function({ addComponents, variants }) {
        const baseClasses = {
            '.avatar': {
                'flex-shrink': 0,
                display: 'inline-block',
                'vertical-align': 'middle',
                position: 'relative',
                'font-weight': 900,
                'text-align': 'center',
                color: '#ffffff',
                width: '60px',
                height: '60px',
                'font-size': '20px',
                'line-height': '60px',

                '.avatar-initials': {
                    width: '100%',
                    height: '100%',
                    'background-color': '#000000',
                    'border-radius': '50%',
                },

                '.avatar-image': {
                    width: '100%',
                    height: '100%',
                    'border-radius': '50%',
                    'object-fit': 'cover',
                    position: 'relative',
                    overflow: 'hidden',

                    // Visible if image loading error (i.e 404)
                    '&[data-initials]': {
                        '&::before': {
                            width: '100%',
                            height: '100%',
                            'background-color': '#000000',
                            opacity: 0.75,
                            display: 'inline-block',
                            content: 'attr(data-initials)',
                            transition: 'all 250ms ease-in-out',
                        },
                    },
                },

                "img.avatar-image:not([src]), img.avatar-image[src=''], img.avatar-image[src='null']": {
                    display: 'none',
                },
            },
        };

        const avatarSizeClasses = {
            '.avatar.avatar-xs': {
                width: '20px',
                height: '20px',
                'font-size': '9px',
                'line-height': '20px',
            },

            '.avatar.avatar-sm': {
                width: '29px',
                height: '29px',
                'font-size': '9px',
                'line-height': '29px',
            },

            '.avatar.avatar-md': {
                width: '44px',
                height: '44px',
                'font-size': '16px',
                'line-height': '44px',
            },

            '.avatar.avatar-lg': {
                width: '60px',
                height: '60px',
                'font-size': '28px',
                'line-height': '60px',
            },

            '.avatar.avatar-xl': {
                width: '90px',
                height: '90px',
                'font-size': '28px',
                'line-height': '90px',
            },
        };

        addComponents(baseClasses);

        addComponents(avatarSizeClasses, {
            variants: variants('avatarSizes'),
        });
    },
    {
        variants: {
            avatarSizes: [],
        },
    }
);

module.exports = avatar;
