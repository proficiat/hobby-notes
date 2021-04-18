const omit = require('lodash/omit')
const get = require('lodash/get')

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
      // return Sound.findById(id, 'name')
      return Sound.findByIdAndRemove(id)
    },
    updateSound: async (root, args) => {
      const { id, played } = args
      const updatedArgs = omit(args, ['id', 'played'])
      const sound = await Sound.findById(id)
      const soundPlayed = get(sound, 'played', 0)
      const playedUpdate = played ? { played: soundPlayed + 1 } : {}
      const updates = { ...updatedArgs, ...playedUpdate }
      try {
        await sound.set(updates)
        await sound.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return sound
    },
  },
}

module.exports = {
  resolvers,
}
