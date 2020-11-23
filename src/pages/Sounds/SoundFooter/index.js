import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { colors } from 'styles'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import PlaySign from 'components/PlaySign'
import PauseSign from 'components/PauseSign'

import { getSoundDurations } from 'helpers/sounds'

import BufferingFeedback from '../SoundList/SoundCard/BufferingFeedback'

import {
  Frame,
  PlayControls,
  StepMarkBox,
  ProgressLine,
  TimeDuration,
  SoundFrame,
  ProgressArea,
  StyledRepeatIcon,
  StyledShuffleIcon,
} from './styles'

class SoundFooter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.progressAreaRef = React.createRef()
  }

  handlePlayPress = () => {
    const { sound, onSoundClick } = this.props
    const soundId = get(sound, 'id')
    onSoundClick(soundId)
  }

  handleSeekProgress = event => {
    const { sound, onSeekProgress } = this.props
    const { current: progressAreaRef } = this.progressAreaRef
    const isActive = !isEmpty(sound)
    onSeekProgress(isActive, progressAreaRef, event)
  }

  render() {
    const {
      sound,
      currentTime,
      isPaused,
      isRepeat,
      isShuffle,
      onSwitchSound,
      onToggleRepeatOrShuffle,
    } = this.props
    const { currentDuration, soundDuration } = getSoundDurations(
      sound,
      currentTime,
    )
    return (
      <Frame>
        <SoundFrame>
          <PlayControls>
            <StepMarkBox mr="12px" prev onClick={onSwitchSound(true)}>
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
            <StepMarkBox ml="17px" next onClick={onSwitchSound()}>
              <PlaySign size={12} strokeWidth={5} />
            </StepMarkBox>
            <StyledRepeatIcon
              active={isRepeat}
              size={22}
              onClick={onToggleRepeatOrShuffle(true)}
            />
            <StyledShuffleIcon
              active={isShuffle}
              size={22}
              onClick={onToggleRepeatOrShuffle(false)}
            />
          </PlayControls>
          <TimeDuration current>{currentDuration}</TimeDuration>
          <ProgressArea
            ref={this.progressAreaRef}
            onClick={this.handleSeekProgress}
          >
            <ProgressLine>
              <BufferingFeedback
                dot
                progressColor={colors.lushLava}
                soundId={get(sound, 'id', null)}
              />
            </ProgressLine>
          </ProgressArea>
          <TimeDuration>{soundDuration}</TimeDuration>
        </SoundFrame>
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
  isRepeat: PropTypes.bool.isRequired,
  isShuffle: PropTypes.bool.isRequired,
  sound: PropTypes.object,
  onSeekProgress: PropTypes.func.isRequired,
  onSoundClick: PropTypes.func.isRequired,
  onSwitchSound: PropTypes.func.isRequired,
  onToggleRepeatOrShuffle: PropTypes.func.isRequired,
}

export default SoundFooter
