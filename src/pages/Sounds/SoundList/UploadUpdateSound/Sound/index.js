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
  StyledCogIcon,
  DropzonePrompt,
  WaveformImageCanvas,
  WaveformWrapper,
} from './styles'
import { AbsoluteTopCircle } from '../styles'

class Sound extends PureComponent {
  constructor(props) {
    super(props)
    const { initWaveformData } = props
    this.state = {
      soundFile: null,
      waveformData: initWaveformData,
      soundDuration: null,
    }
    this.waveformImageRef = React.createRef()
  }

  componentDidMount() {
    const { initWaveformData } = this.props
    if (!isEmpty(initWaveformData)) {
      const { current: waveformImageRef } = this.waveformImageRef
      drawLinearWaveForm(
        initWaveformData,
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
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const buffer = reader.result
      const audioContext = new AudioContext()
      audioContext.decodeAudioData(buffer).then(audioBuffer => {
        const filtered = this.filterData(audioBuffer)
        const normalized = this.normalizeData(filtered)
        const duration = get(audioBuffer, 'duration')
        this.setState({ waveformData: normalized, soundDuration: duration })
        const { current: waveformImageRef } = this.waveformImageRef
        drawLinearWaveForm(
          normalized,
          waveformImageRef,
          colors.lushLava,
          'source-atop',
        )
      })
    })
    const soundFile = files[0]
    this.setState({ soundFile })
    reader.readAsArrayBuffer(soundFile)
  }

  handleClickCog = () => {
    const { onDescriptionSwitch } = this.props
    const { soundFile, waveformData, soundDuration } = this.state
    onDescriptionSwitch(soundFile, waveformData, soundDuration)
  }

  render() {
    const { waveformData } = this.state
    const { isVisible } = this.props
    if (!isVisible) {
      return null
    }
    const isAvailableWaveform = !isEmpty(waveformData)
    return (
      <Container>
        {isAvailableWaveform && (
          <AbsoluteTopCircle onClick={this.handleClickCog}>
            <StyledCogIcon size={24} />
          </AbsoluteTopCircle>
        )}
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
              {isAvailableWaveform ? (
                <WaveformWrapper>
                  <WaveformImageCanvas ref={this.waveformImageRef} />
                </WaveformWrapper>
              ) : (
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
  initWaveformData: [],
}

Sound.propTypes = {
  initWaveformData: PropTypes.array,
  isVisible: PropTypes.bool.isRequired,
  onDescriptionSwitch: PropTypes.func.isRequired,
}

export default Sound
