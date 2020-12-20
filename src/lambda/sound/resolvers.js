const omit = require('lodash/omit')

const { UserInputError } = require('apollo-server-lambda')
const Sound = require('./sound')

const resolvers = {
  Query: {
    allSounds: (root, args) => {
      return Sound.find({})
    },
  },
  Mutation: {
    uploadSound: async (root, args, context) => {
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
      // mocked on front for now (to save cloudinary links)
      return Sound.findById(id, 'name')
      // return Sound.findByIdAndRemove(id)
    },
    updateSound: (root, args) => {
      const { id } = args
      const updatedArgs = omit(args, ['id'])
      return Sound.findByIdAndUpdate(id, { ...updatedArgs })
    },
  },
}

module.exports = {
  resolvers,
}
