const mongoose = require('mongoose')

const LeagueSchema = new mongoose.Schema({
  leaguename:{
    type: String,
    required: [true, 'please provide a name'],
    trim: true,
    unique: true,
    maxlength: [18, 'Name can not be more than 18 characters'], 
  },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: [15, 'Name can not be more than 15 characters'],
  },
     logo: {
      type: String, 
      required: false, 
      trim: true,
      maxlength: [5, 'Name can not be more than 5 characters'],
     }, 
  
}, {timestamps: true})

module.exports = mongoose.model('League', LeagueSchema);