/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('hast').Properties} Properties
 */

import BananaSlug from 'github-slugger'
import {toString} from 'mdast-util-to-string'
import {visit} from 'unist-util-visit'

const slugs = new BananaSlug()

/**
 * Plugin to add anchors headings using GitHub’s algorithm.
 *
 * @type {import('unified').Plugin<[object?]|void[], Root>}
 *
 * @param {object} options
 * @param {boolean} [options.multifile] - The plugin maintains an internal state
 *     of slugs with a counter to deduplicate slugs for headings that exist more
 *     than once. By default this counter state is specific to a file or syntax
 *     tree. Use 'multifile: true' if you need to count slugs across files or
 *     trees. Call remarkSlug() explicitly to reset the state.
 */
export default function remarkSlug(options = {}) {
  const {multifile} = {multifile: false, ...options}

  slugs.reset()
  return (tree) => {
    if (!multifile) {
      slugs.reset()
    }

    visit(tree, 'heading', (node) => {
      const data = node.data || (node.data = {})
      const props = /** @type {Properties} */ (
        data.hProperties || (data.hProperties = {})
      )
      let id = props.id

      id = id ? slugs.slug(String(id), true) : slugs.slug(toString(node))

      data.id = id
      props.id = id
    })
  }
}
