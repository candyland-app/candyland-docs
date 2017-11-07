'use strict';
const fs = require('fs');
const chalk = require('chalk');
const rimraf = require('rimraf');
const markdownPDF = require('markdown-pdf');

const green = chalk.bold.green;	// Green bold text
const yellow = chalk.bold.yellow;	// Yellow bold text

const distPath = 'dist/';		// Dist directory
const mdDocs = ['Report1.md'];	// Markdown source files

const pdfOptions = {
	// PDF conversion options
	paperFormat: 'A4',
	paperBorder: '2cm',
	paperOrientation: 'portrait'
};

const pdfDocs = mdDocs.map(mdDoc => {
	// PDF docs to be created
	return distPath + mdDoc.replace('.md', '.pdf');
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
	pdfDocs.forEach(mdDoc => {
		console.log(yellow('  + ' + mdDoc));
	});
});
