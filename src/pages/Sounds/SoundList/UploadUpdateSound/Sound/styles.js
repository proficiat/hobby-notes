import styled, { css } from 'styled-components'

export const Container = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  z-index: 1;
  min-width: 340px;
  max-width: 800px;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  ${props =>
    !props.visible &&
    css`
      flex: 0;
      min-width: 0;
    `};
`

export const DropzoneRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  outline: none;
  padding: 0 26px;
  font-weight: 300;
  color: ${props => props.theme.defaultText};
`

export const DropzonePrompt = styled.div`
  text-align: center;
  flex: 1;
  padding: 0 17px;
`

export const WaveformImageCanvas = styled.canvas`
  position: absolute;
  width: 88%;
  height: 50%;
  visibility: ${props => (props.loading ? 'hidden' : 'visible')};
`
