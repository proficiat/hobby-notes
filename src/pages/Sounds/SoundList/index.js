import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { gql } from 'apollo-boost'

import { Mutation } from 'react-apollo'

import map from 'lodash/map'

import SoundCard from './SoundCard'
import AddEditSound from './AddEditSound'

import { Container } from './styles'

const ADD_SOUND = gql`
  mutation createSound(
    $name: String!
    $imageUrl: String
    $audioUrl: String!
    $description: String
  ) {
    addSound(
      name: $name
      imageUrl: $imageUrl
      audioUrl: $audioUrl
      description: $description
    ) {
      name
      imageUrl
      audioUrl
      description
    }
  }
`

const ALL_SOUNDS = gql`
  {
    allSounds {
      name
      audioUrl
      imageUrl
      id
    }
  }
`

class SoundList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleUpdateSounds = (store, response) => {
    const dataInStore = store.readQuery({ query: ALL_SOUNDS })
    dataInStore.allSounds.push(response.data.addSound)
    store.writeQuery({
      query: ALL_SOUNDS,
      data: dataInStore,
    })
  }

  render() {
    const { sounds } = this.props
    return (
      <Container>
        <Mutation mutation={ADD_SOUND} update={this.handleUpdateSounds}>
          {addSound => <AddEditSound addSound={addSound} />}
        </Mutation>
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
