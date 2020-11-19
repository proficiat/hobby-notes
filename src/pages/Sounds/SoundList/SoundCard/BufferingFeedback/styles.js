import styled from 'styled-components'

export const Base = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-shrink: 0;
  flex-wrap: nowrap;
  background: ${props => (props.color ? props.color : 'unset')};
`

export const Dot = styled.span`
  min-width: 7px !important;
  min-height: 7px !important;
  border-radius: 100px;
  line-height: 1;
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
    position: relative;
    transition: width 0.5s linear;
    ${Dot} {
      position: absolute;
      display: inline-block;
      left: 100%;
      bottom: 50%;
      -webkit-transform: translateY(50%);
      transform: translateY(50%);
      transition: transform 0.5s linear;
      z-index: 3;
      background-color: inherit;
    }
  }
`
