import styled, { keyframes } from 'styled-components'

import { colors } from 'styles'

const SETTINGS_PADDING = 18

const gradientAnimation = keyframes`
  25% {
    background-position: 25% 50%;
  }
  50% {
    background-position: 50% 75%;
  }
  75% {
    background-position: 75% 50%;
  }
  100% {
    background-position: 50% 25%;
  }
`
export const GradientBG = styled.div`
  --lineWidth: 1px;
  position: relative;
  display: flex;
  flex: 1;
  min-height: 168px;
  background: ${colors.whitesmoke};
  margin-right: 9px;
  max-width: 720px;
  padding: var(--lineWidth);

  background: linear-gradient(
    to right,
    ${colors.whitesmoke},
    ${colors.whitesmoke},
    ${colors.red},
    ${colors.whitesmoke},
    ${colors.whitesmoke}
  );

  animation-name: ${gradientAnimation};
  animation-duration: 3s;
  animation-timing-function: ease;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  background-size: 80% 80%;
`

export const Container = styled.div`
  display: flex;
  flex: 1;
  background: ${colors.whitesmoke};
`

export const UploadButton = styled.div`
  position: absolute;
  top: calc(100% + ${SETTINGS_PADDING}px);
  right: 50%;
  white-space: nowrap;
  -webkit-transform: translateX(50%);
  transform: translateX(50%);
  color: ${colors.luciaLash};
  font-weight: 300;
  text-transform: uppercase;
  font-size: 18px;
  transition: color 0.5s ease-out;
  letter-spacing: 8px;
  cursor: pointer;

  :hover {
    color: ${colors.westSide};
  }
`

export const AbsoluteTopCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background: white;
  position: absolute;

  transform: translateY(50%);
  right: -24px;
  bottom: 50%;

  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
