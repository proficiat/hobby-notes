import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { useApolloClient } from '@apollo/react-hooks'

import { Container } from './styles'

class SideBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleExit = () => {
    const { onSetToken } = this.props
    const client = useApolloClient()
    onSetToken(null)
    localStorage.clear()
    client.resetStore()
  }

  render() {
    return <Container />
  }
}

SideBar.propTypes = {
  onSetToken: PropTypes.func.isRequired
}

export default SideBar
