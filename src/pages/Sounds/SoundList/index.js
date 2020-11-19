import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { gql } from 'apollo-boost'

import { Mutation, withApollo } from 'react-apollo'

import map from 'lodash/map'

import SoundCard from './SoundCard'
import AddEditSound from './AddEditSound'

import { List, Frame } from './styles'

const ADD_SOUND = gql`
  mutation createSound(
    $name: String!
    $imageUrl: String
    $audioUrl: String!
    $description: String
    $waveform: [Float]!
    $duration: Float!
    $uploadedAt: String!
  ) {
    addSound(
      name: $name
      imageUrl: $imageUrl
      audioUrl: $audioUrl
      description: $description
      waveform: $waveform
      duration: $duration
      uploadedAt: $uploadedAt
    ) {
      id
      name
      imageUrl
      audioUrl
      description
      waveform
      duration
      uploadedAt
    }
  }
`

const ALL_SOUNDS = gql`
  {
    allSounds {
      id
      name
      audioUrl
      imageUrl
      waveform
      duration
      uploadedAt
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
    const {
      activeSoundId,
      audioRef,
      sounds,
      currentTime,
      isPaused,
      isViewerInPower,
      onRefetchSounds,
      onSoundClick,
      onSeekProgress,
    } = this.props
    return (
      <Frame>
        <List>
          {isViewerInPower && (
            <Mutation mutation={ADD_SOUND} update={this.handleUpdateSounds}>
              {(addSound, { loading }) => {
                return <AddEditSound addSound={addSound} isLoading={loading} />
              }}
            </Mutation>
          )}
          {map(sounds, (sound, index) => {
            const isSoundActive = !!activeSoundId && activeSoundId === sound.id
            const isSoundPaused = isSoundActive ? isPaused : true
            return (
              <SoundCard
                audioRef={audioRef}
                currentTime={isSoundActive ? currentTime : 0}
                index={index}
                isActive={isSoundActive}
                isSoundPaused={isSoundPaused}
                isViewerInPower={isViewerInPower}
                key={sound.id}
                sound={sound}
                onRefetchSounds={onRefetchSounds}
                onSeekProgress={onSeekProgress}
                onSoundClick={onSoundClick}
              />
            )
          })}
        </List>
      </Frame>
    )
  }
}

SoundList.defaultProps = {
  isViewerInPower: false,
  activeSoundId: '',
  audioRef: null,
  sounds: [],
}

SoundList.propTypes = {
  activeSoundId: PropTypes.string,
  audioRef: PropTypes.object,
  client: PropTypes.object.isRequired,
  currentTime: PropTypes.number.isRequired,
  isPaused: PropTypes.bool.isRequired,
  isViewerInPower: PropTypes.bool,
  sounds: PropTypes.array,
  onRefetchSounds: PropTypes.func.isRequired,
  onSeekProgress: PropTypes.func.isRequired,
  onSoundClick: PropTypes.func.isRequired,
}

export default withApollo(SoundList)
