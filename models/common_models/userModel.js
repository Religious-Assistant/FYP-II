const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  mobile: {
    type: String,
    required: true,
  },
  religion: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: "avatar.png",
  },
  location: {
    type: { type: String },
    coordinates: [],
  }
},{timestamp:true});

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 5, function (err, hash) {
    if (!err && hash) {
      user.password = hash;
      next();
    }
  });
});

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
