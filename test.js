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
                        'value': 'I ♥ unicode'
                    }
                ],
                'data': {
                    'id': 'i--unicode',
                    'htmlAttributes': {
                        'id': 'i--unicode'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'Dash-dash'
                    }
                ],
                'data': {
                    'id': 'dash-dash',
                    'htmlAttributes': {
                        'id': 'dash-dash'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'en–dash'
                    }
                ],
                'data': {
                    'id': 'endash',
                    'htmlAttributes': {
                        'id': 'endash'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'em–dash'
                    }
                ],
                'data': {
                    'id': 'emdash',
                    'htmlAttributes': {
                        'id': 'emdash'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': '😄 unicode emoji'
                    }
                ],
                'data': {
                    'id': '-unicode-emoji',
                    'htmlAttributes': {
                        'id': '-unicode-emoji'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': '😄-😄 unicode emoji'
                    }
                ],
                'data': {
                    'id': '--unicode-emoji',
                    'htmlAttributes': {
                        'id': '--unicode-emoji'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': '😄_😄 unicode emoji'
                    }
                ],
                'data': {
                    'id': '_-unicode-emoji',
                    'htmlAttributes': {
                        'id': '_-unicode-emoji'
                    }
                }
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
                }
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
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'Initial spaces'
                    }
                ],
                'data': {
                    'id': 'initial-spaces',
                    'htmlAttributes': {
                        'id': 'initial-spaces'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'Final spaces'
                    }
                ],
                'data': {
                    'id': 'final-spaces',
                    'htmlAttributes': {
                        'id': 'final-spaces'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'Duplicate'
                    }
                ],
                'data': {
                    'id': 'duplicate',
                    'htmlAttributes': {
                        'id': 'duplicate'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': 'Duplicate'
                    }
                ],
                'data': {
                    'id': 'duplicate-1',
                    'htmlAttributes': {
                        'id': 'duplicate-1'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': ':ok: No underscore'
                    }
                ],
                'data': {
                    'id': 'ok-no-underscore',
                    'htmlAttributes': {
                        'id': 'ok-no-underscore'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': ':ok_hand: Single'
                    }
                ],
                'data': {
                    'id': 'ok_hand-single',
                    'htmlAttributes': {
                        'id': 'ok_hand-single'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': ':ok_hand::hatched_chick: Two ' +
                            'in a row with no spaces'
                    }
                ],
                'data': {
                    'id': 'ok_handhatched_chick-two-in-a-row-' +
                        'with-no-spaces',
                    'htmlAttributes': {
                        'id': 'ok_handhatched_chick-two-in-a-row-' +
                            'with-no-spaces'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 2,
                'children': [
                    {
                        'type': 'text',
                        'value': ':ok_hand: :hatched_chick: Two in a row'
                    }
                ],
                'data': {
                    'id': 'ok_hand-hatched_chick-two-in-a-row',
                    'htmlAttributes': {
                        'id': 'ok_hand-hatched_chick-two-in-a-row'
                    }
                }
            }
        ]
    });

    t.end();
});
