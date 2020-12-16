import styled from 'styled-components'

import { IoMdSearch } from 'react-icons/io'

export const SearchBase = styled.div`
  display: flex;
  align-items: center;
`

export const SearchInput = styled.input.attrs(props => ({
  type: 'text',
}))`
  height: 28px;
  outline: none;
  border: none;
  color: white;
  font-weight: 300;
  font-size: 16px;
  width: 280px;
  padding-left: 8px;
  background: transparent;

  &::placeholder {
    //
  }
`

export const StyledSearchIcon = styled(IoMdSearch)`
  color: ${props => (props.focused ? props.theme.westSide : 'white')};
  height: 22px;
  width: 22px;
  margin-right: 2px;
  cursor: pointer;
`
