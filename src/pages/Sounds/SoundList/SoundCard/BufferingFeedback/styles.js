import styled from 'styled-components'

export const Base = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  height: 100%;
`

export const FeedbackBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  opacity: 0.2;

  > span {
    display: block;
    height: 100%;
    background-color: ${props => (props.color ? props.color : '#DDEDF4')};
    width: 0;
  }
`
