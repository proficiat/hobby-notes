const { gql } = require('apollo-server-lambda')

const typeDef = gql`
  type User {
    power: Boolean
    username: String!
    password: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    login(username: String!, password: String!): Token
  }
`

module.exports = {
  typeDef,
}
