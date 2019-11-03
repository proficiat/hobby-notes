import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 579px;
  height: 168px;
  margin-bottom: 36px;
  background: transparent;
  color: #c3002f;
  cursor: pointer;
`

export const AbsoluteCoat = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`

export const MiddleInfo = styled.h2`
  font-weight: 300;
  font-size: 24px;
  text-transform: uppercase;
  color: #7d3780;
  opacity: 0.5;
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

export const Track = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

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
  min-width: 168px;
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
