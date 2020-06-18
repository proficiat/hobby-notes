import styled from 'styled-components'

// import { colors } from 'styles'

export const List = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  padding: 0 64px;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`
