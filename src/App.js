import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import SideBar from './components/SideBar'
import Notes from './pages/Notes'

import logo from './logo.svg'

import { MainWrapper, PageContent } from './styles'

const client = new ApolloClient({
  uri: '/.netlify/functions/graphql',
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
