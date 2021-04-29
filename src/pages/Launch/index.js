import React, { useState } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import { useMutation } from '@apollo/client'

import { GET_IS_USER_LOGGED_IN } from 'cache'
import { LOGIN } from 'queries/users'

import {
  Container,
  Title,
  Field,
  Input,
  Button,
  StyledForm,
  Error,
  HelpSubTitle,
  StyledHelpIcon,
  Row,
} from './styles'

const Launch = props => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('Adsum')
  const [password, setPassword] = useState('')
  const [isVisibleHelpTip, setTipVisibility] = useState(false)

  const handleError = error => {
    const errorGQLMessage = get(error, 'graphQLErrors[0].message')
    if (errorGQLMessage) {
      setErrorMessage(errorGQLMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
    }
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError,
    ignoreResults: false,
    update(cache, { data }) {
      const isViewerInPower = get(data, 'login.isViewerInPower', false)
      cache.writeQuery({
        query: GET_IS_USER_LOGGED_IN,
        data: {
          isViewerInPower,
        },
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

  const handleMouseOverHelpIcon = () => setTipVisibility(true)
  const handleMouseOutHelpIcon = () => setTipVisibility(false)

  const { onAddLaunchRef } = props

  return (
    <Container ref={onAddLaunchRef}>
      <Title>Welcome</Title>
      <HelpSubTitle>
        {isVisibleHelpTip ? 'just for creator' : '\u200b'}
      </HelpSubTitle>
      <StyledForm onSubmit={submit}>
        <Field>
          <Row>
            Name:
            <StyledHelpIcon
              size={20}
              onMouseOut={handleMouseOutHelpIcon}
              onMouseOver={handleMouseOverHelpIcon}
            />
          </Row>
          <Input
            readOnly
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Field>
        <Field>
          Password:
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
  setToken: PropTypes.func.isRequired,
  onAddLaunchRef: PropTypes.func.isRequired,
}

export default Launch
