const mongoose = require('mongoose')

const { Schema } = mongoose

const PollSchema = new Schema(
  {
    yes: { type: Number, required: true, default: 0 },
    no: { type: Number, required: true, default: 0 }
  }
)

// Export model
module.exports = mongoose.model('Poll', PollSchema)
