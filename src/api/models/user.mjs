//importuję mongoose
const mongoose = require('mongoose');

//tworzę schemat użytkownika
const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);
