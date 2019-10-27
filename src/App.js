import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import SideBar from './components/SideBar'
import Notes from './pages/Notes'
// import Profile from './pages/Profile'

import logo from './logo.svg'

import { MainWrapper, PageContent } from './styles'

const httpLink = new HttpLink({
  uri: '/.netlify/functions/graphql',
  credentials: 'same-origin',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <MainWrapper>
          <PageContent>
            <img alt="logo" className="App-logo" src={logo} />
            <Notes />
          </PageContent>
          <SideBar />
        </MainWrapper>
      </ApolloProvider>
    )
  }
}

export default App
