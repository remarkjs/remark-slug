# mdast-slug [![Build Status](https://img.shields.io/travis/wooorm/mdast-slug.svg)](https://travis-ci.org/wooorm/mdast-slug) [![Coverage Status](https://img.shields.io/coveralls/wooorm/mdast-slug.svg)](https://coveralls.io/r/wooorm/mdast-slug?branch=master)

Add slugs to markdown headings [mdast](https://github.com/wooorm/mdast).

>   Works great with [**mdast-html**](https://github.com/wooorm/mdast-html),
>   used by [**mdast-toc**](https://github.com/wooorm/mdast-toc) and
>   [**mdast-man**](https://github.com/wooorm/mdast-man).

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install mdast-slug
```

**mdast-slug** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](mdast-slug.js) and
[compressed](mdast-slug.min.js).

## Usage

```javascript
var slug = require('mdast-slug');
var mdast = require('mdast');
var html = require('mdast-html');
var doc = mdast().use(slug).use(html).process('# Foo bar');
```

```html
<h1 id="foo-bar">Foo bar</h1>
```

## CLI

```bash
mdast ... -u mdast-slug
mdast ... -u 'mdast-slug=library:"npm"'
```

## API

### [mdast](https://github.com/wooorm/mdast#api).[use](https://github.com/wooorm/mdast#mdastuseplugin-options)(slug, options)

Adds slugs to markdown headings.

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
