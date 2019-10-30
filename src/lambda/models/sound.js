const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  imageUrl: {
    type: String,
  },
  audioUrl: {
    type: String,
  },
  description: {
    type: String,
  },
})

module.exports = mongoose.model('SoundModel', schema)
