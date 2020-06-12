import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

import { compose } from 'recompose'

import Spinner from 'components/Spinner'

import get from 'lodash/get'
import memoize from 'lodash/memoize'
import find from 'lodash/find'

import SoundList from './SoundList'
import SoundFooter from './SoundFooter'

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
    if (this.audioRef.current) {
      this.audioRef.current.addEventListener(
        'timeupdate',
        this.handleSoundTimeUpdate,
      )
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { activeSoundId } = this.state
    if (activeSoundId !== prevState.activeSoundId) {
      if (this.audioRef.current) {
        if (prevState.activeSoundId) {
          this.audioRef.current.removeEventListener(
            'progress',
            this.handleSoundProgress,
            false,
          )
        }
        if (activeSoundId) {
          this.audioRef.current.addEventListener(
            'progress',
            this.handleSoundProgress,
          )
        }
      }
    }
  }

  componentWillUnmount() {
    const { activeSoundId } = this.state
    if (this.audioRef.current) {
      if (activeSoundId) {
        this.audioRef.current.removeEventListener(
          'progress',
          this.handleSoundProgress,
          false,
        )
      }
      this.audioRef.current.removeEventListener(
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
      const { duration } = this.audioRef
      if (duration > 0 && activeSoundId) {
        const { buffered, currentTime } = this.audioRef
        for (let i = 0; i < buffered.length; i += 1) {
          if (buffered.start(buffered.length - 1 - i) < currentTime) {
            document.getElementById(
              `buffered-amount-${activeSoundId}`,
            ).style.width = `${(buffered.end(buffered.length - 1 - i) /
              duration) *
              100}%`
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
    this.setState({ currentTime: get(event, 'target.currentTime', 0) })
    const { duration, currentTime } = this.audioRef
    if (activeSoundId && duration > 0) {
      document.getElementById(
        `progress-amount-${activeSoundId}`,
      ).style.width = `${(currentTime / duration) * 100}%`
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
        <SoundList
          activeSoundId={activeSoundId}
          audioRef={this.audioRef.current}
          currentTime={currentTime}
          isViewerInPower={isViewerInPower}
          sounds={allSounds}
          onRefetchSounds={onRefetchSounds}
          onSoundClick={this.onSoundClick}
        />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio crossOrigin="anonymous" ref={this.audioRef}>
          <source src={get(sound, 'audioUrl')} />
        </audio>
        <SoundFooter sound={sound} />
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
