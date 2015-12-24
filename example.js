// Dependencies:
var slug = require('./index.js');
var remark = require('remark');
var html = require('remark-html');

// Process:
var doc = remark().use(slug).use(html).process('# Foo bar');

// Yields:
console.log('html', doc);
