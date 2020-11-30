import styled from 'styled-components'

import { colors } from 'styles'

import { IoIosCog } from 'react-icons/io'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  cursor: pointer;
  z-index: 1;
  min-width: 340px;
  max-width: 800px;
`

export const DropzoneRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  outline: none;
  background: ${colors.whitesmoke};
  padding: 0 22px;
`

export const DropzonePrompt = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  color: ${colors.suicidePreventionBlue};
  flex: 1;
  padding: 0 17px;
`

export const StyledCogIcon = styled(IoIosCog)``

export const WaveformWrapper = styled.div`
  position: relative;
  height: 40%;
  display: flex;
  flex: 1;
`

export const WaveformImageCanvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
`
