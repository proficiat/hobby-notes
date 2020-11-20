import styled from 'styled-components'

import { colors } from 'styles'

export const Frame = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 64px;

  ::-webkit-scrollbar {
    display: none;
  }
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const SoundsList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 900px;
  padding: 0 64px;

  > div:first-child {
    margin-top: 36px;
  }
`

export const VectorKey = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.whitesmoke};
  min-height: 280px;
`

export const Info = styled.div``
