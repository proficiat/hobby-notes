/* eslint-disable jsx-a11y/media-has-caption */
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
} from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import { DEFAULT_AUDIO_VOLUME } from 'helpers/sounds'
import { UPDATE_SOUND } from 'queries/sounds'

import { audioCurrentTimeVar } from 'cache'

import { getId } from 'helpers/utility'

import get from 'lodash/get'
import forEach from 'lodash/forEach'

const INIT_PLAYING_DATA = {
  playingTime: 0,
  prevCurrentTime: 0,
}

const Audio = React.forwardRef((props, ref) => {
  const audioRef = useRef(null)
  const playingData = useRef({ ...INIT_PLAYING_DATA })
  const { sound, onSwitchSound } = props
  const soundId = getId(sound)
  const audioUrl = get(sound, 'audioUrl', '')

  const [updatePlayedCount] = useMutation(UPDATE_SOUND, {
    variables: {
      id: soundId,
      played: 1,
    },
  })

  useEffect(() => {
    const { current } = audioRef
    if (current) {
      current.volume = DEFAULT_AUDIO_VOLUME
    }
  }, [])

  useEffect(() => {
    if (soundId) {
      playingData.current = { ...INIT_PLAYING_DATA }
    }
  }, [soundId])

  useImperativeHandle(ref, () => ({
    pause: () => {
      audioRef.current.pause()
    },
    load: () => {
      audioRef.current.load()
    },
    play: () => {
      audioRef.current.play()
    },
    setVolume: volume => {
      audioRef.current.volume = volume
    },
    isPaused: () => audioRef.current.paused,
    seekProgress: (isActive, progressBarRef, event) => {
      if (!isActive) {
        return
      }
      try {
        if (progressBarRef) {
          const percentWidth =
            (event.clientX - progressBarRef.offsetLeft) /
            progressBarRef.offsetWidth
          const { current } = audioRef
          if (current) {
            current.currentTime = percentWidth * current.duration
          }
        }
      } catch (error) {
        //
      }
    },
  }))

  const handleTimeUpdate = event => {
    const { target } = event
    const currentTime = get(target, 'currentTime', 0)
    const duration = get(target, 'duration', 0)

    const { current } = playingData
    const currentTimeDiff = currentTime - current.prevCurrentTime
    current.prevCurrentTime = currentTime
    if (currentTimeDiff > 0 && currentTimeDiff < 1) {
      current.playingTime += currentTimeDiff
      const filled = (current.playingTime / duration) * 100
      if (filled >= 80) {
        playingData.current = { ...INIT_PLAYING_DATA }
        updatePlayedCount()
          .then(res => {})
          .catch(e => {})
      }
    }

    audioCurrentTimeVar(currentTime)

    const filledInterest = (currentTime / duration) * 100
    const progressElements = document.getElementsByClassName(
      `progress-amount-${soundId}`,
    )
    forEach(progressElements, element => {
      element.style.width = `${filledInterest}%`
    })
    if (filledInterest >= 100) {
      onSwitchSound(false, true)()
    }
  }

  useLayoutEffect(() => {
    const { current } = audioRef
    const handleProgress = event => {
      const { target } = event
      const currentTime = get(target, 'currentTime', 0)
      const duration = get(target, 'duration', 0)
      // https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges
      const buffered = get(target, 'buffered', [])
      for (let i = 0; i < buffered.length; i += 1) {
        if (buffered.start(buffered.length - 1 - i) < currentTime) {
          const amountElements = document.getElementsByClassName(
            `buffered-amount-${soundId}`,
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
    if (current && soundId) {
      // The progress event is fired periodically as the browser loads a resource.
      current.addEventListener('progress', handleProgress, {
        passive: true,
      })
      //
    }
    return () => {
      current.removeEventListener('progress', handleProgress, {
        passive: true,
      })
    }
  }, [soundId])

  return (
    <audio
      crossOrigin="anonymous"
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
    >
      <source src={audioUrl} />
    </audio>
  )
})

Audio.defaultProps = {
  sound: null,
}

Audio.propTypes = {
  sound: PropTypes.object,
  onSwitchSound: PropTypes.func.isRequired,
}

export default Audio
