const { ApolloServer, gql } = require('apollo-server-lambda')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const user = require('./user')
const sound = require('./sound')

mongoose.set('useFindAndModify', false)

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const MONGODB_URI =
  'mongodb+srv://adsum_admin:securepassword@adsumapi-miga3.gcp.mongodb.net/test?retryWrites=true&w=majority'

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Query
  type Mutation
`

const server = new ApolloServer({
  typeDefs: [typeDefs, user.typeDef, sound.typeDef],
  resolvers: [user.resolvers, sound.resolvers],
  context: async ({ event, context }) => {
    const auth = event ? event.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await user.User.findById(decodedToken.id)
      return { currentUser }
    }
    return context
  },
})

exports.handler = server.createHandler()
