import styled, { css } from 'styled-components'

import { DEFAULT_AUDIO_VOLUME } from 'helpers/sounds'

import { IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeOff } from 'react-icons/io'

export const ABSOLUTE_FRAME_VERTICAL_PADDING = 22
const ABSOLUTE_FRAME_HEIGHT = 180
const BASE_VOLUME_HEIGHT =
  ABSOLUTE_FRAME_HEIGHT - ABSOLUTE_FRAME_VERTICAL_PADDING * 2
const INIT_ACTIVE_VOLUME_HEIGHT = DEFAULT_AUDIO_VOLUME * BASE_VOLUME_HEIGHT

export const AbsoluteFrame = styled.div`
  position: absolute;
  visibility: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  bottom: 100%;
  right: 50%;
  -webkit-transform: translateX(50%);
  transform: translateX(50%);
  background: ${props => props.theme.luciaLash};
  width: 44px;
  height: ${ABSOLUTE_FRAME_HEIGHT}px;
  z-index: 6;
  box-shadow: 1px 0 11px 0 rgba(10, 10, 10, 0.8);
  padding: ${ABSOLUTE_FRAME_VERTICAL_PADDING}px 0;

  :hover {
    visibility: visible;
  }

  :before,
  :after {
    top: 100%;
    right: 50%;
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border: solid 11px transparent;
    border-top-color: ${props => props.theme.luciaLash};
    z-index: 6;
  }
`

export const Frame = styled.div`
  cursor: pointer;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  :hover {
    ${AbsoluteFrame} {
      visibility: visible;
    }
  }
`

export const Point = styled.span`
  min-width: 7px !important;
  min-height: 7px !important;
  border-radius: 100px;
  line-height: 1;
`

export const BaseVolumeHeight = styled.div`
  display: flex;
  align-items: flex-end;
  flex: 1;
  background: white;
  max-width: 1px;
  width: 1px;
`

export const ActiveVolumeHeight = styled.div`
  position: relative;
  display: block;
  width: 100%;
  background: ${props => props.theme.suicidePreventionBlue};
  height: ${INIT_ACTIVE_VOLUME_HEIGHT}px;
  transition: height 0.5s linear;

  ${Point} {
    position: absolute;
    display: inline-block;
    bottom: 100%;
    right: 50%;
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
    transition: transform 0.5s linear;
    z-index: 3;
    background-color: inherit;
  }
`

const baseIconStyle = css`
  color: ${props =>
    props.active ? props.theme.lushLava : props.theme.luciaLash};
  cursor: pointer;
  height: 22px;
  width: 22px;
  :hover {
    color: ${props =>
      props.active ? props.theme.lushLava : props.theme.suicidePreventionBlue};
  }
`
export const StyledVolumeHeightIcon = styled(IoMdVolumeHigh)`
  ${baseIconStyle};
`

export const StyledVolumeLowIcon = styled(IoMdVolumeLow)`
  ${baseIconStyle};
`

export const StyledVolumeOffIcon = styled(IoMdVolumeOff)`
  ${baseIconStyle};
`
