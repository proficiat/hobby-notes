import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { colors } from 'styles'

import {
  // subscribeWaveForm,
  drawLinearWaveForm,
  // drawWaveFormBars,
} from 'helpers/audioVisualizations'
import { getSoundDurations } from 'helpers/sounds'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { Base, WaveformImageCanvas, WaveformProgressBar } from './styles'

import CurrentDuration from './CurrentDuration'
import BufferingFeedback from '../../BufferingFeedback'

class Timeline extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.progressBarRef = React.createRef()
    this.waveformRef = React.createRef()
    this.waveformImageRef = React.createRef()
  }

  componentDidMount() {
    const { sound } = this.props
    const { current: waveformImageRef } = this.waveformImageRef
    const waveform = get(sound, 'waveform', [])
    if (waveformImageRef && !isEmpty(waveform)) {
      drawLinearWaveForm(waveform, waveformImageRef)
      // drawWaveFormBars(waveform, waveformImageRef)
    }
  }

  handleSeekProgress = event => {
    const { isActive, onSeekProgress } = this.props
    const { current: progressBarRef } = this.progressBarRef
    onSeekProgress(isActive, progressBarRef, event)
  }

  render() {
    const { sound, isActive } = this.props
    const soundId = get(sound, 'id')
    const { soundDuration } = getSoundDurations(sound)
    return (
      <Base>
        {isActive && <CurrentDuration />}
        <WaveformProgressBar
          ref={this.progressBarRef}
          onClick={this.handleSeekProgress}
        >
          <BufferingFeedback
            amountColor={colors.suicidePreventionBlue}
            bgColor={colors.luciaLash}
            progressColor={colors.lushLava}
            soundId={soundId}
          />
          <WaveformImageCanvas
            id={`canvasImage${soundId}`}
            ref={this.waveformImageRef}
          />
        </WaveformProgressBar>
        {soundDuration}
      </Base>
    )
  }
}

Timeline.propTypes = {
  isActive: PropTypes.bool.isRequired,
  sound: PropTypes.object.isRequired,
  onSeekProgress: PropTypes.func.isRequired,
}

export default Timeline
