import styled, { css } from 'styled-components'

import { IoIosHelpCircleOutline } from 'react-icons/io'

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  padding: 33px 80px;
  top: 38px;
  left: 88px;
  background: ${props => props.theme.luciaLash};
  font-weight: 300;
  width: 380px;
  z-index: 6;
  box-shadow: 1px 0 22px 0 rgba(10, 10, 10, 0.8);

  :before,
  :after {
    top: 92px;
    right: 100%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border: solid 16px transparent;
    border-right-color: ${props => props.theme.luciaLash};
    z-index: 6;
  }
`

const fontStyle = css`
  font-weight: 300;
  text-transform: uppercase;
`

export const Title = styled.h3`
  ${fontStyle};
  margin-bottom: 12px;
  color: white;
  font-size: 28px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 0 auto 16px auto;
  color: white;
`

export const Input = styled.input`
  height: 32px;
  background-color: white;
  outline: none;
  border: 1px solid white;
  color: ${props => props.theme.luciaLash};
  font-weight: 300;
  width: 220px;
  margin-top: 4px;
  padding-left: 8px;
  border-radius: 4px;
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Error = styled.div`
  font-size: 15px;
  color: ${props => props.theme.lushLava};
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const HelpSubTitle = styled.div`
  ${fontStyle};
  color: ${props => props.theme.suicidePreventionBlue};
  white-space: nowrap;
  margin-bottom: 4px;

  font-size: 11px;
`

export const StyledHelpIcon = styled(IoIosHelpCircleOutline)`
  cursor: pointer;
  margin-left: auto;
  :hover {
    color: ${props => props.theme.suicidePreventionBlue};
  }
`
