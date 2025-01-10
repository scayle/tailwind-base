/**
 * Tailwind plugin to create input group components
 * Based on Bootstrap input groups
 * https://github.com/twbs/bootstrap/blob/v4.6.0/scss/_input-group.scss
 */

const plugin = require('tailwindcss/plugin.js');

const card = plugin(function({ addComponents, theme }) {
    const inputGroupStyles = {
        //
        // Base styles
        //
        '.input-group': {
            position: 'relative',
            display: 'flex',
            'flex-wrap': 'wrap', // For form validation feedback
            'align-items': 'stretch',
            width: '100%',

            '> .form-control': {
                position: 'relative', // For focus state's z-index
                flex: '1 1 auto',
                width: '1%',
                'min-width': 0, // https://stackoverflow.com/questions/36247140/why-dont-flex-items-shrink-past-content-size
                'margin-bottom': 0,

                '+ .form-control': {
                    'margin-inline-start': '-1px',
                },

                '&:not(:first-child)': {
                    'border-start-start-radius': 0,
                    'border-end-start-radius': 0,
                },
            },

            // Bring the "active" form control to the top of surrounding elements
            '> .form-control:focus': {
                'z-index': 3,
            },
        },

        // Prepend and append
        //
        // While it requires one extra layer of HTML for each, dedicated prepend and
        // append elements allow us to 1) be less clever, 2) simplify our selectors, and
        // 3) support HTML5 form validation.
        '.input-group-prepend, .input-group-append': {
            display: 'flex',

            // Ensure buttons are always above inputs for more visually pleasing borders.
            // This isn't needed for `.input-group-text` since it shares the same border-color
            // as our inputs.
            '.btn': {
                position: 'relative',
                'z-index': 2,

                '&:focus': {
                    'z-index': 3,
                },
            },

            [`.btn + .btn,
            .btn + .input-group-text,
            .input-group-text + .input-group-text,
            .input-group-text + .btn`]: {
                'margin-inline-start': '-1px',
            },
        },

        '.input-group-prepend': { 'margin-inline-end': '-1px' },

        '.input-group-append': {
            'margin-inline-start': '-1px',

            '> .btn:first-child': {
                'border-inline-start': 0,
            },

            '> .btn:hover': {
                'border-color': theme('borderColor.DEFAULT'),
            },
        },

        // Textual addons
        //
        // Serves as a catch-all element for any text or radio/checkbox input you wish
        // to prepend or append to an input.
        '.input-group-text': {
            display: 'flex',
            'align-items': 'center',
            padding: '0.375rem 0.6875rem',
            'margin-bottom': 0, // Allow use of <label> elements by overriding our default margin-bottom
            'font-size': '0.8125rem', // Match inputs
            'font-weight': 'normal',
            'line-height': 'calc(21 / 13)',
            color: theme('colors.black'),
            'text-align': 'center',
            'white-space': 'nowrap',
            'background-color': theme('backgroundColor.dark'),
            border: `1px solid ${theme('borderColor.DEFAULT')}`,
            'border-radius': '.25rem',

            // Nuke default margins from checkboxes and radios to vertically center within.
            'input[type="radio"], input[type="checkbox"]': {
                'margin-top': 0,
            },
        },

        // Prepend and append rounded corners
        //
        // These rulesets must come after the sizing ones to properly override sm and lg
        // border-radius values when extending. They're more specific than we'd like
        // with the `.input-group >` part, but without it, we cannot override the sizing.
        [`.input-group > .input-group-prepend > .btn,
.input-group > .input-group-prepend > .input-group-text,
.input-group:not(.has-validation) > .input-group-append:not(:last-child) > .btn,
.input-group:not(.has-validation) > .input-group-append:not(:last-child) > .input-group-text,
.input-group.has-validation > .input-group-append:nth-last-child(n + 3) > .btn,
.input-group.has-validation > .input-group-append:nth-last-child(n + 3) > .input-group-text,
.input-group > .input-group-append:last-child > .btn:not(:last-child):not(.dropdown-toggle),
.input-group > .input-group-append:last-child > .input-group-text:not(:last-child)`]: {
            'border-start-end-radius': 0,
            'border-end-end-radius': 0,
        },

        [`.input-group > .input-group-append > .btn,
.input-group > .input-group-append > .input-group-text,
.input-group > .input-group-prepend:not(:first-child) > .btn,
.input-group > .input-group-prepend:not(:first-child) > .input-group-text,
.input-group > .input-group-prepend:first-child > .btn:not(:first-child),
.input-group > .input-group-prepend:first-child > .input-group-text:not(:first-child)`]: {
            'border-start-start-radius': 0,
            'border-end-start-radius': 0,
        },
    };

    addComponents(inputGroupStyles, {});
});

module.exports = card;
