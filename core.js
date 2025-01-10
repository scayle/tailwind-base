const createColor = require('color');
const { calcRem } = require('./utils.js');

// Theme Colors
const colors = {
    black: '#2b2b2b',

    green: '#0dcc8d',
    cyan: '#13cae7',
    red: '#ff4b62',
    pink: '#ff6495',
    yellow: '#fdd251',
    purple: '#a049e8',
    blue: '#3870f8',
    'dark-grey': '#8b8e92',

    white: '#ffffff',
    transparent: 'transparent',
    inherit: 'inherit',
    current: 'currentColor',
};

const INACTIVE_COLOR = '#adafb2';
const DISABLED_COLOR = '#efefef55';
const BORDER_COLOR = '#e9eaec';
const BACKGROUND_DARK_COLOR = '#f4f6f8';
const BACKGROUND_LIGHT_COLOR = '#f9fafb';

module.exports = {
    theme: {
        colors: {
            ...colors,

            // Color aliases
            primary: colors.green,
            secondary: colors['dark-grey'],
            success: colors.green,
            warning: colors.yellow,
            danger: colors.red,
            info: colors.blue,
            inactive: INACTIVE_COLOR,
            disabled: DISABLED_COLOR,
        },

        extend: {
            animation: {
                'fade-in': 'fade-in 0.3s forwards',
                'fade-out': 'fade-out 0.3s forwards',
                'fade-in-up': 'fade-in-up 0.3s forwards',
                'fade-in-end': 'fade-in-end 0.3s forwards',
                'fade-in-down': 'fade-in-down 0.3s forwards',
                'fade-in-start': 'fade-in-start 0.3s forwards',
            },
            backgroundColor: {
                light: BACKGROUND_LIGHT_COLOR,
                dark: BACKGROUND_DARK_COLOR,
            },
            borderColor: {
                DEFAULT: BORDER_COLOR,
                // We add the default as a named color here explicitly so we can use the Tailwind 3 opacity utils
                // https://github.com/tailwindlabs/tailwindcss/issues/8430
                default: BORDER_COLOR,
            },
            boxShadow: {
                xs: '0 0 20px 0 rgba(0, 0, 0, 0.03)',
                sm: '0 .125rem .25rem rgba(0, 0, 0, 0.075)',
                DEFAULT: '0 .5rem 1rem rgba(0, 0, 0, 0.15)',
                lg: '0 1rem 3rem rgba(0, 0, 0, 0.175)',
                primary: `0 0 7px 0 ${createColor(colors.primary).alpha(0.2).toString()}`,
                danger: `0 0 7px 0 ${createColor(colors.danger).alpha(0.2).toString()}`,
                success: `0 0 7px 0 ${createColor(colors.success).alpha(0.2).toString()}`,
                warning: `0 0 7px 0 ${createColor(colors.warning).alpha(0.2).toString()}`,
                info: `0 0 7px 0 ${createColor(colors.info).alpha(0.2).toString()}`,
                light: `0 0 7px 0 ${BACKGROUND_DARK_COLOR}`,
            },
            fontFamily: {
                sans: ['Lato', 'Noto Sans Arabic', 'Noto Sans Hebrew', 'sans-serif'],
                mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
                base: ['Lato', 'Noto Sans Arabic', 'Noto Sans Hebrew', 'sans-serif'],
            },
            fontSize: {
                xs: [calcRem('9x'), calcRem('16px')],
                sm: [calcRem('11px'), calcRem('18px')],
                base: [calcRem('13px'), calcRem('20px')],
                md: [calcRem('15px'), 1.5],
                lg: [calcRem('19px'), 1.5],
            },
            fontWeight: {
                bolder: 'bolder',
                lighter: 'lighter',
            },
            keyframes: {
                'fade-in': {
                    from: {
                        opacity: 0,
                    },
                    to: {
                        opacity: 1,
                    },
                },
                'fade-out': {
                    from: {
                        opacity: 1,
                    },
                    to: {
                        opacity: 0,
                    },
                },
                'fade-in-up': {
                    from: {
                        transform: 'translateY(100%)',
                        opacity: 0,
                    },
                    to: {
                        opacity: 1,
                    },
                },
                'fade-in-end': {
                    from: {
                        transform: 'translateX(calc(100% * var(--translate-x-multiplier)))',
                        opacity: 0,
                    },
                    to: {
                        opacity: 1,
                    },
                },
                'fade-in-down': {
                    from: {
                        transform: 'translateY(-100%)',
                        opacity: 0,
                    },
                    to: {
                        opacity: 1,
                    },
                },
                'fade-in-start': {
                    from: {
                        transform: 'translateX(calc(-100% * var(--translate-x-multiplier)))',
                        opacity: 0,
                    },
                    to: {
                        opacity: 1,
                    },
                },
            },
            zIndex: {
                dropdown: 1000,
                sticky: 1020,
                fixed: 1030,
                'modal-backdrop': 1040,
                modal: 1050,
                popover: 1060,
                tooltip: 1070,
                1: 1,
            },
        },
    },
};
