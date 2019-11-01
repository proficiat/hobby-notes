import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

class SideBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <Container />
  }
}

SideBar.propTypes = {}

export default SideBar
