import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import PlaySign from 'components/PlaySign'
import PauseSign from 'components/PauseSign'

import { getSoundDurations } from 'helpers/sounds'

import BufferingFeedback from '../SoundList/SoundCard/BufferingFeedback'

import {
  Frame,
  PlayControls,
  StepMarkBox,
  ProgressFrame,
  TimeDuration,
} from './styles'

class SoundFooter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handlePlayPress = () => {
    const { sound, onSoundClick } = this.props
    const soundId = get(sound, 'id')
    if (soundId) {
      onSoundClick(soundId)
    }
  }

  render() {
    const { sound, currentTime, isPaused } = this.props
    const { currentDuration, soundDuration } = getSoundDurations(
      sound,
      currentTime,
    )
    return (
      <Frame>
        <PlayControls>
          <StepMarkBox mr="12px" prev>
            <PlaySign leftRotate size={12} strokeWidth={5} />
          </StepMarkBox>
          {isPaused ? (
            <PlaySign
              size={16}
              strokeWidth={6}
              onClick={this.handlePlayPress}
            />
          ) : (
            <PauseSign
              size={16}
              strokeWidth={6}
              onClick={this.handlePlayPress}
            />
          )}
          <StepMarkBox ml="17px" next>
            <PlaySign size={12} strokeWidth={5} />
          </StepMarkBox>
        </PlayControls>
        <TimeDuration current>{currentDuration}</TimeDuration>
        <ProgressFrame>
          <BufferingFeedback soundId={get(sound, 'id', null)} />
        </ProgressFrame>
        <TimeDuration>{soundDuration}</TimeDuration>
      </Frame>
    )
  }
}

SoundFooter.defaultProps = {
  // isViewerInPower: false,
  sound: null,
}

SoundFooter.propTypes = {
  currentTime: PropTypes.number.isRequired,
  isPaused: PropTypes.bool.isRequired,
  sound: PropTypes.object,
  onSoundClick: PropTypes.func.isRequired,
}

export default SoundFooter
