import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { colors } from 'styles'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { gql } from '@apollo/client'
import { graphql } from '@apollo/client/react/hoc'
import { compose } from 'recompose'

import { GET_AUDIO_CURRENT_TIME } from 'cache'

import {
  // subscribeWaveForm,
  drawLinearWaveForm,
  // drawWaveFormBars,
} from 'helpers/audioVisualizations'
import { getSoundDurations } from 'helpers/sounds'

// import WaveformData from 'waveform-data'

import Spinner from 'components/Icons/Spinner'
import PuzzleIcon from 'components/Icons/Puzzle'

import BufferingFeedback from './BufferingFeedback'
import SettingsPopover from './SettingsPopover'

import {
  SoundFrame,
  Cover,
  Track,
  // WaveformCanvas,
  PlayButton,
  PlaySign,
  PauseSign,
  WaveformImageCanvas,
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
    const { isActive, onSeekProgress } = this.props
    const { current: progressBarRef } = this.progressBarRef
    onSeekProgress(isActive, progressBarRef, event)
  }

  render() {
    const {
      sound,
      isViewerInPower,
      onDeleteSound,
      isSoundDeleting,
      isSoundPaused,
      isActive,
      audioCurrentTime,
      onToggleUpdate,
    } = this.props
    const soundId = get(sound, 'id')
    const imageUrl = get(sound, 'imageUrl')
    const soundName = get(sound, 'name', '')
    const { currentDuration, soundDuration } = getSoundDurations(
      sound,
      audioCurrentTime,
    )
    return (
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
            <TrackHeader>
              {soundName}
              {isViewerInPower && !isSoundDeleting && (
                <SettingsPopover
                  onDeleteSound={onDeleteSound}
                  onToggleUpdate={() => onToggleUpdate(soundId)}
                />
              )}
            </TrackHeader>
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
    )
  }
}

SoundCard.defaultProps = {
  isViewerInPower: false,
  audioRef: null,
  audioCurrentTime: null,
}

SoundCard.propTypes = {
  audioCurrentTime: PropTypes.number,
  audioRef: PropTypes.object,
  isActive: PropTypes.bool.isRequired,
  isSoundDeleting: PropTypes.bool.isRequired,
  isSoundPaused: PropTypes.bool.isRequired,
  isViewerInPower: PropTypes.bool,
  sound: PropTypes.object.isRequired,
  // onRefetchSounds: PropTypes.func.isRequired,
  onDeleteSound: PropTypes.func.isRequired,
  onSeekProgress: PropTypes.func.isRequired,
  onSoundClick: PropTypes.func.isRequired,
  onToggleUpdate: PropTypes.func.isRequired,
}

export default compose(
  graphql(
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
        onDeleteSound: deleteSound,
        isSoundDeleting: loading,
      }),
    },
  ),
  graphql(GET_AUDIO_CURRENT_TIME, {
    name: 'audioCurrentTime',
    skip: props => !props.isActive,
    props: ({ audioCurrentTime: { audioCurrentTime } }) => ({
      audioCurrentTime,
    }),
  }),
)(SoundCard)
