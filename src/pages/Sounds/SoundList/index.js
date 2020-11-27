import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { gql } from '@apollo/client'

import { graphql, withApollo } from '@apollo/client/react/hoc'
import { Mutation } from '@apollo/client/react/components'

import { GET_AUDIO_CURRENT_TIME } from 'cache'

import map from 'lodash/map'

import LogoVectorKey from 'components/Icons/LogoVectorKey'

import SoundCard from './SoundCard'
import AddEditSound from './AddEditSound'

import { Frame, SoundsList, VectorKey, Wrapper } from './styles'

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
    }
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

  toggleAdd = () => {
    const { isViewerInPower } = this.props
    if (!isViewerInPower) return
    this.setState(prevState => ({ isVisibleAdd: !prevState.isVisibleAdd }))
  }

  render() {
    const {
      activeSoundId,
      audioRef,
      audioCurrentTime,
      sounds,
      isPaused,
      isViewerInPower,
      onRefetchSounds,
      onSoundClick,
      onSeekProgress,
    } = this.props
    const { isVisibleAdd } = this.state
    return (
      <Frame>
        <VectorKey>
          {isViewerInPower && isVisibleAdd && (
            <Mutation mutation={ADD_SOUND} update={this.handleUpdateSounds}>
              {(addSound, { loading }) => {
                return <AddEditSound addSound={addSound} isLoading={loading} />
              }}
            </Mutation>
          )}
          <LogoVectorKey onClick={this.toggleAdd} />
        </VectorKey>
        <Wrapper>
          <SoundsList>
            {map(sounds, (sound, index) => {
              const isSoundActive =
                !!activeSoundId && activeSoundId === sound.id
              const isSoundPaused = isSoundActive ? isPaused : true
              return (
                <SoundCard
                  audioRef={audioRef}
                  currentTime={isSoundActive ? audioCurrentTime : 0}
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
  audioCurrentTime: PropTypes.number.isRequired,
  audioRef: PropTypes.object,
  client: PropTypes.object.isRequired,
  isPaused: PropTypes.bool.isRequired,
  isViewerInPower: PropTypes.bool,
  sounds: PropTypes.array,
  onRefetchSounds: PropTypes.func.isRequired,
  onSeekProgress: PropTypes.func.isRequired,
  onSoundClick: PropTypes.func.isRequired,
}

export default graphql(GET_AUDIO_CURRENT_TIME, {
  name: 'audioCurrentTime',
  props: ({ audioCurrentTime: { audioCurrentTime } }) => ({
    audioCurrentTime,
  }),
})(withApollo(SoundList))
