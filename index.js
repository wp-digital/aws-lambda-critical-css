const penthouse = require('penthouse');
const fetch = require('node-fetch');
const CleanCSS = require('clean-css');
const FormData = require('form-data');
const chromium = require('chrome-aws-lambda');

exports.handler = ({
    key,
    styles,
    url,
    hash,
    return_url,
    site_key
}, context, callback) => Promise.all(styles.map(style => fetch(style)))
    .then(responses => Promise.all(responses.map(response => response.text())))
    .then(cssStrings => penthouse({
        url,
        cssString: cssStrings.join(' '),
        puppeteer: {
            getBrowser: () => Promise.resolve(chromium.executablePath)
                .then(executablePath => chromium.puppeteer.launch({
                    args: chromium.args,
                    defaultViewport: chromium.defaultViewport,
                    executablePath: executablePath,
                    headless: chromium.headless
                }))
        }
    }))
    .then(criticalCss => {
        const body = new FormData();
        const data = {
            key,
            hash,
            stylesheet: new CleanCSS().minify(criticalCss).styles,
            secret: process.env.hasOwnProperty(site_key) ? process.env[site_key] : ''
        };

        Object.keys(data)
            .forEach(key => body.append(key, data[key]));

        return fetch(return_url, {
            method: 'POST',
            body
        });
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            const error = new Error(response.statusText);

            error.response = response;

            throw error;
        }
    })
    .then(response => callback(null, response))
    .catch(({
        response
    }) => response.json())
    .then(error => error && error.message && callback(error.message));
