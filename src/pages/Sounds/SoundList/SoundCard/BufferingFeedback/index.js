import React from 'react'
import PropTypes from 'prop-types'

import { FEEDBACK_ELEMENTS } from 'helpers/sounds'

import { Base, FeedbackBar, Dot } from './styles'

const BufferingFeedback = ({
  soundId,
  bgColor,
  amountColor,
  progressColor,
  dot,
}) => {
  if (!soundId) {
    return null
  }
  return (
    <Base color={bgColor}>
      <FeedbackBar color={amountColor}>
        <span className={`${FEEDBACK_ELEMENTS.buffered}-${soundId}`} />
      </FeedbackBar>
      <FeedbackBar color={progressColor}>
        <span className={`${FEEDBACK_ELEMENTS.progress}-${soundId}`}>
          {dot && <Dot color={amountColor} />}
        </span>
      </FeedbackBar>
    </Base>
  )
}

BufferingFeedback.defaultProps = {
  soundId: null,
  bgColor: '',
  amountColor: '',
  progressColor: '',
  dot: false,
}

BufferingFeedback.propTypes = {
  amountColor: PropTypes.string,
  bgColor: PropTypes.string,
  dot: PropTypes.bool,
  progressColor: PropTypes.string,
  soundId: PropTypes.string,
}

export default BufferingFeedback
