import React from 'react'
import PropTypes from 'prop-types'

import { colors } from 'styles'

import { Base, FeedbackBar } from './styles'

const BufferingFeedback = ({
  soundId,
  bgColor,
  amountColor,
  progressColor,
}) => {
  if (!soundId) {
    return null
  }
  return (
    <Base color={bgColor}>
      <FeedbackBar color={amountColor}>
        <span className={`buffered-amount-${soundId}`} />
      </FeedbackBar>
      <FeedbackBar color={progressColor}>
        <span className={`progress-amount-${soundId}`} />
      </FeedbackBar>
    </Base>
  )
}

BufferingFeedback.defaultProps = {
  soundId: null,
  bgColor: '',
  amountColor: '',
  progressColor: '',
}

BufferingFeedback.propTypes = {
  amountColor: PropTypes.string,
  bgColor: PropTypes.string,
  progressColor: PropTypes.string,
  soundId: PropTypes.string,
}

export default BufferingFeedback
