import styled from 'styled-components'

import { colors } from 'styles'

export const Base = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  cursor: pointer;
  padding: 18px;
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
