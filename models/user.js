'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

let Schema = mongoose.Schema

let UserSchema = new Schema({

	
		username: String,
		password: String
})


module.exports = mongoose.model('User', UserSchema)

//create new user
module.exports.createUser = (newUser, cb) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash
        newUser.save(cb)
    });
});
}

//query user
module.exports.getUserByUsername = function(username, cb){
  let query = {username: username}
  User.findOne(query, cb)
}

//validate password
module.exports.comparePassword = function(candidatePassword, hash, cb){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err
    cb(null, isMatch)
  })
}