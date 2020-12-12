import styled from 'styled-components'
import { colors } from 'styles'

import { SOUND_CARD_HEIGHT } from '../../styles'

export const Base = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(${SOUND_CARD_HEIGHT}px / 2);
  align-items: center;
  margin: auto 0 auto 0;
  padding-left: 40px;
  font-size: 13px;
  font-weight: 700;

  > span:first-child {
    color: ${colors.lushLava};
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
  background: ${colors.background};
  padding: 4px;
  width: 100%;
  min-height: calc(${SOUND_CARD_HEIGHT}px / 2);
  margin: 0 8px;
  display: flex;
  flex: 1;
`
