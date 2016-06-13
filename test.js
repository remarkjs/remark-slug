/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:slug
 * @fileoverview Test suite for `remark-slug`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var slug = require('./');
var remark = require('remark');

/**
 * Parse `doc` with remark, and apply `slug` to
 * the resulting `ast` with `options`.
 *
 * @param {string} doc - Document.
 * @param {Object?} options - Slug options.
 * @return {Node} - Parsed and transformed `doc`.
 */
function process(doc, options) {
    var processor = remark().use(slug, options);

    return processor.run(processor.parse(doc, {
        'position': false
    }));
}

/*
 * Testes.
 */

test('remark-slug', function (t) {
    var processor = remark().use(slug);
    var ast;

    ast = process([
        '# Normal',
        '',
        '## Table of Contents',
        '',
        '# Baz',
        ''
    ].join('\n'));

    t.equal(ast.children[0].data.id, 'normal');
    t.equal(ast.children[1].data.id, 'table-of-contents');
    t.equal(ast.children[2].data.id, 'baz');

    ast = process([
        '# Normal',
        '',
        '## Table of Contents',
        '',
        '# Baz',
        ''
    ].join('\n'));

    t.equal(ast.children[0].data.htmlAttributes.id, 'normal');
    t.equal(ast.children[1].data.htmlAttributes.id, 'table-of-contents');
    t.equal(ast.children[2].data.htmlAttributes.id, 'baz');

    ast = processor.parse('# Normal', {
        'position': false
    });

    ast.children[0].data = {
        'foo': 'bar'
    };

    processor.run(ast);

    t.equal(
        ast.children[0].data.foo,
        'bar',
        'should not overwrite `data` on headings'
    );

    ast = processor.parse('# Normal', {
        'position': false
    });

    ast.children[0].data = {
        'htmlAttributes': {
            'class': 'bar'
        }
    };

    processor.run(ast);

    t.equal(
        ast.children[0].data.htmlAttributes.class,
        'bar',
        'should not overwrite `data.htmlAttributes` on headings'
    );

    t.end();
});

test('slugs', function (t) {
    t.deepEqual(process([
        '## I ♥ unicode',
        '',
        '## Dash-dash',
        '',
        '## en–dash',
        '',
        '## em–dash',
        '',
        '## 😄 unicode emoji',
        '',
        '## 😄-😄 unicode emoji',
        '',
        '## 😄_😄 unicode emoji',
        '',
        '##',
        '',
        '## ',
        '',
        '##     Initial spaces',
        '',
        '## Final spaces   ',
        '',
        '## Duplicate',
        '',
        '## Duplicate',
        '',
        '## :ok: No underscore',
        '',
        '## :ok_hand: Single',
        '',
        '## :ok_hand::hatched_chick: Two in a row with no spaces',
        '',
        '## :ok_hand: :hatched_chick: Two in a row',
        ''
    ].join('\n')),
    {
        'type': 'root',
        'children': [
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'I ♥ unicode',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': 'i--unicode',
                    'htmlAttributes': {
                        'id': 'i--unicode'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'Dash-dash',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': 'dash-dash',
                    'htmlAttributes': {
                        'id': 'dash-dash'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'en–dash',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': 'endash',
                    'htmlAttributes': {
                        'id': 'endash'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'em–dash',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': 'emdash',
                    'htmlAttributes': {
                        'id': 'emdash'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': '😄 unicode emoji',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': '-unicode-emoji',
                    'htmlAttributes': {
                        'id': '-unicode-emoji'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': '😄-😄 unicode emoji',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': '--unicode-emoji',
                    'htmlAttributes': {
                        'id': '--unicode-emoji'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': '😄_😄 unicode emoji',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': '_-unicode-emoji',
                    'htmlAttributes': {
                        'id': '_-unicode-emoji'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [],
                'data': {
                    'id': '',
                    'htmlAttributes': {
                        'id': ''
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [],
                'data': {
                    'id': '-1',
                    'htmlAttributes': {
                        'id': '-1'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'Initial spaces',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': 'initial-spaces',
                    'htmlAttributes': {
                        'id': 'initial-spaces'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'Final spaces',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': 'final-spaces',
                    'htmlAttributes': {
                        'id': 'final-spaces'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'Duplicate',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': 'duplicate',
                    'htmlAttributes': {
                        'id': 'duplicate'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'Duplicate',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': 'duplicate-1',
                    'htmlAttributes': {
                        'id': 'duplicate-1'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': ':ok: No underscore',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': 'ok-no-underscore',
                    'htmlAttributes': {
                        'id': 'ok-no-underscore'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': ':ok_hand: Single',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': 'ok_hand-single',
                    'htmlAttributes': {
                        'id': 'ok_hand-single'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': ':ok_hand::hatched_chick: Two ' +
                            'in a row with no spaces',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': 'ok_handhatched_chick-two-in-a-row-' +
                        'with-no-spaces',
                    'htmlAttributes': {
                        'id': 'ok_handhatched_chick-two-in-a-row-' +
                            'with-no-spaces'
                    }
                },
                'position': undefined
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': ':ok_hand: :hatched_chick: Two in a row',
                        'position': undefined
                    }
                ],
                'data': {
                    'id': 'ok_hand-hatched_chick-two-in-a-row',
                    'htmlAttributes': {
                        'id': 'ok_hand-hatched_chick-two-in-a-row'
                    }
                },
                'position': undefined
            }
        ],
        'position': undefined
    });

    t.end();
});
