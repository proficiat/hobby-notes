import styled from 'styled-components'

import { colors } from 'styles'

export const Container = styled.div`
  display: flex;
  flex: 0 1 0;
  min-height: 168px;
  background: ghostwhite;
  margin: 80px 0;
  //flex-shrink: 0;
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

export const Settings = styled.div`
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

export const AbsoluteTopCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background: white;
  position: absolute;
  bottom: calc(100% + 16px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
