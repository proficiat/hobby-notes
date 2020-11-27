import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { graphql } from '@apollo/client/react/hoc'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { GET_AUDIO_CURRENT_TIME } from 'cache'
import { getSoundDurations } from 'helpers/sounds'

import { colors } from 'styles'

import { ProgressArea, ProgressLine, TimeDuration } from './styles'
import BufferingFeedback from '../../SoundList/SoundCard/BufferingFeedback'

class TimeLine extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.progressAreaRef = React.createRef()
  }

  handleSeekProgress = event => {
    const { sound, onSeekProgress } = this.props
    const { current: progressAreaRef } = this.progressAreaRef
    const isActive = !isEmpty(sound)
    onSeekProgress(isActive, progressAreaRef, event)
  }

  render() {
    const { audioCurrentTime, sound } = this.props
    const { currentDuration, soundDuration } = getSoundDurations(
      sound,
      audioCurrentTime,
    )
    return (
      <React.Fragment>
        <TimeDuration current>{currentDuration}</TimeDuration>
        <ProgressArea
          ref={this.progressAreaRef}
          onClick={this.handleSeekProgress}
        >
          <ProgressLine>
            <BufferingFeedback
              dot
              progressColor={colors.lushLava}
              soundId={get(sound, 'id', null)}
            />
          </ProgressLine>
        </ProgressArea>
        <TimeDuration>{soundDuration}</TimeDuration>
      </React.Fragment>
    )
  }
}

TimeLine.defaultProps = {
  sound: null,
}

TimeLine.propTypes = {
  audioCurrentTime: PropTypes.number.isRequired,
  sound: PropTypes.object,
  onSeekProgress: PropTypes.func.isRequired,
}

export default graphql(GET_AUDIO_CURRENT_TIME, {
  name: 'audioCurrentTime',
  props: ({ audioCurrentTime: { audioCurrentTime } }) => ({
    audioCurrentTime,
  }),
})(TimeLine)
