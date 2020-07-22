import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'

import Launch from 'pages/Launch'
import GhostLogo from '../GhostLogo'

import { Container, Item } from './styles'

class SideBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isVisibleLaunch: false,
    }

    this.launchRef = null
    this.launchItemRef = null
  }

  componentDidMount() {
    const { addEventListener } = document
    addEventListener('click', this.handleClickOutsideLaunch, false)
    addEventListener('touched', this.handleClickOutsideLaunch, false)
  }

  componentWillUnmount() {
    const { removeEventListener } = document

    removeEventListener('click', this.handleClickOutsideLaunch, false)
    removeEventListener('touched', this.handleClickOutsideLaunch, false)
  }

  addLaunchRef = ref => {
    this.launchRef = ref
  }

  addLaunchItemRef = ref => {
    this.launchItemRef = ref
  }

  handleExit = () => {
    const { onSetToken, client } = this.props
    onSetToken(null)
    localStorage.clear()
    client.resetStore()
  }

  handleLaunchClick = () => {
    const { token } = this.props
    if (token) {
      this.handleExit()
    } else {
      this.setState(prevState => ({
        isVisibleLaunch: !prevState.isVisibleLaunch,
      }))
    }
  }

  handleClickOutsideLaunch = event => {
    const { isVisibleLaunch } = this.state
    const { target } = event
    if (
      isVisibleLaunch &&
      this.launchItemRef &&
      !this.launchItemRef.contains(target) &&
      this.launchRef &&
      !this.launchRef.contains(target)
    ) {
      this.setState({ isVisibleLaunch: false })
    }
  }

  render() {
    const { isVisibleLaunch } = this.state
    const { token, onSetToken } = this.props
    return (
      <React.Fragment>
        <Container onClick={this.handleExit}>
          <Item logo>
            <GhostLogo />
          </Item>
          <Item ref={this.addLaunchItemRef} onClick={this.handleLaunchClick}>
            {token ? 'Exit' : 'Launch'}
          </Item>
        </Container>
        {isVisibleLaunch && !token && (
          <Launch setToken={onSetToken} onAddLaunchRef={this.addLaunchRef} />
        )}
      </React.Fragment>
    )
  }
}

SideBar.defaultProps = {
  token: '',
}

SideBar.propTypes = {
  client: PropTypes.object.isRequired,
  token: PropTypes.string,
  onSetToken: PropTypes.func.isRequired,
}

export default withApollo(SideBar)
