import { ApolloClient, ApolloLink, createHttpLink } from '@apollo/client'
import { cache } from './cache'
import { resolvers, typeDefs } from './resolvers'

export const createApolloClient = token => {
  // A URI pointing to the backend GraphQL endpoint that Apollo Client will communicate with
  const httpLink = createHttpLink({ uri: '/.netlify/functions/graphql' })
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: token ? `bearer ${token}` : null,
      },
    })
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)
  return new ApolloClient({
    link,
    cache,
    typeDefs,
    resolvers,
  })
}
