const path = require('path');

module.exports = {
    presets: [require('./core')],
    plugins: [
        require(path.join(__dirname, 'plugins/alert')),
        require(path.join(__dirname, 'plugins/avatar')),
        require(path.join(__dirname, 'plugins/badge')),
        require(path.join(__dirname, 'plugins/bullet')),
        require(path.join(__dirname, 'plugins/button')),
        require(path.join(__dirname, 'plugins/card')),
        require(path.join(__dirname, 'plugins/filterColor')),
        require(path.join(__dirname, 'plugins/forms')),
        require(path.join(__dirname, 'plugins/icon'))({
            iconFolder: path.join(path.dirname(require.resolve('@scayle/panel-icons')), 'icons'),
        }),
        require(path.join(__dirname, 'plugins/inputGroup')),
        require(path.join(__dirname, 'plugins/label')),
        require(path.join(__dirname, 'plugins/multiColumn')),
        require(path.join(__dirname, 'plugins/noScrollbar')),
        require(path.join(__dirname, 'plugins/reset')),
        require(path.join(__dirname, 'plugins/scrollbar')),
        require(path.join(__dirname, 'plugins/spinner')),
        require(path.join(__dirname, 'plugins/text')),
        require(path.join(__dirname, 'plugins/variables')),
    ],
};
