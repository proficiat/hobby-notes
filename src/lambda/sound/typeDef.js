const { gql } = require('apollo-server-lambda')

const typeDef = gql`
  type Sound {
    id: ID!
    name: String!
    imageUrl: String
    audioUrl: String!
    description: String
    waveform: [Float]!
    duration: Float!
    uploadedAt: String!
  }

  extend type Query {
    allSounds: [Sound!]!
  }

  extend type Mutation {
    addSound(
      name: String!
      imageUrl: String
      audioUrl: String!
      description: String
      waveform: [Float]!
      duration: Float!
      uploadedAt: String!
    ): Sound
    deleteSound(id: String!): Sound
    updateSound(
      id: String!
      name: String!
      imageUrl: String
      audioUrl: String
      description: String
      waveform: [Float]
      duration: Float
    ): Sound
  }
`

module.exports = {
  typeDef,
}
