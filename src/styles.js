import styled, { createGlobalStyle } from 'styled-components'
import React from 'react'

export const colors = {
  white: '#ffffff',
  athensGray: '#f7f8fa',
  grey: '#d8d9e0',
  doveGray: '#727272',
  red: '#C3002F',
  blue: '#34558B',
  luciaLash: '#0A0A0A',
  lushLava: '#FF4500',
  suicidePreventionBlue: '#00a1ff',
  blush: '#FFC0CB',
  whitesmoke: '#f5f5f5',
  westSide: '#f9900f',
  woodsmoke: '#181a1b',
  shark: '#282d33',
  darkShark: '#202429',
}

export const themeColors = {
  light: {
    background: colors.athensGray,
    defaultText: colors.luciaLash,
    active: colors.lushLava,
    waveform: {
      amount: colors.suicidePreventionBlue,
      bg: colors.luciaLash,
      progress: colors.lushLava,
    },
    vectorKeyBg: colors.whitesmoke,
    sideBar: {
      bg: colors.white,
      hoverText: colors.red,
    },
    footer: {
      bg: colors.white,
      progressLine: colors.grey,
    },
    ...colors,
  },
  dark: {
    background: colors.woodsmoke,
    defaultText: colors.white,
    active: colors.westSide,
    waveform: {
      amount: colors.suicidePreventionBlue,
      bg: colors.white,
      progress: colors.westSide,
    },
    vectorKeyBg: colors.shark,
    sideBar: {
      bg: colors.darkShark,
      hoverText: colors.suicidePreventionBlue,
    },
    footer: {
      bg: colors.darkShark,
      progressLine: colors.doveGray,
    },
    ...colors,
  },
}

export const ThemeContext = React.createContext(themeColors.dark)

export const MainWrapper = styled.div`
  display: flex;
  flex: 1 1 0;
  height: 100vh;
  min-height: 0;
`

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  background: ${props => props.theme.background};
  color: ${colors.luciaLash};
`
export const GlobalStyle = createGlobalStyle({
  [['html', 'body']]: {
    height: '100%',
    margin: 0,
  },
  [['button', 'input', 'textarea']]: {
    fontFamily: 'economica, serif',
    letterSpacing: '1px',
  },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: 'economica, serif;',
    letterSpacing: '1px',
    backgroundColor: colors.background,
    color: colors.luciaLash,
    fontSize: '14px',
    overflow: 'hidden',
  },
  '#root': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  '*': {
    boxSizing: 'border-box',
  },
  [['h1', 'h2', 'h3', 'h4', 'h5', 'h6']]: {
    margin: 0,
    fontWeight: 600,
  },
  h1: {
    fontSize: 48,
    lineHeight: 1,
  },
  h2: {
    fontSize: 40,
  },
  h3: {
    fontSize: 36,
  },
  h5: {
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  // Change Autocomplete Styles in WebKit Browsers
  [[
    'input:-webkit-autofill',
    'input:-webkit-autofill:hover',
    'input:-webkit-autofill:focus',
    'textarea:-webkit-autofill',
    'textarea:-webkit-autofill:hover',
    'textarea:-webkit-autofill:focus',
    'select:-webkit-autofill',
    'select:-webkit-autofill:hover',
    'select:-webkit-autofill:focus',
  ]]: {
    border: `1px solid white`,
    '-webkit-text-fill-color': colors.luciaLash,
    '-webkit-box-shadow': '0 0 0px 1000px #FFF inset',
    transition: 'background-color 5000s ease-in-out 0s',
  },
})
