/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import Dropzone from 'react-dropzone'

import {
  Container,
  DropzoneRoot,
  StyledCogIcon,
  DropzonePrompt,
} from './styles'
import { AbsoluteTopCircle } from '../styles'

class Sound extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      soundFile: null,
      waveformData: [],
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
        this.setState({ waveformData: normalized })
      })
    })
    const soundFile = files[0]
    this.setState({ soundFile })
    reader.readAsArrayBuffer(soundFile)
  }

  handleClickCog = () => {
    const { onDescriptionSwitch } = this.props
    const { soundFile, waveformData } = this.state
    onDescriptionSwitch(soundFile, waveformData)
  }

  render() {
    const { waveformData } = this.state
    return (
      <Container>
        {!isEmpty(waveformData) && (
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
              <DropzonePrompt>
                Attach files by dragging & dropping, selecting or pasting them.
              </DropzonePrompt>

              <input {...getInputProps()} />
            </DropzoneRoot>
          )}
        </Dropzone>
      </Container>
    )
  }
}

Sound.propTypes = {
  onDescriptionSwitch: PropTypes.func.isRequired,
}

export default Sound
