/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:slug
 * @fileoverview Add anchors to remark heading nodes.
 */

'use strict';

/* Dependencies. */
var toString = require('mdast-util-to-string');
var visit = require('unist-util-visit');
var slugs = require('github-slugger')();

/* Expose. */
module.exports = attacher;

/* Attacher. */
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

/**
 * Patch `value` on `context` at `key`, if
 * `context[key]` does not already exist.
 *
 * @param {Object} context - Context to patch.
 * @param {string} key - Key to patch at.
 * @param {*} value - Value to patch.
 */
function patch(context, key, value) {
  if (!context[key]) {
    context[key] = value;
  }

  return context[key];
}
