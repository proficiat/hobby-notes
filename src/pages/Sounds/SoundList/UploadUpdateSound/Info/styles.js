import styled, { css } from 'styled-components'

import { width, space } from 'styled-system'

export const Base = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  cursor: pointer;
  padding: 18px;
`

export const Row = styled.div`
  display: flex;
`

export const Privacy = styled.div`
  height: 28px;
  margin-top: 4px;
  color: ${props => props.theme.defaultText};
  display: flex;
  align-items: center;
  > label:last-child {
    margin-left: 12px;
  }
`

export const Field = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 14px;
  color: ${props => props.theme.defaultText};
  margin-bottom: 11px;

  ${space};
`

export const StyledSup = styled.sup`
  color: ${props => props.theme.westSide};
  font-size: 16px;

  ${props =>
    props.invisible &&
    css`
      color: transparent;
    `}
`

const inputsBaseStyle = css`
  outline: none;
  font-weight: 300;
  border: 1px solid ${props => props.theme.luciaLash};
  color: ${props => props.theme.defaultText};
  background: ${props => props.theme.background};
  margin-top: 4px;
  border-radius: 4px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${props => props.theme.doveGray};
  }
  :-ms-input-placeholder {
    color: ${props => props.theme.doveGray};
  }
`

export const Input = styled.input`
  ${inputsBaseStyle};
  height: 28px;
  width: 220px;
  padding-left: 8px;

  ${width};
`

export const TextArea = styled.textarea`
  ${inputsBaseStyle};
  resize: vertical;
  min-height: 28px;
  height: 28px;
  max-height: 224px;
  padding: 6px 6px 6px 8px;
`
