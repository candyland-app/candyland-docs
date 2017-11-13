'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');

const resolve = path.resolve;

const green = chalk.bold.green;	// Green bold text
const yellow = chalk.bold.yellow;	// Green bold text

const distPath = resolve(__dirname, '../dist');	// Dist directory
const publishPath = resolve(__dirname, '../publish');	// Publish directory

if (fs.existsSync(distPath) || fs.existsSync(publishPath)) {
	// Check if any of directories exist
	try {
		// Clean-up
		rimraf.sync(distPath);
		rimraf.sync(publishPath);
		console.log(green('✔ Cleaning up'));
	} catch (err) {
		console.error(err);
	}
} else {
	console.log(yellow('Nothing to clean-up'));
}
