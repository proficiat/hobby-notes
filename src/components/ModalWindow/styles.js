import styled from 'styled-components'

import { space } from 'styled-system'

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
  background-color: rgba(0, 0, 0, 0.4);
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

export const Button = styled.button`
  height: 44px;
  font-size: 16px;
  width: 144px;
  background-color: ${props => props.theme.red};
  outline: none;
  cursor: pointer;
  color: ${props => props.theme.blush};
  border: none;
  border-radius: 4px;
  text-transform: uppercase;

  ${space};
`
