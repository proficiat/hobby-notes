const { resolvers } = require('./resolvers')
const { typeDef } = require('./typeDef')
const User = require('./user')

module.exports = {
  resolvers,
  typeDef,
  User,
}
