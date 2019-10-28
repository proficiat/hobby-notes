import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PersonForm from '../PersonsForm'

const PhoneForm = props => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const submit = () => async e => {
    e.preventDefault()

    await props.editNumber({
      variables: { name, phone },
    })

    setName('')
    setPhone('')
  }

  const handleChange = setter => target => {
    setter(target.target.value)
  }

  return (
    <div>
      <form onSubmit={submit()}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={handleChange(setName)}
          />
        </div>
        <div>
          phone{' '}
          <input
            value={phone}
            onChange={handleChange(setPhone)}
          />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  )
}

PhoneForm.propTypes = {
  editNumber: PropTypes.func.isRequired,
}

export default PhoneForm
