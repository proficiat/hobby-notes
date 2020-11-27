import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

// import { colors } from 'styles'

import { headerSearchValueVar } from 'cache'

import get from 'lodash/get'

import { Frame, Name, SearchInput } from './styles'

class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
    }
  }

  handleChangeSearchValue = event => {
    const value = get(event, 'target.value', '')
    this.setState({ searchValue: value }, () => {
      headerSearchValueVar(value)
    })
  }

  render() {
    const { searchValue } = this.state
    return (
      <Frame>
        <Name>Adsum</Name>
        <SearchInput
          type="text"
          value={searchValue}
          onChange={this.handleChangeSearchValue}
        />
      </Frame>
    )
  }
}

Header.defaultProps = {}

Header.propTypes = {}

export default Header
