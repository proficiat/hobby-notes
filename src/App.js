import React, { Component } from 'react'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider, Query, Mutation } from 'react-apollo'

import SideBar from './components/SideBar'
// import Notes from './pages/Notes'
import Persons from './pages/Persons'
import PersonForm from './pages/PersonsForm'

import { MainWrapper, PageContent, GlobalStyle } from './styles'

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

const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <GlobalStyle />
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
            <h2>create new</h2>
            <Mutation
              mutation={CREATE_PERSON}
              refetchQueries={[{ query: ALL_PERSONS }]}
            >
              {addPerson => <PersonForm addPerson={addPerson} />}
            </Mutation>
          </PageContent>
          <SideBar />
        </MainWrapper>
      </ApolloProvider>
    )
  }
}

export default App
