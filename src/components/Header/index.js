import React from 'react'

// import ToggleSwitch from '../ToggleSwitch'
// import BubbleSwitch from '../BubbleeSwitch'

import Search from './Search'

import { Base, Name, RightSide } from './styles'

const Header = props => {
  // const [theme, setTheme] = useState('light')
  // const toggleTheme = () => {
  //   setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  // }

  return (
    <Base>
      <Name />
      <RightSide>
        <div id="activeSound" />
        <Search />
        {/* <ToggleSwitch isChecked={theme === 'light'} onToggle={toggleTheme} /> */}
        {/* <BubbleSwitch /> */}
      </RightSide>
    </Base>
  )
}

Header.defaultProps = {}

Header.propTypes = {}

export default Header
