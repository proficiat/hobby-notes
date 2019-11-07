import React, { Component } from 'react'

import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import Spinner from 'components/Spinner'

import { persistCache } from 'apollo-cache-persist'

import SideBar from './components/SideBar'
import LoginForm from './pages/LoginForm'
import Sounds from './pages/Sounds'

import { MainWrapper, PageContent } from './styles'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem('login-token'),
      client: null,
      isLoadedCache: false,
    }
  }

  async componentDidMount() {
    const httpLink = createHttpLink({ uri: '/.netlify/functions/graphql' })
    const middlewareLink = new ApolloLink((operation, forward) => {
      const token = localStorage.getItem('login-token')
      operation.setContext({
        headers: {
          authorization: token ? `bearer ${token}` : null,
        },
      })
      return forward(operation)
    })
    const link = middlewareLink.concat(httpLink)

    const cache = new InMemoryCache()

    const client = new ApolloClient({
      link,
      cache,
    })

    try {
      await persistCache({
        cache,
        storage: window.localStorage,
      })
    } catch (error) {
      console.error('Error restoring Apollo cache', error)
    }

    this.setState({
      client,
      isLoadedCache: true,
    })
  }

  setToken = token => this.setState({ token })

  render() {
    const { token, client, isLoadedCache } = this.state
    if (!isLoadedCache) {
      return <Spinner />
    }
    return (
      <ApolloProvider client={client}>
        <MainWrapper>
          <PageContent>
            {!token && <LoginForm setToken={this.setToken} />}
            {token && <Sounds />}
          </PageContent>
          <SideBar token={token} onSetToken={this.setToken} />
        </MainWrapper>
      </ApolloProvider>
    )
  }
}

export default App
