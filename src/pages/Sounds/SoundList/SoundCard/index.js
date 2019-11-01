import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import {
  subscribeFrequencyBar,
  subscribeWaveForm,
} from 'helpers/audioVisualizations'

import {
  Container,
  Image,
  CardBody,
  SoundName,
  BottomBorder,
  CanvasWrapper,
} from './styles'

class SoundCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { sound, index } = this.props
    const audioUrl = get(sound, 'audioUrl')
    if (audioUrl) {
      if (index % 2 === 0) {
        subscribeFrequencyBar(
          `canvas-${sound.id}-frequency-bar`,
          `audio-${sound.id}`,
        )
      } else {
        subscribeWaveForm(`canvas-${sound.id}-waveform`, `audio-${sound.id}`)
      }
    }
  }

  render() {
    const { sound } = this.props
    const imageUrl = get(sound, 'imageUrl')
    const soundName = get(sound, 'name', '')

    return (
      <Container>
        <Image>{imageUrl && <img alt="test" src={imageUrl} />}</Image>
        <CanvasWrapper>
          <canvas id={`canvas-${sound.id}-waveform`} />
          <canvas id={`canvas-${sound.id}-frequency-bar`} />
          <CardBody>
            <SoundName>{soundName}</SoundName>
            <audio controls id={`audio-${sound.id}`}>
              <source src={get(sound, 'audioUrl')} />
              Your browser does not support the audio element.
            </audio>
            <BottomBorder />
          </CardBody>
        </CanvasWrapper>
      </Container>
    )
  }
}

SoundCard.propTypes = {
  index: PropTypes.number.isRequired,
  sound: PropTypes.object.isRequired,
}

export default SoundCard
