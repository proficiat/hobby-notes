import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// import { gql } from 'apollo-boost'

import get from 'lodash/get'
// import isEmpty from 'lodash/isEmpty'

import AddEdit from './AddEditSound'
import SoundList from './SoundList'

class Sounds extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isAddEdit: false,
    }
  }

  toggleAddEdit = () =>
    this.setState(prevState => ({ isAddEdit: !prevState.isAddEdit }))

  render() {
    const { sounds, addSound } = this.props
    const soundsData = get(sounds, 'data.allSounds', [])
    const { isAddEdit } = this.state
    if (isAddEdit) {
      return <AddEdit addSound={addSound} />
    }
    return <SoundList sounds={soundsData} />
  }
}

Sounds.propTypes = {
  addSound: PropTypes.func.isRequired,
  sounds: PropTypes.object.isRequired,
}

export default Sounds
