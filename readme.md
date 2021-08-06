# remark-slug

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to add anchors headings using GitHub’s algorithm.

> ⚠️ Note: This is often useful when compiling to HTML.
> If you’re doing that, it’s probably smarter to use
> [`remark-rehype`][remark-rehype] and [`rehype-slug`][rehype-slug] and benefit
> from the [**rehype**][rehype] ecosystem.

## Note!

This plugin is ready for the new parser in remark
([`remarkjs/remark#536`](https://github.com/remarkjs/remark/pull/536)).
No change is needed: it works exactly the same now as it did previously!

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install remark-slug
```

## Use

Say we have the following file, `example.md`:

```markdown
# Lorem ipsum 😪

## dolor—sit—amet

### consectetur &amp; adipisicing

#### elit

##### elit
```

And our module, `example.js`, looks as follows:

```js
import fs from 'node:fs'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkSlug from 'remark-slug'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const buf = fs.readFileSync('example.md')

unified()
  .use(remarkParse)
  .use(remarkSlug)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(buf)
  .then((file) => {
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
<h1 id="lorem-ipsum-">Lorem ipsum 😪</h1>
<h2 id="dolorsitamet">dolor—sit—amet</h2>
<h3 id="consectetur--adipisicing">consectetur &#x26; adipisicing</h3>
<h4 id="elit">elit</h4>
<h5 id="elit-1">elit</h5>
```

## API

This package exports no identifiers.
The default export is `remarkSlug`.

### `unified().use(remarkSlug)`

Add anchors headings using GitHub’s algorithm.

Uses [`github-slugger`][ghslug] to creates GitHub-style slugs.

Sets `data.id` and `data.hProperties.id` on headings.
The first can be used by any plugin as a unique identifier, the second tells
[`mdast-util-to-hast`][to-hast] (used in [`remark-html`][remark-html] and
[`remark-rehype`][remark-rehype]) to use its value as an `id` attribute.

## Security

Use of `remark-slug` can open you up to a [cross-site scripting (XSS)][xss]
attack as it sets `id` attributes on headings.
In a browser, elements are retrievable by `id` with JavaScript and CSS.
If a user injects a heading that slugs to an id you are already using,
the user content may impersonate the website.

Always be wary with user input and use [`rehype-sanitize`][sanitize].

## Related

*   [`rehype-slug`][rehype-slug] — Add slugs to headings in HTML

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-slug/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-slug/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-slug.svg

[coverage]: https://codecov.io/github/remarkjs/remark-slug

[downloads-badge]: https://img.shields.io/npm/dm/remark-slug.svg

[downloads]: https://www.npmjs.com/package/remark-slug

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-slug.svg

[size]: https://bundlephobia.com/result?p=remark-slug

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[ghslug]: https://github.com/Flet/github-slugger

[to-hast]: https://github.com/syntax-tree/mdast-util-to-hast

[rehype-slug]: https://github.com/rehypejs/rehype-slug

[remark-html]: https://github.com/remarkjs/remark-html

[remark-rehype]: https://github.com/remarkjs/remark-rehype

[rehype]: https://github.com/rehypejs/rehype

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[sanitize]: https://github.com/rehypejs/rehype-sanitize
