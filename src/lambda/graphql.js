import uuid from 'uuid'

const { ApolloServer, UserInputError, gql } = require('apollo-server-lambda')

// const defaultNotes = [
//   {
//     title: 'Note about tea',
//     text: 'Super Chinese Teas',
//     folder: 'Default',
//   },
//   {
//     title: 'Notes about drawing',
//     text: 'Short line',
//     folder: 'Default',
//   },
// ]

let persons = [
  {
    name: 'Layla Hot',
    phone: '040-123543',
    street: 'Octopus street',
    city: 'Espoo',
    id: '3d594650-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Matti Luukkainen',
    phone: '040-432342',
    street: 'Malminkaari 10 A',
    city: 'Helsinki',
    id: '3d599470-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Lisa Ruuska',
    street: 'Nallemäentie 22 C',
    city: 'Helsinki',
    id: '3d599471-3436-11e9-bc57-8b80ba54c431',
  },
]

const typeDefs = gql`
  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Address {
    street: String!
    city: String!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    hello: String
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
  }
`

const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      return 'Hello, world!'
    },
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons
      }
      const byPhone = person =>
        args.phone === 'YES' ? person.phone : !person.phone
      return persons.filter(byPhone)
    },
    findPerson: (root, args) => persons.find(p => p.name === args.name),
  },
  Person: {
    address: root => {
      return {
        street: root.street,
        city: root.city,
      }
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        })
      }
      const person = { ...args, id: uuid() }
      persons = persons.concat(person)
      return person
    },
    editNumber: (root, args) => {
      const person = persons.find(p => p.name === args.name)
      if (!person) {
        return null
      }

      const updatedPerson = { ...person, phone: args.phone }
      persons = persons.map(p => (p.name === args.name ? updatedPerson : p))
      return updatedPerson
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

exports.handler = server.createHandler()
