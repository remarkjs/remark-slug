'use strict';

var toString = require('mdast-util-to-string');
var visit = require('unist-util-visit');
var slugs = require('github-slugger')();

module.exports = slug;

function slug() {
  return transformer;
}

/* Patch slugs on heading nodes. */
function transformer(ast) {
  slugs.reset();

  visit(ast, 'heading', visitor);

  function visitor(node) {
    node.data = node.data || {};
    node.data.hProperties = node.data.hProperties || {};

    const value = node.data.hProperties.id || toString(node);
    const id = slugs.slug(value);
    node.data.id = id;
    node.data.hProperties.id = id;
  }
}
