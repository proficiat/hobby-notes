import styled from 'styled-components'

import { colors } from 'styles'

import { IoMdSearch } from 'react-icons/io'

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
  padding-right: 32px;
`

export const Name = styled.div`
  width: 88px;
  text-align: center;
  color: white;
  text-transform: uppercase;
`

export const SearchInput = styled.input`
  height: 28px;
  background-color: white;
  outline: none;
  border: 1px solid white;
  color: ${colors.luciaLash};
  font-weight: 300;
  width: 330px;
  padding-left: 8px;
  border-radius: 4px;
`

export const SearchBase = styled.div`
  display: flex;
  align-items: center;
`
export const StyledSearchIcon = styled(IoMdSearch)`
  color: white;
  height: 22px;
  width: 22px;

  margin-right: 12px;
`
