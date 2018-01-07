'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const dir = require('node-dir');
const rimraf = require('rimraf');
const markdownPDF = require('markdown-pdf');

const join = path.join;
const resolve = path.resolve;

const green = chalk.bold.green;	// Green bold text
const yellow = chalk.bold.yellow;	// Yellow bold text

const distPath = resolve(__dirname, 'dist');	// Dist directory
const stylePath = resolve(__dirname, 'node_modules/kumacss/dist');	// Style directory
const cssFile = join(stylePath, 'kuma.css');	// Main styling file
const reportsPath = resolve(__dirname, 'reports');	// Reports directory

const pdfOptions = {
	// PDF conversion options
	cssPath: cssFile,
	paperFormat: 'A4',
	paperBorder: '1cm',
	paperOrientation: 'portrait',
	remarkable: {
		html: true,
		breaks: true
	}
};

// Get all markdown docs
const mdDocs = dir.files(reportsPath, {sync: true, recursive: false});

const pdfDocs = mdDocs.map(mdDoc => {
	// PDF docs to be created
	const pdfDoc = mdDoc.replace('reports', 'dist').replace('.md', '.pdf');
	return pdfDoc;
});

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

markdownPDF(pdfOptions).from(mdDocs).to(pdfDocs, () => {
	// Convert markdown files to PDF
	console.log(green('✔ Created PDF files'));
	pdfDocs.forEach(pdfDoc => {
		console.log(yellow('  + ' + pdfDoc));
	});
});
