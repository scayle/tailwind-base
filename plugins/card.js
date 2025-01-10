/**
 * Tailwind plugin to create card components
 * Based on Bootstrap cards
 * https://github.com/twbs/bootstrap/blob/v4.6.0/scss/_card.scss
 */

const plugin = require('tailwindcss/plugin.js');
const { apply } = require('../utils.js');

const card = plugin(function({ addComponents, theme }) {
    const cardStyles = {
        //
        // Base styles
        //
        '.card': {
            position: 'relative',
            display: 'flex',
            'flex-direction': 'column',
            'min-width': 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            'word-wrap': 'break-word',
            'background-color': theme('colors.white'),
            'background-clip': 'border-box',
            'border-radius': '0.25rem',

            '> hr': {
                'margin-inline-end': 0,
                'margin-inline-start': 0,
            },

            ...apply(['shadow-xs']),

            'border-style': 'solid',
            'border-width': '1px',

            padding: 0,
            'text-align': 'start',

            '.card': {
                'margin-bottom': '16px',
                'border-color': theme('borderColor.DEFAULT'),
            },
        },

        '.card-body': {
            // Enable `flex-grow: 1` for decks and groups so that card blocks take up
            // as much space as possible, ensuring footers are aligned to the bottom.
            flex: '1 1 auto',
            // Workaround for the image size bug in IE
            // See: https://github.com/twbs/bootstrap/pull/28855
            'min-height': '1px',
            padding: '1.25rem',

            h4: {
                'font-size': '13px',
                color: theme('colors.black'),
            },

            'margin-bottom': 0,
        },

        '.card-title': {
            'margin-bottom': '0.75rem',
        },

        '.card-subtitle': {
            'margin-top': '-0.5rem',
            'margin-bottom': 0,
        },

        '.card-text:last-child': {
            'margin-bottom': 0,
        },

        '.card-link': {
            '&:hover': {
                'text-decoration': 'none',
            },

            '+ .card-link': {
                'margin-inline-start': '1.25rem',
            },
        },

        //
        // Optional textual caps
        //
        '.card-header': {
            padding: '0.75rem 1.25rem',
            'margin-bottom': 0, // Removes the default margin-bottom of <hN>
            'background-color': 'transparent',

            'border-bottom-style': 'solid',
            'border-bottom-width': '1px',

            '&:first-child': {
                'border-radius': '0.25rem 0.25rem 0 0',
            },

            display: 'flex',
            'align-items': 'center',
            'min-height': '60px',

            'h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6': {
                'margin-bottom': 0,
            },

            h3: {
                ...apply(['headline-15']),
                margin: 0,
            },

            h5: {
                ...apply(['headline-15']),
                margin: 0,
            },

            '.counter': {
                'margin-inline-start': '4px',
                display: 'inline-block',
                'font-weight': 'normal',
                color: theme('colors.dark-grey'),
            },

            '.title': {
                ...apply(['headline-15']),
            },

            '.count': {
                'font-size': '15px',
                'margin-inline-start': '8px',
            },
        },

        '.card-footer': {
            padding: '0.75rem 1.25rem',
            'background-color': 'transparent',

            'border-top-style': 'solid',
            'border-top-width': '1px',

            '&:last-child': {
                'border-radius': '0 0 0.25rem 0.25rem',
            },
        },
    };

    addComponents(cardStyles, {});
});

module.exports = card;
