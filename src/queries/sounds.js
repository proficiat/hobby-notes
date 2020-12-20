import { gql } from '@apollo/client'

export const ALL_SOUNDS = gql`
  {
    allSounds {
      id
      name
      audioUrl
      imageUrl
      waveform
      duration
      played
      uploadedAt
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
  ) {
    uploadSound(
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
      played
      uploadedAt
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
    ) {
      id
      name
      imageUrl
      audioUrl
      description
      waveform
      duration
      played
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
