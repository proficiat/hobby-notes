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
    required: true,
  },
  description: {
    type: String,
  },
  waveform: {
    type: [Number],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  played: {
    type: Number,
    required: false,
  },
  uploadedAt: {
    type: String,
    required: true,
  },
  buyLink: {
    type: String,
    default: '',
  },
})

module.exports = mongoose.model('Sound', schema)
