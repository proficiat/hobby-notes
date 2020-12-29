import React, { useState, useEffect } from 'react'

import { themeNameVar } from 'cache'

import BubbleSwitch from '../BubbleeSwitch'

import Search from './Search'

import { Base, Name, RightSide } from './styles'

const Header = props => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }
  useEffect(() => {
    themeNameVar(theme)
  }, [theme])

  return (
    <Base>
      <Name />
      <RightSide>
        <div id="activeSound" />
        <Search />
        <BubbleSwitch isChecked={theme === 'light'} onToggle={toggleTheme} />
      </RightSide>
    </Base>
  )
}

Header.defaultProps = {}

Header.propTypes = {}

export default Header
