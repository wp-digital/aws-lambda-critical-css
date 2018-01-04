let fs = require('fs');
let tar = require('tar');
let puppeteer = require('puppeteer');
let config = require('./config');

let existsExecutableChrome = () => new Promise(resolve => fs.exists(config.executablePath, exists => resolve(exists)));

let setupLocalChrome = () => new Promise(resolve => fs.createReadStream(config.localChromePath)
    .pipe(tar.x({
        C: config.setupChromePath,
    }))
    .on('end', () => resolve()));

exports.getBrowser = () => existsExecutableChrome()
    .then(() => setupLocalChrome())
    .then(() => puppeteer.launch({
        headless: true,
        executablePath: config.executablePath,
        args: config.launchOptionForLambda
    }));