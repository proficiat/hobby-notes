import styled, { css } from 'styled-components'

import { IoPlayOutline } from 'react-icons/io5'

import { SOUND_CARD_HEIGHT } from '../styles'

export const WaveformCanvas = styled.canvas`
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  visibility: hidden;
`

export const Base = styled.div`
  width: 100%;
  padding-left: 24px;
  min-height: ${SOUND_CARD_HEIGHT}px;
  display: flex;
  flex-direction: column;

  ${props =>
    props.playing &&
    css`
      ${WaveformCanvas} {
        visibility: visible;
      }
    `}
`

const Pane = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.luciaLash};
  text-transform: uppercase;
  line-height: 1.2;
`

export const TopPane = styled(Pane)`
  font-size: 16px;
  justify-content: space-between;
  font-weight: 700;
`

export const ErrorMessage = styled.div`
  padding: 18px;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  color: ${props => props.theme.red};
`
export const BottomPane = styled(Pane)`
  font-size: 13px;
  justify-content: flex-end;
  padding-top: 5px;
  font-weight: 500;
`

export const PlayOutlineIcon = styled(IoPlayOutline).attrs({
  size: 15,
})`
  margin-right: 5px;
  :hover {
    color: ${props => props.theme.suicidePreventionBlue};
  }
`
