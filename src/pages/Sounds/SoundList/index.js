import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import map from 'lodash/map'

import SoundCard from './SoundCard'

import { Container } from './styles'

class SoundList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { sounds } = this.props
    return (
      <Container>
        {map(sounds, (sound, index) => (
          <SoundCard index={index} key={sound.id} sound={sound} />
        ))}
      </Container>
    )
  }
}

SoundList.propTypes = {
  sounds: PropTypes.array.isRequired,
}

export default SoundList
