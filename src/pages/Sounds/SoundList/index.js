import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ALL_SOUNDS, UPLOAD_SOUND, UPDATE_SOUND } from 'queries/sounds'

import { withApollo } from '@apollo/client/react/hoc'
import { Mutation } from '@apollo/client/react/components'

import map from 'lodash/map'
import get from 'lodash/get'

import LogoVectorKey from 'components/Icons/LogoVectorKey'
import { getId, findIndexAndUpdateById } from 'helpers/utility'

import SoundCard from './SoundCard'
import UploadUpdateSound from './UploadUpdateSound'

import { Frame, SoundsList, VectorKey, Wrapper } from './styles'

class SoundList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isVisibleUpload: false,
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

  toggleUpload = () => {
    const { isViewerInPower } = this.props
    if (!isViewerInPower) return
    this.setState(prevState => ({
      isVisibleUpload: !prevState.isVisibleUpload,
    }))
  }

  onToggleUpdate = (soundId = null) => {
    this.setState(prevState => ({
      updateSoundId: prevState.updateSoundId === soundId ? null : soundId,
    }))
  }

  renderUploadOrUpdate = (isUpdate = false, sound = null) => {
    const { isViewerInPower } = this.props
    if (!isViewerInPower) {
      return null
    }
    const mutation = isUpdate ? UPDATE_SOUND : UPLOAD_SOUND
    return (
      <Mutation mutation={mutation} update={this.handleUpdateSounds(isUpdate)}>
        {(mutateFunction, { loading }) => {
          return (
            <UploadUpdateSound
              isLoading={loading}
              soundToEdit={sound}
              onMutateSound={mutateFunction}
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
    const { isVisibleUpload, updateSoundId } = this.state
    return (
      <Frame>
        <VectorKey>
          {isVisibleUpload && this.renderUploadOrUpdate()}
          <LogoVectorKey onClick={this.toggleUpload} />
        </VectorKey>
        <Wrapper>
          <SoundsList>
            {map(sounds, (sound, index) => {
              const soundId = getId(sound)
              const isSoundActive = !!activeSoundId && activeSoundId === soundId
              const isSoundPaused = isSoundActive ? isPaused : true
              const isUpdate = updateSoundId === soundId
              if (isUpdate) {
                return this.renderUploadOrUpdate(true, sound)
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
