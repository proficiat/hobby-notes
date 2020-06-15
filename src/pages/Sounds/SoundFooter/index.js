import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import PlaySign from 'components/PlaySign'
import PauseSign from 'components/PauseSign'

import BufferingFeedback from '../SoundList/SoundCard/BufferingFeedback'

import { Frame, PlayControls, StepMarkBox, ProgressFrame } from './styles'

class SoundFooter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
    }
  }

  render() {
    const { sound } = this.props
    const { isPlaying } = this.state
    return (
      <Frame>
        <PlayControls>
          <StepMarkBox mr="12px" prev>
            <PlaySign leftRotate size={12} strokeWidth={5} />
          </StepMarkBox>
          {isPlaying ? (
            <PauseSign size={16} strokeWidth={6} />
          ) : (
            <PlaySign size={16} strokeWidth={6} />
          )}
          <StepMarkBox ml="17px" next>
            <PlaySign size={12} strokeWidth={5} />
          </StepMarkBox>
        </PlayControls>
        <ProgressFrame>
          <BufferingFeedback soundId={get(sound, 'id', null)} />
        </ProgressFrame>
      </Frame>
    )
  }
}

SoundFooter.defaultProps = {
  // isViewerInPower: false,
}

SoundFooter.propTypes = {
  sound: PropTypes.object.isRequired,
}

export default SoundFooter
