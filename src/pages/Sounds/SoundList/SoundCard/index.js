import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import PuzzleIcon from 'components/Icons/Puzzle'
import Track from './Track'

import {
  Base,
  Cover,
  PlayButton,
  PlaySign,
  PauseSign,
  ActiveSound,
  ActiveSoundName,
} from './styles'

const SoundCard = ({
  sound,
  isViewerInPower,
  isSoundPaused,
  isActive,
  onToggleUpdate,
  onSeekProgress,
  onSoundClick,
}) => {
  const cardRef = useRef(null)
  const handlePress = () => {
    const soundId = get(sound, 'id')
    onSoundClick(soundId)
  }

  const handleClickActive = () => {
    const { current } = cardRef
    if (current) {
      current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }

  const imageUrl = get(sound, 'imageUrl')
  return (
    <Base ref={cardRef}>
      {isActive &&
        ReactDOM.createPortal(
          <ActiveSound onClick={handleClickActive}>
            {imageUrl ? (
              <img alt="test" src={imageUrl} />
            ) : (
              <PuzzleIcon color="white" shadow={false} size={28} />
            )}
            <ActiveSoundName>{get(sound, 'name')}</ActiveSoundName>
          </ActiveSound>,
          document.getElementById('activeSound'),
        )}
      <Cover onClick={handlePress}>
        {imageUrl ? (
          <img alt="test" src={imageUrl} />
        ) : (
          <PuzzleIcon shadow={false} />
        )}

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
