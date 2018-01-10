#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const mdpdf = require('mdpdf');
const chalk = require('chalk');
const rimraf = require('rimraf');
const kumaPath = require('kumacss');

const resolve = path.resolve;

const green = chalk.bold.green;	// Green bold text
const yellow = chalk.bold.yellow;	// Yellow bold text

const cssFile = kumaPath();	// Main styling file
const distPath = resolve(__dirname, '../dist');	// Dist directory

function getPdfPath(mdDocPath) {
	// Get the path of the PDF file to be created
	const pdfDoc = mdDocPath.replace('reports', 'dist').replace('.md', '.pdf');
	return pdfDoc;
}

function buildPDF(mdDocPath) {
	// Build PDF from input markdown file
	const pdfDocPath = getPdfPath(mdDocPath);
	// Building options
	const options = {
		source: mdDocPath,
		destination: pdfDocPath,
		styles: cssFile,
		pdf: {
			format: 'A4'
		}
	};
	// Check if `dist` directory already exist
	if (fs.existsSync(distPath)) {
		// Cleanup
		try {
			rimraf.sync(distPath);
			console.log(green('✔ Cleaning up'));
		} catch (err) {
			console.error(err);
		}
	}
	// Initialize building process
	mdpdf.convert(options).then(pdfPath => {
		console.log();
		console.log(green('✔ Created PDF file: ') + yellow(pdfPath));
	}).catch(err => {
		console.error(err);
	});
	return 0;
}

module.exports = buildPDF;
