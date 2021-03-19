const CleanCSS = require('clean-css');

module.exports = css => new CleanCSS().minify(css).styles;
