'use strict';
const fs = require('fs');
const path = require('path');
const mdpdf = require('mdpdf');
const chalk = require('chalk');
const dir = require('node-dir');
const rimraf = require('rimraf');
const kumaPath = require('kumacss');

const resolve = path.resolve;

const green = chalk.bold.green;	// Green bold text
const yellow = chalk.bold.yellow;	// Yellow bold text

const cssFile = kumaPath();	// Main styling file
const distPath = resolve(__dirname, 'dist');	// Dist directory
const reportsPath = resolve(__dirname, 'reports');	// Reports directory

// Get all markdown docs
const mdDocs = dir.files(reportsPath, {sync: true, recursive: false});

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
	// Initialize building process
	mdpdf.convert(options).then(pdfPath => {
		console.log();
		console.log(green('✔ Created PDF file: ') + yellow(pdfPath));
	}).catch(err => {
		console.error(err);
	});
	return 0;
}

if (fs.existsSync(distPath)) {
	// Check if `dist` directory already exist
	try {
		// Cleanup
		rimraf.sync(distPath);
		console.log(green('✔ Cleaning up'));
	} catch (err) {
		console.error(err);
	}
}

for (let i = 0; i < mdDocs.length; i++) {
	// Run the building for all markdown files
	buildPDF(mdDocs[i]);
}
