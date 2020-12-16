import React from 'react'

import Search from './Search'

import { Base, Name } from './styles'

const Header = props => {
  return (
    <Base>
      <Name>Adsum</Name>
      <Search />
    </Base>
  )
}

Header.defaultProps = {}

Header.propTypes = {}

export default Header
