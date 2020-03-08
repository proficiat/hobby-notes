const { gql } = require('apollo-server-lambda')

const typeDef = gql`
  type Sound {
    id: ID!
    name: String!
    imageUrl: String
    audioUrl: String!
    description: String
    waveform: [Float]!
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
    ): Sound
    deleteSound(id: String!): Sound
  }
`

module.exports = {
  typeDef,
}
