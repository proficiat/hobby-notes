import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import { Container, Image, CardBody, SoundName, BottomBorder } from './styles'

class SoundCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { sound } = this.props
    const imageUrl = get(sound, 'imageUrl')
    const soundName = get(sound, 'name', '')

    return (
      <Container>
        <Image>{imageUrl && <img alt="test" src={imageUrl} />}</Image>
        <CardBody>
          <SoundName>{soundName}</SoundName>
          <audio controls>
            <source src={get(sound, 'audioUrl')} />
            Your browser does not support the audio element.
          </audio>
          <BottomBorder />
        </CardBody>
      </Container>
    )
  }
}

SoundCard.propTypes = {
  sound: PropTypes.object.isRequired,
}

export default SoundCard
