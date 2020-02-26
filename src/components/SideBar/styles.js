import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 88px;
  background: white;
  margin-left: auto;
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 300;

  :hover {
    ${props =>
      !props.logo &&
      css`
        color: #c3002f;
      `}
  }

  ${props =>
    props.logo &&
    css`
      color: #c3002f;
      font-size: 16px;
      margin-bottom: 24px;
    `}
`
