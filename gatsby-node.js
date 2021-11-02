const { transforms, queries } = require('blocks-ui')
const webpack = require('webpack')

const BlockTemplate = require.resolve('./src/templates/block')

const toComponentName = (name) => name.charAt(0).toUpperCase() + name.slice(1)

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type Block implements Node {
      displayName: String!
      slug: String!
      src: String!
      usage: String!
      transformed: String!
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  loadNodeContent,
  createContentDigest
}) => {
  const { createNode, createParentChildLink } = actions

  if (
    node.sourceInstanceName !== 'blocks' ||
    node.ext !== '.js' ||
    node.name === 'index'
  ) {
    return
  }

  const src = await loadNodeContent(node)
  const usage = queries.getBlocksUsage(src)
  const transformed = transforms.toTransformedJSX(
    'export default () => ' + usage
  )
  const displayName = [node.relativeDirectory.replace(/s$/, ''), node.name]
    .map(toComponentName)
    .join('')
  const nodeId = `${node.id}--${displayName}--Block`
  const contentDigest = createContentDigest(src)
  const slug = ['blocks', node.relativeDirectory, node.name].join('/')

  const blocksNode = {
    src,
    slug,
    transformed,
    displayName,
    usage,
    id: createNodeId(nodeId),
    children: [],
    internal: {
      contentDigest,
      type: 'Block'
    }
  }

  createParentChildLink({ parent: node, child: blocksNode })
  createNode(blocksNode)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      blocks: allBlock {
        nodes {
          id
          slug
        }
      }
    }
  `)

  result.data.blocks.nodes.forEach((block) => {
    createPage({
      path: block.slug,
      component: BlockTemplate,
      context: block
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser'
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
      })
    ],

    resolve: {
      alias: {
        process: 'process/browser'
      },
      fallback: {
        fs: false,
        path: require.resolve('path-browserify'),
        asset: require.resolve('assert'),
        buffer: require.resolve('buffer')
      }
    }
  })
}
