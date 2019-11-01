import styled from 'styled-components'

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

export const Image = styled.div`
  height: 100%;
  min-width: 168px;
  margin-right: 15px;
  background: #b3e3b5;

  > img {
    max-width: 100%;
    max-height: 100%;
  }
`

export const CardBody = styled.div`
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
  > audio {
    width: 100%;
    border-radius: 0;
    outline: none;
  }
`

export const SoundName = styled.h2`
  margin-bottom: 22px;
  font-weight: 500;
  font-size: 18px;
  text-transform: uppercase;
`

export const BottomBorder = styled.div`
  height: 1px;
  width: 33%;
  margin: auto auto;
  background: #c3002f;
`

export const CanvasWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  > canvas {
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: 0;
    height: 50%;
    width: 100%;
  }
`
