let penthouse = require('penthouse');
let fetch = require('node-fetch');
let CleanCSS = require('clean-css');
let FormData = require('form-data');
let setup = require('./setup');

exports.handler = ({
    key,
    styles,
    url,
    hash,
    return_url,
    site_key
}, context, callback) => Promise.all(styles.map(fetch))
    .then(responses => Promise.all(responses.map(res => res.text())))
    .then(cssStrings => penthouse({
        url,
        cssString: cssStrings.join(' '),
        puppeteer: {
            getBrowser: setup.getBrowser
        }
    }))
    .then(criticalCss => {
        let body = new FormData();
        let data = {
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
            throw new Error(response.statusText);
        }
    })
    .then(response => callback(null, response))
    .catch(error => callback(error));