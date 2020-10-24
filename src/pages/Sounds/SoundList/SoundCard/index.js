import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { colors } from 'styles'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

import {
  // subscribeWaveForm,
  drawLinearWaveForm,
  // drawWaveFormBars,
} from 'helpers/audioVisualizations'
import { getSoundDurations } from 'helpers/sounds'

// import WaveformData from 'waveform-data'

import Spinner from 'components/Spinner'
import PuzzleIcon from 'components/Icons/Puzzle'

import BufferingFeedback from './BufferingFeedback'

import {
  HoverFrame,
  SoundFrame,
  Cover,
  Track,
  // WaveformCanvas,
  PlayButton,
  PlaySign,
  PauseSign,
  WaveformImageCanvas,
  SoundControlsBar,
  IconsCircleFrame,
  StyledEditIcon,
  StyledTrashIcon,
  WaveformProgressBar,
  TrackHeader,
  TimeLine,
} from './styles'

class SoundCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.progressBarRef = React.createRef()
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
    const { audioRef } = this.props
    if (audioRef) {
      // if (this.waveformRef) {
      // subscribeWaveForm(this.waveformRef, audioRef)
      // }
    }
  }

  handlePress = () => {
    const { sound, onSoundClick } = this.props
    const soundId = get(sound, 'id')
    onSoundClick(soundId)
  }

  handleSeekProgress = event => {
    const { audioRef, isActive } = this.props
    const { current: progressBarRef } = this.progressBarRef
    if (!isActive) {
      return
    }
    try {
      if (progressBarRef) {
        const percentWidth =
          (event.clientX - progressBarRef.offsetLeft) /
          progressBarRef.offsetWidth
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
      isSoundPaused,
      isActive,
    } = this.props
    const soundId = get(sound, 'id')
    const imageUrl = get(sound, 'imageUrl')
    const soundName = get(sound, 'name', '')
    const { currentDuration, soundDuration } = getSoundDurations(
      sound,
      currentTime,
    )
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
            {imageUrl ? <img alt="test" src={imageUrl} /> : <PuzzleIcon />}

            <PlayButton playing={!isSoundPaused}>
              {isSoundPaused ? <PlaySign /> : <PauseSign />}
            </PlayButton>
          </Cover>
          {isSoundDeleting && <Spinner />}
          {!isSoundDeleting && (
            <Track playing={!isSoundPaused}>
              <TrackHeader>{soundName}</TrackHeader>
              <TimeLine>
                {isActive && <span>{currentDuration}</span>}
                <WaveformProgressBar
                  ref={this.progressBarRef}
                  onClick={this.handleSeekProgress}
                >
                  <BufferingFeedback
                    amountColor={colors.suicidePreventionBlue}
                    bgColor={colors.luciaLash}
                    progressColor={colors.lushLava}
                    soundId={soundId}
                  />
                  <WaveformImageCanvas
                    id={`canvasImage${soundId}`}
                    ref={this.waveformImageRef}
                  />
                </WaveformProgressBar>
                {soundDuration}
              </TimeLine>
              {/* <WaveformCanvas ref={this.waveformRef} /> */}
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
  isSoundPaused: PropTypes.bool.isRequired,
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
