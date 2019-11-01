import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import forEach from 'lodash/forEach'

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
    const { sound } = this.props
    const audioUrl = get(sound, 'audioUrl')
    if (audioUrl) {
      const audio = document.getElementById(`audio-${sound.id}`)
      audio.src = audioUrl
      audio.crossOrigin = 'anonymous'
      const context = new AudioContext()
      const src = context.createMediaElementSource(audio)
      const analyser = context.createAnalyser()
      const canvas = document.getElementById(`canvas-${sound.id}`)

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const ctx = canvas.getContext('2d')

      src.connect(analyser)
      analyser.connect(context.destination)

      analyser.fftSize = 256

      const bufferLength = analyser.frequencyBinCount

      const dataArray = new Uint8Array(bufferLength)

      const WIDTH = canvas.width
      const HEIGHT = canvas.height

      const barWidth = (WIDTH / bufferLength) * 4

      let x = 0

      const renderFrame = () => {
        requestAnimationFrame(renderFrame)
        x = 0
        analyser.getByteFrequencyData(dataArray)
        ctx.fillStyle = '#f7f8fa'
        ctx.fillRect(0, 0, WIDTH, HEIGHT)
        ctx.fillStyle = '#b3e3b5'
        forEach(dataArray, barHeight => {
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)
          x += barWidth + 1
        })
      }
      renderFrame()
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
          <canvas id={`canvas-${sound.id}`} />
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
  sound: PropTypes.object.isRequired,
}

export default SoundCard
