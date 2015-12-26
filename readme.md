# remark-slug [![Build Status](https://img.shields.io/travis/wooorm/remark-slug.svg)](https://travis-ci.org/wooorm/remark-slug) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/remark-slug.svg)](https://codecov.io/github/wooorm/remark-slug)

Add anchors to [**remark**](https://github.com/wooorm/remark) heading nodes.

> Works great with [**remark-html**](https://github.com/wooorm/remark-html),
> used by [**remark-toc**](https://github.com/wooorm/remark-toc) and
> [**remark-man**](https://github.com/wooorm/remark-man).

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install remark-slug
```

**remark-slug** is also available for and [duo](http://duojs.org/#getting-started),
and as an AMD, CommonJS, and globals module, [uncompressed](remark-slug.js) and
[compressed](remark-slug.min.js).

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
remark ... -u remark-slug
remark ... -u 'remark-slug=library:"npm"'
```

## API

### [remark](https://github.com/wooorm/remark#api).[use](https://github.com/wooorm/remark#remarkuseplugin-options)(slug, options)

Adds slugs to markdown headings.

Sets `data.id` and `data.htmlAttributes.id` on heading nodes. The first can be
used by any plugin as a unique identifier, the second tells **remark-html** to
use its value as an `id` attribute. **remark-slug** does not overwrite these
values when they already exist.

Parameters:

*   `slug` — This plugin;

*   `options` (`Object?`)

    *   `'library'` — (`string` or `Function`, default: `'github'`):

        *   `'github'` — Slugs just like GitHub;

        *   `'npm'`
            — Slugs just like npm (caveat: npm doesn’t support links in
            headings, [yet](https://github.com/npm/marky-markdown/pull/38));

        *   `string` (e.g., `'slug'`, `'slugg'`)
            — Library to require (not in the browser);

        *   `Function` (e.g., `require('slugg')`)
            — Library to use.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
