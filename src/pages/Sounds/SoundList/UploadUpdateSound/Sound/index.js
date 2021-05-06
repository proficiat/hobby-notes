/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useContext, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import { ThemeContext } from 'styles'

import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import round from 'lodash/round'

import Dropzone from 'react-dropzone'

import { drawLinearWaveForm } from 'helpers/audioVisualizations'
import { getWaveformDataPoints } from 'helpers/sounds'
import ProgressBar from './ProgressBar'

import {
  Container,
  DropzoneRoot,
  DropzonePrompt,
  WaveformImageCanvas,
} from './styles'

const Sound = ({ initWaveform, isVisible, onDropSoundFile }) => {
  const [waveform, setWaveform] = useState(initWaveform)
  const [loadingPerceent, setLoadingPercent] = useState(0)
  const waveformImageRef = useRef(null)
  const theme = useContext(ThemeContext)

  useLayoutEffect(() => {
    if (isEmpty(waveform) || !isVisible) return
    const { current } = waveformImageRef
    drawLinearWaveForm(waveform, current, theme.active, 'source-atop')
  }, [waveform, theme, isVisible])

  const handleDropSound = files => {
    const reader = new FileReader()
    const soundFile = files[0]
    reader.addEventListener('progress', event => {
      const { loaded, total } = event
      const persent = round((loaded / total) * 100)
      setLoadingPercent(persent)
    })
    reader.addEventListener('load', () => {
      const buffer = reader.result
      const audioContext = new AudioContext()
      audioContext.decodeAudioData(buffer).then(audioBuffer => {
        const waveformDataPoints = getWaveformDataPoints(audioBuffer)
        const duration = get(audioBuffer, 'duration')
        setWaveform(waveformDataPoints)
        setLoadingPercent(0)
        onDropSoundFile(soundFile, waveformDataPoints, duration)
      })
    })
    reader.readAsArrayBuffer(soundFile)
  }
  const loading = loadingPerceent !== 0
  return (
    <Container visible={isVisible}>
      <Dropzone accept="audio/*" multiple={false} onDrop={handleDropSound}>
        {({ getRootProps, getInputProps }) => (
          <DropzoneRoot
            {...getRootProps({
              className: 'dropzone',
              // onDrop: event => event.stopPropagation(),
            })}
          >
            <WaveformImageCanvas
              loading={loading || !isVisible ? 1 : 0}
              ref={waveformImageRef}
            />
            {loading && <ProgressBar percent={loadingPerceent} />}
            {isEmpty(waveform) && !loading && (
              <DropzonePrompt>
                Attach files by dragging & dropping, selecting or pasting them.
              </DropzonePrompt>
            )}

            <input {...getInputProps()} />
          </DropzoneRoot>
        )}
      </Dropzone>
    </Container>
  )
}

Sound.defaultProps = {
  initWaveform: [],
}

Sound.propTypes = {
  initWaveform: PropTypes.array,
  isVisible: PropTypes.bool.isRequired,
  onDropSoundFile: PropTypes.func.isRequired,
}

export default Sound
