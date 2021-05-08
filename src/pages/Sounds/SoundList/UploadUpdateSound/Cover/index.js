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

const INIT_CROP = { aspect: 16 / 16 }

class Cover extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      imageSrc: null,
      crop: INIT_CROP,
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
    this.setState({
      imageSrc: null,
      crop: INIT_CROP,
    })
  }

  handleImageDrop = files => {
    const reader = new FileReader()
    reader.addEventListener('load', () =>
      this.setState({ imageSrc: reader.result }),
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
      const { onImageCrop } = this.props
      onImageCrop(file, fileUrl)
    }
  }

  render() {
    const { imageUrl } = this.props
    const { crop, imageSrc } = this.state
    return (
      <CoverFrame ref={this.addCoverFrameReF}>
        {imageSrc && (
          <Fragment>
            <AbsoluteCropCircle onClick={this.handleImageCrop}>
              <StyledCropIcon size={24} />
            </AbsoluteCropCircle>
            <StyledReactCrop
              crop={crop}
              ruleOfThirds
              src={imageSrc}
              onChange={this.onCropChange}
              onComplete={this.onCropComplete}
              onImageLoaded={this.onImageLoaded}
            />
          </Fragment>
        )}
        {!imageSrc && (
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

                {imageUrl && <Image alt="preview" src={imageUrl} />}

                {!imageUrl && <PuzzleIcon shadow={false} />}
              </DropzoneRoot>
            )}
          </Dropzone>
        )}
      </CoverFrame>
    )
  }
}

Cover.defaultProps = {
  imageUrl: '',
}

Cover.propTypes = {
  imageUrl: PropTypes.string,
  onImageCrop: PropTypes.func.isRequired,
}

export default Cover
