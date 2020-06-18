import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

import { compose } from 'recompose'

import Spinner from 'components/Spinner'

import get from 'lodash/get'
import memoize from 'lodash/memoize'
import find from 'lodash/find'
import forEach from 'lodash/forEach'

import SoundList from './SoundList'
import GroupsList from './GroupsList'
import SoundFooter from './SoundFooter'

import { ListsBase } from './styles'

const findActiveSound = memoize((activeSoundId, sounds) =>
  find(sounds, sound => get(sound, 'id') === activeSoundId),
)

class Sounds extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeSoundId: null,
      currentTime: 0,
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

  onSoundClick = soundId => {
    const { activeSoundId } = this.state
    if (soundId && activeSoundId !== soundId) {
      this.setState({ activeSoundId: soundId }, () => {
        this.audioRef.current.load()
        this.audioRef.current.play()
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
    const { activeSoundId } = this.state
    const { current: audioRef } = this.audioRef
    this.setState({ currentTime: get(event, 'target.currentTime', 0) })
    const duration = get(audioRef, 'duration')
    const currentTime = get(audioRef, 'currentTime')
    if (activeSoundId && duration > 0) {
      const progressElements = document.getElementsByClassName(
        `progress-amount-${activeSoundId}`,
      )
      forEach(progressElements, element => {
        element.style.width = `${(currentTime / duration) * 100}%`
      })
    }
  }

  render() {
    const {
      allSounds,
      isSoundsLoading,
      isViewerInPower,
      onRefetchSounds,
    } = this.props
    const { currentTime, activeSoundId } = this.state
    const sound = findActiveSound(activeSoundId, allSounds)

    if (isSoundsLoading) {
      return <Spinner />
    }

    return (
      <React.Fragment>
        <ListsBase>
          <GroupsList />
          <SoundList
            activeSoundId={activeSoundId}
            audioRef={this.audioRef.current}
            currentTime={currentTime}
            isViewerInPower={isViewerInPower}
            sounds={allSounds}
            onRefetchSounds={onRefetchSounds}
            onSoundClick={this.onSoundClick}
          />
        </ListsBase>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio crossOrigin="anonymous" ref={this.audioRef}>
          <source src={get(sound, 'audioUrl')} />
        </audio>
        <SoundFooter currentTime={currentTime} sound={sound} />
      </React.Fragment>
    )
  }
}

Sounds.defaultProps = {
  isViewerInPower: false,
}

Sounds.propTypes = {
  allSounds: PropTypes.array.isRequired,
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
