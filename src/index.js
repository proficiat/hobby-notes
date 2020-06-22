import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

import 'react-image-crop/dist/ReactCrop.css'

import { ThemeProvider } from 'styled-components'
import theme from './theme'

import { GlobalStyle } from './styles'

import App from './App'

ReactDOM.render(
  <Fragment>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    <GlobalStyle />
  </Fragment>,
  document.getElementById('root'),
)
