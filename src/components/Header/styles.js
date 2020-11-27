import styled from 'styled-components'

import { colors } from 'styles'

export const Frame = styled.div`
  display: flex;
  height: 64px;
  width: 100%;
  background: black;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  position: fixed;
  z-index: 6;
`

export const Name = styled.div`
  width: 88px;
  text-align: center;
  color: white;
  text-transform: uppercase;
`

export const SearchInput = styled.input`
  height: 32px;
  background-color: white;
  outline: none;
  border: 1px solid white;
  color: ${colors.luciaLash};
  font-weight: 300;
  width: 220px;
  margin-top: 4px;
  padding-left: 8px;
  border-radius: 4px;
`
