const { gql } = require('apollo-server-lambda')

const typeDef = gql`
  type Sound {
    id: ID!
    name: String!
    imageUrl: String
    audioUrl: String!
    description: String
  }

  extend type Query {
    allSounds: [Sound!]!
  }

  extend type Mutation {
    addSound(
      name: String!
      imageUrl: String
      audioUrl: String
      description: String
    ): Sound
    deleteSound(id: String!): Sound
  }
`

module.exports = {
  typeDef,
}
