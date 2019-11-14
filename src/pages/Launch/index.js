import React, { useState } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { withApollo } from 'react-apollo'

import {
  Container,
  Title,
  Field,
  Input,
  Button,
  StyledForm,
  Error,
} from './styles'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      isViewerInPower
    }
  }
`

const Launch = props => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleError = error => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError,
    update(cache, { data }) {
      const isViewerInPower = get(data, 'login.isViewerInPower', false)
      cache.writeData({
        data: { isViewerInPower },
      })
    },
  })

  const submit = async event => {
    event.preventDefault()

    const result = await login({
      variables: { username, password },
    })

    if (result) {
      const { token } = result.data.login
      props.setToken(token)
      localStorage.setItem('login-token', token)
    }
  }

  return (
    <Container>
      <Title>Welcome</Title>
      <StyledForm onSubmit={submit}>
        <Field>
          Name
          <Input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Field>
        <Field>
          Password
          <Input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Field>
        {errorMessage && <Error>{errorMessage}</Error>}
        <Button type="submit">Enter</Button>
      </StyledForm>
    </Container>
  )
}

Launch.propTypes = {
  // client: PropTypes.object.isRequired,
  setToken: PropTypes.func.isRequired,
}

export default withApollo(Launch)
