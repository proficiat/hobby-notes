import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { gql } from '@apollo/client'

import { withApollo } from '@apollo/client/react/hoc'
import { Mutation } from '@apollo/client/react/components'

import map from 'lodash/map'
import get from 'lodash/get'

import LogoVectorKey from 'components/Icons/LogoVectorKey'
import { getId, findIndexAndUpdateById } from 'helpers/utility'

import SoundCard from './SoundCard'
import AddEditSound from './AddEditSound'

import { Frame, SoundsList, VectorKey, Wrapper } from './styles'

const UPDATE_SOUND = gql`
  mutation updateSound(
    $id: String!
    $name: String!
    $imageUrl: String
    $audioUrl: String
    $description: String
    $waveform: [Float]
    $duration: Float
  ) {
    updateSound(
      id: $id
      name: $name
      imageUrl: $imageUrl
      audioUrl: $audioUrl
      description: $description
      waveform: $waveform
      duration: $duration
    ) {
      id
      name
      imageUrl
      audioUrl
      description
      waveform
      duration
    }
  }
`

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
    this.state = {
      isVisibleAdd: false,
      updateSoundId: null,
    }
  }

  handleUpdateSounds = isUpdate => async (store, response) => {
    const { client } = this.props
    const dataInStore = store.readQuery({ query: ALL_SOUNDS })
    const allSounds = [...get(dataInStore, 'allSounds', [])]

    const responseSound = isUpdate
      ? response.data.updateSound
      : response.data.addSound

    if (isUpdate) {
      const { updateSoundId } = this.state
      findIndexAndUpdateById(allSounds, responseSound)
      const responseSoundId = getId(responseSound)
      if (updateSoundId === responseSoundId) {
        this.onToggleUpdate(responseSoundId)
      }
    } else {
      allSounds.push(responseSound)
    }
    await client.writeQuery({
      query: ALL_SOUNDS,
      data: { allSounds },
    })
  }

  toggleAdd = () => {
    const { isViewerInPower } = this.props
    if (!isViewerInPower) return
    this.setState(prevState => ({ isVisibleAdd: !prevState.isVisibleAdd }))
  }

  onToggleUpdate = (soundId = null) => {
    this.setState(prevState => ({
      updateSoundId: prevState.updateSoundId === soundId ? null : soundId,
    }))
  }

  renderAddUpdate = (isUpdate = false, sound = null) => {
    const { isViewerInPower } = this.props
    if (!isViewerInPower) {
      return null
    }
    const mutation = isUpdate ? UPDATE_SOUND : ADD_SOUND
    return (
      <Mutation mutation={mutation} update={this.handleUpdateSounds(isUpdate)}>
        {(addSound, { loading }) => {
          return (
            <AddEditSound
              addSound={addSound}
              isLoading={loading}
              soundToEdit={sound}
            />
          )
        }}
      </Mutation>
    )
  }

  render() {
    const {
      activeSoundId,
      audioRef,
      sounds,
      isPaused,
      isViewerInPower,
      onRefetchSounds,
      onSoundClick,
      onSeekProgress,
    } = this.props
    const { isVisibleAdd, updateSoundId } = this.state
    return (
      <Frame>
        <VectorKey>
          {isVisibleAdd && this.renderAddUpdate()}
          <LogoVectorKey onClick={this.toggleAdd} />
        </VectorKey>
        <Wrapper>
          <SoundsList>
            {map(sounds, (sound, index) => {
              const soundId = getId(sound)
              const isSoundActive = !!activeSoundId && activeSoundId === soundId
              const isSoundPaused = isSoundActive ? isPaused : true
              const isUpdate = updateSoundId === soundId
              if (isUpdate) {
                return this.renderAddUpdate(true, sound)
              }
              return (
                <SoundCard
                  audioRef={audioRef}
                  index={index}
                  isActive={isSoundActive}
                  isSoundPaused={isSoundPaused}
                  isViewerInPower={isViewerInPower}
                  key={soundId}
                  sound={sound}
                  onRefetchSounds={onRefetchSounds}
                  onSeekProgress={onSeekProgress}
                  onSoundClick={onSoundClick}
                  onToggleUpdate={this.onToggleUpdate}
                />
              )
            })}
          </SoundsList>
        </Wrapper>
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
  isPaused: PropTypes.bool.isRequired,
  isViewerInPower: PropTypes.bool,
  sounds: PropTypes.array,
  onRefetchSounds: PropTypes.func.isRequired,
  onSeekProgress: PropTypes.func.isRequired,
  onSoundClick: PropTypes.func.isRequired,
}

export default withApollo(SoundList)
