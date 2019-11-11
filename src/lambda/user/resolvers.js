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
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        const newUser = new User({ username: args.username })
        return newUser.save().catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

        // throw new UserInputError('wrong credentials')
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
