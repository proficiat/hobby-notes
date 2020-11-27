import React, { Component } from 'react'

import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client'
import { cache, GET_IS_USER_LOGGED_IN } from 'cache'

import Spinner from 'components/Icons/Spinner'

import { persistCache } from 'apollo-cache-persist'

import SideBar from './components/SideBar'
import Header from './components/Header'
import Sounds from './pages/Sounds'
import { typeDefs, resolvers } from './resolvers'

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

    const client = new ApolloClient({
      link,
      cache,
      typeDefs,
      resolvers,
    })
    // init default state
    cache.writeQuery({
      query: GET_IS_USER_LOGGED_IN,
      data: {
        isViewerInPower: false,
      },
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
          <Header />
          <SideBar token={token} onSetToken={this.setToken} />
          <PageContent>
            <Sounds />
          </PageContent>
        </MainWrapper>
      </ApolloProvider>
    )
  }
}

export default App
