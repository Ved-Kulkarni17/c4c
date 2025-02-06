const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  interests: { type: [String], required: true, maxLength: 3 },
  location: { type: String, required: true },
  languages: { type: [String], required: true, maxLength: 3 },
  expertise: { type: Number, required: true, min: 1, max: 5 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
