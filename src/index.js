import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import { GlobalStyle } from './styles'
import App from './App'

const httpLink = createHttpLink({ uri: '/.netlify/functions/graphql' })
const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  operation.setContext({
    headers: {
      authorization: token ? `bearer ${token}` : null,
    },
  })
  return forward(operation)
})

const link = middlewareLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
