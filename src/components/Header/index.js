import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// import { colors } from 'styles'

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
    const { onChangeSearchValue } = this.props
    const value = get(event, 'target.value', '')
    this.setState({ searchValue: value })
    onChangeSearchValue(value)
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

Header.propTypes = {
  onChangeSearchValue: PropTypes.func.isRequired,
}

export default Header
