import styled, { css } from 'styled-components'

import { colors } from 'styles'

import { FiTrash, FiEdit2 } from 'react-icons/fi'

const CARD_HEIGHT = 128

export const SoundControlsBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  margin: 0 8px 0 auto;
  width: 36px;
`

export const StyledEditIcon = styled(FiEdit2)``
export const StyledTrashIcon = styled(FiTrash)``

export const HoverFrame = styled.div`
  display: flex;
  width: 100%;
  height: ${CARD_HEIGHT}px;
  margin-bottom: 36px;

  :hover {
    ${SoundControlsBar} {
      visibility: visible;
    }
  }
`

export const IconsCircleFrame = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 5px 0;
`

export const SoundFrame = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 330px;
  height: 100%;
  background: transparent;
  cursor: pointer;
`

export const WaveformCanvas = styled.canvas`
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  visibility: hidden;
`

export const WaveformImageCanvas = styled.canvas`
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
`

export const Track = styled.div`
  width: 100%;
  height: 100%;
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

export const PlayButton = styled.div`
  opacity: 0.7;
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 25%;
  left: 25%;
  z-index: 2;
  border-radius: 100%;
  border: 3px solid #f7f8fa;
  visibility: ${props => (props.playing ? 'visible' : 'hidden')};
`

export const Cover = styled.div`
  height: 100%;
  min-width: ${CARD_HEIGHT}px;
  background: #b3e3b5;
  position: relative;

  > img {
    max-width: 100%;
    max-height: 100%;
  }

  :hover {
    ${PlayButton} {
      visibility: visible;
    }
  }
`

export const PlaySign = styled.div`
  margin-left: 20%;
  width: 40%;
  height: 40%;
  border-top: 3px solid;
  border-right: 3px solid;
  border-color: #f7f8fa;
  transform: rotate(45deg);
`

export const PauseSign = styled.div`
  margin: auto;
  width: 25%;
  height: 50%;
  border-left: solid 3px;
  border-right: solid 3px;
  border-color: #f7f8fa;
`

export const TrackHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${colors.luciaLash};
  padding-left: 40px;
  padding-top: 5px;
  line-height: 1.2;
  font-weight: 300;
`

export const WaveformProgressBar = styled.div`
  position: relative;
  background: ${colors.background};
  padding: 4px;
  width: 100%;
  height: 100%;
  margin: 0 8px;
`

export const TimeLine = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
  margin: auto 0 auto 0;
  padding-left: 40px;
  font-size: 13px;
  font-weight: 300;

  > span:first-child {
    color: ${colors.lushLava};
  }
`
