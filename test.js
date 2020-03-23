'use strict'

var test = require('tape')
var remark = require('remark')
var u = require('unist-builder')
var removePosition = require('unist-util-remove-position')
var slug = require('.')

test('remark-slug', function (t) {
  t.deepEqual(
    removePosition(
      remark()
        .use(slug)
        .runSync(remark().parse('# Normal\n\n## Table of Contents\n\n# Baz\n')),
      true
    ),
    u('root', [
      u(
        'heading',
        {depth: 1, data: {hProperties: {id: 'normal'}, id: 'normal'}},
        [u('text', 'Normal')]
      ),
      u(
        'heading',
        {
          depth: 2,
          data: {
            hProperties: {id: 'table-of-contents'},
            id: 'table-of-contents'
          }
        },
        [u('text', 'Table of Contents')]
      ),
      u('heading', {depth: 1, data: {hProperties: {id: 'baz'}, id: 'baz'}}, [
        u('text', 'Baz')
      ])
    ]),
    'should patch `id`s and `data.hProperties.id`'
  )

  t.deepEqual(
    removePosition(
      remark()
        .use(function () {
          return transform
          function transform(tree) {
            tree.children[0].data = {foo: 'bar'}
          }
        })
        .use(slug)
        .runSync(remark().parse('# Normal\n')),
      true
    ),
    u('root', [
      u(
        'heading',
        {
          depth: 1,
          data: {foo: 'bar', hProperties: {id: 'normal'}, id: 'normal'}
        },
        [u('text', 'Normal')]
      )
    ]),
    'should not overwrite `data` on headings'
  )

  t.deepEqual(
    removePosition(
      remark()
        .use(function () {
          return transform
          function transform(tree) {
            tree.children[0].data = {hProperties: {className: ['foo']}}
          }
        })
        .use(slug)
        .runSync(remark().parse('# Normal\n')),
      true
    ),
    u('root', [
      u(
        'heading',
        {
          depth: 1,
          data: {hProperties: {className: ['foo'], id: 'normal'}, id: 'normal'}
        },
        [u('text', 'Normal')]
      )
    ]),
    'should not overwrite `data.hProperties` on headings'
  )

  t.deepEqual(
    removePosition(
      remark()
        .use(function () {
          return transform
          function transform(tree) {
            tree.children[1].data = {hProperties: {id: 'here'}}
            tree.children[3].data = {hProperties: {id: 'something'}}
          }
        })
        .use(slug)
        .runSync(
          remark().parse(
            [
              '## Something',
              '## Something here',
              '## Something there',
              '## Something also'
            ].join('\n\n') + '\n'
          )
        ),
      true
    ),
    u('root', [
      u(
        'heading',
        {
          depth: 2,
          data: {hProperties: {id: 'something'}, id: 'something'}
        },
        [u('text', 'Something')]
      ),
      u(
        'heading',
        {
          depth: 2,
          data: {hProperties: {id: 'here'}, id: 'here'}
        },
        [u('text', 'Something here')]
      ),
      u(
        'heading',
        {
          depth: 2,
          data: {hProperties: {id: 'something-there'}, id: 'something-there'}
        },
        [u('text', 'Something there')]
      ),
      u(
        'heading',
        {
          depth: 2,
          data: {hProperties: {id: 'something-1'}, id: 'something-1'}
        },
        [u('text', 'Something also')]
      )
    ]),
    'should generate `id`s and `hProperties.id`s, based on `hProperties.id` if they exist'
  )

  t.deepEqual(
    process(
      [
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
      ].join('\n')
    ),
    u('root', [
      heading('I ♥ unicode', 'i--unicode'),
      heading('Dash-dash', 'dash-dash'),
      heading('en–dash', 'endash'),
      heading('em–dash', 'emdash'),
      heading('😄 unicode emoji', '-unicode-emoji'),
      heading('😄-😄 unicode emoji', '--unicode-emoji'),
      heading('😄_😄 unicode emoji', '_-unicode-emoji'),
      heading(null, ''),
      heading(null, '-1'),
      heading('Initial spaces', 'initial-spaces'),
      heading('Final spaces', 'final-spaces'),
      heading('Duplicate', 'duplicate'),
      heading('Duplicate', 'duplicate-1'),
      heading(':ok: No underscore', 'ok-no-underscore'),
      heading(':ok_hand: Single', 'ok_hand-single'),
      heading(
        ':ok_hand::hatched_chick: Two in a row with no spaces',
        'ok_handhatched_chick-two-in-a-row-with-no-spaces'
      ),
      heading(
        ':ok_hand: :hatched_chick: Two in a row',
        'ok_hand-hatched_chick-two-in-a-row'
      )
    ]),
    'should create GitHub slugs'
  )

  t.end()
})

function heading(label, id) {
  return u(
    'heading',
    {depth: 2, data: {id: id, hProperties: {id: id}}},
    label ? [u('text', label)] : []
  )
}

function process(doc, options) {
  var processor = remark().use(slug, options)
  return removePosition(processor.runSync(processor.parse(doc)), true)
}
