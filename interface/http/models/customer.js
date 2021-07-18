const mongoose = require("mongoose");
const { CUSTOMER_COLLECTION: CUSTOMER_COLLECTION } = require("../utils/constants").collections;

const userSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    gender: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(CUSTOMER_COLLECTION, userSchema);
