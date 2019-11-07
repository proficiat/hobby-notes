import React, { PureComponent } from 'react'

import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import get from 'lodash/get'

import Spinner from 'components/Spinner'

import SoundList from './SoundList'

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

class Sounds extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Query query={ALL_SOUNDS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Spinner />
          }
          const sounds = get(data, 'allSounds', [])
          return <SoundList sounds={sounds} />
        }}
      </Query>
    )
  }
}

Sounds.propTypes = {}

export default Sounds
