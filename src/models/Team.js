const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
  team:{
    type: String, required: true, unique: true,
    required: [true, 'please provide a name'],
    trim: true,
    maxlength: [15, 'Name can not be more than 15 characters'],
  },
    nickname: {
      type: String,
      required: true,
      trim: true,
      maxlength: [15, 'Name can not be more than 15 characters'],
    },
    League_id: {
      type: mongoose.Schema.ObjectId,
      required: true
    },
   

    
}, {timestamps: true})

module.exports = mongoose.model('Team', TeamSchema);