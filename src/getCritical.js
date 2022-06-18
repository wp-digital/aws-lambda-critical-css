const penthouse = require('penthouse');

const getBrowser = require('./getBrowser');

module.exports = (url, cssStrings) => penthouse({
    url,
    cssString: cssStrings.join(' '),
    puppeteer: {
        getBrowser,
    },
    renderWaitTime: 1000,
    blockJSRequests: false,
});
