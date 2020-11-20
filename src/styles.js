import styled, { createGlobalStyle } from 'styled-components'

export const colors = {
  primary: '#220a82',
  secondary: '#14cbc4',
  accent: '#e535ab',
  background: '#f7f8fa',
  grey: '#d8d9e0',
  text: '#343c5a',
  textSecondary: '#747790',
  red: '#C3002F',
  blue: '#34558B',
  green: '#4D724D',
  luciaLash: '#0A0A0A',
  lushLava: '#FF4500',
  suicidePreventionBlue: '#00a1ff',
  phantomBlue: '#191970',
  chinesePorcelain: '#395E7D',
  navy: '#02075D',
  blush: '#FFC0CB',
  whitesmoke: '#f5f5f5',
  westSide: '#f9900f',
}

export const MainWrapper = styled.div`
  display: flex;
  flex: 1 1 0;
  height: 100vh;
`

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  background: ${colors.background};
  color: ${colors.text};
`
export const GlobalStyle = createGlobalStyle({
  [['html', 'body']]: {
    height: '100%',
    margin: 0,
  },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: 'economica, serif;',
    backgroundColor: colors.background,
    color: colors.text,
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
