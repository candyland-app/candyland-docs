'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const zip = require('cross-zip');
const rimraf = require('rimraf');

const packageJSON = require('../package.json');

const join = path.join;
const resolve = path.resolve;

const red = chalk.bold.red;	// Red bold text
const green = chalk.bold.green;	// Green bold text
const yellow = chalk.bold.yellow;	// Red bold text

const distPath = resolve(__dirname, '../dist');	// Dist directory
const publishPath = resolve(__dirname, '../publish');	// Zipped artifacts directory
const buildName = packageJSON.name + '-v' + packageJSON.version;	// Zip filename

function publishSetup() {
	if (fs.existsSync(publishPath)) {
		try {
			// Clean-up the pre-existing directory
			rimraf.sync(publishPath);
			console.log(green('✔ Cleaning up'));
			mkdirp.sync(publishPath);
		} catch (err) {
			console.error(err);
		}
	}
	// Create the zipped artifacts directory
	mkdirp.sync(publishPath);
}

function packageZip() {
	// Create the `publish` directory
	publishSetup();
	// Initialize packaging process
	console.log(green('Creating zip...'));

	// Input directory
	const inPath = distPath;
	// Output directory
	const outPath = join(publishPath, buildName + '.zip');

	try {
		// Zipping process
		zip.zipSync(inPath, outPath);
		console.log(green('✔ Zip created'));
		console.log(yellow('  + ' + outPath));
	} catch (err) {
		console.error(err);
		printWarning();
	}
}

function printWarning() {
	// Print a large warning when packaging fails
	console.log(red(fs.readFileSync(join(__dirname, 'warning.txt'), 'utf8')));
}

if (fs.existsSync(distPath)) {
	// Start packaging if the `dist` directory exist
	packageZip();
} else {
	console.log(yellow('Nothing to zip'));
}
