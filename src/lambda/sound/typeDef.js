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
    played: Int
    uploadedAt: String!
    buyLink: String
  }

  extend type Query {
    allSounds: [Sound!]!
  }

  extend type Mutation {
    uploadSound(
      name: String!
      imageUrl: String
      audioUrl: String!
      description: String
      waveform: [Float]!
      duration: Float!
      uploadedAt: String!
      buyLink: String
    ): Sound
    deleteSound(id: String!): Sound
    updateSound(
      id: String!
      name: String
      imageUrl: String
      audioUrl: String
      description: String
      waveform: [Float]
      duration: Float
      played: Int
      buyLink: String
    ): Sound
  }
`

module.exports = {
  typeDef,
}
