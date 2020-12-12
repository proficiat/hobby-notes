import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import PuzzleIcon from 'components/Icons/Puzzle'
import Track from './Track'

import { Base, Cover, PlayButton, PlaySign, PauseSign } from './styles'

class SoundCard extends PureComponent {
  handlePress = () => {
    const { sound, onSoundClick } = this.props
    const soundId = get(sound, 'id')
    onSoundClick(soundId)
  }

  render() {
    const {
      sound,
      isViewerInPower,
      isSoundPaused,
      isActive,
      onToggleUpdate,
      onSeekProgress,
    } = this.props
    const imageUrl = get(sound, 'imageUrl')
    return (
      <Base>
        <Cover onClick={this.handlePress}>
          {imageUrl ? <img alt="test" src={imageUrl} /> : <PuzzleIcon />}

          <PlayButton playing={!isSoundPaused}>
            {isSoundPaused ? <PlaySign /> : <PauseSign />}
          </PlayButton>
        </Cover>
        <Track
          isActive={isActive}
          isSoundPaused={isSoundPaused}
          isViewerInPower={isViewerInPower}
          sound={sound}
          onSeekProgress={onSeekProgress}
          onToggleUpdate={onToggleUpdate}
        />
      </Base>
    )
  }
}

SoundCard.defaultProps = {
  isViewerInPower: false,
}

SoundCard.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isSoundPaused: PropTypes.bool.isRequired,
  isViewerInPower: PropTypes.bool,
  sound: PropTypes.object.isRequired,
  onSeekProgress: PropTypes.func.isRequired,
  onSoundClick: PropTypes.func.isRequired,
  onToggleUpdate: PropTypes.func.isRequired,
}

export default SoundCard
