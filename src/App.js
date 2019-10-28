import React, { useState, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'

import SideBar from './components/SideBar'
// import Notes from './pages/Notes'
import Persons from './pages/Persons'
import PersonForm from './pages/PersonsForm'
import PhoneForm from './pages/PhoneForm'
import LoginForm from './pages/LoginForm'

import { MainWrapper, PageContent } from './styles'

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
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const handleError = error => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const client = useApolloClient()

  const persons = useQuery(ALL_PERSONS)

  const [addPerson] = useMutation(CREATE_PERSON, {
    onError: handleError,
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_PERSONS })
      dataInStore.allPersons.push(response.data.addPerson)
      store.writeQuery({
        query: ALL_PERSONS,
        data: dataInStore,
      })
    },
  })

  const [editNumber] = useMutation(EDIT_NUMBER)

  const [login] = useMutation(LOGIN, {
    onError: handleError,
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const errorNotification = () =>
    errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>

  return (
    <MainWrapper>
      <PageContent>
        {!token && (
          <div>
            {errorNotification()}
            <h2>Login</h2>
            <LoginForm login={login} setToken={setToken} />
          </div>
        )}
        {token && (
          <Fragment>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <Persons result={persons} />

            <h2>create new</h2>
            <PersonForm addPerson={addPerson} />

            <h2>change number</h2>
            <PhoneForm editNumber={editNumber} />

            <button onClick={logout}>logout</button>
          </Fragment>
        )}
      </PageContent>
      <SideBar />
    </MainWrapper>
  )
}

export default App
