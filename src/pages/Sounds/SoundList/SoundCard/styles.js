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
`

export const Cover = styled.div`
  height: 100%;
  min-width: 168px;
  background: #b3e3b5;

  > img {
    max-width: 100%;
    max-height: 100%;
  }
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
