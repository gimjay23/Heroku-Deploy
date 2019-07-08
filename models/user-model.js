const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  username: String,
  email: String,
  thumbnail: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
