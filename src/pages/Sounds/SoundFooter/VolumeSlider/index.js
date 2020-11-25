import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// import get from 'lodash/get'
import round from 'lodash/round'

import { DEFAULT_AUDIO_VOLUME } from 'helpers/sounds'

import {
  Frame,
  StyledVolumeHeightIcon,
  AbsoluteFrame,
  BaseVolumeHeight,
  ActiveVolumeHeight,
  Point,
  ABSOLUTE_FRAME_VERTICAL_PADDING,
  StyledVolumeLowIcon,
  StyledVolumeOffIcon,
} from './styles'

const VOLUME_STATE = {
  default: 'default',
  low: 'low',
  off: 'off',
}

const getVolumeStateByPercent = percent => {
  let volumeState
  if (percent === 0) {
    volumeState = VOLUME_STATE.off
  } else if (percent < 50) {
    volumeState = VOLUME_STATE.low
  } else {
    volumeState = VOLUME_STATE.default
  }
  return volumeState
}

const roundByInterval = (number, min = 0, max = 1) => {
  if (number < min) {
    return min
  }
  if (number > max) {
    return max
  }
  return number
}

const getPercentHeight = fraction => {
  const percent = fraction * 100
  return roundByInterval(percent, 0, 100)
}

class VolumeSlider extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      volumeState: VOLUME_STATE.default,
      savedFraction: DEFAULT_AUDIO_VOLUME,
    }
    this.activeVolumeHeight = React.createRef()
    this.absoluteFrame = React.createRef()
    this.frame = React.createRef()
  }

  setActiveVolumeHeight = fraction => {
    const { onChangeAudioVolume } = this.props
    const { current: activeVolumeHeightRef } = this.activeVolumeHeight
    const percentVolumeHeight = getPercentHeight(fraction)
    onChangeAudioVolume(fraction)
    activeVolumeHeightRef.style.height = `${percentVolumeHeight}%`
  }

  toggleVolumeIcon = () => {
    const { volumeState, savedFraction } = this.state
    const isVolumeOn =
      volumeState === VOLUME_STATE.default || volumeState === VOLUME_STATE.low
    if (isVolumeOn) {
      this.setState({ volumeState: VOLUME_STATE.off }, () => {
        this.setActiveVolumeHeight(0)
      })
    } else {
      this.setState(
        {
          volumeState:
            savedFraction >= 0.5 ? VOLUME_STATE.default : VOLUME_STATE.low,
        },
        () => {
          this.setActiveVolumeHeight(savedFraction)
        },
      )
    }
  }

  handleClickSlider = event => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    const { current: frameRef } = this.frame
    const { current: absoluteFrameRef } = this.absoluteFrame
    // frame.offsetTop - distance of frame relative to the top (~980px)
    // minus bottom padding of absolute frame. Gets 0 if clicked bottom of activeVolumeeFramee
    // minus vertical coordinates on viewport at which the event occurred
    const updatedActiveVolumeHeight =
      frameRef.offsetTop - ABSOLUTE_FRAME_VERTICAL_PADDING - event.clientY
    const baseVolumeHeight =
      absoluteFrameRef.offsetHeight - ABSOLUTE_FRAME_VERTICAL_PADDING * 2
    // represents a part of a whole or, more generally, any number of equal parts.
    let fraction = round(updatedActiveVolumeHeight / baseVolumeHeight, 1)
    fraction = roundByInterval(fraction)
    const percentVolumeHeight = getPercentHeight(fraction)

    this.setState(
      {
        savedFraction: fraction,
        volumeState: getVolumeStateByPercent(percentVolumeHeight),
      },
      () => {
        this.setActiveVolumeHeight(fraction)
      },
    )
  }

  renderVolumeIcon = () => {
    const { volumeState } = this.state
    const { low, off } = VOLUME_STATE
    switch (volumeState) {
      case low:
        return <StyledVolumeLowIcon />
      case off:
        return <StyledVolumeOffIcon />
      default:
        return <StyledVolumeHeightIcon />
    }
  }

  render() {
    return (
      <Frame ref={this.frame} onClick={this.toggleVolumeIcon}>
        {this.renderVolumeIcon()}
        <AbsoluteFrame
          ref={this.absoluteFrame}
          onClick={this.handleClickSlider}
        >
          <BaseVolumeHeight>
            <ActiveVolumeHeight ref={this.activeVolumeHeight}>
              <Point />
            </ActiveVolumeHeight>
          </BaseVolumeHeight>
        </AbsoluteFrame>
      </Frame>
    )
  }
}

VolumeSlider.defaultProps = {}

VolumeSlider.propTypes = {
  onChangeAudioVolume: PropTypes.func.isRequired,
}

export default VolumeSlider
