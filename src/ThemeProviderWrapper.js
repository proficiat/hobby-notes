import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/client'
import { GET_THEME_NAME } from 'cache'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import { ThemeContext } from './styles'

const ThemeProviderWrapper = props => {
  const { children } = props
  const { data } = useQuery(GET_THEME_NAME)

  useEffect(() => {
    const saveThemeName = () =>
      localStorage.setItem('theme-name', data.themeName)
    window.addEventListener('beforeunload', saveThemeName)
    return () => {
      window.removeEventListener('beforeunload', saveThemeName)
    }
  })
  return (
    <ThemeProvider theme={theme[data.themeName]}>
      <ThemeContext.Provider value={theme[data.themeName]}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

ThemeProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeProviderWrapper
