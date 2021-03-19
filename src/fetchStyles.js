const fetch = require('node-fetch');

module.exports = async styles => {
    const responses = await Promise.all(styles.map(style => fetch(style)));

    return Promise.all(responses.map(response => response.text()));
};
