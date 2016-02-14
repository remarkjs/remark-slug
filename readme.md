# remark-slug [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Add anchors to [**remark**][remark] heading nodes using GitHub’s
algorithm.

> Works great with [**remark-html**][remark-html],
> used by [**remark-toc**][remark-toc] and
> [**remark-man**][remark-man].

## Installation

[npm][npm-install]:

```bash
npm install remark-slug
```

**remark-slug** is also available as an AMD, CommonJS, and globals
module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var slug = require('remark-slug');
var remark = require('remark');
var html = require('remark-html');
```

Process:

```javascript
var doc = remark().use(slug).use(html).process('# Foo bar');
```

Yields:

```html
<h1 id="foo-bar">Foo bar</h1>
```

## CLI

```bash
remark readme.md -u slug
```

## API

### `remark.use(slug)`

Adds slugs to markdown headings.

Sets `data.id` and `data.htmlAttributes.id` on heading nodes. The first can be
used by any plugin as a unique identifier, the second tells **remark-html** to
use its value as an `id` attribute. **remark-slug** does not overwrite these
values when they already exist.

Parameters:

*   `slug` — This plugin.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/remark-slug.svg

[travis]: https://travis-ci.org/wooorm/remark-slug

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-slug.svg

[codecov]: https://codecov.io/github/wooorm/remark-slug

[npm-install]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/remark-slug/releases

[license]: LICENSE

[author]: http://wooorm.com

[remark]: https://github.com/wooorm/remark

[remark-html]: https://github.com/wooorm/remark-html

[remark-toc]: https://github.com/wooorm/remark-toc

[remark-man]: https://github.com/wooorm/remark-man
