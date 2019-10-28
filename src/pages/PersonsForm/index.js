import React, { useState } from 'react'
import PropTypes from 'prop-types'

const PersonForm = props => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const submit = () => async e => {
    e.preventDefault()
    await props.addPerson({
      variables: { name, phone, street, city },
    })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  const handleChange = setter => target => {
    setter(target.target.value)
  }

  return (
    <div>
      <form onSubmit={submit()}>
        <div>
          name <input value={name} onChange={handleChange(setName)} />
        </div>
        <div>
          phone <input value={phone} onChange={handleChange(setPhone)} />
        </div>
        <div>
          street <input value={street} onChange={handleChange(setStreet)} />
        </div>
        <div>
          city <input value={city} onChange={handleChange(setCity)} />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  )
}

PersonForm.propTypes = {
  addPerson: PropTypes.func.isRequired,
}

export default PersonForm
