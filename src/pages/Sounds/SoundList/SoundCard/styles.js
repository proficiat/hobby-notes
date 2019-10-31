import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 579px;
  height: 168px;
  margin-bottom: 36px;
  background: transparent;
  color: #c3002f;
`

export const Image = styled.div`
  display: flex;
  height: 100%;
  width: 168px;
  margin-right: 15px;
  background: #b3e3b5;

  > img {
    max-width: 100%;
    max-height: 100%;
  }
`

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
`

export const SoundName = styled.h2`
  margin-bottom: 22px;
  font-weight: 500;
  font-size: 18px;
  text-transform: uppercase;
`

export const BottomBorder = styled.div`
  height: 1px;
  width: 33%;
  margin: auto auto;
  background: #c3002f;
`
