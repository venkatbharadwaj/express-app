var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var userSchema = new Schema({
    username:  {type:String, unique : true, required : true },
    firstname: {type: String, required : true},
    lastname: {type: String, required : true},
    email: {type: String, required : true},
    password: {type: String, required : true}
});

module.exports = mongoose.model('User', userSchema);