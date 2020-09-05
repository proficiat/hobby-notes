import styled, { css } from 'styled-components'

import { colors } from 'styles'

import { space, layout } from 'styled-system'

export const Frame = styled.div`
  display: flex;
  height: 44px;
  width: 100%;
  background: white;
  margin-top: auto;
  align-items: center;
  flex-shrink: 0;
`

export const SoundFrame = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
`

export const PlayControls = styled.div`
  display: flex;
  align-items: center;

  > div {
    border-color: ${colors.luciaLash};
  }
`

export const StepMarkBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  width: 24px;
  cursor: pointer;
  
  ${props =>
    props.prev &&
    css`
      border-left: 2px solid;
      padding-left: 2px;
    `} 
  ${props =>
    props.next &&
    css`
      border-right: 2px solid;
      padding-right: 4px;
    `}
   border-color: ${colors.luciaLash} !important;
   
   > div {
    border-color: ${colors.luciaLash};
   }
  
  ${layout}
  ${space}
`

export const ProgressFrame = styled.div`
  width: 48%;
  height: 1px;
  background: ${colors.grey};
  display: flex;
`

export const TimeDuration = styled.div`
  margin: 0 28px;
  font-size: 13px;
  color: ${props => (props.current ? colors.lushLava : colors.luciaLash)};
  line-height: normal;
  font-weight: 700;
`
