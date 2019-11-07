import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'

import { Container, Item } from './styles'

class SideBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleExit = () => {
    const { onSetToken, client } = this.props
    onSetToken(null)
    localStorage.clear()
    client.resetStore()
  }

  render() {
    const { token } = this.props
    return (
      <Container onClick={this.handleExit}>
        {token && <Item>Exit</Item>}
      </Container>
    )
  }
}

SideBar.propTypes = {
  client: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onSetToken: PropTypes.func.isRequired,
}

export default withApollo(SideBar)
