const fetch = require('node-fetch');

module.exports = async styles => {
    const responses = await Promise.all(
        styles.map(style => fetch(style, {
            insecureHTTPParser: true,
        }))
    );

    return Promise.all(responses.map(response => response.text()));
};
