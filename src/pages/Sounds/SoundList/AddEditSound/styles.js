import styled from 'styled-components'

import { colors } from 'styles'

export const ImageWrapper = styled.div`
  display: flex;
  flex: 1;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Container = styled.div`
  display: flex;
  flex: 1 1 0;
  min-height: 168px;
  margin: 80px 0px;
`

export const BottomInfoTip = styled.div`
  position: absolute;
  bottom: 12px;
  right: 50%;
  white-space: nowrap;
  -webkit-transform: translateX(50%);
  transform: translateX(50%);
  color: ${colors.luciaLash};
  font-weight: 300;
  font-size: 12px;
`

export const Cover = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 168px;
  background: white;
  cursor: pointer;
`

export const Sound = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  background: white;
  cursor: pointer;
  padding: 18px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11px;
  color: ${colors.luciaLash};
  margin-bottom: 8px;
`

export const Input = styled.input`
  height: 28px;
  background-color: white;
  outline: none;
  color: ${colors.luciaLash};
  font-weight: 300;
  width: 220px;
  margin-top: 4px;
  padding-left: 8px;
  border: 1px solid ${colors.luciaLash};
`

export const TextArea = styled.textarea`
  margin-top: 4px;
  border: 1px solid ${colors.luciaLash};
  font-weight: 300;
  resize: none;
  ${'' /* vertical; */};
  height: 28px;
  padding: 6px 6px 6px 8px;
  outline: none;
`
