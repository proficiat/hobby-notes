import styled from 'styled-components'

export const Base = styled.div`
  display: flex;
  height: 64px;
  width: 100%;
  background: black;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  position: fixed;
  z-index: 6;
  padding-right: 32px;
`

export const Name = styled.div`
  min-width: 88px;
  text-align: center;
  color: white;
  text-transform: uppercase;
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
`
