#!/usr/bin/env node
'use strict';
const path = require('path');
const dir = require('node-dir');
const buildPDF = require('./pdf');

const resolve = path.resolve;

const reportsPath = resolve(__dirname, '../reports');	// Reports directory

// Get all markdown docs
const mdDocs = dir.files(reportsPath, {sync: true, recursive: false});

for (let i = 0; i < mdDocs.length; i++) {
	// Run the building for all markdown files
	buildPDF(mdDocs[i]);
}
