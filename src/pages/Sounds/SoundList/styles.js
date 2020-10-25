import styled from 'styled-components'

// import { colors } from 'styles'

export const Frame = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 64px;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 64px;

  > div:first-child {
    margin-top: 36px;
  }
`

export const Info = styled.div``
