const mongoose = require("mongoose");
const { AUTH_COLLECTION } = require("../utils/constants").collections;

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 5,
      unique: true,
    },
    password: {
      type: String,
      min: 8,
      max: 1024,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(AUTH_COLLECTION, authSchema);
