import styled from 'styled-components'

export const Frame = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 64px;
  min-height: 0;
  width: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 0;
`

export const SoundsList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 900px;
  padding: 0 64px;
  min-height: 0;

  > div:first-child {
    margin-top: 36px;
  }
`

export const VectorKey = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.vectorKeyBg};
  min-height: 280px;
  padding-top: 1px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    flex-shrink: 0;
    padding-bottom: 60px;

    > div:first-child {
      order: 2;
      margin-right: 0;
    }
  }
`

export const Info = styled.div``
