import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

import { compose } from 'recompose'

import Spinner from 'components/Spinner'

import SoundList from './SoundList'

class Sounds extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      allSounds,
      isSoundsLoading,
      isViewerInPower,
      onRefetchSounds,
    } = this.props

    if (isSoundsLoading) {
      return <Spinner />
    }
    return (
      <SoundList
        isViewerInPower={isViewerInPower}
        sounds={allSounds}
        onRefetchSounds={onRefetchSounds}
      />
    )
  }
}

Sounds.defaultProps = {
  isViewerInPower: false,
}

Sounds.propTypes = {
  allSounds: PropTypes.array.isRequired,
  isSoundsLoading: PropTypes.bool.isRequired,
  isViewerInPower: PropTypes.bool,
  onRefetchSounds: PropTypes.func.isRequired,
}

export default compose(
  graphql(
    gql`
      {
        allSounds {
          name
          audioUrl
          imageUrl
          waveform
          id
        }
      }
    `,
    {
      name: 'allSounds',
      props: ({ allSounds: { refetch, allSounds, loading } }) => ({
        allSounds,
        isSoundsLoading: loading,
        onRefetchSounds: () => refetch(),
      }),
    },
  ),
  graphql(
    gql`
      query IsUserLoggedIn {
        isViewerInPower @client
      }
    `,
    {
      name: 'isViewerInPower',
      props: ({ isViewerInPower: { isViewerInPower } }) => ({
        isViewerInPower,
      }),
    },
  ),
)(Sounds)
