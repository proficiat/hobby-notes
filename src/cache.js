import { gql, makeVar } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'

export const headerSearchValueVar = makeVar('')
export const audioCurrentTimeVar = makeVar(0)
export const themeNameVar = makeVar(
  localStorage.getItem('theme-name') || 'dark',
)

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
        themeName: {
          read() {
            return themeNameVar()
          },
        },
        allSounds: {
          merge(existing, incoming) {
            // Equivalent to what happens if there is no custom merge function.
            return incoming
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

export const GET_THEME_NAME = gql`
  query GetThemeName {
    themeName @client
  }
`
