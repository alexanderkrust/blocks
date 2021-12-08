import React, { Fragment } from 'react'
import Editor from 'blocks-ui'
import * as Blocks from '@blocks/react'
/* import Blub from '!!raw-loader!./blub' */

import SEO from '../components/seo'

const Layout = (props) => {
  return <div className="layout">{props.children}</div>
}

const Demo = () => {
  return (
    <Fragment>
      <SEO title="Demo" />
      <Editor src={Blub} blocks={Blocks} layout={Layout} />
    </Fragment>
  )
}

export default Demo
