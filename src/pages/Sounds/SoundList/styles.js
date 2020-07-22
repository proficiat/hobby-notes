import styled from 'styled-components'

// import { colors } from 'styles'

export const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 64px auto 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 900px;
  padding: 0 64px;

  ::-webkit-scrollbar {
    display: none;
  }
`
