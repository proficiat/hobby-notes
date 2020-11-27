import { gql, makeVar } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'

export const headerSearchValueVar = makeVar('')
export const audioCurrentTimeVar = makeVar(0)

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        headerSearchValue: {
          read() {
            return headerSearchValueVar()
          },
        },
        audioCurrentTime: {
          read() {
            return audioCurrentTimeVar()
          },
        },
      },
    },
  },
})

export const GET_IS_USER_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isViewerInPower @client
  }
`

export const GET_HEADER_SEARCH_VALUE = gql`
  query GetHeaderSearchValue {
    headerSearchValue @client
  }
`

export const GET_AUDIO_CURRENT_TIME = gql`
  query GetAudioCurrentTime {
    audioCurrentTime @client
  }
`
