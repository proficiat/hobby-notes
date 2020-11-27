import styled, { css } from 'styled-components'

import { colors } from 'styles'

import { IoMdRepeat, IoMdShuffle } from 'react-icons/io'

import { space, layout } from 'styled-system'

export const Frame = styled.div`
  display: flex;
  height: 44px;
  width: 100%;
  background: white;
  margin-top: auto;
  align-items: center;
  flex-shrink: 0;
  padding: 0 28px;
`

export const SoundFrame = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
  flex-wrap: nowrap;
  height: 100%;
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

const baseIconStyle = css`
  color: ${props => (props.active ? colors.lushLava : colors.luciaLash)};
  cursor: pointer;
  :hover {
    color: ${props =>
      props.active ? colors.lushLava : colors.suicidePreventionBlue};
  }
`

export const StyledRepeatIcon = styled(IoMdRepeat)`
  ${baseIconStyle};

  margin-left: 16px;
`

export const StyledShuffleIcon = styled(IoMdShuffle)`
  ${baseIconStyle};

  margin-left: 14px;
`
