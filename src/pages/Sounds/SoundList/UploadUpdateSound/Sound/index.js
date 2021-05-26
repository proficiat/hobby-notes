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

const Sound = React.memo(({ waveform, isVisible, onDropSoundFile }) => {
  const [loadingPerceent, setLoadingPercent] = useState(0)
  const waveformImageRef = useRef(null)
  const theme = useContext(ThemeContext)

  useLayoutEffect(() => {
    if (!isVisible) return
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
        onDropSoundFile(soundFile, waveformDataPoints, duration)
        setLoadingPercent(0)
      })
    })
    reader.readAsArrayBuffer(soundFile)
  }

  const isLoading = loadingPerceent !== 0

  if (!isVisible) {
    return null
  }
  return (
    <Container>
      <Dropzone accept="audio/*" multiple={false} onDrop={handleDropSound}>
        {({ getRootProps, getInputProps }) => (
          <DropzoneRoot
            {...getRootProps({
              className: 'dropzone',
              // onDrop: event => event.stopPropagation(),
            })}
          >
            <WaveformImageCanvas
              loading={isLoading ? 1 : 0}
              ref={waveformImageRef}
            />
            {isLoading && <ProgressBar percent={loadingPerceent} />}
            {isEmpty(waveform) && !isLoading && (
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
})

Sound.defaultProps = {
  waveform: [],
}

Sound.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  waveform: PropTypes.array,
  onDropSoundFile: PropTypes.func.isRequired,
}

export default Sound
