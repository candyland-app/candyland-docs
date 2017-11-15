'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const markdownPDF = require('markdown-pdf');

const join = path.join;
const resolve = path.resolve;

const green = chalk.bold.green;	// Green bold text
const yellow = chalk.bold.yellow;	// Yellow bold text

const distPath = 'dist/';	// Dist directory
const stylePath = resolve(__dirname, 'style');	// Style directory
const cssFile = join(stylePath, 'index.css');	// Main styling file

const mdDocs = ['reports/requirements-analysis.md'];	// Markdown source files

const pdfOptions = {
	// PDF conversion options
	cssPath: cssFile,
	paperFormat: 'A4',
	paperBorder: '2cm',
	paperOrientation: 'portrait',
	remarkable: {
		html: true,
		breaks: true
	}
};

const pdfDocs = mdDocs.map(mdDoc => {
	// PDF docs to be created
	mdDoc = mdDoc.replace(/reports\/|.md/gi, '');
	return distPath + mdDoc + '.pdf';
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
