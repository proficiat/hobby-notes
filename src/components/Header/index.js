import React from 'react'

import Search from './Search'

import { Base, Name, RightSide } from './styles'

const Header = props => {
  return (
    <Base>
      <Name>Adsum</Name>
      <RightSide>
        <div id="activeSound" />
        <Search />
      </RightSide>
    </Base>
  )
}

Header.defaultProps = {}

Header.propTypes = {}

export default Header
