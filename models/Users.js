var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email_address: {
    type: String,
    required:true,
    unique: true
  },
  password:{
    type: String
  },
  role:{
    type: String,
    required: true
  }
},
{timestamps: true})

module.exports = mongoose.model("user", userSchema);