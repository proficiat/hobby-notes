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

export const BottomInfoTip = styled.div`
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

  :hover {
    color: ${colors.westSide};
  }
`

export const Settings = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  cursor: pointer;
  padding: ${SETTINGS_PADDING}px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: ${colors.luciaLash};
  margin-bottom: 11px;
`

export const StyledSup = styled.sup`
  color: ${colors.westSide};
  font-size: 16px;
`

export const Input = styled.input`
  height: 28px;
  background-color: white;
  outline: none;
  font-family: 'economica, serif;';
  color: ${colors.luciaLash};
  font-weight: 300;
  width: 220px;
  margin-top: 4px;
  padding-left: 8px;
  border: 1px solid ${colors.luciaLash};
`

export const TextArea = styled.textarea`
  margin-top: 4px;
  border: 1px solid ${colors.luciaLash};
  font-weight: 300;
  font-family: 'economica, serif;';
  resize: none;
  ${'' /* vertical; */};
  height: 28px;
  padding: 6px 6px 6px 8px;
  outline: none;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${colors.blue};
  }
  :-ms-input-placeholder {
    color: ${colors.blue};
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
