import styled from 'styled-components'

import { IoClose } from 'react-icons/io5'

export const Base = styled.div`
  display: ${props => (props.isShow ? 'block' : 'none')};
  position: fixed;
  z-index: 6;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: hsla(0,0%,96%,0.4);
`

export const Content = styled.div`
  position: relative;
  background-color: ${props => props.theme.luciaLash};
  color: white;
  margin: 220px auto 0;
  padding: 76px 48px 48px;
  width: 550px;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
`

export const StyledCloseIcon = styled(IoClose).attrs({
  size: 28,
})`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  color: white;
  :hover {
    color: ${props => props.theme.westSide};
  }
`

export const Buttons = styled.div`
  margin-top: 56px;
  display: flex;
  justify-content: center;
`
