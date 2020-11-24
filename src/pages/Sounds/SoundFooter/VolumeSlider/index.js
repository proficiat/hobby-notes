import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

// import get from 'lodash/get'
import round from 'lodash/round'

import PropTypes from 'prop-types'
import {
  Frame,
  StyledVolumeHeightIcon,
  AbsoluteFrame,
  BaseVolumeHeight,
  ActiveVolumeHeight,
  Point,
  ABSOLUTE_FRAME_VERTICAL_PADDING,
} from './styles'

class VolumeSlider extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.activeVolumeHeight = React.createRef()
    this.absoluteFrame = React.createRef()
    this.frame = React.createRef()
  }

  handleClickSlider = event => {
    const { onChangeAudioVolume } = this.props
    const { current: frameRef } = this.frame
    const { current: absoluteFrameRef } = this.absoluteFrame
    const { current: activeVolumeHeightRef } = this.activeVolumeHeight
    // frame.offsetTop - distance of frame relative to the top (~980px)
    // minus bottom padding of absolute frame. Gets 0 if clicked bottom of activeVolumeeFramee
    // minus vertical coordinates on viewport at which the event occurred
    const updatedActiveVolumeHeight =
      frameRef.offsetTop - ABSOLUTE_FRAME_VERTICAL_PADDING - event.clientY
    const baseVolumeHeight =
      absoluteFrameRef.offsetHeight - ABSOLUTE_FRAME_VERTICAL_PADDING * 2
    // represents a part of a whole or, more generally, any number of equal parts.
    let fraction = round(updatedActiveVolumeHeight / baseVolumeHeight, 1)
    if (fraction < 0) {
      fraction = 0
    } else if (fraction > 1) {
      fraction = 1
    }
    let percent = fraction * 100
    if (percent < 0) {
      percent = 0
    } else if (percent > 100) {
      percent = 100
    }
    activeVolumeHeightRef.style.height = `${percent}%`
    onChangeAudioVolume(fraction)
  }

  render() {
    return (
      <Frame ref={this.frame}>
        <StyledVolumeHeightIcon size={22} />
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
