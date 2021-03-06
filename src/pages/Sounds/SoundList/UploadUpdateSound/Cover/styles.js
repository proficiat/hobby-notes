import styled from 'styled-components'

import { IoIosCrop } from 'react-icons/io'

import ReactCrop from 'react-image-crop'
import { AbsoluteIconsCircle, SETTINGS_ICON_SIZE } from '../styles'

export const CoverFrame = styled.div`
  position: relative;
  width: 168px;
  height: 168px;
  cursor: pointer;
`

export const StyledReactCrop = styled(ReactCrop)`
  height: 100%;
  border-radius: 4px;
`

export const AbsoluteCropCircle = styled(AbsoluteIconsCircle)`
  left: -21px;
`

export const StyledCropIcon = styled(IoIosCrop).attrs({
  size: SETTINGS_ICON_SIZE,
})``

export const DropzoneRoot = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`
