'use strict';

var test = require('tape');
var remark = require('remark');
var u = require('unist-builder');
var removePosition = require('unist-util-remove-position');
var slug = require('./');

function process(doc, options) {
  var processor = remark().use(slug, options);
  var tree = processor.runSync(processor.parse(doc));

  removePosition(tree, true);

  return tree;
}

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

  t.equal(ast.children[0].data.hProperties.id, 'normal');
  t.equal(ast.children[1].data.hProperties.id, 'table-of-contents');
  t.equal(ast.children[2].data.hProperties.id, 'baz');

  ast = processor.parse('# Normal', {position: false});

  ast.children[0].data = {foo: 'bar'};

  processor.run(ast);

  t.equal(
    ast.children[0].data.foo,
    'bar',
    'should not overwrite `data` on headings'
  );

  ast = processor.parse('# Normal', {position: false});

  ast.children[0].data = {
    hProperties: {className: 'bar'}
  };

  processor.run(ast);

  t.equal(
    ast.children[0].data.hProperties.className,
    'bar',
    'should not overwrite `data.hProperties` on headings'
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
      ':ok_hand::hatched_chick: Two ' +
      'in a row with no spaces',
      'ok_handhatched_chick-two-in-a-row-' +
      'with-no-spaces'
    ),
    heading(
      ':ok_hand: :hatched_chick: Two in a row',
      'ok_hand-hatched_chick-two-in-a-row'
    )
  ]));

  t.end();
});

function heading(label, id) {
  return u('heading', {
    depth: 2,
    data: {id: id, hProperties: {id: id}}
  }, label ? [u('text', label)] : []);
}
