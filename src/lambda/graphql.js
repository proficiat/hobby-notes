const { ApolloServer, gql } = require('apollo-server-lambda')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const user = require('./user')
const sound = require('./sound')

// loads environment variables from a .env file into process.env
dotenv.config()

mongoose.set('useFindAndModify', false)
mongoose
  .connect(process.env.REACT_APP_MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
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
      const token = auth.substring(7) // remove Bearer
      const decodedToken = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
      const viewer = await user.User.findById(decodedToken.id)
      return { viewer }
    }
    return context
  },
})

exports.handler = server.createHandler()
