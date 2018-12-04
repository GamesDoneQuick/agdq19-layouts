'use strict';

// Native
const fs = require('fs');
const {promisify} = require('util');

// Packages
const babel = require('@babel/core');
const glob = require('glob');

const writeFile = promisify(fs.writeFile);
const tsRegex = /\.ts$/;
const dtsRegex = /\.d\.ts$/;

const babelOptions = {
	babelrc: true // Load config from .babelrc
};

glob("@(dashboard|graphics|shared)/**/*.ts", async (error, tsFiles) => {
	// files is an array of filenames.
	// If the `nonull` option is set, and nothing
	// was found, then files is ["**/*.js"]
	// er is an error object or null.
	if (error) {
		throw error;
	}

	try {
		const jsFiles = tsFiles
			// Filter out *.d.ts files.
			.filter(filename => !dtsRegex.test(filename))

			// Replace .ts with .js.
			.map(filename => filename.replace(tsRegex, '.js'));

		const transformPromises = jsFiles.map(filename => {
			return babel.transformFileAsync(filename, babelOptions);
		});

		// Atomically write once everything has been converted.
		const babelResults = await Promise.all(transformPromises);
		const writePromises = babelResults.map(result => {
			return writeFile(result.options.filename, result.code);
		});

		await writePromises;
		console.log('\nBabel success!');
	} catch (error) {
		throw error;
	}
});
