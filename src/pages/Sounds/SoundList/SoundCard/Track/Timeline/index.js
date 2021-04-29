import React, { useRef, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { ThemeContext } from 'styles'

import {
  // subscribeWaveForm,
  drawLinearWaveForm,
  // drawWaveFormBars,
} from 'helpers/audioVisualizations'
import { getSoundDurations } from 'helpers/sounds'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { Base, WaveformImageCanvas, WaveformProgressBar } from './styles'

import CurrentDuration from './CurrentDuration'
import BufferingFeedback from '../../BufferingFeedback'

const Timeline = ({ isActive, sound, onSeekProgress }) => {
  const progressBarRef = useRef(null)
  const waveformImageRef = useRef(null)
  const theme = useContext(ThemeContext)

  useEffect(() => {
    const { current } = waveformImageRef
    const waveform = get(sound, 'waveform', [])
    if (waveformImageRef && !isEmpty(waveform)) {
      drawLinearWaveForm(waveform, current, theme.background)
      // drawWaveFormBars(waveform, waveformImageRef)
    }
  }, [theme])

  const handleSeekProgress = event => {
    const { current } = progressBarRef
    onSeekProgress(isActive, current, event)
  }

  const soundId = get(sound, 'id')
  const { soundDuration } = getSoundDurations(sound)
  return (
    <Base>
      {isActive && <CurrentDuration />}
      <WaveformProgressBar ref={progressBarRef} onClick={handleSeekProgress}>
        <BufferingFeedback
          amountColor={theme.waveform.amount}
          bgColor={theme.waveform.bg}
          progressColor={theme.waveform.progress}
          soundId={soundId}
        />
        <WaveformImageCanvas
          id={`canvasImage${soundId}`}
          ref={waveformImageRef}
        />
      </WaveformProgressBar>
      {soundDuration}
    </Base>
  )
}

Timeline.propTypes = {
  isActive: PropTypes.bool.isRequired,
  sound: PropTypes.object.isRequired,
  onSeekProgress: PropTypes.func.isRequired,
}

export default Timeline
