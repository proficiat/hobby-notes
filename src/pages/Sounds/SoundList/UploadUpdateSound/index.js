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
  const waveform = get(soundToEdit, 'waveform', [])
  const duration = get(soundToEdit, 'duration', null)
  return { imageUrl, waveformData, name, description, waveform, duration }
}

class UploadUpdateSound extends PureComponent {
  constructor(props) {
    super(props)
    const { soundToEdit } = props
    this.state = {
      ...INIT_STATE,
    }
    this.infoRef = React.createRef()
    this.initSoundData = getInitSoundData(soundToEdit)
    this.isUpload = isEmpty(soundToEdit)
  }

  componentDidMount() {
    const { soundToEdit } = this.props
    if (soundToEdit) {
      const { waveform, duration } = this.initSoundData
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
    const imageUrl = await uploadFileToCloudinary(croppedImageFile)
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

  render() {
    const { isActiveSettings, isPreUploading } = this.state
    const { isLoading, onCancel } = this.props
    const isLoad = isLoading || isPreUploading
    const {
      imageUrl: initImageUrl,
      waveformData: initWaveform,
      name,
      description,
    } = this.initSoundData
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
            <AbsoluteIconsCircle onClick={this.handleSwitchSettings}>
              {isActiveSettings ? <SoundWaveIcon /> : <StyledCogIcon />}
            </AbsoluteIconsCircle>
          )}
          <BottomButtons>
            <Button
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
