const fetch = require('node-fetch');
const FormData = require('form-data');

const fetchStyles = require('./src/fetchStyles');
const getCritical = require('./src/getCritical');
const minify = require('./src/minify');

module.exports.processor = async ({
    url,
    key,
    styles,
    hash,
    return_url: returnURL,
    secret,
}) => {
    const stylesheets = await fetchStyles(styles);
    const critical = await getCritical(url, stylesheets);
    const minified = minify(critical);
    const body = new FormData();
    const data = {
        key,
        hash,
        stylesheet: minified,
        secret,
        url,
    };

    Object.keys(data)
        .forEach(key => {
            try {
                body.append(key, data[key]);
            } catch {}
        });

    const response = await fetch(returnURL, {
        method: 'POST',
        body,
        insecureHTTPParser: true,
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
        return response.status;
    }

    return response.json();
};
