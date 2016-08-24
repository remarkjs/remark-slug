# remark-slug [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

Add anchors to [**remark**][remark] heading nodes using GitHub’s
algorithm.

> Works great with [**remark-html**][remark-html],
> used by [**remark-toc**][remark-toc] and
> [**remark-man**][remark-man].

## Installation

[npm][]:

```bash
npm install remark-slug
```

**remark-slug** is also available as an AMD, CommonJS, and
globals module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var slug = require('remark-slug');
var remark = require('remark');
var html = require('remark-html');
```

Process:

```javascript
var file = remark().use(slug).use(html).process('# Foo bar');
```

Yields:

```html
<h1 id="foo-bar">Foo bar</h1>
```

## API

### `remark.use(slug)`

Adds slugs to markdown headings.

Sets `data.id`, `data.hProperties.id` on heading nodes.  The first can be
used by any plugin as a unique identifier, the second tells **remark-html**
to use its value as an `id` attribute. **remark-slug** does not overwrite
these values when they already exist.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/remark-slug.svg

[build-status]: https://travis-ci.org/wooorm/remark-slug

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-slug.svg

[coverage-status]: https://codecov.io/github/wooorm/remark-slug

[chat-badge]: https://img.shields.io/gitter/room/wooorm/remark.svg

[chat]: https://gitter.im/wooorm/remark

[releases]: https://github.com/wooorm/remark-slug/releases

[license]: LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/wooorm/remark

[remark-html]: https://github.com/wooorm/remark-html

[remark-toc]: https://github.com/wooorm/remark-toc

[remark-man]: https://github.com/wooorm/remark-man
