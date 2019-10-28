import React, { useState } from 'react'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider, Query, Mutation } from 'react-apollo'

import SideBar from './components/SideBar'
// import Notes from './pages/Notes'
import Persons from './pages/Persons'
import PersonForm from './pages/PersonsForm'
import PhoneForm from './pages/PhoneForm'

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

const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = () => error => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <MainWrapper>
        <PageContent>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
            onError={handleError()}
          >
            {addPerson => <PersonForm addPerson={addPerson} />}
          </Mutation>
          <h2>change number</h2>
          <Mutation
            mutation={EDIT_NUMBER}
          >
            {(editNumber) =>
              <PhoneForm
                editNumber={editNumber}
              />
            }
          </Mutation>
        </PageContent>
        <SideBar />
      </MainWrapper>
    </ApolloProvider>
  )
}

export default App
