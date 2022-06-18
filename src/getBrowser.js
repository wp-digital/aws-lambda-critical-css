const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

module.exports = async () => puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
});