import { gql } from 'apollo-boost'

// We recommend managing local state in the Apollo cache instead of
// bringing in another state management library like Redux
// so the Apollo cache can be a single source of truth.

// To build a client schema, we extend the types of our server schema
// query it with GraphQL just by specifying the @client
export const typeDefs = gql`
  extend type Query {
    isViewerInPower: Boolean!
  }
`

export const resolvers = {}
