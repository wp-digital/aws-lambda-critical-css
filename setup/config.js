let path = require('path');

let setupChromePath = path.join(path.sep, 'tmp');

module.exports = {
    launchOptionForLambda: [
        // error when launch(); No usable sandbox! Update your kernel
        '--no-sandbox',
        // error when launch(); Failed to load libosmesa.so
        '--disable-gpu',
        // freeze when newPage()
        '--single-process',
    ],
    localChromePath: path.join('headless_shell.tar.gz'),
    setupChromePath,
    executablePath: path.join(
        setupChromePath,
        'headless_shell'
    )
};
