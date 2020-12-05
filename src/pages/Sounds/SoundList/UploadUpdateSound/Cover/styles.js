import styled from 'styled-components'

import { IoIosCrop } from 'react-icons/io'

import ReactCrop from 'react-image-crop'

export const CoverFrame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 168px;
`

export const StyledReactCrop = styled(ReactCrop)`
  width: 168px;
  height: 168px;
`

export const AbsoluteCropCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background: white;
  position: absolute;
  transform: translateY(50%);
  left: -24px;
  bottom: 50%;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const StyledCropIcon = styled(IoIosCrop)``

export const DropzoneRoot = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`

export const Image = styled.img`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
