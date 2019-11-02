import React from 'react'
import PropTypes from 'prop-types'

import { Container, FeedbackBar } from './styles'

const BufferingFeedback = ({ soundId }) => {
  if (!soundId) {
    return null
  }
  return (
    <Container>
      <FeedbackBar>
        <span id={`buffered-amount-${soundId}`} />
      </FeedbackBar>
      <FeedbackBar color="#B4D0E7">
        <span id={`progress-amount-${soundId}`} />
      </FeedbackBar>
    </Container>
  )
}

BufferingFeedback.propTypes = {
  soundId: PropTypes.string.isRequired,
}

export default BufferingFeedback
