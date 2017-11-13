'use strict';
const fs = require('fs');
const path = require('path');
const zip = require('cross-zip');
const chalk = require('chalk');
const packageJSON = require('../package.json');

const red = chalk.bold.red;	// Red bold text
const green = chalk.bold.green;	// Green bold text
const yellow = chalk.bold.yellow;	// Red bold text

const distPath = 'dist/';	// Dist directory
const rootPath = path.resolve(__dirname, '../');	// Project root diretory
const buildName = packageJSON.name + '-v' + packageJSON.version;	// Zip filename

function packageZip() {
	try {
		// Create .zip file
		console.log(green('Creating zip...'));

		const inPath = distPath;	// Input directory
		const outPath = path.join(rootPath, buildName + '.zip');	// Output direcotory

		zip.zipSync(inPath, outPath);	// Zipping process

		console.log(green('✔ Zip created'));
	} catch (err) {
		console.error(err);
		printWarning();
	}
}

function printWarning() {
	// Print a large warning when packaging fails
	console.log(red(fs.readFileSync(path.join(__dirname, 'warning.txt'), 'utf8')));
}

if (fs.existsSync(distPath)) {
	// Check if `dist` directory exist
	packageZip();
} else {
	console.log(yellow('Nothing to zip'));
}
