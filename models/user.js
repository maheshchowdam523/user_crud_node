const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  birthDate: {
    type: Date,
    required: true
  },
  avatar: {
    type: String
  },
  cloudinary_id: {
    type: String
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

module.exports = mongoose.model("User", userSchema);
