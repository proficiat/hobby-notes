/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import { DEFAULT_AUDIO_VOLUME } from 'helpers/sounds'

import { audioCurrentTimeVar } from 'cache'

import { getId } from 'helpers/utility'

import get from 'lodash/get'
import forEach from 'lodash/forEach'

let prevSoundId = null
let playingTime = 0
let countInterval = null
// eslint-disable-next-line no-unused-vars
const countPlay = (soundId, duration) => {
  if (prevSoundId !== soundId) {
    if (playingTime) {
      const filled = (playingTime / duration) * 100
      if (filled >= 80) {
        // console.log('count + 1')
      }
    }
    if (countInterval) {
      clearInterval(countInterval)
    }
    prevSoundId = soundId
    playingTime = 0
    countInterval = setInterval(() => {
      playingTime += 1
    }, 1000)
  }
}

const Audio = React.forwardRef((props, ref) => {
  const { sound, onSwitchSound } = props
  const soundId = getId(sound)
  const audioUrl = get(sound, 'audioUrl', '')

  useEffect(() => {
    const { current } = ref
    if (current) {
      current.volume = DEFAULT_AUDIO_VOLUME
    }
  }, [ref])

  const handleTimeUpdate = event => {
    const { target } = event
    const currentTime = get(target, 'currentTime', 0)
    const duration = get(target, 'duration', 0)

    audioCurrentTimeVar(currentTime)
    // countPlay(activeSoundId, duration)

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
    const { current } = ref
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
  }, [ref, soundId])

  return (
    <audio crossOrigin="anonymous" ref={ref} onTimeUpdate={handleTimeUpdate}>
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
