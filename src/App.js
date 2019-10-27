import React, { Component } from 'react'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'

import SideBar from './components/SideBar'
// import Notes from './pages/Notes'
import Persons from './pages/Persons'

import { MainWrapper, PageContent } from './styles'

const client = new ApolloClient({
  uri: '/.netlify/functions/graphql',
})

const ALL_PERSONS = gql`
  {
    allPersons {
      name
      phone
      id
    }
  }
`

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <MainWrapper>
          <PageContent>
            <Query query={ALL_PERSONS}>
              {result => {
                if (!result) {
                  return null
                }
                return <Persons result={result} />
              }}
            </Query>
          </PageContent>
          <SideBar />
        </MainWrapper>
      </ApolloProvider>
    )
  }
}

export default App
