import styled, { keyframes } from 'styled-components'

import { colors } from 'styles'

import { IoIosCog } from 'react-icons/io'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  cursor: pointer;
  padding: 28px 28px 28px 0;
  z-index: 1;
`

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

export const DropzoneRoot = styled.div`
  height: 100%;
  width: 100%;
  outline: none;
  position: relative;
  background: linear-gradient(
    to right,
    ghostwhite,
    ${colors.background},
    ${colors.red},
    ${colors.background},
    ghostwhite
  );
  animation-name: ${gradientAnimation};
  animation-duration: 3s;
  animation-timing-function: ease;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  background-size: 80% 80%;
`

export const DropzonePrompt = styled.div`
  --gradientWidth: 1px;

  position: absolute;
  top: var(--gradientWidth);
  bottom: var(--gradientWidth);
  left: var(--gradientWidth);
  right: var(--gradientWidth);
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  font-size: 14px;
  font-weight: 300;
  margin: 1px;
  color: ${colors.grey};
`

export const StyledCogIcon = styled(IoIosCog)``
