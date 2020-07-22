import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

// import get from 'lodash/get'

import { Frame, Item, Controls } from './styles'

class GroupsList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Frame>
        <Controls />
        <Item>Coming soon...</Item>
      </Frame>
    )
  }
}

GroupsList.defaultProps = {
  // isViewerInPower: false,
}

GroupsList.propTypes = {}

export default GroupsList
