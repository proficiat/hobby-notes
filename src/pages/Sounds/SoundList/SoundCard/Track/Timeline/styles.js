import styled from 'styled-components'

import { SOUND_CARD_HEIGHT } from '../../styles'

export const Base = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(${SOUND_CARD_HEIGHT}px / 2);
  align-items: center;
  margin: auto 0 auto 0;
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.theme.defaultText};

  > span:first-child {
    color: ${props => props.theme.active};
  }
`

export const WaveformImageCanvas = styled.canvas`
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
`

export const WaveformProgressBar = styled.div`
  position: relative;
  background: ${props => props.theme.background};
  padding: 4px;
  width: 100%;
  min-height: calc(${SOUND_CARD_HEIGHT}px / 2);
  margin: 0 8px;
  display: flex;
  flex: 1;
`
