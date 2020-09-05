import styled from 'styled-components'

export const Base = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  background: ${props => (props.color ? props.color : 'unset')};
`

export const FeedbackBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  opacity: 1;

  > span {
    display: block;
    height: 100%;
    background-color: ${props => (props.color ? props.color : 'unset')};
    width: 0;
  }
`
