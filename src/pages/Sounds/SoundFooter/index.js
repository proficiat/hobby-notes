import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import PlaySign from 'components/Icons/PlaySign'
import PauseSign from 'components/Icons/PauseSign'

import VolumeSlider from './VolumeSlider'
import Timeline from './Timeline'

import {
  Frame,
  PlayControls,
  StepMarkBox,
  SoundFrame,
  StyledRepeatIcon,
  StyledShuffleIcon,
} from './styles'

class SoundFooter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handlePlayPress = () => {
    const { sound, onSoundClick } = this.props
    const soundId = get(sound, 'id')
    onSoundClick(soundId)
  }

  render() {
    const {
      sound,
      isPaused,
      isRepeat,
      isShuffle,
      onChangeAudioVolume,
      onSwitchSound,
      onToggleRepeatOrShuffle,
      onSeekProgress,
    } = this.props
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
            <StepMarkBox ml="14px" next onClick={onSwitchSound()}>
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
          <Timeline sound={sound} onSeekProgress={onSeekProgress} />
          <VolumeSlider onChangeAudioVolume={onChangeAudioVolume} />
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
  isPaused: PropTypes.bool.isRequired,
  isRepeat: PropTypes.bool.isRequired,
  isShuffle: PropTypes.bool.isRequired,
  sound: PropTypes.object,
  onChangeAudioVolume: PropTypes.func.isRequired,
  onSeekProgress: PropTypes.func.isRequired,
  onSoundClick: PropTypes.func.isRequired,
  onSwitchSound: PropTypes.func.isRequired,
  onToggleRepeatOrShuffle: PropTypes.func.isRequired,
}

export default SoundFooter
