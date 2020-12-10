import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Base, Content } from './styles'

class Popover extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
    this.baseRef = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside)
  }

  toggleContent = () =>
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))

  handleClickOutside = event => {
    const { current } = this.baseRef
    const { isOpen } = this.state
    if (isOpen && !current.contains(event.target)) {
      this.setState({ isOpen: false })
    }
  }

  preventEvent = event => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  render() {
    const { clickableElement, children } = this.props
    const { isOpen } = this.state
    return (
      <Base ref={this.baseRef} onClick={this.toggleContent}>
        {React.cloneElement(clickableElement, {
          open: isOpen,
        })}
        {isOpen && <Content onClick={this.preventEvent}>{children}</Content>}
      </Base>
    )
  }
}

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  clickableElement: PropTypes.node.isRequired,
}

export default Popover
