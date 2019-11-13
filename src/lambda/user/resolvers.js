const { UserInputError } = require('apollo-server-lambda')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('./user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const OWNER_NAME = 'Adsum'

const resolvers = {
  Query: {
    viewer: (root, args, context) => {
      return context.viewer
    },
  },
  Mutation: {
    login: async (root, args) => {
      const { password } = args
      let user = await User.findOne({ username: args.username })
      if (!user) {
        const { username } = args
        const power = username === OWNER_NAME
        const salt = bcrypt.genSaltSync(10)
        user = new User({
          username,
          password: bcrypt.hashSync(password, salt),
          power,
        })
        await user.save().catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
      } else if (!bcrypt.compareSync(password, user.password)) {
        throw new UserInputError('Wrong password', { invalidArgs: args })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return {
        token: jwt.sign(userForToken, JWT_SECRET),
        isViewerInPower: user.power,
      }
    },
  },
}

module.exports = {
  resolvers,
}
