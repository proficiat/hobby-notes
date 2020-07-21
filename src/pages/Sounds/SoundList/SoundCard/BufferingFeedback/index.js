import React from 'react'
import PropTypes from 'prop-types'

import { colors } from 'styles'

import { Base, FeedbackBar } from './styles'

const BufferingFeedback = ({ soundId }) => {
  if (!soundId) {
    return null
  }
  return (
    <Base>
      <FeedbackBar>
        <span className={`buffered-amount-${soundId}`} />
      </FeedbackBar>
      <FeedbackBar color={colors.red}>
        <span className={`progress-amount-${soundId}`} />
      </FeedbackBar>
    </Base>
  )
}

BufferingFeedback.defaultProps = {
  soundId: null,
}

BufferingFeedback.propTypes = {
  soundId: PropTypes.string,
}

export default BufferingFeedback
