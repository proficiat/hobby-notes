const { UserInputError } = require('apollo-server-lambda')
const Sound = require('./sound')

const resolvers = {
  Query: {
    allSounds: (root, args) => {
      return Sound.find({})
    },
  },
  Mutation: {
    addSound: async (root, args, context) => {
      const sound = new Sound({ ...args })
      try {
        await sound.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return sound
    },
    deleteSound: async (root, args) => {
      const { id } = args
      const deleted = await Sound.findByIdAndRemove(id)
      return deleted
    },
  },
}

module.exports = {
  resolvers,
}
