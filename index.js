'use strict';

var toString = require('mdast-util-to-string');
var visit = require('unist-util-visit');
var slugs = require('github-slugger')();

module.exports = attacher;

function attacher() {
  return transformer;
}

/* Patch slugs on heading nodes. */
function transformer(ast) {
  slugs.reset();

  visit(ast, 'heading', function (node) {
    var id = slugs.slug(toString(node));
    var data = patch(node, 'data', {});

    /* Non-html */
    patch(data, 'id', id);
    /* Legacy remark-html */
    patch(data, 'htmlAttributes', {});
    /* Current remark-html */
    patch(data, 'hProperties', {});
    patch(data.htmlAttributes, 'id', id);
    patch(data.hProperties, 'id', id);
  });
}

function patch(context, key, value) {
  if (!context[key]) {
    context[key] = value;
  }

  return context[key];
}
