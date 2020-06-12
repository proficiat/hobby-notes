import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { Duration } from 'luxon'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

import {
  // subscribeWaveForm,
  drawLinearWaveForm,
  // drawWaveFormBars,
} from 'helpers/audioVisualizations'

// import WaveformData from 'waveform-data'

import BufferingFeedback from './BufferingFeedback'

import {
  HoverFrame,
  SoundFrame,
  Cover,
  Track,
  WaveformCanvas,
  PlayButton,
  PlaySign,
  PauseSign,
  WaveformImageCanvas,
  SoundControlsBar,
  IconsCircleFrame,
  StyledEditIcon,
  StyledTrashIcon,
} from './styles'

const DELETE_SOUND = gql`
  mutation deleteSound($id: String!) {
    deleteSound(id: $id) {
      id
      name
    }
  }
`

class SoundCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPaused: true,
      // currentTime: 0,
    }
    this.trackRef = null
    this.waveformRef = null
    this.waveformImageRef = null
  }

  componentDidMount() {
    const { sound } = this.props
    const waveform = get(sound, 'waveform', [])
    if (this.waveformImageRef && !isEmpty(waveform)) {
      drawLinearWaveForm(waveform, this.waveformImageRef)
      // drawWaveFormBars(waveform, this.waveformImageRef)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { audioRef, isActive } = this.props
    if (audioRef) {
      if (this.waveformRef) {
        // subscribeWaveForm(this.waveformRef, audioRef)
      }
    }
    if (!isActive && prevProps.isActive) {
      this.handleChangeActiveSound()
    }
  }

  addTrackRef = ref => {
    this.trackRef = ref
  }

  addWaveFormRef = ref => {
    this.waveformRef = ref
  }

  addWaveformImageRef = ref => {
    this.waveformImageRef = ref
  }

  handleChangeActiveSound = () => {
    this.setState({ isPaused: true })
  }

  getSoundDuration = () => {
    const { currentTime } = this.props
    const soundDuration = get(this.audioRef, 'duration', 0)
    const currentTimeDuration = Duration.fromObject({
      seconds: currentTime,
    }).toFormat('mm:ss')
    const totalTimeDuration = Duration.fromObject({
      seconds: soundDuration,
    }).toFormat('mm:ss')
    return `${currentTimeDuration} / ${totalTimeDuration}`
  }

  handlePress = () => {
    const { isActive, audioRef, sound, onSoundClick } = this.props
    const soundId = get(sound, 'id')
    if (audioRef) {
      let isSoundPaused = false
      if (audioRef.paused || !isActive) {
        isSoundPaused = true
      }
      this.setState({ isPaused: !isSoundPaused }, () => {
        if (isSoundPaused) {
          audioRef.play()
        } else {
          audioRef.pause()
        }
      })
    } else {
      this.setState({ isPaused: false })
    }
    onSoundClick(soundId)
  }

  handleSeekClick = event => {
    const { audioRef } = this.props
    try {
      if (this.trackRef) {
        const percentWidth =
          (event.clientX - this.trackRef.offsetLeft) / this.trackRef.offsetWidth
        if (audioRef) {
          audioRef.currentTime = percentWidth * audioRef.duration
        }
      }
    } catch (error) {
      //
    }
  }

  handleDeleteSound = (store, response) => {
    const { onRefetchSounds } = this.props
    onRefetchSounds()
  }

  render() {
    const { sound, isViewerInPower } = this.props
    const { isPaused } = this.state
    const soundId = get(sound, 'id')
    const imageUrl = get(sound, 'imageUrl')
    // const soundName = get(sound, 'name', '')

    return (
      <HoverFrame>
        {isViewerInPower && (
          <SoundControlsBar>
            <IconsCircleFrame>
              <StyledEditIcon />
            </IconsCircleFrame>
            <IconsCircleFrame>
              <Mutation mutation={DELETE_SOUND} update={this.handleDeleteSound}>
                {deleteSound => (
                  <StyledTrashIcon
                    onClick={e => deleteSound({ variables: { id: soundId } })}
                  />
                )}
              </Mutation>
            </IconsCircleFrame>
          </SoundControlsBar>
        )}
        <SoundFrame>
          <Cover onClick={this.handlePress}>
            {imageUrl && <img alt="test" src={imageUrl} />}
            <PlayButton playing={!isPaused}>
              {isPaused ? <PlaySign /> : <PauseSign />}
            </PlayButton>
          </Cover>
          <Track
            playing={!isPaused}
            ref={this.addTrackRef}
            onClick={this.handleSeekClick}
          >
            <BufferingFeedback soundId={soundId} />
            <WaveformCanvas ref={this.addWaveFormRef} />
            <WaveformImageCanvas ref={this.addWaveformImageRef} />
          </Track>
        </SoundFrame>
      </HoverFrame>
    )
  }
}

SoundCard.defaultProps = {
  isViewerInPower: false,
  audioRef: null,
}

SoundCard.propTypes = {
  audioRef: PropTypes.object,
  currentTime: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isViewerInPower: PropTypes.bool,
  sound: PropTypes.object.isRequired,
  onRefetchSounds: PropTypes.func.isRequired,
  onSoundClick: PropTypes.func.isRequired,
}

export default SoundCard
