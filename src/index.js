import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

import 'react-image-crop/dist/ReactCrop.css'

import { GlobalStyle } from './styles'

import App from './App'

ReactDOM.render(
  <Fragment>
    <App />
    <GlobalStyle />
  </Fragment>,
  document.getElementById('root'),
)
