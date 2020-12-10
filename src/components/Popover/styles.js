import styled from 'styled-components'

import { colors } from 'styles'

export const Base = styled.div`
  position: relative;
`

export const Content = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  flex: 1;
  top: 100%;
  right: 50%;
  -webkit-transform: translateX(50%);
  transform: translateX(50%);
  background: ${colors.luciaLash};
  color: white;
  min-width: 44px;
  z-index: 6;
  box-shadow: 1px 0 11px 0 rgba(10, 10, 10, 0.8);
  padding: 16px;

  :before,
  :after {
    bottom: 100%;
    right: 50%;
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border: solid 7px transparent;
    border-bottom-color: ${colors.luciaLash};
    z-index: 6;
  }
`
