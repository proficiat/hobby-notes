import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: 88px;

  ::-webkit-scrollbar {
    display: none;
  }
`
