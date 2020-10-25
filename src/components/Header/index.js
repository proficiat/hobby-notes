import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

// import { colors } from 'styles'

// import get from 'lodash/get'

import { Frame, Name } from './styles'

class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Frame>
        <Name>Adsum</Name>
      </Frame>
    )
  }
}

Header.defaultProps = {}

Header.propTypes = {}

export default Header
