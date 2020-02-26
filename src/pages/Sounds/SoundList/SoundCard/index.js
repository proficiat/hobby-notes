import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import { Duration } from 'luxon'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

import { subscribeWaveForm } from 'helpers/audioVisualizations'

import WaveformData from 'waveform-data'

import BufferingFeedback from './BufferingFeedback'

import {
  Container,
  Cover,
  AbsoluteCoat,
  MiddleInfo,
  Track,
  WaveformCanvas,
  PlayButton,
  PlaySign,
  PauseSign,
  WaveformImageCanvas,
} from './styles'

const DELETE_SOUND = gql`
  mutation deleteSound($id: String!) {
    deleteSound(id: $id) {
      id
      name
    }
  }
`

class SoundCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPaused: true,
      currentTime: 0,
    }
    this.audioRef = null
    this.trackRef = null
    this.waveformRef = null
    this.waveformImageRef = null
  }

  componentDidMount() {
    const { sound } = this.props
    if (this.audioRef && sound.audioUrl) {
      const audioContext = new AudioContext()
      fetch(sound.audioUrl)
        .then(response => response.arrayBuffer())
        .then(buffer => {
          const options = {
            audio_context: audioContext,
            array_buffer: buffer,
            scale: 512,
            // split_channels: true,
          }

          return new Promise((resolve, reject) => {
            WaveformData.createFromAudio(options, (err, waveform) => {
              if (err) {
                reject(err)
              } else {
                resolve(waveform)
              }
            })
          })
        })
        .then(waveform => {
          const resampled = waveform.resample({ width: 800 })
          const channel = resampled.channel(0)
          const maxArray = channel.max_array()
          this.drawWaves(maxArray)
        })

      this.audioRef.addEventListener('timeupdate', event => {
        const currentTime = get(event, 'target.currentTime', 0)
        this.setState({ currentTime })
      })
      this.audioRef.addEventListener('progress', () => {
        try {
          const { duration } = this.audioRef
          if (duration > 0) {
            const { buffered, currentTime } = this.audioRef
            for (let i = 0; i < buffered.length; i += 1) {
              if (buffered.start(buffered.length - 1 - i) < currentTime) {
                document.getElementById(
                  `buffered-amount-${sound.id}`,
                ).style.width = `${(buffered.end(buffered.length - 1 - i) /
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
        const { duration, currentTime } = this.audioRef
        if (duration > 0) {
          document.getElementById(
            `progress-amount-${sound.id}`,
          ).style.width = `${(currentTime / duration) * 100}%`
        }
      })

      if (this.waveformRef) {
        subscribeWaveForm(this.waveformRef, this.audioRef)
      }
    }
  }

  drawWaves = data => {
    const canvas = this.waveformImageRef
    const ctx = canvas.getContext('2d')
    const step = 3 // 2 points for line, 1 for space
    const width = data.length * step
    let maxY = 0

    ctx.fillStyle = '#c3002f'

    // find max height
    for (let i = 0; i < data.length; i += 1) if (data[i] > maxY) maxY = data[i]

    ctx.transform(
      canvas.width / width,
      0,
      0,
      -canvas.height / maxY,
      0,
      canvas.height,
    ) // scale horizontally and flip coordinate system

    for (let i = 0; i < data.length; i += 1) ctx.rect(i * step, 0, 2, data[i])

    ctx.fill()
  }

  addAudioRef = ref => {
    this.audioRef = ref
  }

  addTrackRef = ref => {
    this.trackRef = ref
  }

  addWaveFormRef = ref => {
    this.waveformRef = ref
  }

  addWaveformImageRef = ref => {
    this.waveformImageRef = ref
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
      if (this.trackRef) {
        const percentWidth =
          (event.clientX - this.trackRef.offsetLeft) / this.trackRef.offsetWidth
        if (this.audioRef) {
          this.audioRef.currentTime = percentWidth * this.audioRef.duration
        }
      }
    } catch (error) {
      //
    }
  }

  handleDeleteSound = (store, response) => {
    const { onRefetchSounds } = this.props
    onRefetchSounds()
  }

  render() {
    const { sound, isViewerInPower } = this.props
    const { isPaused } = this.state
    const soundId = get(sound, 'id')
    const imageUrl = get(sound, 'imageUrl')
    const soundName = get(sound, 'name', '')

    return (
      <Container>
        <Cover onClick={this.handlePress}>
          {imageUrl && <img alt="test" src={imageUrl} />}
          <PlayButton playing={!isPaused}>
            {isPaused ? <PlaySign /> : <PauseSign />}
          </PlayButton>
        </Cover>
        <Track
          playing={!isPaused}
          ref={this.addTrackRef}
          onClick={this.handleSeekClick}
        >
          <BufferingFeedback soundId={soundId} />
          <WaveformCanvas ref={this.addWaveFormRef} />
          <WaveformImageCanvas ref={this.addWaveformImageRef} />
          <AbsoluteCoat>
            <MiddleInfo>
              {isPaused ? soundName : this.getSoundDuration()}
              {isViewerInPower && (
                <Mutation
                  mutation={DELETE_SOUND}
                  update={this.handleDeleteSound}
                >
                  {deleteSound => (
                    <button
                      type="button"
                      onClick={e => deleteSound({ variables: { id: soundId } })}
                    >
                      DELETE
                    </button>
                  )}
                </Mutation>
              )}
            </MiddleInfo>
          </AbsoluteCoat>
        </Track>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio ref={this.addAudioRef}>
          <source src={get(sound, 'audioUrl')} />
        </audio>
      </Container>
    )
  }
}

SoundCard.defaultProps = {
  isViewerInPower: false,
}

SoundCard.propTypes = {
  isViewerInPower: PropTypes.bool,
  sound: PropTypes.object.isRequired,
  onRefetchSounds: PropTypes.func.isRequired,
}

export default SoundCard
