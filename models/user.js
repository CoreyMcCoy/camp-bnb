const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//define a user schema - even though we need an email, username and password, we're only going to specify the email
//because we can use the passportLocalMongoose plugin to add username and password fields to the schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.plugin(passportLocalMongoose); //This plugin adds username and password fields to the schema

module.exports = mongoose.model('User', UserSchema);
