import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => async event => {
    event.preventDefault()

    const result = await props.login({
      variables: { username, password },
    })

    if (result) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  }

  return (
    <div>
      <form onSubmit={submit()}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
}

export default LoginForm
