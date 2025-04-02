const mongoose = require("mongoose");
const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  bio: {
    type: String,
  },
});

module.exports = mongoose.model("Actor", actorSchema);
