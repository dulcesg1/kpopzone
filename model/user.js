var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: 1,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },nombre:{
    type:String,
    required:true
  },apPat:{
    type:String,
    required:true
  },apMat:{
    type:String,
    required:true
  }

});
module.exports = mongoose.model('User', userSchema);
