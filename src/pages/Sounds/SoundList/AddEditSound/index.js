/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// import 'react-image-crop/dist/ReactCrop.css'

// import { gql } from 'apollo-boost'

import get from 'lodash/get'
// import { colors } from 'styles'
// import isEmpty from 'lodash/isEmpty'

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
} from './styles'

const widgetSetup = {
  cloudName: process.env.REACT_APP_CLOUD_NAME,
  uploadPreset: process.env.REACT_APP_CLOUD_UPLOAD_PRESET,
}

class AddEditSound extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      audioName: '',
      description: '',
      isActiveSettings: false,
      cropperdImageFile: null,
      soundFile: null,
      waveFormData: null,
    }

    this.fileInputRef = null
  }

  onDescriptionSwitch = (soundFile, waveFormData) => {
    this.setState({ soundFile, waveFormData, isActiveSettings: true })
  }

  onImageCrop = cropperdImageFile => {
    this.setState({ cropperdImageFile })
  }

  handleChangeName = target => {
    const audioName = get(target, 'target.value')
    this.setState({ audioName })
  }

  handleChangeDescription = target => {
    const description = get(target, 'target.value')
    this.setState({ description })
  }

  handleAddAudio = async () => {
    const { addSound } = this.props
    const {
      cropperdImageFile,
      soundFile,
      audioName,
      waveFormData,
      description,
    } = this.state
    const imageUrl = await this.handleUploadFile(cropperdImageFile)
    const audioUrl = await this.handleUploadFile(soundFile)
    await addSound({
      variables: {
        name: audioName,
        waveform: waveFormData,
        imageUrl,
        audioUrl,
        description,
      },
    })
    this.setState({
      audioName: '',
      description: '',
      soundFile: null,
      cropperdImageFile: null,
    })
  }

  handleUploadFile = async file => {
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
    const { audioName, description, isActiveSettings } = this.state
    return (
      <Container>
        <Cover onImageCrop={this.onImageCrop} />
        {!isActiveSettings && (
          <Sound onDescriptionSwitch={this.onDescriptionSwitch} />
        )}
        {isActiveSettings && (
          <Settings>
            <Field>
              <div>
                Name<sup>*</sup>
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
            <BottomInfoTip onClick={this.handleAddAudio}>Upload</BottomInfoTip>
          </Settings>
        )}
      </Container>
    )
  }
}

AddEditSound.propTypes = {
  addSound: PropTypes.func.isRequired,
}

export default AddEditSound
