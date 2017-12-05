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

const distPath = resolve(__dirname, 'dist');	// Dist directory
const stylePath = resolve(__dirname, 'node_modules/kumacss/dist');	// Style directory
const cssFile = join(stylePath, 'kuma.css');	// Main styling file
const reportsPath = resolve(__dirname, 'reports');	// Reports directory
const reportTitles = fs.readdirSync(reportsPath);	// Project report titles

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

const mdDocs = reportTitles.map(report => {
	// Markdown source docs
	const mdDoc = join(reportsPath, report);
	return mdDoc;
});

const pdfDocs = reportTitles.map(report => {
	// PDF docs to be created
	report = report.replace('.md', '');
	const pdfDoc = join(distPath, report);
	return pdfDoc + '.pdf';
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
