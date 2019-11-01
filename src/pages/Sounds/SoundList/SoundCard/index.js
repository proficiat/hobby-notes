import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import {
  subscribeFrequencyBar,
  subscribeWaveForm,
} from 'helpers/audioVisualizations'

import BufferingFeedback from './BufferingFeedback'

import {
  Container,
  Image,
  CardBody,
  SoundName,
  // BottomBorder,
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
    const myAudio = document.getElementById(`audio-${sound.id}`)
    myAudio.addEventListener('progress', () => {
      try {
        const { duration } = myAudio
        if (duration > 0) {
          for (let i = 0; i < myAudio.buffered.length; i += 1) {
            if (
              myAudio.buffered.start(myAudio.buffered.length - 1 - i) <
              myAudio.currentTime
            ) {
              document.getElementById(
                `buffered-amount-${sound.id}`,
              ).style.width = `${(myAudio.buffered.end(
                myAudio.buffered.length - 1 - i,
              ) /
                duration) *
                100}%`
              break
            }
          }
        }
      } catch (e) {
        //
      }
    })

    myAudio.addEventListener('timeupdate', () => {
      const { duration } = myAudio
      if (duration > 0) {
        document.getElementById(
          `progress-amount-${sound.id}`,
        ).style.width = `${(myAudio.currentTime / duration) * 100}%`
      }
    })

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
    const soundId = get(sound, 'id')
    const imageUrl = get(sound, 'imageUrl')
    const soundName = get(sound, 'name', '')

    return (
      <Container>
        <Image>{imageUrl && <img alt="test" src={imageUrl} />}</Image>
        <CanvasWrapper>
          <BufferingFeedback soundId={soundId} />
          <canvas id={`canvas-${sound.id}-waveform`} />
          <canvas id={`canvas-${sound.id}-frequency-bar`} />
          <CardBody>
            <SoundName>{soundName}</SoundName>
            <audio controls id={`audio-${sound.id}`}>
              <source src={get(sound, 'audioUrl')} />
              Your browser does not support the audio element.
            </audio>
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
