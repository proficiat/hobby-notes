const { gql } = require('apollo-server-lambda')

const typeDef = gql`
  type User {
    power: Boolean
    username: String!
    password: String!
    id: ID!
  }

  type Token {
    token: String!
    isViewerInPower: Boolean
  }

  extend type Query {
    viewer: User
    isViewerInPower: Boolean!
  }

  extend type Mutation {
    login(username: String!, password: String!): Token
  }
`

module.exports = {
  typeDef,
}
