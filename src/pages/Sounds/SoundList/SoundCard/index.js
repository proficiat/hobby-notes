import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import { Duration } from 'luxon'

import {
  subscribeFrequencyBar,
  subscribeWaveForm,
} from 'helpers/audioVisualizations'

import BufferingFeedback from './BufferingFeedback'

import { Container, Image, CardBody, SoundName, CanvasWrapper } from './styles'

class SoundCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPaused: true,
      currentTime: 0,
    }
    this.audioRef = null
    this.seekRef = null
  }

  componentDidMount() {
    const { sound, index } = this.props
    const audioUrl = get(sound, 'audioUrl')
    const myAudio = document.getElementById(`audio-${sound.id}`)
    if (this.audioRef) {
      this.audioRef.addEventListener('timeupdate', event => {
        const currentTime = get(event, 'target.currentTime', 0)
        this.setState({ currentTime })
      })
      this.audioRef.addEventListener('progress', () => {
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
      this.audioRef.addEventListener('timeupdate', () => {
        const { duration } = myAudio
        if (duration > 0) {
          document.getElementById(
            `progress-amount-${sound.id}`,
          ).style.width = `${(myAudio.currentTime / duration) * 100}%`
        }
      })
    }

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

  addAudioRef = ref => {
    this.audioRef = ref
  }

  addSeekRef = ref => {
    this.seekRef = ref
  }

  getSoundDuration = () => {
    const { currentTime } = this.state
    const soundDuration = get(this.audioRef, 'duration', 0)
    const currentTimeDuration = Duration.fromObject({
      seconds: currentTime,
    }).toFormat('mm:ss')
    const totalTimeDuration = Duration.fromObject({
      seconds: soundDuration,
    }).toFormat('mm:ss')
    return `${currentTimeDuration} / ${totalTimeDuration}`
  }

  handlePress = () => {
    if (this.audioRef) {
      if (this.audioRef.paused) {
        this.setState({ isPaused: false }, () => this.audioRef.play())
      } else {
        this.setState({ isPaused: true }, () => this.audioRef.pause())
      }
    }
  }

  handleSeekClick = event => {
    try {
      if (this.seekRef) {
        const percentWidth =
          (event.clientX - this.seekRef.offsetLeft) / this.seekRef.offsetWidth
        if (this.audioRef) {
          this.audioRef.currentTime = percentWidth * this.audioRef.duration
        }
      }
    } catch (error) {
      //
    }
  }

  render() {
    const { sound } = this.props
    const { isPaused } = this.state
    const soundId = get(sound, 'id')
    const imageUrl = get(sound, 'imageUrl')
    const soundName = get(sound, 'name', '')

    return (
      <Container>
        <Image onClick={this.handlePress}>
          {imageUrl && <img alt="test" src={imageUrl} />}
        </Image>
        <CanvasWrapper ref={this.addSeekRef} onClick={this.handleSeekClick}>
          <BufferingFeedback soundId={soundId} />
          <canvas id={`canvas-${sound.id}-waveform`} />
          <canvas id={`canvas-${sound.id}-frequency-bar`} />
          <CardBody>
            <SoundName>
              {isPaused ? soundName : this.getSoundDuration()}
            </SoundName>
            <audio id={`audio-${sound.id}`} ref={this.addAudioRef}>
              <source src={get(sound, 'audioUrl')} />
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
