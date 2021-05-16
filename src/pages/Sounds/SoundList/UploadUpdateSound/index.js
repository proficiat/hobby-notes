/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { DateTime } from 'luxon'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { uploadFileToCloudinary } from 'helpers/cloudinaryApi'

import Spinner from 'components/Icons/Spinner'
import Cover from './Cover'
import Sound from './Sound'
import Info, { INFO_FIELDS, PRIVACY } from './Info'

import {
  GradientBG,
  Container,
  BottomButtons,
  AbsoluteIconsCircle,
  SoundWaveIcon,
  StyledCogIcon,
  Button,
} from './styles'

const INIT_STATE = {
  isPreUploading: false,
  isActiveSettings: false,

  imageFile: null,
  imageUrl: null,

  soundFile: null,
  waveform: null,
  duration: null,

  name: '',
  description: '',
  buyLink: '',
  isPrivate: false,
}

const getInitSoundData = soundToEdit => {
  const imageUrl = get(soundToEdit, 'imageUrl', null)
  const name = get(soundToEdit, 'name', '')
  const description = get(soundToEdit, 'description', '')
  const waveform = get(soundToEdit, 'waveform', [])
  const duration = get(soundToEdit, 'duration', null)
  const buyLink = get(soundToEdit, 'buyLink', '')
  const isPrivate = get(soundToEdit, 'isPrivate', false)
  return { imageUrl, name, description, waveform, duration, buyLink, isPrivate }
}

class UploadUpdateSound extends PureComponent {
  constructor(props) {
    super(props)
    const { soundToEdit } = props
    this.initSoundData = getInitSoundData(soundToEdit)
    this.state = {
      ...INIT_STATE,
      ...this.initSoundData,
    }
    this.isUpload = isEmpty(soundToEdit)
  }

  onDropSoundFile = (soundFile, waveform, duration) => {
    this.setState({
      soundFile,
      waveform,
      duration,
    })
  }

  onChangeInfoField = fieldName => event => {
    const value = get(event, 'target.value')
    this.setState({
      [fieldName]:
        fieldName === INFO_FIELDS.isPrivate ? value === PRIVACY.private : value,
    })
  }

  onImageCrop = (imageFile, imageUrl) => {
    this.setState({ imageFile, imageUrl })
  }

  uploadSound = async () => {
    const { onMutateSound } = this.props
    this.setState({ isPreUploading: true })

    const {
      imageFile,
      soundFile,
      waveform,
      duration,
      name,
      description,
    } = this.state
    const imageUrl = await uploadFileToCloudinary(imageFile)
    const audioUrl = await uploadFileToCloudinary(soundFile)
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
    const { name, description, buyLink } = this.state

    onMutateSound({
      variables: {
        id: soundToEdit.id,
        name,
        description,
        buyLink,
      },
    })
  }

  handleSwitchSettings = () => {
    this.setState(prevState => ({
      isActiveSettings: !prevState.isActiveSettings,
    }))
  }

  render() {
    const {
      isActiveSettings,
      isPreUploading,
      name,
      description,
      waveform,
      imageUrl,
      buyLink,
      isPrivate,
    } = this.state
    const { isLoading, onCancel } = this.props
    const isLoad = isLoading || isPreUploading
    return (
      <GradientBG isUpdate={!this.isUpload}>
        <Container>
          <Cover imageUrl={imageUrl} onImageCrop={this.onImageCrop} />
          {isLoad && <Spinner />}
          <Sound
            isVisible={!isActiveSettings && !isLoad}
            waveform={waveform}
            onDropSoundFile={this.onDropSoundFile}
          />
          {isActiveSettings && !isLoad && (
            <Info
              buyLink={buyLink}
              description={description}
              isPrivate={isPrivate}
              name={name}
              onChangeInfoField={this.onChangeInfoField}
            />
          )}
          {!isLoad && (
            <AbsoluteIconsCircle onClick={this.handleSwitchSettings}>
              {isActiveSettings ? <SoundWaveIcon /> : <StyledCogIcon />}
            </AbsoluteIconsCircle>
          )}
          <BottomButtons>
            <Button
              disabled={isEmpty(waveform) || !name || isLoad}
              onClick={this.isUpload ? this.uploadSound : this.updateSound}
            >
              {this.isUpload ? 'Upload' : 'Update'}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </BottomButtons>
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
  onCancel: PropTypes.func.isRequired,
  onMutateSound: PropTypes.func.isRequired,
}

export default UploadUpdateSound
