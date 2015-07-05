// Dependencies:
var slug = require('./index.js');
var mdast = require('mdast');
var html = require('mdast-html');

// Process:
var doc = mdast().use(slug).use(html).process('# Foo bar');

// Yields:
console.log('html', doc);
