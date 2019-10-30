import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'

import SideBar from './components/SideBar'
// import Notes from './pages/Notes'
// import Persons from './pages/Persons'
// import PersonForm from './pages/PersonsForm'
// import PhoneForm from './pages/PhoneForm'
import LoginForm from './pages/LoginForm'
import AddEditAudio from './pages/AddEditAudio'

import { MainWrapper, PageContent } from './styles'

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

const ADD_SOUND = gql`
  mutation createSound(
    $name: String!
    $imageUrl: String
    $audioUrl: String!
    $description: String
  ) {
    addSound(
      name: $name
      imageUrl: $imageUrl
      audioUrl: $audioUrl
      description: $description
    ) {
      name
      imageUrl
      audioUrl
      description
    }
  }
`

const ALL_SOUNDS = gql`
  {
    allSounds {
      name
      audioUrl
      imageUrl
      id
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

  const sounds = useQuery(ALL_SOUNDS)

  const [addSound] = useMutation(ADD_SOUND, {
    onError: handleError,
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_SOUNDS })
      dataInStore.allSounds.push(response.data.addSound)
      store.writeQuery({
        query: ALL_SOUNDS,
        data: dataInStore,
      })
    },
  })

  const [editNumber] = useMutation(EDIT_NUMBER)

  const [login] = useMutation(LOGIN, {
    onError: handleError,
  })

  const logout = () => () => {
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
            <h2>Welcome</h2>
            <LoginForm login={login} setToken={setToken} />
          </div>
        )}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {token && <AddEditAudio addSound={addSound} sounds={sounds} />
        // (
        //   <Fragment>
        //     <Persons result={persons} />
        //     <h2>create new</h2>
        //     <PersonForm addPerson={addPerson} />
        //     <h2>change number</h2>
        //     <PhoneForm editNumber={editNumber} />
        //   </Fragment>
        // )
        }
        {token && (
          <button type="button" onClick={logout()}>
            logout
          </button>
        )}
      </PageContent>
      <SideBar />
    </MainWrapper>
  )
}

export default App
