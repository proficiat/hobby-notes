import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 88px;
  background: ${props => props.theme.sideBar.bg};
  margin-left: auto;
  box-shadow: 1px 0 22px 0 rgba(10, 10, 10, 0.08);
  z-index: 5;
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 300;
  color: ${props => props.theme.defaultText};

  :hover {
    color: ${props => props.theme.sideBar.hoverText};
  }

  ${props =>
    props.logo &&
    css`
      font-size: 16px;
      margin-top: 100px;
      cursor: pointer;
      flex-direction: column;

      > span {
        margin-top: 12px;
      }
    `}
`
