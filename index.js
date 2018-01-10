#!/usr/bin/env node
'use strict';
const path = require('path');
const chalk = require('chalk');
const dir = require('node-dir');
const watch = require('node-watch');
const buildPDF = require('./bin/pdf.js');

const resolve = path.resolve;

const red = chalk.bold.red;	// Red bold text
const green = chalk.bold.green;	// Green bold text
const yellow = chalk.bold.yellow;	// Yellow bold text
const magenta = chalk.bold.magenta;	// Magenta bold text

const reportsPath = resolve(__dirname, 'reports');	// Reports directory

// Get all markdown docs
const mdDocs = dir.files(reportsPath, {sync: true, recursive: false});

console.log(green('Watching for File Changes... @ ') + yellow(reportsPath));

// Start watching for changes
watch(mdDocs, (evt, doc) => {
	// Build PDF when on doc update
	if (evt === 'update') {
		console.log(green('File was Updated: ') + yellow(doc));
		// Build PDF
		buildPDF(doc);
	}
	// Exit on doc deletion
	if (evt === 'remove') {
		// A doc was deleted
		console.log(red('File was Deleted: ') + magenta(doc));
		process.exit(1);
	}
});
