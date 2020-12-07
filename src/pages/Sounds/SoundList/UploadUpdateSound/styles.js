import styled, { keyframes, css } from 'styled-components'

import { colors } from 'styles'

import { IoIosCog } from 'react-icons/io'
import { GiSoundWaves } from 'react-icons/gi'

const SETTINGS_PADDING = 18
export const SETTINGS_ICON_SIZE = 22

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

const hoverColorTransition = css`
  color: ${colors.luciaLash};
  transition: color 0.3s ease-out;
  :hover {
    color: ${colors.westSide};
  }
`

export const Button = styled.button.attrs({
  type: 'button',
})`
  font-weight: 300;
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 7px;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;

  ${hoverColorTransition};
`

export const BottomButtons = styled.div`
  position: absolute;
  top: calc(100% + ${SETTINGS_PADDING}px);
  right: 50%;
  white-space: nowrap;
  -webkit-transform: translateX(50%);
  transform: translateX(50%);
  width: 100%;
  display: flex;

  justify-content: flex-end;

  ${Button}:first-child {
    margin-right: 33px;
  }
`

export const AbsoluteIconsCircle = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 100%;
  background: white;
  position: absolute;

  transform: translateY(50%);
  right: -21px;
  bottom: 50%;

  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > svg {
    ${hoverColorTransition};
  }
`

export const StyledCogIcon = styled(IoIosCog).attrs({
  size: SETTINGS_ICON_SIZE,
})``
export const SoundWaveIcon = styled(GiSoundWaves).attrs({
  size: SETTINGS_ICON_SIZE,
})``
