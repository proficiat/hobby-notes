import styled, { css } from 'styled-components'

import { colors } from 'styles'

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

export const TrackHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  color: ${colors.luciaLash};
  padding-left: 40px;
  padding-top: 5px;
  line-height: 1.2;
  font-weight: 700;
  text-transform: uppercase;
`

export const ErrorMessage = styled.div`
  padding: 18px;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  color: ${colors.red};
`
