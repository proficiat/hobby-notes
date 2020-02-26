import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { gql } from 'apollo-boost'

import { Mutation, withApollo } from 'react-apollo'

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
      id
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

  handleUpdateSounds = async (store, response) => {
    const { client } = this.props
    const dataInStore = store.readQuery({ query: ALL_SOUNDS })
    dataInStore.allSounds.push(response.data.addSound)
    await client.writeData({
      query: ALL_SOUNDS,
      data: { ...dataInStore },
    })
  }

  render() {
    const { sounds, isViewerInPower, onRefetchSounds } = this.props
    return (
      <Container>
        {isViewerInPower && (
          <Mutation mutation={ADD_SOUND} update={this.handleUpdateSounds}>
            {addSound => <AddEditSound addSound={addSound} />}
          </Mutation>
        )}
        {map(sounds, (sound, index) => (
          <SoundCard
            index={index}
            isViewerInPower={isViewerInPower}
            key={sound.id}
            sound={sound}
            onRefetchSounds={onRefetchSounds}
          />
        ))}
      </Container>
    )
  }
}

SoundList.defaultProps = {
  isViewerInPower: false,
}

SoundList.propTypes = {
  client: PropTypes.object.isRequired,
  isViewerInPower: PropTypes.bool,
  sounds: PropTypes.array.isRequired,
  onRefetchSounds: PropTypes.func.isRequired,
}

export default withApollo(SoundList)
