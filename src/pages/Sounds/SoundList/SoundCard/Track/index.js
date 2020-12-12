import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useMutation } from '@apollo/client'

import get from 'lodash/get'
import filter from 'lodash/filter'

import { getId } from 'helpers/utility'
import { DELETE_SOUND, ALL_SOUNDS } from 'queries/sounds'

import Spinner from 'components/Icons/Spinner'
import SettingsPopover from './SettingsPopover'
import Timeline from './Timeline'

import { Base, TrackHeader, ErrorMessage } from './styles'

const Track = ({
  isActive,
  sound,
  isSoundPaused,
  isViewerInPower,
  onToggleUpdate,
  onSeekProgress,
}) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const soundId = getId(sound)
  const soundName = get(sound, 'name', '')

  const handleError = error => {
    const errorGQLMessage =
      get(error, 'graphQLErrors[0].message') ||
      get(error, 'networkError.message')
    if (errorGQLMessage) {
      setErrorMessage(errorGQLMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
    }
  }

  const [onDeleteSound, { loading: isSoundDeleting }] = useMutation(
    DELETE_SOUND,
    {
      variables: {
        id: soundId,
      },
      onError: handleError,
      update(cache, { data }) {
        const prevLoadData = cache.readQuery({ query: ALL_SOUNDS })
        const prevAllSounds = [...get(prevLoadData, 'allSounds', [])]
        const updatedAllSounds = filter(prevAllSounds, item => {
          return getId(item) !== getId(data.deleteSound)
        })

        cache.writeQuery({
          query: ALL_SOUNDS,
          data: {
            allSounds: updatedAllSounds,
          },
        })
      },
    },
  )

  if (isSoundDeleting) return <Spinner />
  if (errorMessage) return <ErrorMessage>{errorMessage}</ErrorMessage>

  return (
    <Base playing={!isSoundPaused}>
      <TrackHeader>
        {soundName}
        {isViewerInPower && (
          <SettingsPopover
            onDeleteSound={onDeleteSound}
            onToggleUpdate={() => onToggleUpdate(soundId)}
          />
        )}
      </TrackHeader>
      <Timeline
        isActive={isActive}
        sound={sound}
        onSeekProgress={onSeekProgress}
      />
    </Base>
  )
}

Track.defaultProps = {
  isViewerInPower: false,
}

Track.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isSoundPaused: PropTypes.bool.isRequired,
  isViewerInPower: PropTypes.bool,
  sound: PropTypes.object.isRequired,
  onSeekProgress: PropTypes.func.isRequired,
  onToggleUpdate: PropTypes.func.isRequired,
}

export default Track
