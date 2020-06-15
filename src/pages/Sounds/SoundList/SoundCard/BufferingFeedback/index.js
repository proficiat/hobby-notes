import React from 'react'
import PropTypes from 'prop-types'

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
      <FeedbackBar color="#B4D0E7">
        <span className={`progress-amount-${soundId}`} />
      </FeedbackBar>
    </Base>
  )
}

BufferingFeedback.propTypes = {
  soundId: PropTypes.string.isRequired,
}

export default BufferingFeedback
