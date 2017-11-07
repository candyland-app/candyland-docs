'use strict';
const fs = require('fs');
const chalk = require('chalk');
const rimraf = require('rimraf');

const green = chalk.bold.green;	// Green bold text
const yellow = chalk.bold.yellow;	// Green bold text

const distPath = 'dist/';// Dist directory

if (fs.existsSync(distPath)) {
	// Check if `dist` directory exist
	try {
		// Clean-up
		rimraf.sync(distPath);
		console.log(green('✔ Cleaning up'));
	} catch (err) {
		console.error(err);
	}
} else {
	console.log(yellow('Nothing to clean-up'));
}
