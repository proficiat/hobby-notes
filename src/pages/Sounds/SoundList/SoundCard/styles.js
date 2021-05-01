import styled from 'styled-components'

export const SOUND_CARD_HEIGHT = 128

export const Base = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 330px;
  min-height: ${SOUND_CARD_HEIGHT}px;
  height: ${SOUND_CARD_HEIGHT}px;
  max-height: ${SOUND_CARD_HEIGHT}px;
  background: transparent;
  cursor: pointer;
  margin-bottom: 36px;
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
  border: 3px solid ${props => props.theme.athensGray};
  visibility: ${props => (props.playing ? 'visible' : 'hidden')};
`

export const Cover = styled.div`
  height: 100%;
  min-width: ${SOUND_CARD_HEIGHT}px;
  background: ${props => props.theme.whitesmoke};
  position: relative;
  border-radius: 4px;

  > img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
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
  border-color: ${props => props.theme.athensGray};
  transform: rotate(45deg);
`

export const PauseSign = styled.div`
  margin: auto;
  width: 25%;
  height: 50%;
  border-left: solid 3px;
  border-right: solid 3px;
  border-color: ${props => props.theme.athensGray};
`

export const ActiveSound = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.doveGray}

  cursor: pointer;
  margin-right: 28px;
  font-weight: 300;

  > img {
    height: 28px;
    width: 28px;
  }

  :hover {
    color: ${props => props.theme.suicidePreventionBlue};
    ${'' /* #4cbdfe; // lighten 30% */}
  }
`

export const ActiveSoundName = styled.div`
  margin-left: 10px;
  font-size: 16px;
`
