/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { colors } from 'styles'

import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import Dropzone from 'react-dropzone'

import { drawLinearWaveForm } from 'helpers/audioVisualizations'

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
    if (!isEmpty(initWaveform)) {
      const { current: waveformImageRef } = this.waveformImageRef
      drawLinearWaveForm(
        initWaveform,
        waveformImageRef,
        colors.lushLava,
        'source-atop',
      )
    }
  }

  filterData = audioBuffer => {
    const rawData = audioBuffer.getChannelData(0) // We only need to work with one channel of data
    const samples = 70 // Number of samples we want to have in our final data set
    const blockSize = Math.floor(rawData.length / samples) // the number of samples in each subdivision
    const filteredData = []
    for (let i = 0; i < samples; i += 1) {
      const blockStart = blockSize * i // the location of the first sample in the block
      let sum = 0
      for (let j = 0; j < blockSize; j += 1) {
        sum += Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
      }
      filteredData.push(sum / blockSize) // divide the sum by the block size to get the average
    }
    return filteredData
  }

  // This guarantees that the largest data point will be set to 1, and the rest of the data will scale proportionally
  normalizeData = filteredData => {
    const multiplier = Math.pow(Math.max(...filteredData), -1)
    return filteredData.map(n => n * multiplier)
  }

  handleDropSound = files => {
    const { onDropSoundFile } = this.props
    const reader = new FileReader()
    const soundFile = files[0]
    reader.addEventListener('load', () => {
      const buffer = reader.result
      const audioContext = new AudioContext()
      audioContext.decodeAudioData(buffer).then(audioBuffer => {
        const filtered = this.filterData(audioBuffer)
        const normalized = this.normalizeData(filtered) // waveform []
        const duration = get(audioBuffer, 'duration')

        const { current: waveformImageRef } = this.waveformImageRef
        drawLinearWaveForm(
          normalized,
          waveformImageRef,
          colors.lushLava,
          'source-atop',
        )
        this.setState({ waveform: normalized }, () => {
          onDropSoundFile(soundFile, normalized, duration)
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
