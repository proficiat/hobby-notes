import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { compose } from 'recompose'
import { graphql } from '@apollo/client/react/hoc'
import { ALL_SOUNDS } from 'queries/sounds'

import { GET_IS_USER_LOGGED_IN, GET_HEADER_SEARCH_VALUE } from 'cache'
import { findActiveSound, findActiveSoundIndex } from 'helpers/sounds'

import get from 'lodash/get'
import shuffle from 'lodash/shuffle'
import map from 'lodash/map'
import indexOf from 'lodash/indexOf'
import filter from 'lodash/filter'
import includes from 'lodash/includes'

import Spinner from 'components/Icons/Spinner'

import SoundList from './SoundList'
import SoundFooter from './SoundFooter'
import Audio from './Audio'

import { ListsBase } from './styles'

class Sounds extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPaused: true,
      activeSoundId: null,
      isRepeat: false,
      isShuffle: false,
      shuffleIds: [],
    }
    this.audioRef = React.createRef()
  }

  setInitSoundId = () => {
    const { allSounds } = this.props
    const { isShuffle, shuffleIds } = this.state
    const initSoundId = isShuffle
      ? shuffleIds[0]
      : get(allSounds, '[0].id', null)
    if (initSoundId) {
      this.handleSwitchSoundId(initSoundId)
    }
  }

  setIsPaused = (isActive, isNewSound) => {
    const { current: audioRef } = this.audioRef
    if (audioRef) {
      let isSoundPaused = false
      if (audioRef.isPaused() || !isActive) {
        isSoundPaused = true
      }
      this.setState({ isPaused: !isSoundPaused }, () => {
        if (isSoundPaused && !isNewSound) {
          audioRef.play()
        } else {
          audioRef.pause()
        }
      })
    } else {
      this.setState({ isPaused: false })
    }
  }

  onSoundClick = soundId => {
    const { activeSoundId } = this.state
    if (!soundId) {
      this.setInitSoundId()
    }
    const isActive = soundId && activeSoundId === soundId
    const isNewSound = soundId && activeSoundId !== soundId
    this.setIsPaused(isActive, isNewSound)

    if (isNewSound) {
      this.handleSwitchSoundId(soundId)
    }
  }

  onSwitchSound = (isPrevious = false, isAutoSwitch = false) => e => {
    const { allSounds } = this.props
    const { isShuffle, shuffleIds } = this.state
    const lastSoundIndex = allSounds.length - 1
    if (lastSoundIndex <= 0) {
      return
    }
    const { activeSoundId } = this.state
    let soundIndex = isShuffle
      ? indexOf(shuffleIds, activeSoundId)
      : findActiveSoundIndex(activeSoundId, allSounds)
    soundIndex = isPrevious ? soundIndex - 1 : soundIndex + 1
    if (soundIndex > lastSoundIndex) {
      soundIndex = 0
    } else if (soundIndex < 0) {
      soundIndex = lastSoundIndex
    }
    const nextSoundId = isShuffle
      ? shuffleIds[soundIndex]
      : get(allSounds[soundIndex], 'id')
    this.handleSwitchSoundId(nextSoundId, isAutoSwitch)
  }

  onChangeAudioVolume = volumeFraction => {
    const { current: audioRef } = this.audioRef
    if (audioRef) {
      audioRef.setVolume(volumeFraction)
    }
  }

  onToggleRepeatOrShuffle = (isRepeat = false) => e => {
    const { allSounds } = this.props
    const soundsIds = map(allSounds, 'id')
    this.setState(prevState => ({
      isRepeat: isRepeat ? !prevState.isRepeat : false,
      isShuffle: !isRepeat ? !prevState.isShuffle : false,
      shuffleIds: !(isRepeat && prevState.isShuffle)
        ? shuffle(soundsIds)
        : soundsIds,
    }))
  }

  handleReloadSound = () => {
    const { current: audioRef } = this.audioRef
    audioRef.pause()
    audioRef.load()
    audioRef.play()
  }

  handleSwitchSoundId = (soundId, isAutoSwitch = false) => {
    const { isRepeat } = this.state
    if (!soundId) return
    if (isRepeat && isAutoSwitch) {
      this.handleReloadSound()
    } else {
      this.setState({ activeSoundId: soundId }, () => {
        this.handleReloadSound()
      })
    }
  }

  handleSearchSounds = () => {
    const { allSounds, headerSearchValue } = this.props
    if (headerSearchValue === '') {
      return allSounds
    }
    return filter(allSounds, sound => {
      const soundName = get(sound, 'name', '').toLowerCase()
      return includes(soundName, headerSearchValue.toLowerCase())
    })
  }

  render() {
    const { allSounds, isSoundsLoading, isViewerInPower } = this.props
    const { activeSoundId, isPaused, isRepeat, isShuffle } = this.state
    const sound = findActiveSound(activeSoundId, allSounds)
    return (
      <React.Fragment>
        {!isSoundsLoading && (
          <ListsBase>
            <SoundList
              activeSoundId={activeSoundId}
              isPaused={isPaused}
              isViewerInPower={isViewerInPower}
              sounds={this.handleSearchSounds()}
              onSeekProgress={get(
                this.audioRef,
                'current.seekProgress',
                () => {},
              )}
              onSoundClick={this.onSoundClick}
            />
          </ListsBase>
        )}
        {isSoundsLoading && <Spinner />}
        <Audio
          ref={this.audioRef}
          sound={sound}
          onSwitchSound={this.onSwitchSound}
        />
        <SoundFooter
          isPaused={isPaused}
          isRepeat={isRepeat}
          isShuffle={isShuffle}
          sound={sound}
          onChangeAudioVolume={this.onChangeAudioVolume}
          onSeekProgress={get(this.audioRef, 'current.seekProgress', () => {})}
          onSoundClick={this.onSoundClick}
          onSwitchSound={this.onSwitchSound}
          onToggleRepeatOrShuffle={this.onToggleRepeatOrShuffle}
        />
      </React.Fragment>
    )
  }
}

Sounds.defaultProps = {
  isViewerInPower: false,
  allSounds: [],
  headerSearchValue: '',
}

Sounds.propTypes = {
  allSounds: PropTypes.array,
  headerSearchValue: PropTypes.string,
  isSoundsLoading: PropTypes.bool.isRequired,
  isViewerInPower: PropTypes.bool,
}

export default compose(
  graphql(ALL_SOUNDS, {
    name: 'allSounds',
    options: {
      fetchPolicy: 'network-only',
    },
    props: ({ allSounds: { refetch, allSounds, loading } }) => ({
      allSounds,
      isSoundsLoading: loading,
      onRefetchSounds: () => refetch(),
    }),
  }),
  graphql(GET_IS_USER_LOGGED_IN, {
    name: 'isViewerInPower',
    props: ({ isViewerInPower: { isViewerInPower } }) => ({
      isViewerInPower,
    }),
  }),
  graphql(GET_HEADER_SEARCH_VALUE, {
    name: 'headerSearchValue',
    props: ({ headerSearchValue: { headerSearchValue } }) => ({
      headerSearchValue,
    }),
  }),
)(Sounds)
