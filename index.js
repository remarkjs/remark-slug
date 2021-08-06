import toString from 'mdast-util-to-string'
import visit from 'unist-util-visit'
import BananaSlug from 'github-slugger'

const slugs = new BananaSlug()

export default function remarkSlug() {
  return transformer
}

// Patch slugs on heading nodes.
function transformer(ast) {
  slugs.reset()

  visit(ast, 'heading', visitor)

  function visitor(node) {
    var data = node.data || (node.data = {})
    var props = data.hProperties || (data.hProperties = {})
    var id = props.id

    id = id ? slugs.slug(id, true) : slugs.slug(toString(node))

    data.id = id
    props.id = id
  }
}
