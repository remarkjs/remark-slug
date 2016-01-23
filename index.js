/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:slug
 * @fileoverview Add anchors to remark heading nodes.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var toString = require('mdast-util-to-string');
var visit = require('unist-util-visit');
var slugs = require('github-slugger')();

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

/**
 * Patch slugs on heading nodes.
 *
 * Transformer is invoked for every file, so there’s no need
 * to specify extra logic to get per-file slug pools.
 *
 * @param {Node} ast - Root node.
 */
function transformer(ast) {
    slugs.reset();

    visit(ast, 'heading', function (node) {
        var id = slugs.slug(toString(node));
        var data = patch(node, 'data', {});

        patch(data, 'id', id);
        patch(data, 'htmlAttributes', {});
        patch(data.htmlAttributes, 'id', id);
    });
}

/**
 * Attacher.
 *
 * @return {Function} - Transformer.
 */
function attacher() {
    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;
