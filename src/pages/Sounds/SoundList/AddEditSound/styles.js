import styled from 'styled-components'

import { colors } from 'styles'

export const Container = styled.div`
  display: flex;
  flex: 0 1 0;
  min-height: 168px;
  background: ${colors.whitesmoke};
  min-width: 1000px;
  margin-right: 9px;
  //flex-shrink: 0;
`

export const BottomInfoTip = styled.div`
  position: absolute;
  bottom: -9px;
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
  position: relative;
  flex: 1;
  cursor: pointer;
  padding: 18px;
  margin-left: 22px;
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
  right: 5px;
  bottom: 50%;

  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
