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
    if (node.data && node.data.hProperties && 'id' in node.data.hProperties) {
      slugs.slug(toString(node.data.hProperties.id), true);
      return;
    }
    var id = slugs.slug(toString(node));

    if (!node.data) {
      node.data = {};
    }

    if (!node.data.hProperties) {
      node.data.hProperties = {};
    }

    node.data.id = id;
    node.data.hProperties.id = id;
  }
}
