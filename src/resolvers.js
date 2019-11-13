import { gql } from 'apollo-boost'

// To build a client schema, we extend the types of our server schema
export const typeDefs = gql`
  extend type Query {
    isViewerInPower: Boolean!
  }
`

export const resolvers = {}
