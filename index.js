import {toString} from 'mdast-util-to-string'
import {visit} from 'unist-util-visit'
import BananaSlug from 'github-slugger'

const slugs = new BananaSlug()

// Patch slugs on heading nodes.
export default function remarkSlug() {
  return (ast) => {
    slugs.reset()

    visit(ast, 'heading', (node) => {
      const data = node.data || (node.data = {})
      const props = data.hProperties || (data.hProperties = {})
      let id = props.id

      id = id ? slugs.slug(id, true) : slugs.slug(toString(node))

      data.id = id
      props.id = id
    })
  }
}
