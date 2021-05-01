import styled from 'styled-components'

export const ProgressArea = styled.div`
  display: flex;
  align-items: center;
  width: 42%;
  height: 100%;
  cursor: pointer;
`

export const ProgressLine = styled.div`
  width: 100%;
  height: 1px;
  background: ${props => props.theme.footer.progressLine};
  display: flex;
`

export const TimeDuration = styled.div`
  margin: 0 28px;
  font-size: 13px;
  color: ${props =>
    props.current ? props.theme.active : props.theme.defaultText};
  line-height: normal;
  font-weight: 700;
`
