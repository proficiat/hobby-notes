import React, { useState, useEffect } from 'react'
import get from 'lodash/get'

import { headerSearchValueVar } from 'cache'

import { SearchBase, SearchInput, StyledSearchIcon } from './styles'

const Search = props => {
  const [searchValue, setSearchValue] = useState('')
  const [isFocus, setFocus] = useState(false)

  useEffect(() => {
    headerSearchValueVar(searchValue)
  }, [searchValue])

  const handleChangeSearchValue = event => {
    const value = get(event, 'target.value', '')
    setSearchValue(value)
  }

  return (
    <SearchBase>
      <StyledSearchIcon focused={isFocus ? 1 : 0} />
      <SearchInput
        placeholder="Search ..."
        value={searchValue}
        onBlur={() => setFocus(false)}
        onChange={handleChangeSearchValue}
        onFocus={() => setFocus(true)}
      />
    </SearchBase>
  )
}

export default Search
