# remark-slug [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

Add anchors to [**remark**][remark] heading nodes using GitHub’s
algorithm.

> :warning: This is often useful when compiling to HTML.  If you’re doing that,
> it’s probably smarter to use [`remark-rehype`][remark-rehype] and
> [`rehype-slug`][rehype-slug] and benefit from the [**rehype**][rehype]
> ecosystem.

## Installation

[npm][]:

```bash
npm install remark-slug
```

## Usage

Say we have the following file, `example.md`:

```markdown
# Lorem ipsum 😪

## dolor—sit—amet

### consectetur &amp; adipisicing

#### elit

##### elit
```

And our script, `example.js`, looks as follows:

```javascript
var fs = require('fs');
var unified = require('unified');
var markdown = require('remark-parse');
var slug = require('remark-slug');
var remark2rehype = require('remark-rehype');
var html = require('rehype-stringify');

unified()
  .use(markdown)
  .use(slug)
  .use(remark2rehype)
  .use(html)
  .process(fs.readFileSync('example.md'), function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });
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

### `remark.use(slug)`

Adds slugs to markdown headings.

Uses [**github-slugger**][ghslug] (thus creating GitHub style `id`s).

Sets `data.id`, `data.hProperties.id` on heading nodes.  The first can be
used by any plugin as a unique identifier, the second tells **remark-html**
to use its value as an `id` attribute. **remark-slug** does not overwrite
these values when they already exist.

## Related

*   [`rehype-slug`][rehype-slug] — Add slugs to headings in HTML

## Contribute

See [`contribute.md` in `remarkjs/remarkj`][contribute] for ways to get started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-slug.svg

[build-status]: https://travis-ci.org/remarkjs/remark-slug

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-slug.svg

[coverage-status]: https://codecov.io/github/remarkjs/remark-slug

[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg

[chat]: https://gitter.im/remarkjs/Lobby

[license]: LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[ghslug]: https://github.com/Flet/github-slugger

[rehype-slug]: https://github.com/rehypejs/rehype-slug

[remark-rehype]: https://github.com/remarkjs/remark-rehype

[rehype]: https://github.com/rehypejs/rehype

[contribute]: https://github.com/remarkjs/remark/blob/master/contributing.md

[coc]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md
