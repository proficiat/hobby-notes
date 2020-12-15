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
      uploadedAt
    }
  }
`

export const UPDATE_SOUND = gql`
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

export const DELETE_SOUND = gql`
  mutation deleteSound($id: String!) {
    deleteSound(id: $id) {
      id
      name
    }
  }
`
