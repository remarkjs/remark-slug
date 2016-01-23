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
    var ast;
    var processor;

    t.deepEqual(
        process('# I ♥ unicode', {
            'library': require('to-slug-case')
        }),
        {
            'type': 'root',
            'children': [
                {
                    'type': 'heading',
                    'depth': 1,
                    'children': [
                        {
                            'type': 'text',
                            'value': 'I ♥ unicode'
                        }
                    ],
                    'data': {
                        'id': 'i-unicode',
                        'htmlAttributes': {
                            'id': 'i-unicode'
                        }
                    }
                }
            ]
        },
        'should accept `library` as a function'
    );

    t.deepEqual(
        process('# I ♥ unicode', {
            'library': 'to-slug-case'
        }),
        {
            'type': 'root',
            'children': [
                {
                    'type': 'heading',
                    'depth': 1,
                    'children': [
                        {
                            'type': 'text',
                            'value': 'I ♥ unicode'
                        }
                    ],
                    'data': {
                        'id': 'i-unicode',
                        'htmlAttributes': {
                            'id': 'i-unicode'
                        }
                    }
                }
            ]
        },
        'should accept `library` as a package name'
    );

    t.deepEqual(
        process('# I ♥ unicode', {
            'library': 'node_modules/to-slug-case/index'
        }),
        {
            'type': 'root',
            'children': [
                {
                    'type': 'heading',
                    'depth': 1,
                    'children': [
                        {
                            'type': 'text',
                            'value': 'I ♥ unicode'
                        }
                    ],
                    'data': {
                        'id': 'i-unicode',
                        'htmlAttributes': {
                            'id': 'i-unicode'
                        }
                    }
                }
            ]
        },
        'should accept `library` as a file'
    );

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

    processor = remark().use(slug);

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

    processor = remark().use(slug);

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

    t.throws(
        function () {
            process('', {
                'library': 'foo'
            });
        },
        /Cannot find module 'foo'/,
        'should throw when a plugin cannot be found'
    );

    t.end();
});

test('github', function (t) {
    t.deepEqual(process([
        '# I ♥ unicode',
        '',
        '# Foo-bar',
        '',
        '# ',
        '',
        '😄-😄',
        '===',
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
                'depth': 1,
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
                'depth': 1,
                'children': [
                    {
                        'type': 'text',
                        'value': 'Foo-bar'
                    }
                ],
                'data': {
                    'id': 'foo-bar',
                    'htmlAttributes': {
                        'id': 'foo-bar'
                    }
                }
            },
            {
                'type': 'heading',
                'depth': 1,
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
                'depth': 1,
                'children': [
                    {
                        'type': 'text',
                        'value': '😄-😄'
                    }
                ],
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

test('npm', function (t) {
    t.deepEqual(
        process([
            '# I ♥ unicode',
            '',
            '# Foo-bar',
            '',
            '# ',
            '',
            '😄-😄',
            '==='
        ].join('\n'), {
            'library': 'npm'
        }),
        {
            'type': 'root',
            'children': [
                {
                    'type': 'heading',
                    'depth': 1,
                    'children': [
                        {
                            'type': 'text',
                            'value': 'I ♥ unicode'
                        }
                    ],
                    'data': {
                        'id': 'i-unicode',
                        'htmlAttributes': {
                            'id': 'i-unicode'
                        }
                    }
                },
                {
                    'type': 'heading',
                    'depth': 1,
                    'children': [
                        {
                            'type': 'text',
                            'value': 'Foo-bar'
                        }
                    ],
                    'data': {
                        'id': 'foo-bar',
                        'htmlAttributes': {
                            'id': 'foo-bar'
                        }
                    }
                },
                {
                    'type': 'heading',
                    'depth': 1,
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
                    'depth': 1,
                    'children': [
                        {
                            'type': 'text',
                            'value': '😄-😄'
                        }
                    ],
                    'data': {
                        'id': '',
                        'htmlAttributes': {
                            'id': ''
                        }
                    }
                }
            ]
        }
    );

    t.end();
});
