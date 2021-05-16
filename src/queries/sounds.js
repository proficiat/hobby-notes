import { gql } from '@apollo/client'

export const ALL_SOUNDS = gql`
  {
    allSounds {
      id
      name
      description
      audioUrl
      imageUrl
      waveform
      duration
      played
      uploadedAt
      buyLink
    }
  }
`

export const UPLOAD_SOUND = gql`
  mutation uploadSound(
    $name: String!
    $imageUrl: String
    $audioUrl: String!
    $description: String
    $waveform: [Float]!
    $duration: Float!
    $uploadedAt: String!
    $buyLink: String
  ) {
    uploadSound(
      name: $name
      imageUrl: $imageUrl
      audioUrl: $audioUrl
      description: $description
      waveform: $waveform
      duration: $duration
      uploadedAt: $uploadedAt
      buyLink: $buyLink
    ) {
      id
      name
      imageUrl
      audioUrl
      description
      waveform
      duration
      played
      uploadedAt
      buyLink
    }
  }
`

export const UPDATE_SOUND = gql`
  mutation updateSound(
    $id: String!
    $name: String
    $imageUrl: String
    $audioUrl: String
    $description: String
    $waveform: [Float]
    $duration: Float
    $played: Int
    $buyLink: String
  ) {
    updateSound(
      id: $id
      name: $name
      imageUrl: $imageUrl
      audioUrl: $audioUrl
      description: $description
      waveform: $waveform
      duration: $duration
      played: $played
      buyLink: $buyLink
    ) {
      id
      name
      imageUrl
      audioUrl
      description
      waveform
      duration
      played
      buyLink
    }
  }
`

export const DELETE_SOUND = gql`
  mutation deleteSound($id: String!) {
    deleteSound(id: $id) {
      id
      name
    }
  }
`
