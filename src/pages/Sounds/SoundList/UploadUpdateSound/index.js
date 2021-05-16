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
import Info from './Info'

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
  isActiveSettings: false,
  imageFile: null,
  imageUrl: null,
  soundFile: null,
  waveform: null,
  duration: null,
  isPreUploading: false,
  name: '',
  description: '',
  buyLink: '',
}

const getInitSoundData = soundToEdit => {
  const imageUrl = get(soundToEdit, 'imageUrl', null)
  const name = get(soundToEdit, 'name', '')
  const description = get(soundToEdit, 'description', '')
  const waveform = get(soundToEdit, 'waveform', [])
  const duration = get(soundToEdit, 'duration', null)
  const buyLink = get(soundToEdit, 'buyLink', '')
  return { imageUrl, name, description, waveform, duration, buyLink }
}

class UploadUpdateSound extends PureComponent {
  constructor(props) {
    super(props)
    const { soundToEdit } = props
    this.initSoundData = getInitSoundData(soundToEdit)
    const {
      waveform,
      name,
      description,
      duration,
      imageUrl,
      buyLink,
    } = this.initSoundData
    this.state = {
      ...INIT_STATE,
      waveform,
      name,
      description,
      duration,
      imageUrl,
      buyLink,
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

  onChangeBuyLink = buyLink => this.setState({ buyLink })

  onChangeName = name => this.setState({ name })

  onChangeDescription = description => this.setState({ description })

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
              name={name}
              onChangeBuyLink={this.onChangeBuyLink}
              onChangeDescription={this.onChangeDescription}
              onChangeName={this.onChangeName}
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
