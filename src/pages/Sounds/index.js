import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

import { compose } from 'recompose'

import Spinner from 'components/Icons/Spinner'

import get from 'lodash/get'
import memoize from 'lodash/memoize'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import findIndex from 'lodash/findIndex'
import shuffle from 'lodash/shuffle'
import map from 'lodash/map'
import indexOf from 'lodash/indexOf'

import SoundList from './SoundList'
// import GroupsList from './GroupsList'
import SoundFooter from './SoundFooter'

import { ListsBase } from './styles'

const findActiveSound = memoize((activeSoundId, sounds) =>
  find(sounds, sound => get(sound, 'id') === activeSoundId),
)

const findActiveSoundIndex = memoize((activeSoundId, sounds) =>
  findIndex(sounds, ['id', activeSoundId]),
)

class Sounds extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPaused: true,
      activeSoundId: null,
      currentTime: 0,
      isRepeat: false,
      isShuffle: false,
      shuffleIds: [],
    }
    this.audioRef = React.createRef()
  }

  componentDidMount() {
    const { current: audioRef } = this.audioRef
    if (audioRef) {
      audioRef.addEventListener('timeupdate', this.handleSoundTimeUpdate)
      audioRef.addEventListener('progress', this.handleSoundProgress)
    }
  }

  componentWillUnmount() {
    const { current: audioRef } = this.audioRef
    if (audioRef) {
      audioRef.removeEventListener('progress', this.handleSoundProgress, false)
      audioRef.removeEventListener(
        'timeupdate',
        this.handleSoundTimeUpdate,
        false,
      )
    }
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
      if (audioRef.paused || !isActive) {
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

  onSeekProgress = (isActive, progressBarRef, event) => {
    const { current: audioRef } = this.audioRef
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

  handleSoundProgress = () => {
    try {
      const { activeSoundId } = this.state
      const { current: audioRef } = this.audioRef
      const duration = get(audioRef, 'duration')
      if (duration > 0 && activeSoundId) {
        const buffered = get(audioRef, 'buffered')
        const currentTime = get(audioRef, 'currentTime')
        for (let i = 0; i < buffered.length; i += 1) {
          if (buffered.start(buffered.length - 1 - i) < currentTime) {
            const amountElements = document.getElementsByClassName(
              `buffered-amount-${activeSoundId}`,
            )
            forEach(amountElements, element => {
              element.style.width = `${(buffered.end(buffered.length - 1 - i) /
                duration) *
                100}%`
            })
            break
          }
        }
      }
    } catch (e) {
      //
    }
  }

  handleSoundTimeUpdate = event => {
    try {
      const { activeSoundId } = this.state
      const { current: audioRef } = this.audioRef
      this.setState({ currentTime: get(event, 'target.currentTime', 0) })
      const duration = get(audioRef, 'duration')
      const currentTime = get(audioRef, 'currentTime')
      if (activeSoundId && duration > 0) {
        const filledInterest = (currentTime / duration) * 100
        const progressElements = document.getElementsByClassName(
          `progress-amount-${activeSoundId}`,
        )
        forEach(progressElements, element => {
          element.style.width = `${filledInterest}%`
        })
        if (filledInterest >= 100) {
          this.onSwitchSound(false, true)()
        }
      }
    } catch (e) {
      //
    }
  }

  render() {
    const {
      allSounds,
      isSoundsLoading,
      isViewerInPower,
      onRefetchSounds,
    } = this.props
    const {
      currentTime,
      activeSoundId,
      isPaused,
      isRepeat,
      isShuffle,
    } = this.state
    const sound = findActiveSound(activeSoundId, allSounds)

    return (
      <React.Fragment>
        {!isSoundsLoading && (
          <ListsBase>
            {/* <GroupsList /> */}
            <SoundList
              activeSoundId={activeSoundId}
              audioRef={this.audioRef.current}
              currentTime={currentTime}
              isPaused={isPaused}
              isViewerInPower={isViewerInPower}
              sounds={allSounds}
              onRefetchSounds={onRefetchSounds}
              onSeekProgress={this.onSeekProgress}
              onSoundClick={this.onSoundClick}
            />
          </ListsBase>
        )}
        {isSoundsLoading && <Spinner />}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio crossOrigin="anonymous" ref={this.audioRef}>
          <source src={get(sound, 'audioUrl')} />
        </audio>
        <SoundFooter
          currentTime={currentTime}
          isPaused={isPaused}
          isRepeat={isRepeat}
          isShuffle={isShuffle}
          sound={sound}
          onSeekProgress={this.onSeekProgress}
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
}

Sounds.propTypes = {
  allSounds: PropTypes.array,
  isSoundsLoading: PropTypes.bool.isRequired,
  isViewerInPower: PropTypes.bool,
  onRefetchSounds: PropTypes.func.isRequired,
}

export default compose(
  graphql(
    gql`
      {
        allSounds {
          name
          audioUrl
          imageUrl
          waveform
          id
          duration
          uploadedAt
        }
      }
    `,
    {
      name: 'allSounds',
      props: ({ allSounds: { refetch, allSounds, loading } }) => ({
        allSounds,
        isSoundsLoading: loading,
        onRefetchSounds: () => refetch(),
      }),
    },
  ),
  graphql(
    gql`
      query IsUserLoggedIn {
        isViewerInPower @client
      }
    `,
    {
      name: 'isViewerInPower',
      props: ({ isViewerInPower: { isViewerInPower } }) => ({
        isViewerInPower,
      }),
    },
  ),
)(Sounds)
