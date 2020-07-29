/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import Dropzone from 'react-dropzone'

import PuzzleIcon from 'components/Icons/Puzzle'

import {
  CoverFrame,
  StyledReactCrop,
  StyledCropIcon,
  DropzoneRoot,
  Image,
  AbsoluteCropCircle,
} from './styles'

class Cover extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      coverImageSrc: null,
      croppedImageUrl: null,
      cropperdImageFile: null,
      crop: {
        aspect: 16 / 16,
      },
    }

    this.imageRef = null
    this.coverFrameRef = null
  }

  onImageLoaded = image => {
    this.imageRef = image
  }

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop })
  }

  onCropComplete = crop => {
    this.makeClientCrop(crop)
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const cropWidth = crop.width || get(this.coverFrameRef, 'clientWidth', 0)
    const cropHeight = crop.height || get(this.coverFrameRef, 'clientHeight', 0)
    const scaledCropWidth = cropWidth * scaleX
    const scaledCropHeight = cropHeight * scaleY

    canvas.width = Math.ceil(scaledCropWidth)
    canvas.height = Math.ceil(scaledCropHeight)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      scaledCropWidth,
      scaledCropHeight,
      0,
      0,
      scaledCropWidth,
      scaledCropHeight,
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => {
          if (!blob) {
            // reject(new Error('Canvas is empty'));
            console.error('Canvas is empty')
            return
          }

          blob.name = fileName
          const file = new File([blob], 'fileName')
          window.URL.revokeObjectURL(this.fileUrl)
          this.fileUrl = window.URL.createObjectURL(blob)
          resolve({ file, fileUrl: this.fileUrl })
        },
        'image/jpeg',
        1,
      )
    })
  }

  addCoverFrameReF = ref => {
    this.coverFrameRef = ref
  }

  handleImageCrop = () => {
    const { cropperdImageFile } = this.state
    const { onImageCrop } = this.props
    onImageCrop(cropperdImageFile)
    this.setState({
      coverImageSrc: null,
      cropperdImageFile: null,
    })
  }

  handleImageDrop = files => {
    const reader = new FileReader()
    reader.addEventListener('load', () =>
      this.setState({ coverImageSrc: reader.result }),
    )
    reader.readAsDataURL(files[0])
  }

  async makeClientCrop(crop) {
    if (this.imageRef) {
      const { file, fileUrl } = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg',
      )
      this.setState({ croppedImageUrl: fileUrl, cropperdImageFile: file })
    }
  }

  render() {
    const { crop, coverImageSrc, croppedImageUrl } = this.state
    return (
      <CoverFrame ref={this.addCoverFrameReF}>
        {coverImageSrc && (
          <Fragment>
            <AbsoluteCropCircle onClick={this.handleImageCrop}>
              <StyledCropIcon size={24} />
            </AbsoluteCropCircle>
            <StyledReactCrop
              crop={crop}
              ruleOfThirds
              src={coverImageSrc}
              onChange={this.onCropChange}
              onComplete={this.onCropComplete}
              onImageLoaded={this.onImageLoaded}
            />
          </Fragment>
        )}
        {!coverImageSrc && (
          <Dropzone
            accept="image/jpeg, image/png"
            multiple={false}
            onDrop={this.handleImageDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <DropzoneRoot
                {...getRootProps({
                  className: 'dropzone',
                  // onDrop: event => event.stopPropagation(),
                })}
              >
                <input {...getInputProps()} />

                {croppedImageUrl && (
                  <Image alt="preview" src={croppedImageUrl} />
                )}

                {!coverImageSrc && !croppedImageUrl && (
                  <PuzzleIcon />
                )}
              </DropzoneRoot>
            )}
          </Dropzone>
        )}
      </CoverFrame>
    )
  }
}

Cover.propTypes = {
  onImageCrop: PropTypes.func.isRequired,
}

export default Cover
