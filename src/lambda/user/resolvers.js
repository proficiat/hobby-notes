const { UserInputError } = require('apollo-server-lambda')

const jwt = require('jsonwebtoken')

const User = require('./user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    login: async (root, args) => {
      let user = await User.findOne({ username: args.username })

      if (!user) {
        const { username, password } = args
        const power = username === 'Adsum'
        user = new User({ username, password, power })
        await user.save().catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

module.exports = {
  resolvers,
}
