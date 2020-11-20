/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// import 'react-image-crop/dist/ReactCrop.css'

// import { gql } from 'apollo-boost'

import { DateTime } from 'luxon'

import get from 'lodash/get'
// import { colors } from 'styles'
import Spinner from 'components/Spinner'
// import { Mutation, Query } from 'react-apollo'
import Cover from './Cover'
import Sound from './Sound'

import {
  Container,
  BottomInfoTip,
  Field,
  Input,
  TextArea,
  Settings,
  StyledSup,
} from './styles'

const widgetSetup = {
  cloudName: process.env.REACT_APP_CLOUD_NAME,
  uploadPreset: process.env.REACT_APP_CLOUD_UPLOAD_PRESET,
}

const INIT_STATE = {
  audioName: '',
  description: '',
  isActiveSettings: false,
  croppedImageFile: null,
  soundFile: null,
  waveFormData: null,
  soundDuration: null,
  isPreUploading: false,
}

class AddEditSound extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...INIT_STATE,
    }

    this.fileInputRef = null
  }

  onDescriptionSwitch = (soundFile, waveFormData, soundDuration) => {
    this.setState({
      soundFile,
      waveFormData,
      isActiveSettings: true,
      soundDuration,
    })
  }

  onImageCrop = croppedImageFile => {
    this.setState({ croppedImageFile })
  }

  handleChangeName = target => {
    const audioName = get(target, 'target.value')
    this.setState({ audioName })
  }

  handleChangeDescription = target => {
    const description = get(target, 'target.value')
    this.setState({ description })
  }

  uploadSound = async () => {
    const { addSound } = this.props
    this.setState({ isPreUploading: true })
    const {
      croppedImageFile,
      soundFile,
      audioName,
      waveFormData,
      description,
      soundDuration,
    } = this.state
    const imageUrl = await this.handleUploadFile(croppedImageFile)
    const audioUrl = await this.handleUploadFile(soundFile)
    const uploadedAt = DateTime.local()
    await addSound({
      variables: {
        name: audioName,
        waveform: waveFormData,
        imageUrl,
        audioUrl,
        description,
        duration: soundDuration,
        uploadedAt,
      },
    })
    this.setState({
      ...INIT_STATE,
    })
  }

  handleUploadFile = async file => {
    // if (isEmpty(file)) {
    //   return ''
    // }
    const formData = new FormData()
    const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${widgetSetup.cloudName}/upload`
    const CLOUDINARY_UPLOAD_PRESET = widgetSetup.uploadPreset
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET) // Replace the preset name with your own

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    return data.secure_url
  }

  render() {
    const {
      audioName,
      description,
      isActiveSettings,
      isPreUploading,
    } = this.state
    const { isLoading } = this.props
    const isLoad = isLoading || isPreUploading
    return (
      <Container>
        <Cover onImageCrop={this.onImageCrop} />
        {isLoad && <Spinner />}
        {!isActiveSettings && !isLoad && (
          <Sound onDescriptionSwitch={this.onDescriptionSwitch} />
        )}
        {isActiveSettings && !isLoad && (
          <Settings>
            <Field>
              <div>
                Name<StyledSup>*</StyledSup>
              </div>{' '}
              <Input
                placeholder="Name your track"
                type="text"
                value={audioName}
                onChange={this.handleChangeName}
              />
            </Field>
            <Field>
              Description{' '}
              <TextArea
                placeholder="Describe your track"
                value={description}
                onChange={this.handleChangeDescription}
              />
            </Field>
            <BottomInfoTip onClick={this.uploadSound}>Upload</BottomInfoTip>
          </Settings>
        )}
      </Container>
    )
  }
}

AddEditSound.propTypes = {
  addSound: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default AddEditSound
