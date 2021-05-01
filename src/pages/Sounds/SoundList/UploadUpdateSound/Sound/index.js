/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { colors } from 'styles'

import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import Dropzone from 'react-dropzone'

import { drawLinearWaveForm } from 'helpers/audioVisualizations'
import { getWaveformDataPoints } from 'helpers/sounds'

import {
  Container,
  DropzoneRoot,
  DropzonePrompt,
  WaveformImageCanvas,
} from './styles'

class Sound extends PureComponent {
  constructor(props) {
    super(props)
    const { initWaveform } = props
    this.state = {
      waveform: initWaveform,
    }
    this.waveformImageRef = React.createRef()
  }

  componentDidMount() {
    const { initWaveform } = this.props
    this.drawWaveform(initWaveform)
  }

  drawWaveform = waveform => {
    const { current: waveformImageRef } = this.waveformImageRef
    if (isEmpty(waveform)) return
    drawLinearWaveForm(
      waveform,
      waveformImageRef,
      colors.westSide,
      'source-atop',
    )
  }

  handleDropSound = files => {
    const { onDropSoundFile } = this.props
    const reader = new FileReader()
    const soundFile = files[0]
    reader.addEventListener('load', () => {
      const buffer = reader.result
      const audioContext = new AudioContext()
      audioContext.decodeAudioData(buffer).then(audioBuffer => {
        const waveform = getWaveformDataPoints(audioBuffer)
        const duration = get(audioBuffer, 'duration')
        this.drawWaveform(waveform)
        this.setState({ waveform }, () => {
          onDropSoundFile(soundFile, waveform, duration)
        })
      })
    })
    reader.readAsArrayBuffer(soundFile)
  }

  render() {
    const { waveform } = this.state
    const { isVisible } = this.props
    const isEmptyWaveform = isEmpty(waveform)
    return (
      <Container visible={isVisible}>
        <Dropzone
          accept="audio/*"
          multiple={false}
          onDrop={this.handleDropSound}
        >
          {({ getRootProps, getInputProps }) => (
            <DropzoneRoot
              {...getRootProps({
                className: 'dropzone',
                // onDrop: event => event.stopPropagation(),
              })}
            >
              <WaveformImageCanvas ref={this.waveformImageRef} />
              {isEmptyWaveform && (
                <DropzonePrompt>
                  Attach files by dragging & dropping, selecting or pasting
                  them.
                </DropzonePrompt>
              )}

              <input {...getInputProps()} />
            </DropzoneRoot>
          )}
        </Dropzone>
      </Container>
    )
  }
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
