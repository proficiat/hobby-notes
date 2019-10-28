import React, { useState } from 'react'

import PropTypes from 'prop-types'

import { gql } from 'apollo-boost'

import { useApolloClient } from '@apollo/react-hooks'
import Spinner from '../../components/Spinner'

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
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

const Persons = ({ result }) => {
  const client = useApolloClient()
  const [person, setPerson] = useState(null)

  if (result.loading) {
    return <Spinner />
  }

  const showPerson = async name => {
    const { data } = await client.query({
      query: FIND_PERSON,
      variables: { nameToSearch: name },
    })
    setPerson(data.findPerson)
  }

  const handleClose = () => () => {
    setPerson(null)
  }

  const handleShowAddress = name => () => {
    showPerson(name)
  }

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {person.address.street} {person.address.city}
        </div>
        <div>{person.phone}</div>
        <button type="button" onClick={handleClose()}>
          close
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2>Persons</h2>
      {result.data.allPersons.map(p => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button type="button" onClick={handleShowAddress(p.name)}>
            show address
          </button>
        </div>
      ))}
    </div>
  )
}

Persons.propTypes = {
  result: PropTypes.object.isRequired,
}

export default Persons
