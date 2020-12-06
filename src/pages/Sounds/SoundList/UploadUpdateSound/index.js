/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { DateTime } from 'luxon'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import Spinner from 'components/Icons/Spinner'
import Cover from './Cover'
import Sound from './Sound'
import Info from './Info'

import {
  GradientBG,
  Container,
  UploadButton,
  AbsoluteTopCircle,
  SoundWaveIcon,
  StyledCogIcon,
} from './styles'

const widgetSetup = {
  cloudName: process.env.REACT_APP_CLOUD_NAME,
  uploadPreset: process.env.REACT_APP_CLOUD_UPLOAD_PRESET,
}

const INIT_STATE = {
  isActiveSettings: false,
  croppedImageFile: null,
  soundFile: null,
  waveform: null,
  duration: null,
  isPreUploading: false,
}

const getInitSoundData = soundToEdit => {
  const imageUrl = get(soundToEdit, 'imageUrl', null)
  const waveformData = get(soundToEdit, 'waveform', [])
  const name = get(soundToEdit, 'name', '')
  const description = get(soundToEdit, 'description', '')
  return { imageUrl, waveformData, name, description }
}

class UploadUpdateSound extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...INIT_STATE,
    }
    this.infoRef = React.createRef()
  }

  componentDidMount() {
    const { soundToEdit } = this.props
    if (soundToEdit) {
      const waveform = get(soundToEdit, 'waveform', [])
      const duration = get(soundToEdit, 'duration', null)
      this.setState({
        waveform,
        duration,
      })
    }
  }

  getInfoData = () => {
    const { current } = this.infoRef
    const { name, description } = current.state
    return { name, description }
  }

  onDropSoundFile = (soundFile, waveform, duration) => {
    this.setState({
      soundFile,
      waveform,
      duration,
    })
  }

  onImageCrop = croppedImageFile => {
    this.setState({ croppedImageFile })
  }

  uploadSound = async () => {
    const { onMutateSound } = this.props
    this.setState({ isPreUploading: true })

    const { name, description } = this.getInfoData()
    const { croppedImageFile, soundFile, waveform, duration } = this.state
    const imageUrl = await this.handleUploadFile(croppedImageFile)
    const audioUrl = await this.handleUploadFile(soundFile)
    const uploadedAt = DateTime.local()

    await onMutateSound({
      variables: {
        name,
        waveform,
        imageUrl,
        audioUrl,
        description,
        duration,
        uploadedAt,
      },
    })
    this.setState({
      ...INIT_STATE,
    })
  }

  updateSound = () => {
    const { onMutateSound, soundToEdit } = this.props
    const { name, description } = this.getInfoData()

    onMutateSound({
      variables: {
        id: soundToEdit.id,
        name,
        description,
      },
    })
  }

  handleSwitchSettings = () => {
    this.setState(prevState => ({
      isActiveSettings: !prevState.isActiveSettings,
    }))
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
    const { isActiveSettings, isPreUploading } = this.state
    const { isLoading, soundToEdit } = this.props
    const isLoad = isLoading || isPreUploading
    const {
      imageUrl: initImageUrl,
      waveformData: initWaveform,
      name,
      description,
    } = getInitSoundData(soundToEdit)
    const isUpload = isEmpty(initWaveform)
    return (
      <GradientBG>
        <Container>
          <Cover initImageUrl={initImageUrl} onImageCrop={this.onImageCrop} />
          {isLoad && <Spinner />}
          <Sound
            initWaveform={initWaveform}
            isVisible={!isActiveSettings && !isLoad}
            onDropSoundFile={this.onDropSoundFile}
          />
          <Info
            initData={{ name, description }}
            isVisible={isActiveSettings && !isLoad}
            ref={this.infoRef}
          />
          {!isLoad && (
            <AbsoluteTopCircle onClick={this.handleSwitchSettings}>
              {isActiveSettings ? (
                <SoundWaveIcon size={24} />
              ) : (
                <StyledCogIcon size={24} />
              )}
            </AbsoluteTopCircle>
          )}
          <UploadButton
            onClick={isUpload ? this.uploadSound : this.updateSound}
          >
            {isUpload ? 'Upload' : 'Update'}
          </UploadButton>
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
