import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

import {
  // subscribeWaveForm,
  drawLinearWaveForm,
  // drawWaveFormBars,
} from 'helpers/audioVisualizations'
// import { getSoundDurations } from 'helpers/sounds'

// import WaveformData from 'waveform-data'

import Spinner from 'components/Spinner'

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

class SoundCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPaused: true,
    }
    this.trackRef = React.createRef()
    this.waveformRef = React.createRef()
    this.waveformImageRef = React.createRef()
  }

  componentDidMount() {
    const { sound } = this.props
    const { current: waveformImageRef } = this.waveformImageRef
    const waveform = get(sound, 'waveform', [])
    if (waveformImageRef && !isEmpty(waveform)) {
      drawLinearWaveForm(waveform, waveformImageRef)
      // drawWaveFormBars(waveform, waveformImageRef)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { audioRef, isActive } = this.props
    if (audioRef) {
      // if (this.waveformRef) {
      // subscribeWaveForm(this.waveformRef, audioRef)
      // }
    }
    if (!isActive && prevProps.isActive) {
      this.handleChangeActiveSound()
    }
  }

  handleChangeActiveSound = () => {
    this.setState({ isPaused: true })
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
    const { audioRef, isActive } = this.props
    const { current: trackRef } = this.trackRef
    if (!isActive) {
      return
    }
    try {
      if (trackRef) {
        const percentWidth =
          (event.clientX - trackRef.offsetLeft) / trackRef.offsetWidth
        if (audioRef) {
          audioRef.currentTime = percentWidth * audioRef.duration
        }
      }
    } catch (error) {
      //
    }
  }

  render() {
    const {
      sound,
      isViewerInPower,
      currentTime,
      deleteSound,
      isSoundDeleting,
    } = this.props
    const { isPaused } = this.state
    const soundId = get(sound, 'id')
    const imageUrl = get(sound, 'imageUrl')
    // const soundName = get(sound, 'name', '')
    // const { currentDuration, soundDuration } = getSoundDurations(
    //   sound,
    //   currentTime,
    // )
    return (
      <HoverFrame>
        {isViewerInPower && !isSoundDeleting && (
          <SoundControlsBar>
            <IconsCircleFrame>
              <StyledEditIcon />
            </IconsCircleFrame>
            <IconsCircleFrame>
              <StyledTrashIcon onClick={deleteSound} />
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
          {isSoundDeleting && <Spinner />}
          {!isSoundDeleting && (
            <Track
              playing={!isPaused}
              ref={this.trackRef}
              onClick={this.handleSeekClick}
            >
              <BufferingFeedback soundId={soundId} />
              <WaveformCanvas ref={this.waveformRef} />
              <WaveformImageCanvas ref={this.waveformImageRef} />
            </Track>
          )}
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
  deleteSound: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isSoundDeleting: PropTypes.bool.isRequired,
  isViewerInPower: PropTypes.bool,
  sound: PropTypes.object.isRequired,
  // onRefetchSounds: PropTypes.func.isRequired,
  onSoundClick: PropTypes.func.isRequired,
}

export default graphql(
  gql`
    mutation deleteSound($id: String!) {
      deleteSound(id: $id) {
        id
        name
      }
    }
  `,
  {
    name: 'deleteSound',
    options: props => ({
      update: props.onRefetchSounds,
      variables: {
        id: get(props, 'sound.id'),
      },
    }),
    props: ({ deleteSound, deleteSoundResult: { loading } }) => ({
      deleteSound,
      isSoundDeleting: loading,
    }),
  },
)(SoundCard)
