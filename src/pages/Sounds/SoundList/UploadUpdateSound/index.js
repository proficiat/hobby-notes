/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { DateTime } from 'luxon'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import Spinner from 'components/Icons/Spinner'
import Cover from './Cover'
import Sound from './Sound'

import {
  GradientBG,
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

const getInitSoundData = soundToEdit => {
  const initImageUrl = get(soundToEdit, 'imageUrl', null)
  const initWaveformData = get(soundToEdit, 'waveform', [])
  return { initImageUrl, initWaveformData }
}

class UploadUpdateSound extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...INIT_STATE,
    }
  }

  componentDidMount() {
    const { soundToEdit } = this.props
    if (soundToEdit) {
      const audioName = get(soundToEdit, 'name', '')
      const description = get(soundToEdit, 'description', '')
      const waveFormData = get(soundToEdit, 'waveform', [])
      const duration = get(soundToEdit, 'duration', null)
      this.setState({
        audioName,
        description,
        waveFormData,
        soundDuration: duration,
      })
    }
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
    const { onMutateSound } = this.props
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
    await onMutateSound({
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

  updateSound = () => {
    const { onMutateSound, soundToEdit } = this.props
    const { audioName } = this.state
    onMutateSound({
      variables: {
        id: soundToEdit.id,
        name: audioName,
      },
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
    const { isLoading, soundToEdit } = this.props
    const isLoad = isLoading || isPreUploading
    const { initImageUrl, initWaveformData } = getInitSoundData(soundToEdit)
    const isUpload = isEmpty(initWaveformData)
    return (
      <GradientBG>
        <Container>
          <Cover initImageUrl={initImageUrl} onImageCrop={this.onImageCrop} />
          {isLoad && <Spinner />}
          {!isActiveSettings && !isLoad && (
            <Sound
              initWaveformData={initWaveformData}
              onDescriptionSwitch={this.onDescriptionSwitch}
            />
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
              <BottomInfoTip
                onClick={isUpload ? this.uploadSound : this.updateSound}
              >
                {isUpload ? 'Upload' : 'Update'}
              </BottomInfoTip>
            </Settings>
          )}
        </Container>
      </GradientBG>
    )
  }
}

UploadUpdateSound.defaultProps = {
  soundToEdit: null,
}

UploadUpdateSound.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  soundToEdit: PropTypes.object,
  onMutateSound: PropTypes.func.isRequired,
}

export default UploadUpdateSound
