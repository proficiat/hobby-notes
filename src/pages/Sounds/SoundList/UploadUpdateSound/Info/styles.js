import styled, { css } from 'styled-components'

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
  font-size: 14px;
  color: ${props => props.theme.defaultText};
  margin-bottom: 11px;
`

export const StyledSup = styled.sup`
  color: ${props => props.theme.westSide};
  font-size: 16px;
`

const inputsBaseStyle = css`
  outline: none;
  font-weight: 300;
  border: 1px solid ${props => props.theme.luciaLash};
  color: ${props => props.theme.defaultText};
  background: ${props => props.theme.background};
  margin-top: 4px;
  border-radius: 4px;
`

export const Input = styled.input`
  ${inputsBaseStyle};
  height: 28px;
  width: 220px;
  padding-left: 8px;
`

export const TextArea = styled.textarea`
  ${inputsBaseStyle};
  resize: none;
  ${'' /* vertical; */};
  height: 28px;
  padding: 6px 6px 6px 8px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${props => props.theme.doveGray};
  }
  :-ms-input-placeholder {
    color: ${props => props.theme.doveGray};
  }
`
